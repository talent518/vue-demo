<template>
<div>
	completed
	<ul>
		<li v-for="task in tasks" v-if="task.status === 'completed'"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ul>
</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	name: 'Completed',
	data() {
		return {};
	},
	computed: {
		...mapState(['tasks'])
	},
	mounted() {
		this.$emit('value', 'completed');
	}
};
</script>