<template>
<div id="app">
	<app-header v-on:changeTitle="updateTitle($event)" v-bind:subtitle="title" />
	<users></users>
	<users v-bind:title="userTitle" v-bind:sexs="sexs" name="姓名" age="年龄" sex="性别"></users>
	<app-footer v-bind:subtitle="title" />
</div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import Users from './Users';

export default {
	name: 'App',
	data() {
		return {
			title: '',
			userTitle: '用户列表',
			sexs: ['女','男']
		}
	},
	components: {
		'app-header':Header,
		'app-footer':Footer,
		users:Users
	},
	methods: {
		updateTitle: function(title) {
			this.title = title;
		}
	},
	beforeCreate: function() {
		console.log('App - beforeCreate');
	},
	created: function() {
		console.log('App - created');
	},
	beforeMount: function() {
		console.log('App - beforeMount');
	},
	mounted: function() {
		console.log('App - mounted');
	},
	beforeUpdate: function() {
		console.log('App - beforeUpdate');
	},
	updated: function() {
		console.log('App - updated');
	},
	beforeDestroy: function() {
		console.log('App - beforeDestroy');
	},
	destroyed: function() {
		console.log('App - destroyed');
	}
}
</script>

<style>
body{margin:0;}
h1{margin:0;font-size:18px;}
</style>
