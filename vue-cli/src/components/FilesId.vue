<template>
	<span class="m-files-id"> - ID: {{$route.params.id}}</span>
</template>

<script>
export default {
	name: 'FilesId',
	data() {
		return {};
	},
	created: function() {
		this.$emit('randInt', this.$route.params.id);
	},
	destroyed: function() {
		this.$emit('randInt');
	}
}
</script>