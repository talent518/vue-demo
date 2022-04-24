<template>
	<ol>
		<li v-for="task in completedTasks" :class="{checked:task.checked}"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ol>
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