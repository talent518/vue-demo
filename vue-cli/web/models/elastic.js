const fs = require('fs');
const path = require('path');
const moment = require('moment');

const { Client } = require('@elastic/elasticsearch');
const client = new Client(require('../config.elastic'));

const SCANDIR = path.join(__dirname, '../../'), SCANROOT = '';
const FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TASKS = 100;
var ID = false, Files = false, Tasks = false, Taskings = false;
const initTask = function(res, next) {
	if(ID !== false || Files !== false || Tasks !== false || Taskings !== false) {
		res.json('Making document ...');
		return true;
	}
	
	ID = 0;
	Files = 0;
	Tasks = [];
	Taskings = 0;
};
const addTask = function(callback) {
	if(Tasks === false) { // ended skip
	} else if(Taskings < TASKS) {
		++Taskings;
		callback();
		// console.log('addTask', Tasks.length, Taskings);
	} else {
		Tasks.push(callback);
		// console.log('addTask', Tasks.length, Taskings);
	}
};
const nextTask = function(err, res, next) {
	if(Tasks === false) { // ended skip
	} else if(err) { // catch completed and response
		console.log(err);
		
		res.json(err.message);
		
		ID = Files = Tasks = Taskings = false;
	} else if(Tasks.length) {
		Tasks.pop()();
		// console.log('nextTask', Tasks.length, Taskings);
	} else if(--Taskings) { // running ...
		// console.log('nextTask', Tasks.length, Taskings);
	} else { // completed and response
		// console.log('make index complated');
		
		res.json(Files);
		
		ID = Files = Tasks = Taskings = false;
	}
};
const makeDocument = function(scan, dir, pid, res, next) {
	addTask(()=>{
		fs.readdir(scan, (err, files)=>{
			if(err) {
				nextTask(err, res, next);
				return;
			}
			if(Tasks === false) return;
			
			files.forEach(function(v,k) {
				var $scan = path.join(scan, v);
				var $dir = path.join(dir,v);
				
				addTask(()=>{
					fs.stat($scan, (err, st)=>{
						if(err) {
							nextTask(err, res, next);
							return;
						}
						if(Tasks === false) return;
						
						let type = 'Unknown';
						let id = ++ID;
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
						let mode = (st.mode & 07777);
						console.log(id, pid, $dir, type, mode.toString(8));
						client.create({
							id: id,
							index: 'vue-cli',
							body: {
								pid: pid,
								name: v,
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
								atime: moment(st.atime).format(FORMAT),
								mtime: moment(st.mtime).format(FORMAT),
								ctime: moment(st.ctime).format(FORMAT),
								birthtime: moment(st.birthtime).format(FORMAT)
							}
						}).then((body)=>{
							if(Files === false) return;
							
							Files++;
							if(st.isDirectory()) makeDocument($scan, $dir, id, res, next);
							nextTask(false, res, next);
						}).catch((err)=>{
							nextTask(err, res, next);
						});
					}); // fs.stat
				}); // addTask
			}); // files.forEach
			
			nextTask(false, res, next);
		}); // fs.readdir
	}); // addTask
}
const makeIndex = function(res, next) {
	client.indices.create({
		index: 'vue-cli',
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
	}).then((body)=>{
		makeDocument(SCANDIR, SCANROOT, 0, res, next);
	}).catch(({body})=>{
		res.status(body.status);
		res.json(body.error);
	});
};

module.exports = {
	client: client,
	progress: function(req, res, next) {
		res.json({files:Files, tasks:Tasks ? Tasks.length : 0, taskings:Taskings});
	},
	make: function(req, res, next) {
		if(initTask(res, next)) return;
		
		client.indices.delete({index:'vue-cli'}).then((body)=>{
			makeIndex(res, next);
		}).catch((err)=>{
			makeIndex(res, next);
		});
	},
	search: function(req, res, next) {
		client.count({
			index: 'vue-cli',
			body: {
				query: req.body.query
			}
		}).then(({body})=>{
			var count = body.count;
			
			client.search({
				index: 'vue-cli',
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