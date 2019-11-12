<template>
<div>
	running
	<ul>
		<li v-for="task in runningTasks"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ul>
</div>
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