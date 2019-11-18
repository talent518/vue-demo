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
	tasks: {
		dirs: [],
		files: []
	},
	runs: 0,
	time: 0,
	status: 0,
	err: false,
	lines: [],
	log(...args) {
		this.lines.push(args.join(' '));
		if(this.lines.length>config.lines) this.lines.shift();
	},
	genId() {
		return ++this.id;
	},
	ok() {
		return ++this.files;
	},
	init(res) {
		if(this.running) {
			res.json('Making document ...');
			return true;
		}
		
		this.running = true;
		this.id = 0;
		this.files = 0;
		this.tasks.dirs.splice(0);
		this.tasks.files.splice(0);
		this.runs = 0;
		this.time = Date.now();
		this.res = res;
		this.status = 0;
		this.err = false;
	},
	add(isDir, ...args) {
		if(this.running === false) { // ended skip
		} else if(this.runs < config.tasks) {
			++this.runs;
			(isDir?makeDocument:createDocument).apply(null, args);
		} else {
			if(isDir)
				this.tasks.dirs.push(args);
			else
				this.tasks.files.push(args);
		}
	},
	next(err) {
		if(this.running === false) { // ended skip
		} else if(err) { // catch completed and response
			if(err.body) {
				console.error('ERROR.end', err.body.error, err);
				
				this.status = (err.body.status || 500);
				this.err = (err.body.error.reason || err.body.error.message || err.message);
			} else {
				console.error('ERROR.end', err.error, err);
				
				this.status = (err.status || 500);
				this.err = err.message;
			}
			
			if(this.res) {
				this.res.status(this.status);
				this.res.json(this.err);
			}
			
			this.running = false;
			this.tasks.dirs.splice(0);
			this.tasks.files.splice(0);
		} else if(this.tasks.files.length) {
			createDocument.apply(null, this.tasks.files.pop());
		} else if(this.tasks.dirs.length) {
			makeDocument.apply(null, this.tasks.dirs.pop());
		} else if(--this.runs) { // running ...
		} else { // completed and response
			console.log('make index complated, scaned to ' + this.files + ' files or directory');
			
			this.status = 200;
			if(this.res) {
				this.res.json(this.files);
			}
			
			this.running = false;
			this.tasks.dirs.splice(0);
			this.tasks.files.splice(0);
		}
	}
};
const createDocument = function($scan, $dir, name, dir, pid, $id) {
	if(reTask.running === false) return;
	
	fs.lstat($scan, (err, st)=>{
		if(err) {
			reTask.next(pid === 0 ? err : false);
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

			console.info(type, $id, pid, mode.toString(8), $dir);
			reTask.log(type, $id, pid, mode.toString(8), $dir);
			
			reTask.ok();
			if(st.isDirectory()) {
				fs.access($scan, fs.constants.R_OK, (err)=>{
					if(err) {
						console.error('access directory error', err);
					} else {
						reTask.add(true, $scan, $dir, $id);
					}
					
					reTask.next(false);
				});
			} else {
				reTask.next(false);
			}
		}).catch((err)=>{
			console.error('create document error', $id, pid, type, mode.toString(8), $dir);
			
			reTask.next(err);
		});
	}); // fs.stat
}
const makeDocument = function(scan, dir, pid) {
	if(reTask.running === false) return;
	
	fs.readdir(scan, (err, files)=>{
		if(err) {
			reTask.next(err);
			return;
		}
		if(reTask.running === false) return;
		
		files.forEach(function(name) {
			reTask.add(false, path.join(scan, name), path.join(dir, name), name, dir, pid, reTask.genId());
		}); // files.forEach
		
		reTask.next(false);
	}); // fs.readdir
}
const makeIndex = function(res) {
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
			console.error('create index error', body);
			
			res.json(body);
		} else {
			Object.keys(config.scanDirs).forEach((k)=>{
				reTask.add(false, config.scanDirs[k], '@' + k, k, '@', 0, reTask.genId());
			});
		}
	}).catch((err)=>{
		console.log(err);
		
		if(err.body) {
			res.status(err.body.status||500);
			res.json(err.body.error);
		} else {
			res.status(err.status||500)
			res.json(err.message||err);
		}
	});
};

module.exports = {
	client: client,
	progress: function(req, res) {
		if(req.query.running !== 'true') {
			reTask.res = false;
		}
		res.json({
			running: reTask.running,
			scans: reTask.files,
			dirs: reTask.tasks.dirs.length,
			files: reTask.tasks.files.length,
			runs: reTask.runs,
			seconds: reTask.running ? (Date.now() - reTask.time) / 1000 : 0,
			err: reTask.err,
			lines: reTask.lines
		});
	},
	make: function(req, res) {
		if(reTask.init(res)) return;

		client.indices.delete({index:config.index}).then((body)=>{
			makeIndex(res);
		}).catch((err)=>{
			makeIndex(res);
		});
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