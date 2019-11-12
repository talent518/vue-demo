<template>
<div>
	completed
	<ul>
		<li v-for="task in completedTasks"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'Completed',
	data() {
		return {};
	},
	computed: {
		...mapGetters(['completedTasks'])
	},
	mounted() {
		this.$emit('value', 'completed');
	}
};
</script>