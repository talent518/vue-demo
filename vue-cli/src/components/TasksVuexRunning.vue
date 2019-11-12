<template>
	<ol>
		<li v-for="task in runningTasks" :class="{checked:task.checked}"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ol>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'Running',
	data() {
		return {};
	},
	computed: {
		...mapGetters(['runningTasks'])
	},
	mounted() {
		this.$emit('value', 'running');
	}
};
</script>