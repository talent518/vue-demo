<template>
	<ol>
		<li v-for="(task,tid) in tasks" :class="{checked:task.checked}"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span> - <span :class="'status ' + task.status">{{task.status}}</span> - <span @click="$store.commit('delTask', tid)" class="del" :title="'Delete Task: ' + task.name">X</span></li>
	</ol>
</template>

<script>
import {mapState} from 'vuex';

export default {
	name: 'All',
	data() {
		return {};
	},
	computed: {
		...mapState(['tasks'])
	},
	mounted() {
		this.$emit('value', 'all');
	}
};
</script>
