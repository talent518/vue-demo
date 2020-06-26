<template>
<div class="m-elastic-search">
	<h1>Using ElasticSearch to index and search files</h1>
	<div class="bar">
		<button class="reindex" @click="confirmReindex=true">Reindex</button>
		<select v-model="type" @change="search">
			<option v-for="(txt,val) in types" :value="val">{{txt}}</option>
		</select>
		<button class="search" @click="search">Search</button>
		<input type="text" v-model="keyword" @keyup.enter="search" />
	</div>
	<p class="options">
		<label :class="{highlight:highlight}"><input type="checkbox" v-model="highlight"/> Highlight</label>
		<label :class="{wildcard:wildcard}"><input type="checkbox" v-model="wildcard"/> Wildcard</label>
		<label :class="{match:match}"><input type="checkbox" v-model="match"/> match</label>
		<label :class="{fuzzy:fuzzy}"><input type="checkbox" v-model="fuzzy"/> fuzzy</label>
		<label :class="{match_phrase:match_phrase}"><input type="checkbox" v-model="match_phrase"/> <span title="match_phrase">phrase</span></label>
		<label :class="{path:match_name}"><input type="checkbox" v-model="match_name"/> name</label>
		<label :class="{path:match_path}"><input type="checkbox" v-model="match_path"/> path</label>
		<button @click="reverseSort">Reverse asc/desc</button>
		<button @click="sorts.reverse();search()">Reverse order</button>
		<span>Total is <b>{{pages}}</b> pages, current page is <b>{{page+1}}</b>. Switch:</span>
		<select v-model="page" @change="search">
			<option v-for="i in pages" :selected="i==page" :value="i-1">{{i}}</option>
		</select>
	</p>
	<p class="warn">Press down <b>Ctrl</b> key and click table head to add order column, press down <b>Shift</b> key and click table head to only in between asc and desc for switch.</p>
	<p v-html="message"></p>
	<table>
		<thead>
			<tr>
				<th :class="'name '+sort['name.raw']" @click="changeSort('name.raw',$event)">Name</th>
				<th :class="'path '+sort['path.raw']" @click="changeSort('path.raw',$event)">Path</th>
				<th :class="'link '+sort['link.raw']" @click="changeSort('link.raw',$event)">Link</th>
				<th :class="'type '+sort.type" @click="changeSort('type',$event)">Type</th>
				<th :class="'num size '+sort.size" @click="changeSort('size',$event)">Size</th>
				<th :class="'num mode '+sort.mode" @click="changeSort('mode',$event)">Mode</th>
				<th :class="'num nlink '+sort.nlink" @click="changeSort('nlink',$event)">Links</th>
				<th :class="'num uid '+sort.uid" @click="changeSort('uid',$event)">Uid</th>
				<th :class="'num gid '+sort.gid" @click="changeSort('gid',$event)">Gid</th>
				<th :class="'num dev '+sort.dev" @click="changeSort('dev',$event)">Device no</th>
				<th :class="'num ino '+sort.ino" @click="changeSort('ino',$event)">Inode</th>
				<th :class="'time atime '+sort['atime.raw']" @click="changeSort('atime.raw',$event)">Access time</th>
				<th :class="'time mtime '+sort['mtime.raw']" @click="changeSort('mtime.raw',$event)">Modify time</th>
				<th :class="'time ctime '+sort['ctime.raw']" @click="changeSort('ctime.raw',$event)">Create time</th>
				<th :class="'time birthtime '+sort['birthtime.raw']" @click="changeSort('birthtime.raw',$event)">Birth time</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="f in files" :fid="f._id" :pid="f._source.pid">
				<td class="name" v-html="highlight&&f.highlight&&f.highlight.name?f.highlight.name.join(''):f._source.name" :title="f._source.name"></td>
				<td class="path" v-html="match_path&&highlight&&f.highlight&&f.highlight.path?f.highlight.path.join(''):f._source.path" :title="f._source.path"></td>
				<td class="link" v-html="f._source.link"></td>
				<td class="type" v-html="f._source.type" :title="types[f._source.type]"></td>
				<td class="num size" v-html="formatSize(f._source.size)" :title="f._source.size"></td>
				<td class="num mode" v-html="f._source.mode.toString(8)" :title="f._source.mode"></td>
				<td class="num nlink" v-html="f._source.nlink"></td>
				<td class="num uid" v-html="f._source.uid"></td>
				<td class="num gid" v-html="f._source.gid"></td>
				<td class="num dev" v-html="f._source.dev"></td>
				<td class="num ino" v-html="f._source.ino"></td>
				<td class="time atime" v-html="f._source.atime"></td>
				<td class="time mtime" v-html="f._source.mtime"></td>
				<td class="time ctime" v-html="f._source.ctime"></td>
				<td class="time birthtime" v-html="f._source.birthtime"></td>
			</tr>
		</tbody>
	</table>
	<div :class="{load:true,loading:loading,loadtxt:loadtxt,noloadtxt:!loadtxt}"><span class="msg message" v-html="loadtxt"></span><span class="msg shadow" v-html="loadtxt"></span><span class="anim gradient">↺</span><span class="anim shadow">↺</span><span ref="lines" class="lines" v-show="loadtxt"></span><button v-if="loadtxt" @click="stop">Stop index</button><button v-if="loadtxt" @click="close" class="close">Close</button></div>
	<div :class="{confirmed:true,show:confirmReindex}"><div><h1>Reindex confirm</h1><p class="message">Are you sure you want to rebuild the file and directory indexes?</p><p class="scan"><input type="text" v-model="scanName" class="name" placeholder="Please input scan of name"/><input type="text" v-model="scanPath" class="path" placeholder="Please input scan of path"/></p><p class="btn"><button @click="index" class="confirm">Confirm</button><button @click="ws" class="confirm">WS</button><button @click="confirmReindex=false" class="cancel">Cancel</button></p></div></div>
