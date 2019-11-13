<template>
	<div class="m-files">
		<h1>Files</h1>
		<nav>
			<router-link to="/files">{{home}}</router-link>
			<router-link v-for="(name,path) in fileRoutes" :to="'/files/'+path">{{name}}</router-link>
			<router-link v-if="isFilesId" :to="filesId">{{fid}}</router-link>
		</nav>
		<span>Files</span>
		<router-view @randInt="randInt($event)"></router-view>
	</div>
</template>

<script>
import fileRoutes from '@/router/files';

export default {
	name: 'Files',
	data() {
		let routes = {};
		fileRoutes.forEach(function(v,k){
			routes[v.path] = v.component.name.replace(/^Files/,'');
		});
		
		let isFilesId = ':id' in routes;
		delete routes[':id'];
		
		let home = routes[''];
		delete routes[''];
		
		return {
			fid: parseInt(Math.random()*100000),
			fileRoutes: routes,
			isFilesId,
			home
		};
	},
	methods: {
		randInt: function(fid) {
			this.fid = fid ? fid : parseInt(Math.random()*100000);
		}
	},
	computed: {
		filesId: function() {
			return '/files/' + this.fid;
		}
	},
	updated: function() {
		console.log('Files - updated');
		console.log(this.$parent);
	}
}
</script>

<style>
.m-files {padding:10px;}
.m-files>nav{display:block;margin-bottom:10px;}
.m-files>nav>a{margin-right:5px;text-decoration:none;color:blue;}
.m-files>nav>a:visited{color:#33c;}
.m-files>nav>a:hover{color:#F20;}
.m-files>nav>a.router-link-exact-active{font-weight:bold;color:#F60;}
.m-files>nav>a.router-link-exact-active:hover{color:#960;}
</style>