<template>
	<div class="m-tasks">
		<h1>My Tasks</h1>
		<input type="text" v-model="keyword" placeholder="Please input keyword!" />
		<p class="filter">
			<span @click="selectAll" :class="{actived:status.all && type.all && removed.all}">All</span>
			<span @click="selectStatus('unstart')" :class="{actived:status.unstart}" title="Status">Unstart</span>
			<span @click="selectStatus('running')" :class="{actived:status.running}" title="Status">Running</span>
			<span @click="selectStatus('completed')" :class="{actived:status.completed}" title="Status">Completed</span>
			<span @click="selectStatus('suspend')" :class="{actived:status.suspend}" title="Status">Suspend</span>
			<span @click="selectType('buy')" :class="{actived:type.buy}" title="Type">Buy</span>
			<span @click="selectType('recv')" :class="{actived:type.recv}" title="Type">Recv</span>
			<span @click="selectType('sell')" :class="{actived:type.sell}" title="Type">Sell</span>
			<span @click="selectType('sent')" :class="{actived:type.sent}" title="Type">Sent</span>
			<span @click="selectType('normal')" :class="{actived:type.normal}" title="Type">Normal</span>
			<span @click="selectSingle(removed,'deleted')" :class="{actived:removed.deleted}" title="Remove">Deleted</span>
			<span @click="selectSingle(removed,'undelete')" :class="{actived:removed.undelete}" title="Remove">Undelete</span>
		</p>
		<table>
			<thead>
				<tr>
					<th class="chk"><input type="checkbox" v-model="isSelectedAll" /></th>
					<th class="id">#</th>
					<th class="name">Name</th>
					<th class="status">Status</th>
					<th class="type">Type</th>
				</tr>
			</thead>
			<tbody id='j-tasks-tbody'>
				<tr v-for="(task,id) in tasks" v-if="filter(task)" :class="{deleted:task.removed}">
					<td class="chk"><input type="checkbox" :checked="task.checked" v-model="task.checked" /></td>
					<td class="id">{{id+1}}</td>
					<td class="name">{{task.name}}</td>
					<td class="status">{{task.status}}</td>
					<td class="type">{{task.type}}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr ref="noneData">
					<td colspan="5" style="text-align:center;">None data</td>
				</tr>
			</tfoot>
		</table>
		<button @click="deleteSelected"><template v-if="removed.all">Delete/Restore</template><template v-else-if="removed.deleted">Restore</template><template v-else>Delete</template> selected</button>
		&nbsp; - &nbsp;
		Show record count is <span id="j-tasks-shows"></span>
	</div>
</template>

<script>
function fillFalse() {
	for(let _ in arguments){
		let o = arguments[_];
		for(let k in o) {
			if(k !== 'all') o[k] = false;
		}
	}
}
function hasTrue(o, v) {
	for(let k in o) {
		if(k !== 'all' && o[k]) return true;
	}
	
	return false;
}