</div>
</template>

<script>
const ElasticSearch = {
	keyword: '',
	files: [],
	total: {
		value: 0,
		relation: 'eq'
	},
	type: 'all',
	types: {
		all: 'All file',
		REG: 'Regular file',
		DIR: 'Directory',
		CHR: 'Character device',
		BLK: 'Block device',
		FIFO: 'FIFO',
		LNK: 'Symbolic link',
		SOCK: 'Socket'
	},
	loading: false,
	loadtxt: '',
	message: '',
	sort: {
		name: 'asc',
		path: 'desc',
		link: '',
		type: '',
		size: '',
		mode: '',
		nlink: '',
		uid: '',
		gid: '',
		dev: '',
		ino: '',
		atime: '',
		mtime: '',
		ctime: '',
		birthtime: ''
	},
	sorts: ['name','path'],
	highlight: true,
	wildcard: true,
	match: true,
	fuzzy: true,
	match_phrase: true,
	match_name: true,
	match_path: false,
	confirmReindex: false,
	page: 0,
	pages: 1,
	timer: 0,
	$ws: false,
	scanName: '',
	scanPath: ''
};
const PSIZE = 100;
const Units = ['','K','M','G','T'];
const Sizes = [];
for(let i=0; i<5; i++) {
	Sizes.push(Math.pow(1024,i));
}

