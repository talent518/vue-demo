<template>
<header>
	<h1 v-on:click="changeTitle">{{title}}<template v-if="subtitle"> - {{subtitle}}</template></h1>
</header>
</template>

<script>
export default {
	name: 'Header',
	props: {
		subtitle: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			title: '这是我的第一个Vue脚手架项目'
		}
	},
	methods: {
		changeTitle: function() {
			this.isChangedTitle = !this.isChangedTitle;
			this.$emit('changeTitle', this.isChangedTitle ? '由子组件向父组件传值！' : '');
		}
	}
}
</script>

<style>
header {text-align:center;line-height:50px;background:#ddd;color:blue;}
</style>
