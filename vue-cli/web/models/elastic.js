const os = require('os');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const config = require('../config.elastic');

const { Client, errors } = require('@elastic/elasticsearch');
const { ResponseError } = errors;
const client = new Client(config.elastic);

const reTask = {
	stoping: false,
	running: false,
	id: 0,
	files: 0,
	qdirs: [],
	qfiles: [],
	runs: 0,
	rdirs: 0,
	rfiles: 0,
	time: 0,
	status: 0,
	err: false,
	nws: 0,
	ws: {},
	errfd: 0,
	outfd: 0,
	lines: [],
	_lines: [],
	timer: 0,
	format(...args) {
		let strs = [];

		strs.push('[' + moment(Date.now()).format(config.timeFormat) + ']');

		args.forEach((v)=>{
			if(v instanceof ResponseError) {
				strs.push('\nstatusCode:', v.statusCode, '\nheaders:', JSON.stringify(v.headers, null, 4).split('\n').join('\n    '), '\nbody:', JSON.stringify(v.body, null, 4).split('\n').join('\n    '), '\nstack:', v.stack.split('\n').join('\n    '));
			} else if(v instanceof Error) {
				if(v.meta) {
					strs.push('META:', JSON.stringify(v.meta, null, 4));
				}
				strs.push('\n' + v.stack);
			} else if(typeof(v) === 'object') {
				strs.push(JSON.stringify(v, null, 4));
			} else {
				strs.push(v);
			}
		});

		return strs.join(' ');
	},
	log(...args) {
		let str = this.format(...args);
		
		if(this.outfd) {
			fs.write(this.outfd, str + os.EOL, (err) => {
				if(!err) return;
				
				console.error('write logFile error', err);
				fs.close(this.outfd, (err)=>{
					if(err) console.error('close logFile error', err);
				});
				this.outfd = 0;
				
				console.log(str);
			});
		} else {
			console.log(str);
		}
		
		this.lines.push(str);
		if(this.lines.length>config.lines) this.lines.shift();
		
		if(this.nws) {
			this._lines.push(str);
			if(config.wsMode && this._lines.length == config.lines) {
				this.send('<p>'+this._lines.splice(0).join('</p><p>')+'</p>');
			}
		}
	},
	error(...args) {
		let str = this.format(...args)
		
		if(this.errfd) {
			fs.write(this.errfd, str + os.EOL, (err) => {
				if(!err) return;
				
				console.error('write logFile error', err);
				fs.close(this.errfd, (err)=>{
					if(err) console.error('close logFile error', err);
				});
				this.errfd = 0;
				
				console.error(str);
			});
		} else {
			console.error(str);
		}
	},
	setId(id) {
		if(this.id) return;
		
		this.id = id;
	},
	genId() {
		return ++this.id;
	},
	ok() {
		return ++this.files;
	},
	data() {
		return {
			running: this.running,
			scans: this.files,
			qdirs: this.qdirs.length,
			qfiles: this.qfiles.length,
			runs: this.runs,
			rdirs: this.rdirs,
			rfiles: this.rfiles,
			seconds: this.running ? (Date.now() - this.time) / 1000 : this.time,
			err: this.err,
			lines: this.lines
		};
	},
	send(data) {
		if(!this.nws) return;
		
		data = JSON.stringify(data);
		Object.keys(this.ws).forEach((k)=>{
			try {
				this.ws[k].send(data);
			} catch(e) {}
		});
	},
	_interval() {
		if(!this.nws) {
			this._lines.splice(0);
			return;
		}
		
		if(!config.wsMode || !this.running) this.send('<p>'+this._lines.splice(0).join('</p><p>')+'</p>');
		let o = this.data();
		delete o.lines;
		this.send(o);
	},
	init(res) {
		if(this.running) {
			if(res) res.json('Making document ...');
			return true;
		}
		
		if(config.errFile) {
			fs.open(config.errFile, 'w+', (err,fd)=>{
				if(err) {
					console.error('open errFile error', err);
				} else if(this.running) {
					this.errfd = fd;
				} else {
					fs.close(fd, (err)=>{
						if(err) console.error('close errFile error', err);
					});
				}
			});
		}
		if(config.logFile) {
			fs.open(config.logFile, 'w+', (err,fd)=>{
				if(err) {
					console.error('open logFile error', err);
				} else if(this.running) {
					this.outfd = fd;
				} else {
					fs.close(fd, (err)=>{
						if(err) console.error('close logFile error', err);
					});
				}
			});
		}
		
		this.stoping = false;
		this.running = true;
		this.timer = setInterval(this._interval.bind(this), config.interval);
		// this.id = 0;
		// this.files = 0;
		// this.qdirs.splice(0);
		// this.qfiles.splice(0);
		this.runs = 0;
		this.rdirs = 0;
		this.rfiles = 0;
		// this.time = Date.now();
		this.res = res;
		this.status = 0;
		this.err = false;
		this.lines.splice(0);

		for(let i=0; i<config.tasks; i++) {
			if(this.qfiles.length) {
				++this.runs;
				++this.rfiles;
				let args = this.qfiles.pop();
				createDocument(...args);
			} else if(this.qdirs.length) {
				++this.runs;
				++this.rdirs;
				let args = this.qdirs.pop();
				makeDocument(...args);
			}
		}

		if(this.runs > 0) {
			this.time = Date.now() - this.time * 1000;
			return true;
		} else {
			this.id = 0;
			this.files = 0;
			this.time = Date.now();
		}
	},
	add(isDir, ...args) {
		if(this.running === false || this.stoping) { // ended skip
			this.error('ADD', isDir, ...args);
			if(isDir) {
				this.qdirs.push(args);
			} else {
				this.qfiles.push(args);
			}
		} else if(this.runs < config.tasks) {
			if(isDir) {
				++this.runs;
				++this.rdirs;
				makeDocument(...args);
			} else if(config.bulks > 0) {
				this.qfiles.push(args);
				if(this.rfiles < config.bulkTasks && this.qfiles.length >= config.bulks) {
					++this.runs;
					++this.rfiles;
					bulkDocuments(this.qfiles.splice(0, config.bulks));
				}
			} else {
				++this.rfiles;
				createDocument(...args);
			}
		} else {
			if(isDir) {
				this.qdirs.push(args);
			} else {
				this.qfiles.push(args);
			}
		}
	},
	stop() {
		if(!this.running) return;
		
		clearInterval(this.timer);
		this.timer = 0;
		this.time = (Date.now() - this.time) / 1000;
		this.running = false;
		
		this.log((this.stoping ? 'Stopped, ' : 'Completed, ') + this.files + ' files, ' + this.time + ' seconds');

		if(this.err) {
			let o = this.data();
			delete o.lines;
			this.error(o);
		}
		
		// this.qdirs.splice(0);
		// this.qfiles.splice(0);
		this._interval();
		
		if(this.errfd) {
			fs.close(this.errfd, (err)=>{
				if(err) console.error('close errFile error', err);
			});
			this.errfd = 0;
		}
		if(this.outfd) {
			fs.close(this.outfd, (err)=>{
				if(err) console.error('close logFile error', err);
			});
			this.outfd = 0;
		}
		
		this.send(this.stoping ? 'Stopped' : 'Completed');
	},
	next(isDir, err, ...args) {
		if(this.running === false) { // ended skip
			console.trace(arguments);
			return;
		}
		
		if(typeof(isDir) !== 'boolean') {
		} else if(isDir) {
			--this.rdirs;
		} else {
			--this.rfiles;
		}
		
		if(this.stoping) {
			if(err) {
				this.error('NEXT', isDir, err);
			}
			if(args.length) {
				this.add(isDir, ...args);
			}
			if(--this.runs == 0) {
				this.stop();
				this.stoping = false;
			}
		} else if(err) { // catch completed and response
			if(err.body) {
				this.status = (err.body.status || 500);
				this.err = (err.body.error.reason || err.body.error.message || err.message);
			} else {
				this.status = (err.status || 500);
				this.err = err.message;
			}
			
			if(this.res) {
				this.res.status(this.status);
				this.res.json(this.err);
			}
			
			this.stoping = true;
			if(args.length) {
				this.add(isDir, ...args);
			}
			this.error('ERROR.end', err);
			if(typeof(isDir) === 'boolean') {
				if(--this.runs === 0) {
					this.stop();
					return;
				}
			}
		} else if(config.bulks <= 0 && this.qfiles.length) {
			let args = this.qfiles.pop();
			++this.rfiles;
			createDocument(...args);
		} else if(config.bulks > 0 && this.rfiles < config.bulkTasks && this.qfiles.length >= config.bulks) {
			++this.rfiles;
			bulkDocuments(this.qfiles.splice(0, config.bulks));
		} else if(this.qdirs.length) {
			let args = this.qdirs.pop();
			++this.rdirs;
			makeDocument(...args);
		} else if(this.rdirs === 0 && config.bulks > 0 && this.rfiles < config.bulkTasks && this.qfiles.length) {
			++this.rfiles;
			bulkDocuments(this.qfiles.splice(0, config.bulks));
		} else if(--this.runs) { // running ...
		} else { // completed and response
			this.status = 200;
			if(this.res) {
				this.res.json(this.files);
			}
			this.stop();
		}
	}
};
const bulkDocuments = function(docs) {
	var bulkBody = [];
	
	docs.forEach((v,k)=>{
		bulkDocument(bulkBody, ...v);
	});
	
	client.bulk({
		index: config.index,
		body: bulkBody
	}).then(({body})=>{
		body.items.forEach((item, i)=>{
			if(item.index.result === 'created') {
				reTask.ok();
				bulkResult(...docs[i]);
			} else {
				reTask.add(false, ...docs[i]);
			}
		});
		reTask.next(false, false);
	}).catch((err)=>{
		docs.forEach((doc,i)=>{
			reTask.add(false, ...doc);
		});
		reTask.next(false, err);
	});
};
const bulkResult = function($scan, $dir, name, dir, pid, $id, st) {
	let mode = (st.mode & 07777);
	let type = getTypeByStat(st);
	
	reTask.log(type, $id, pid, mode.toString(8), $dir);
};
const bulkDocument = function(body, $scan, $dir, name, dir, pid, $id, st) {
	let mode = (st.mode & 07777);
	let type = getTypeByStat(st);
	
	body.push({
		index: {
			_id: $id
		}
	});
	body.push({
		id: $id,
		pid: pid,
		name: name,
		path: dir,
		link: st.isSymbolicLink() ? fs.readlinkSync($scan) : null,
		type: type,
		size: st.size,
		mode: mode,
		nlink: st.nlink,
		uid: st.uid,
		gid: st.gid,
		dev: st.dev,
		ino: st.ino,
		atime: moment(st.atime).format(config.timeFormat),
		mtime: moment(st.mtime).format(config.timeFormat),
		ctime: moment(st.ctime).format(config.timeFormat),
		birthtime: moment(st.birthtime).format(config.timeFormat)
	});
};
const getTypeByStat = function(st) {
	if(st.isFile()) {
		return 'REG';
	} else if(st.isDirectory()) {
		return 'DIR';
	} else if(st.isBlockDevice()) {
		return 'BLK';
	} else if(st.isCharacterDevice()) {
		return 'CHR';
	} else if(st.isFIFO()) {
		return 'FIFO';
	} else if(st.isSocket()) {
		return 'SOCK';
	} else if(st.isSymbolicLink()) {
		return 'LNK';
	} else {
		return 'Unknown';
	}
};
const createDocument = function($scan, $dir, name, dir, pid, $id, st) {
	let mode = (st.mode & 07777);
	let type = getTypeByStat(st);
	
	client.create({
		id: $id,
		index: config.index,
		body: {
			id: $id,
			pid: pid,
			name: name,
			path: dir,
			link: st.isSymbolicLink() ? fs.readlinkSync($scan) : null,
			type: type,
			size: st.size,
			mode: mode,
			nlink: st.nlink,
			uid: st.uid,
			gid: st.gid,
			dev: st.dev,
			ino: st.ino,
			atime: moment(st.atime).format(config.timeFormat),
			mtime: moment(st.mtime).format(config.timeFormat),
			ctime: moment(st.ctime).format(config.timeFormat),
			birthtime: moment(st.birthtime).format(config.timeFormat)
		}
	}).then((body)=>{
		reTask.ok();
		reTask.log(type, $id, pid, mode.toString(8), $dir);
		reTask.next(false, false);
	}).catch((err)=>{
		reTask.error(type, $id, pid, mode.toString(8), $dir, err);
		reTask.next(false, err, $scan, $dir, name, dir, pid, $id, st);
	});
};
const statDocument = function($scan, $dir, name, dir, pid, $id, next) {
	fs.lstat($scan, (err, st)=>{
		if(err) {
			next(err);
			return;
		}
		
		reTask.add(false, $scan, $dir, name, dir, pid, $id, st);
		
		if(st.isDirectory()) {
			fs.access($scan, fs.constants.R_OK, (err)=>{
				if(err) {
					reTask.error('ACCESS', $id, pid, (st.mode & 07777).toString(8), $dir, err);
				} else {
					reTask.add(true, $scan, $dir, $id);
				}
				
				next();
			});
		} else {
			next();
		}
	}); // fs.stat
};
const makeDocument = function(scan, dir, pid) {
	if(pid == 0) {
		let dirs = Object.keys(scan);
		const next = function(err) {
			if(err || !dirs.length) {
				reTask.next(true, err);
				return;
			}
			
			let k = dirs.shift();
			statDocument(scan[k], dir + k, k, dir, pid, reTask.genId(), next);
		};
		next();
	} else {
		fs.readdir(scan, (err, files)=>{
			if(err) {
				reTask.next(true, err);
				return;
			}
			
			const next = function(err) {
				if(err || !files.length) {
					reTask.next(true, err);
					return;
				}
				
				let name = files.shift();
				statDocument(path.join(scan, name), path.join(dir, name), name, dir, pid, reTask.genId(), next);
			};
			
			next();
		}); // fs.readdir
	}
};
const newDocument = function(scans, res) {
	Object.keys(scans).forEach((k)=>{
		if(k in scanDirs || k in config.scanDirs) {
			reTask.error('EXISTS', k, scans[k]);
			delete scans[k];
		} else {
			scanDirs[k] = scans[k];
		}
	});
	saveScans();
	if(reTask.running) {
		reTask.add(true, scans, '@', 0);
	} else {
		client.search({
			index: config.index,
			body: {
				aggs: {
					maxid: {
						max: {
							field: 'id'
						}
					}
				}
			}
		}).then(({body})=>{
			reTask.init(res);
			reTask.setId(body.aggregations.maxid.value);
			reTask.add(true, scans, '@', 0);
		}).catch(({body})=>{
			reTask.error('MAXID', body);
			
			if(!res) return;
			
			res.status(body.status);
			res.json(body.error);
		});
	}
};
const makeIndex = function() {
	client.indices.create({
		index: config.index,
		body: {
			settings: {
				number_of_shards: 3,
				number_of_replicas: 0
			},
			mappings: {
				properties: {
					id: {type:'long'},
					pid: {type:'long'},
					name: {type:'text',fielddata:true},
					path: {type:'text',fielddata:true},
					link: {type:'text',fielddata:true},
					type: {type:'text',fielddata:true},
					size: {type:'long'},
					mode: {type:'long'},
					nlink: {type:'long'},
					uid: {type:'long'},
					gid: {type:'long'},
					dev: {type:'long'},
					ino: {type:'long'},
					atime: {type:'text',fielddata:true},
					mtime: {type:'text',fielddata:true},
					ctime: {type:'text',fielddata:true},
					birthtime: {type:'text',fielddata:true}
				}
			}
		}
	}).then(({body})=>{
		if(!body.acknowledged || !body.shards_acknowledged) {
			reTask.error('create index error', body);
			reTask.next(null, body);
		} else {
			reTask.add(true, config.scanDirs, '@', 0);
		}
	}).catch((err)=>{
		reTask.next(null, err);
	});
};
const deleteIndex = function(res) {
	if(reTask.init(res)) return;
	
	client.indices.delete({index:config.index}).then((body)=>{
		makeIndex();
	}).catch((err)=>{
		makeIndex();
	});
};
const scanDirs = {};
const saveScans = function() {
	fs.writeFile(config.saveFile, JSON.stringify(scanDirs, null, 4), (err)=>{
		if(err) console.error('SAVEFILE', err);
	});
};
try {
	let scans = require(config.saveFile);
	Object.keys(scans).forEach((k)=>{
		scanDirs[k] = scans[k];
		config.scanDirs[k] = scans[k];
	});
	console.log('Loaded elastic.json');
} catch(e) {
	console.log('No found elastic.json');
}

