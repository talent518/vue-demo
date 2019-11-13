<template>
<div id="app">
	<app-header v-on:changeTitle="updateTitle($event)" v-bind:subtitle="title" />
	<users></users>
	<users v-bind:title="userTitle" v-bind:sexs="sexs" name="姓名" age="年龄" sex="性别"></users>
	<app-footer v-bind:subtitle="title" />
</div>
</template>

<script>
import Header from './home/Header';
import Footer from './home/Footer';
import Users from './home/Users';

export default {
	name: 'Home',
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
		console.log('Home - beforeCreate');
	},
	created: function() {
		console.log('Home - created');
	},
	beforeMount: function() {
		console.log('Home - beforeMount');
	},
	mounted: function() {
		console.log('Home - mounted');
	},
	beforeUpdate: function() {
		console.log('Home - beforeUpdate');
	},
	updated: function() {
		console.log('Home - updated');
	},
	beforeDestroy: function() {
		console.log('Home - beforeDestroy');
	},
	destroyed: function() {
		console.log('Home - destroyed');
	}
}
</script>

<style>
body{margin:0;}
h1{margin:0;font-size:18px;}
</style>
