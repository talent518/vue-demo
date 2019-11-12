<template>
	<ol>
		<li v-for="task in unstartTasks" :class="{checked:task.checked}"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ol>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'Unstart',
	data() {
		return {};
	},
	computed: {
		...mapGetters(['unstartTasks'])
	},
	mounted() {
		this.$emit('value', 'unstart');
	}
};
</script>