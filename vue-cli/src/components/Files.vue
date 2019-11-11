<template>
	<div class="m-files">
		<subnav>
			<router-link to="/files">Index</router-link>
			<router-link to="/files/image">Image</router-link>
			<router-link to="/files/css">CSS</router-link>
			<router-link to="/files/js">JS</router-link>
			<router-link :to="filesId">{{fid}}</router-link>
		</subnav>
		<span>Files</span>
		<router-view @randInt="randInt($event)"></router-view>
	</div>
</template>

<script>
export default {
	name: 'Files',
	data() {
		return {
			fid: parseInt(Math.random()*100000)
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
	}
}
</script>

<style>
.m-files {padding:10px;}
.m-files subnav{display:block;margin-bottom:10px;}
.m-files>subnav>a{margin-right:5px;text-decoration:none;color:blue;}
.m-files>subnav>a:visited{color:#33c;}
.m-files>subnav>a:hover{color:#F20;}
.m-files>subnav>a.router-link-exact-active{font-weight:bold;color:#F60;}
.m-files>subnav>a.router-link-exact-active:hover{color:#960;}
</style>