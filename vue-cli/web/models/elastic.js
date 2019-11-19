const os = require('os');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const config = require('../config.elastic');

const { Client } = require('@elastic/elasticsearch');
const client = new Client(config.elastic);

const reTask = {
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
	log(...args) {
		let str = '[' + moment(Date.now()).format(config.timeFormat) + '] ' + args.join(' ');
		
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
		let str = '[' + moment(Date.now()).format(config.timeFormat) + '] ' + args.join(' ');
		
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
		
		this.running = true;
		this.timer = setInterval(this._interval.bind(this), config.interval);
		this.id = 0;
		this.files = 0;
		this.qdirs.splice(0);
		this.qfiles.splice(0);
		this.runs = 0;
		this.rdirs = 0;
		this.rfiles = 0;
		this.time = Date.now();
		this.res = res;
		this.status = 0;
		this.err = false;
		this.lines.splice(0);
	},
	add(isDir, ...args) {
		if(this.running === false) { // ended skip
		} else if(this.runs < config.tasks) {
			++this.runs;
			if(isDir) {
				++this.rdirs;
				makeDocument(...args);
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
	next(isDir, err) {
		if(this.running === false) { // ended skip
			return;
		}
		
		if(typeof(isDir) !== 'boolean') {
		} else if(isDir) {
			--this.rdirs;
		} else {
			--this.rfiles;
		}
		
		if(err) { // catch completed and response
			if(err.body) {
				this.error('ERROR.end', err.body.error, err);
				
				this.status = (err.body.status || 500);
				this.err = (err.body.error.reason || err.body.error.message || err.message);
			} else {
				this.error('ERROR.end', err.error, err);
				
				this.status = (err.status || 500);
				this.err = err.message;
			}
			
			if(this.res) {
				this.res.status(this.status);
				this.res.json(this.err);
			}
			
			this.send('Error: ' + this.err);
		} else if(this.qfiles.length) {
			let args = this.qfiles.pop();
			++this.rfiles;
			createDocument(...args);
			return;
		} else if(this.qdirs.length) {
			let args = this.qdirs.pop();
			++this.rdirs;
			makeDocument(...args);
			return;
		} else if(--this.runs) { // running ...
			return;
		} else { // completed and response
			this.status = 200;
			if(this.res) {
				this.res.json(this.files);
			}
			this.send('Completed');
		}
		
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
		
		clearInterval(this.timer);
		this.timer = 0;
		this.time = (Date.now() - this.time) / 1000;
		this.running = false;
		
		this.log('Completed, ' + this.files + ' files, ' + this.time + ' seconds');
		if(this.err) {
			this.error(this.files, this.time, this.qdirs, this.qfiles, this.rdirs, this.rfiles, this.err);
		}
		
		this.qdirs.splice(0);
		this.qfiles.splice(0);
		this._interval();
	}
};
const createDocument = function($scan, $dir, name, dir, pid, $id) {
	if(reTask.running === false) return;
	
	fs.lstat($scan, (err, st)=>{
		if(err) {
			reTask.next(false, pid === 0 ? err : false);
			return;
		}
		if(reTask.running === false) return;
		
		let type = 'Unknown';
		if(st.isFile()) {
			type = 'REG';
		} else if(st.isDirectory()) {
			type = 'DIR';
		} else if(st.isBlockDevice()) {
			type = 'BLK';
		} else if(st.isCharacterDevice()) {
			type = 'CHR';
		} else if(st.isFIFO()) {
			type = 'FIFO';
		} else if(st.isSocket()) {
			type = 'SOCK';
		} else if(st.isSymbolicLink()) {
			type = 'LNK';
		}
		var mode = (st.mode & 07777);
		client.create({
			id: $id,
			index: config.index,
			body: {
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
			if(reTask.running === false) return;

			reTask.ok();
			if(st.isDirectory()) {
				fs.access($scan, fs.constants.R_OK, (err)=>{
					if(err) {
						reTask.error('access directory error', $id, pid, mode.toString(8), $dir, err);
						reTask.log('ACCESS', $id, pid, mode.toString(8), $dir);
					} else {
						reTask.log(type, $id, pid, mode.toString(8), $dir);
						reTask.add(true, $scan, $dir, $id);
					}
					
					reTask.next(false, false);
				});
			} else {
				reTask.log(type, $id, pid, mode.toString(8), $dir);
				reTask.next(false, false);
			}
		}).catch((err)=>{
			if(reTask.running === false) return;
			
			reTask.error('create document error', $id, pid, type, mode.toString(8), $dir, err);
			reTask.next(false, err);
		});
	}); // fs.stat
}
const makeDocument = function(scan, dir, pid) {
	if(reTask.running === false) return;
	
	fs.readdir(scan, (err, files)=>{
		if(err) {
			reTask.next(true, err);
			return;
		}
		if(reTask.running === false) return;
		
		files.forEach((name)=>{
			reTask.add(false, path.join(scan, name), path.join(dir, name), name, dir, pid, reTask.genId());
		}); // files.forEach
		
		reTask.next(true, false);
	}); // fs.readdir
}
const makeIndex = function() {
	client.indices.create({
		index: config.index,
		body: {
			settings: {
				number_of_shards: 3,
				number_of_replicas: 1
			},
			mappings: {
				properties: {
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
			Object.keys(config.scanDirs).forEach((k)=>{
				reTask.add(false, config.scanDirs[k], '@' + k, k, '@', 0, reTask.genId());
			});
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
}

module.exports = {
	client: client,
	stop: function(req, res) {
		if(reTask.running) {
			reTask.next(null, new Error('stopped'));
			res.json('stopped');
		} else {
			res.json('Not start');
		}
	},
	ws: function(ws, req) {
		var id;
		do {
			id = (Math.random() * 1000);
		} while(id in reTask.ws);
		
		reTask.ws[id] = ws;
		reTask.nws++;
		
		ws.send(reTask.running ? '"Running ..."' : '"Runned"');
		
		deleteIndex(false);
		
		console.log('ws connected - ' + id + ' - ' + moment(Date.now()).format(config.timeFormat));
		ws.on('message', function(msg) {
			if(msg === 'stop') {
				reTask.next(null, new Error('stopped'));
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
		deleteIndex(res);
	},
	search: function(req, res) {
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
	}
};