module.exports = {
	client: client,
	stop: function(req, res) {
		if(reTask.stoping) {
			res.json('stoping');
		} else if(reTask.running) {
			reTask.next(null, new Error('stoping'));
			res.json('stoping');
		} else {
			res.json('Not start');
		}
	},
	ws: function(ws, req) {
		var id;
		do {
			id = parseInt(Math.random() * 1000);
		} while(id in reTask.ws);
		
		reTask.ws[id] = ws;
		reTask.nws++;
		
		console.log('ws connected - ' + id + ' - ' + moment(Date.now()).format(config.timeFormat));
		ws.on('message', function(msg) {
			if(msg === 'stop') {
				if(!reTask.stoping && reTask.running) {
					reTask.next(null, new Error('stopped'));
				}
			} else if(msg === 'remake') {
				ws.send(reTask.running ? '"Running ..."' : '"Runned"');
				
				deleteIndex(false);
			} else if(msg.indexOf('\t') >= 0) {
				let scan = msg.split('\t');
				let scans = {};
				scans[scan[0]] = scan[1];
				
				newDocument(scans, false);
			}
			
			console.log('ws', msg);
		});
		ws.on('close', function() {
			console.log('ws disconnected - ' + id + ' - ' + moment(Date.now()).format(config.timeFormat));
			
			reTask.nws--;
			delete reTask.ws[id];
		});
	},
	progress: function(req, res) {
		if(req.query.running !== 'true') {
			reTask.res = false;
		}
		res.json(reTask.data());
	},
	make: function(req, res) {
		if(Object.keys(req.body).length) {
			newDocument(req.body, res);
		} else {
			deleteIndex(res);
		}
	},
	search: function(req, res) {
		if(config.searchCount) {
			client.count({
				index: config.index,
				body: {
					query: req.body.query
				}
			}).then(({body})=>{
				var count = body.count;
				if(req.body.from > 0 && req.body.from >= count) { // fix from >= count of question.
					let pages = Math.max(1, Math.ceil(count/req.body.size));
					req.body.from = (pages - 1) * req.body.size;
				}
				client.search({
					index: config.index,
					body: req.body
				}).then(({body})=>{
					res.json({
						hits: body.hits.hits,
						total: {
							value:count,
							relation:'eq'
						},
						aggs: body.aggregations.types.buckets
					});
				}).catch(({body})=>{
					res.status(body.status);
					res.json(body.error);
				});
			}).catch(({body})=>{
				res.status(body.status);
				res.json(body.error);
			});
		} else {
			client.search({
				index: config.index,
				body: req.body
			}).then(({body})=>{
				res.json({
					hits: body.hits.hits,
					total: body.hits.total,
					aggs: body.aggregations.types.buckets
				});
			}).catch(({body})=>{
				res.status(body.status);
				res.json(body.error);
			});
		}
	}
};
