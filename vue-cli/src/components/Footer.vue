<template>
<footer>
	<p><span v-html="copyright" /><template v-if="subtitle"> - {{subtitle}}</template></p>
</footer>
</template>

<script>
export default {
	name: 'Footer',
	props: {
		subtitle: {
			type: String,
			default: ''
		}
	},
	data: () => {
		return {
			copyright: 'Copyright &copy;2019 Vue demo'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
footer{text-align:center;color:blue;line-height:50px;background:#ccc;}
footer p{margin:0;}
</style>