export default {
	name: 'ElasticSearch',
	data() {
		return ElasticSearch;
	},
	methods: {
		formatSize(size) {
			if(size <=0 ) return 0;
			
			let i = Math.floor(Math.log(size) / Math.log(1024));
			if(i>=Units.length)
				i = Units.length - 1;
			let n = size / Sizes[i];
			return n.toFixed(2).replace(/(\.[0]+|[0]+)$/g, '') + ' ' + Units[i];
		},
		changeSort(key, $e) {
			if(!$e.ctrlKey) {
				for(let k in this.sort) {
					if(k !== key)
						this.sort[k] = '';
				}
				this.sorts.splice(0);
			}
			let sort = this.sort[key];
			if(sort === 'asc') {
				this.sort[key] = 'desc';
				if(this.sorts.indexOf(key) < 0) this.sorts.push(key);
			} else if(!$e.shiftKey && sort === 'desc') {
				this.sort[key] = '';
				let i = this.sorts.indexOf(key);
				if(i >= 0)
					this.sorts.splice(i,1);
			} else {
				this.sort[key] = 'asc';
				if(this.sorts.indexOf(key) < 0) this.sorts.push(key);
			}
			this.search();
		},
		reverseSort() {
			for(let k in this.sort) {
				let v = this.sort[k];
				if(v === 'asc')
					this.sort[k] = 'desc';
				else if(v === 'desc')
					this.sort[k] = 'asc';
			}
			if(this.sorts.length) this.search();
		},
		setLoading(b) {
			if(b) {
				if(this.loading) return;
				
				this.loading = true;
			} else {
				if(!this.loading) return;
				
				this.loading = false;
				this.loadtxt = '';
			}
		},
		search() {
			this.message = 'Search ...';
			this.setLoading(true);
			let params = {from:this.page*PSIZE, size:PSIZE, query:{bool:{must:[],should:[]}}, sort:[]};
			if(this.type !== 'all') {
				params.query.bool.must.push({
					term:{
						type: this.type.toLowerCase()
					}
				});
			}
			if(this.keyword) {
				if(this.wildcard) {
					if(this.match_name) {
						params.query.bool.should.push({
							wildcard: {
								name:this.keyword
							}
						});
					}
					if(this.match_path) {
						params.query.bool.should.push({
							wildcard: {
								path:this.keyword
							}
						});
					}
				}
				if(this.match) {
					if(this.match_name) {
						params.query.bool.should.push({
							match: {
								name:this.keyword
							}
						});
					}
					if(this.match_path) {
						params.query.bool.should.push({
							match: {
								path:this.keyword
							}
						});
					}
				}
				if(this.fuzzy) {
					if(this.match_name) {
						params.query.bool.should.push({
							fuzzy: {
								name:this.keyword
							}
						});
					}
					if(this.match_path) {
						params.query.bool.should.push({
							fuzzy: {
								path:this.keyword
							}
						});
					}
				}
				if(this.match_phrase) {
					if(this.match_name) {
						params.query.bool.should.push({
							match_phrase: {
								name:this.keyword
							}
						});
					}
					if(this.match_path) {
						params.query.bool.should.push({
							match_phrase: {
								path:this.keyword
							}
						});
					}
				}
				if(!params.query.bool.should.length) {
					params.query.bool.should.push({
						term: {
							name:this.keyword
						}
					});
					params.query.bool.should.push({
						term: {
							path:this.keyword
						}
					});
					params.query.bool.should.push({
						term: {
							link:this.keyword
						}
					});
					params.query.bool.should.push({
						multi_match: {
							query:this.keyword,
							fields:['name','path','atime','mtime','ctime','birthtime']
						}
					});
				}
			}
			params.aggs = {
				types: {
					terms: {
						field: 'type'
					}
				}
			};
			if(this.highlight) {
				params.highlight = {
					fields: {
						name: {}
					}
				};
				if(this.match_path) {
					params.highlight.fields.path = {};
				}
			}
			const orders = [];
			for(let i in this.sorts) {
				let k = this.sorts[i];
				let v = this.sort[k];
				
				let o = {};
				o[k] = {order: v};
				params.sort.push(o);
				orders.push(k + ' ' + v);
			}
			this.$http.put('/api/files', params).then(({body})=>{
				this.setLoading(false);
				this.files = body.hits;
				this.total = body.total;
				this.pages = Math.max(Math.ceil(this.total.value/PSIZE), 1);
				if(this.page >= this.pages) {
					this.page = this.pages - 1;
				}
				
				let aggs = [];
				body.aggs.forEach((v)=>{
					aggs.push('<b>' + v.doc_count + '</b> ' + v.key + 's');
				});
				
				this.message = 'Results is ' + this.total.relation + ' <b>' + this.total.value + '</b>' + (orders.length ? ', order by ' + orders.join(', ') : '') + (aggs.length ? ', group count is ' + aggs.join(', ') : '');
			}).catch(({ok,status,message,body})=>{
				if(ok === false && status === 0) {
					this.message = 'Request timeout or reject';
				} else {
					this.message = body && (body.reason || body) || message || 'Error';
				}
				
				this.setLoading(false);
			});
		},
		index() {
			this.confirmReindex = false;
			this.message = this.loadtxt = 'Reindexing ...';
			this.setLoading(true);
			this.$refs.lines.innerHTML = '';
			var progress = false, running = true;
			this.timer = setInterval(function() {
				if(progress) return;
				progress = true;
				this.$http.get('api/files?running=' + running).then(({body})=>{
					progress = false;
					let b = body.running;
					this.setLoading(b);
					if(b) {
						this.loadtxt = 'Scaned to <b>' + body.scans + '</b> files or directories.<br/>Running state is <b>' + body.runs + '</b> runs, <b>' + body.rdirs + '</b> dirs, <b>' + body.rfiles + '</b> files, <b>' + body.seconds + '</b> seconds.<br/>In the queue <b>' + body.qdirs + '</b> dirs, <b>' + body.qfiles + '</b> files';
						this.message = 'Scaned to <b>' + body.scans + '</b> files or directories. In the queue <b>' + body.qdirs + '</b> dirs, <b>' + body.qfiles + '</b> files. Running state is <b>' + body.runs + '</b> runs, <b>' + body.rdirs + '</b> dirs, <b>' + body.rfiles + '</b> files, <b>' + body.seconds + '</b> seconds';
					} else {
						clearInterval(this.timer);
						this.message = 'Scaned to <b>' + body.scans + '</b> files or directories, <b>' + body.seconds + '</b> seconds' + (body.err ? ', Error: ' + body.err : '');
					}
					this.$refs.lines.innerHTML = '<p>' + body.lines.slice(-50).join('</p><p>') + '</p>';
				}).catch(({ok,status,message,body})=>{
					if(ok === false && status === 0) {
						this.message = 'Request timeout or reject';
					} else {
						this.message = body && (body.reason || body) || message || 'Error';
					}
					
					clearInterval(this.timer);
					this.setLoading(false);
				});
			}.bind(this),500);
			let scan = {};
			if(this.scanName && this.scanPath) {
				scan[this.scanName] = this.scanPath;
				this.scanName = this.scanPath = '';
			}
			this.$http.post('api/files', scan, {timeout:-1}).then(({body})=>{
				running = false;
				
				if(typeof(body) === 'string') {
					this.message = body;
					return;
				}
				
				clearInterval(this.timer);
				this.setLoading(false);
				this.message = 'Scaned to <b>' + body + '</b> files or directories';
			}).catch(({ok,status,message,body})=>{
				running = false;
				
				if(ok === false && status === 0) {
					this.message = 'Request timeout or reject';
					return;
				} else {
					this.message = body && (body.reason || body) || message || 'Error';
				}
				
				clearInterval(this.timer);
				this.setLoading(false);
			});
		},
		stop() {
			if(this.$ws) {
				this.$ws.send('stop');
				return;
			}
			this.$http.delete('api/files').then(({body})=>{
				this.message = body;
			}).catch(({ok,status,message,body})=>{
				if(ok === false && status === 0) {
					this.message = 'Request timeout or reject';
				} else {
					this.message = body && (body.reason || body) || message || 'Error';
				}
			});
		},
		ws() {
			this.confirmReindex = false;
			this.message = 'Reindexing ...';
			this.setLoading(true);
			this.$refs.lines.innerHTML = '';
			this.$ws = new WebSocket('ws://' + location.host + '/api/files');
			this.$ws.addEventListener('open', ()=>{
			    console.log('socket is open');
			    
			    if(this.scanName && this.scanPath) {
			    	this.$ws.send(this.scanName + '\t' + this.scanPath);
			    	this.scanName = this.scanPath = '';
			    } else {
			    	this.$ws.send('remake');
			    }
			});
			
			let lines = [];
			this.$ws.addEventListener('message', ({data}) => {
				let body = JSON.parse(data);
				
				if(typeof(body) === 'string') {
					this.$refs.lines.innerHTML = body;
					// let p = document.createElement('p');
					// p.innerHTML = body;
					// lines.push(p);
					// this.$refs.lines.appendChild(p);
					// if(lines.length > 50) {
					// 	this.$refs.lines.removeChild(lines.shift());
					// }
				} else {
					if(body.running) {
						this.loadtxt = 'Scaned to <b>' + body.scans + '</b> files or directories.<br/>Running state is <b>' + body.runs + '</b> runs, <b>' + body.rdirs + '</b> dirs, <b>' + body.rfiles + '</b> files, <b>' + body.seconds + '</b> seconds.<br/>In the queue <b>' + body.qdirs + '</b> dirs, <b>' + body.qfiles + '</b> files<br/>WebSocket';
						this.message = 'Scaned to <b>' + body.scans + '</b> files or directories. In the queue <b>' + body.qdirs + '</b> dirs, <b>' + body.qfiles + '</b> files. Running state is <b>' + body.runs + '</b> runs, <b>' + body.rdirs + '</b> dirs, <b>' + body.rfiles + '</b> files, <b>' + body.seconds + '</b> seconds';
					} else {
						this.message = 'Scaned to <b>' + body.scans + '</b> files or directories, <b>' + body.seconds + '</b> seconds' + (body.err ? ', Error: ' + body.err : '');
						this.loadtxt = '';
						this.$ws.close();
						this.$ws = null;
					}
				}
			});
			this.$ws.addEventListener('close', () => {
			    console.log('socket is close');
			    this.setLoading(false);
			});
			console.log(this.$ws);
		},
		close() {
			if(this.$ws) {
				this.$ws.close();
			} else {
				this.setLoading(false);
				clearInterval(this.timer);
				this.loadtxt = '';
			}
		}
	},
	watch: {
		highlight(){
			this.search();
		},
		wildcard(){
			this.search();
		},
		match(){
			this.search();
		},
		fuzzy(){
			this.search();
		},
		match_phrase(){
			this.search();
		},
		match_name() {
			this.search();
		},
		match_path() {
			this.search();
		}
	},
	created() {
		this.loading = false;
	},
	mounted() {
		this.search();
	},
	destroyed() {
		clearInterval(this.timer);
		
		if(this.$ws) this.$ws.close();
		this.loading = false;
		this.timer = 0;
	}
};
</script>

