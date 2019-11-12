<template>
<div>
	all
	<ul>
		<li v-for="(task,tid) in tasks"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span> - <span :class="'status ' + task.status">{{task.status}}</span> - <span @click="$store.commit('delTask', tid)">X</span></li>
	</ul>
</div>
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
