<template>
	<div class="m-tasks-vuex">
		<h1>My Tasks Vuex</h1>
		<input type="text" v-model="inputText" @keyup.enter="inputEnter" placeholder="Please input task name and press enter key add!" />
		<nav>
			<router-link to="/tasks-vuex">All({{taskCount}})</router-link>
			<router-link to="/tasks-vuex/unstart">Unstart({{unstartCount}})</router-link>
			<router-link to="/tasks-vuex/running">Running({{runningCount}})</router-link>
			<router-link to="/tasks-vuex/completed">Completed({{completedCount}})</router-link>
		</nav>
		<router-view v-on:value="status = $event"></router-view>
	</div>
</template>

<script>
import store from '@/stores/tasks';
import {mapState} from 'vuex';

export default {
	name: 'TasksVuex',
	store,
	data() {
		return {
			inputText: '',
			status: 'all',
		};
	},
	computed: {
		...mapState(['taskCount','unstartCount','runningCount','completedCount'])
	},
	methods: {
		selectStatus: function(status) {
			this.status = status;
		},
		inputEnter: function() {
			console.log(this.inputText);
			this.$store.commit('addTask', {name:this.inputText,checked:false,status:this.status=='all'?'unstart':this.status});
			this.inputText = '';
		}
	},
	created: function() {
		console.log(this);
	}
}
</script>

<style>
.m-tasks-vuex{padding:10px;}
.m-tasks-vuex>h1{margin-bottom:10px;}
.m-tasks-vuex>nav{margin:10px 0;}
.m-tasks-vuex>nav>a{text-decoration:none;color:black;}
.m-tasks-vuex>nav>a.router-link-exact-active{font-weight:bold;color:red;}
.m-tasks-vuex span.status {}
.m-tasks-vuex span.status.unstart {color:#F60;}
.m-tasks-vuex span.status.running {color:#33c;}
.m-tasks-vuex span.status.completed {color:#3c3;}
</style>