export default {
	name: 'Tasks',
	data() {
		let tasks = [
			{name:'Task01',status:'unstart',type:'buy',checked:false,removed:false,rnd:Math.random()},
			{name:'Task02',status:'unstart',type:'recv',checked:false,removed:false,rnd:Math.random()},
			{name:'Task03',status:'unstart',type:'sell',checked:false,removed:false,rnd:Math.random()},
			{name:'Task04',status:'unstart',type:'sent',checked:false,removed:false,rnd:Math.random()},
			{name:'Task05',status:'unstart',type:'normal',checked:false,removed:false,rnd:Math.random()},
			{name:'Task06',status:'running',type:'buy',checked:false,removed:false,rnd:Math.random()},
			{name:'Task07',status:'running',type:'recv',checked:false,removed:false,rnd:Math.random()},
			{name:'Task08',status:'running',type:'sell',checked:false,removed:false,rnd:Math.random()},
			{name:'Task09',status:'running',type:'sent',checked:false,removed:false,rnd:Math.random()},
			{name:'Task10',status:'running',type:'normal',checked:false,removed:false,rnd:Math.random()},
			{name:'Task11',status:'completed',type:'buy',checked:false,removed:false,rnd:Math.random()},
			{name:'Task12',status:'completed',type:'recv',checked:false,removed:false,rnd:Math.random()},
			{name:'Task13',status:'completed',type:'sell',checked:false,removed:false,rnd:Math.random()},
			{name:'Task14',status:'completed',type:'sent',checked:false,removed:false,rnd:Math.random()},
			{name:'Task15',status:'completed',type:'normal',checked:false,removed:false,rnd:Math.random()},
			{name:'Task16',status:'suspend',type:'buy',checked:false,removed:false,rnd:Math.random()},
			{name:'Task17',status:'suspend',type:'recv',checked:false,removed:false,rnd:Math.random()},
			{name:'Task18',status:'suspend',type:'sell',checked:false,removed:false,rnd:Math.random()},
			{name:'Task19',status:'suspend',type:'sent',checked:false,removed:false,rnd:Math.random()},
			{name:'Task20',status:'suspend',type:'normal',checked:false,removed:false,rnd:Math.random()},
		];
		tasks.sort(function(a,b) {
			if(a.rnd>b.rnd)
				return 1;
			else if(a.rnd == b.rnd)
				return 0;
			else
				return -1;
		});
		return {
			tasks,
			isSelectedAll: false,
			status: {all:true,unstart:false,running:false,completed:false,suspend:false},
			type: {all:true,buy:false,recv:false,sell:false,sent:false,normal:false},
			removed: {all:true,deleted:false,undelete:false},
			keyword: ''
		};
	},
	methods: {
		selectAll: function() {
			fillFalse(this.status,this.type,this.removed);
			this.status.all = this.type.all = this.removed.all = true;
		},
		selectStatus: function(status) {
			this.status[status] = !this.status[status];
			this.status.all = !hasTrue(this.status);
		},
		selectType: function(type) {
			this.type[type] = !this.type[type];
			this.type.all = !hasTrue(this.type);
		},
		selectSingle: function(option,key) {
			let val = option[key];
			fillFalse(option);
			option[key] = !val;
			option.all = !hasTrue(option);
		},
		filter: function(task) {
			return (this.removed.all || this.removed.undelete && !task.removed || this.removed.deleted && task.removed) && (this.status.all || this.status[task.status]) && (this.type.all || this.type[task.type]) && (!this.keyword || task.name.indexOf(this.keyword)>-1);
		},
		deleteSelected: function() {
			let self = this;
			this.tasks.forEach(function(task) {
				if(!task.checked) return;
				
				if(task.removed)
					task.removed = false;
				else
					task.removed = self.filter(task);
				
				task.checked = false;
			});
			this.isSelectedAll = false;
		},
		updateShows: function() {
			let n = document.getElementById('j-tasks-tbody').children.length;
			document.getElementById('j-tasks-shows').innerHTML = n;
			this.$refs.noneData.style = n ? 'display:none' : '';
		}
	},
	watch: {
		isSelectedAll: function(newval) {
			let self = this;
			this.tasks.forEach(function(v) {
				if(self.filter(v)) v.checked = newval;
			});
		}
	},
	mounted: function() {
		this.updateShows();
	},
	updated: function() {
		this.updateShows();
	}
}
</script>

<style>
.m-tasks{padding:10px;}
.m-tasks>h1{margin-bottom:10px;}
.m-tasks>.filter{margin-bottom:10px;}
.m-tasks>.filter>*{cursor:pointer;}
.m-tasks>.filter>.actived{font-weight:bold;color:red;}
.m-tasks table{margin-bottom:10px;min-width:400px;}
.m-tasks table,.m-tasks th,.m-tasks td{padding:5px;border:1px #ccc solid;border-collapse:collapse;}
.m-tasks table tr>.chk{width:10px;}
.m-tasks table tr>.id{width:10px;white-space:nowrap;}
.m-tasks table tr>.name{}
.m-tasks table tr>.status{width:4em;}
.m-tasks table tr>.type{width:3em;}
.m-tasks tr.deleted{color:#666;}
.m-tasks tr.deleted>.name{text-decoration:line-through black;}
</style>
