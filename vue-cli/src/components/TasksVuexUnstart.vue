<template>
<div>
	unstart
	<ul>
		<li v-for="task in unstartTasks"><input type="checkbox" v-model="task.checked"/> <span>{{task.name}}</span></li>
	</ul>
</div>
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