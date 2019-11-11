<template>
	<span ref="mFilesId" class="m-files-id">
		- ID: {{$route.params.id}}
		<h1 v-if="$route.params.id % 5 === 0" style="padding:10px 0;color:red;">404 - Not Found</h1>
		<h3 v-else>Displays information with ID {{$route.params.id}}</h3>
	</span>
</template>

<script>
export default {
	name: 'FilesId',
	data() {
		return {
			notFound:'<h1></h1>'
		};
	},
	created: function() {
		var id = this.$route.params.id;
		this.$emit('randInt', id);
	},
	destroyed: function() {
		this.$emit('randInt');
	}
}
</script>