<style>
.m-elastic-search {padding:10px;}

.m-elastic-search>h1{margin-bottom:10px;}

.m-elastic-search>.bar{margin-left:90px;margin-right:300px;margin-bottom:10px;}
.m-elastic-search>.bar>*{margin:0;padding:0;height:35px;line-height:35px;outline:none;box-sizing:border-box;border-radius:3px;border:1px #999 solid;font-size:16px;}
.m-elastic-search>.bar>button:focus{font-weight:bold;}
.m-elastic-search>.bar>button{width:80px;cursor:pointer;}
.m-elastic-search>.bar>button.reindex{float:right;margin-right:-300px;}
.m-elastic-search>.bar>button.search{float:left;margin-left:-90px;}
.m-elastic-search>.bar>select{float:right;width:200px;margin-right:-210px;}
.m-elastic-search>.bar>input{width:100%;padding:0 5px;}

.m-elastic-search>p{margin:0 0 10px;white-space:pre;}
.m-elastic-search>p.warn{float:right;}
.m-elastic-search>p.warn:before{content:'Warning: ';font-weight:bold;}
.m-elastic-search>p.options:before{content:'Options:';font-weight:bold;margin-right:10px;}
.m-elastic-search>p.options>*{height:25px;line-height:25px;}
.m-elastic-search>p.options>label{margin-right:10px;cursor:pointer;}
.m-elastic-search>p.options>label>input{margin:0;vertical-align:middle;cursor:pointer;}
.m-elastic-search>p.options>label.highlight{color:#F60;}
.m-elastic-search>p.options>button{margin-right:10px;padding:0 5px;border:1px #999 solid;border-radius:3px;background:#ccc;cursor:pointer;outline:none;}
.m-elastic-search>p.options>button:focus{font-weight:bold;}
.m-elastic-search>p.options>select{border:1px #999 solid;border-radius:3px;background:white;}

.m-elastic-search table{width:100%;}
.m-elastic-search table,.m-elastic-search th,.m-elastic-search td{border:1px #ccc solid;border-collapse:collapse;padding:5px;}
.m-elastic-search th{cursor:pointer;white-space:nowrap;}
.m-elastic-search th:after{content:'↕';color:gray;font-size:bold;margin-left:5px;}
.m-elastic-search th.asc:after{content:'↥';color:blue;}
.m-elastic-search th.desc:after{content:'↧';color:green;}
.m-elastic-search td.name,.m-elastic-search td.path,.m-elastic-search td.link{text-overflow:ellipsis;word-break:break-all;}
.m-elastic-search th.type,.m-elastic-search td.type{width:30px;white-space:nowrap;text-align:center;}
.m-elastic-search th.num,.m-elastic-search td.num{width:50px;white-space:nowrap;text-align:right;}
.m-elastic-search th.time,.m-elastic-search td.time{width:120px;white-space:nowrap;}
.m-elastic-search td>em{color:#c60;font-style:normal;font-weight:bold;}

.m-elastic-search>.load{display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:1;overflow:hidden;background:rgba(0,0,0,0.5);}
.m-elastic-search>.load>span{position:absolute;top:50%;left:50%;z-index:3;font-weight:bold;}
.m-elastic-search>.load>span.msg{left:0;width:100%;margin-top:0.3em;text-align:center;font-size:40px;line-height:1.5em;/* font-weight:normal; */}
.m-elastic-search>.load>span.msg.message{color:white;}
.m-elastic-search>.load>span.msg.shadow{z-index:1;padding:2px;color:#000;}
.m-elastic-search>.load>span.msg>b{color:#F60;}
.m-elastic-search>.load>span.msg.shadow>b{color:#333;}
.m-elastic-search>.load>span.anim{margin-top:-0.5em;margin-left:-0.5em;font-size:100px;animation: spin 0.6s linear infinite;}
.m-elastic-search>.load>span.anim.shadow{z-index:2;padding:2px;color:#ddd;/* color:rgba(0,0,0,0.6); */}
.m-elastic-search>.load>span.anim.gradient{background: -webkit-gradient(linear,left top,right bottom,from(#FF0000),to(#0000FF));-webkit-background-clip: text;-webkit-text-fill-color: transparent;}
.m-elastic-search>.load>span.lines{z-index:1;left:10px;top:auto;bottom:10px;border:1px #666 solid;border-radius:3px;padding:5px;background:rgba(0,0,0,.4);color:#fff;font-size:10px;line-height:14px;font-weight:normal;}
.m-elastic-search>.load>span.lines>p{margin:0;}
.m-elastic-search>.load>button{position:absolute;right:10px;bottom:10px;font-size:20px;padding:10px 1em;border:1px #999 solid;border-radius:5px;background:#ccc;color:#000;cursor:pointer;}
.m-elastic-search>.load>button.close{bottom:auto;top:10px;}
.m-elastic-search>.load.loadtxt>span.anim{margin-top:-1.3em;}
.m-elastic-search>.load.noloadtxt>span.anim{margin-top:-0.7em;}
.m-elastic-search>.load.noloadtxt>span.msg{margin-top:1em;}
.m-elastic-search>.load.noloadtxt>span.msg:after{content:'Loading...';}
.m-elastic-search>.loading{display:block;}

.m-elastic-search>.confirmed{display:none;position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);}
.m-elastic-search>.confirmed>div{display:inline-block;margin:auto;padding:25px;background:white;border:1px #999 solid;border-radius:5px;}
.m-elastic-search>.confirmed *{font-size:16px;}
.m-elastic-search>.confirmed p{margin:0;white-space:nowrap;}
.m-elastic-search>.confirmed p.message{margin:30px 0;}
.m-elastic-search>.confirmed p.scan{margin-right:8px;}
.m-elastic-search>.confirmed p.btn{margin-top:20px;text-align:center;}
.m-elastic-search>.confirmed button{margin:0;padding:0;width:80px;height:35px;line-height:35px;border-radius:3px;border:1px #999 solid;background:#ccc;cursor:pointer;outline:none;}
.m-elastic-search>.confirmed button:focus{font-weight:bold;}
.m-elastic-search>.confirmed button.confirm{margin-right:25px;}
.m-elastic-search>.confirmed button.cancel{border-radius:3px;border:1px #999 solid;background:green;color:white;}
.m-elastic-search>.confirmed input{display:block;width:100%;height:30px;padding:0 3px;border:1px #999 solid;border-radius:3px;line-height:30px;}
.m-elastic-search>.confirmed input.name{margin-bottom:20px;}
.m-elastic-search>.confirmed.show{display:flex;}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
