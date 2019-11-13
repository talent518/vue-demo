<template>
	<div class="m-vuex">
		<h1>Vuex</h1>
		<input type="text" v-model="inputText" @keyup.enter="inputEnter" placeholder="Please enter a name and press enter to add it to the current list." />
		<nav>
			<router-link to="/vuex">All({{taskCount}})</router-link>
			<router-link to="/vuex/unstart">Unstart({{unstartCount}})</router-link>
			<router-link to="/vuex/running">Running({{runningCount}})</router-link>
			<router-link to="/vuex/completed">Completed({{completedCount}})</router-link>
		</nav>
		<h3>Current page: {{status}}</h3>
		<router-view v-on:value="status = $event"></router-view>
	</div>
</template>

<script>
import store from '@/stores/vuex';
import {mapState} from 'vuex';

export default {
	name: 'Vuex',
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
			if(!this.inputText) return;
			
			this.$store.commit('addTask', {name:this.inputText,checked:false,status:this.status=='all'?'unstart':this.status});
			this.inputText = '';
		}
	}
}
</script>

<style>
.m-vuex{padding:10px;}
.m-vuex>h1{margin-bottom:10px;}
.m-vuex>input{border-radius:3px;border:1px #999 solid;line-height:22px;padding:0 2px;width:400px;}
.m-vuex>nav{margin:10px 0;}
.m-vuex>nav>a{text-decoration:none;color:black;}
.m-vuex>nav>a.router-link-exact-active{font-weight:bold;color:red;}
.m-vuex span.status {}
.m-vuex span.status.unstart {color:#F60;}
.m-vuex span.status.running {color:#33c;}
.m-vuex span.status.completed {color:#3c3;}
.m-vuex ol{padding-left:2em;line-height:22px;}
.m-vuex li{padding-left:3px;margin:1px 0;}
.m-vuex li.checked{background:#ddd;}
.m-vuex li span.del{cursor:pointer;color:blue;font-weight:bold;}
</style>
