<template>
<div id="app">
	<nav>
		<router-link to="/">Home</router-link>
		<router-link to="/hello-world">HelloWorld</router-link>
	</nav>
	<router-view />
</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			title: '',
			userTitle: '用户列表',
			sexs: ['女','男']
		}
	},
}
</script>

<style>
body{margin:0;font-size:14px;}
.container{width:800px;margin:0 auto;}
#app>nav{background:#bbb;padding:10px;}
#app>nav>a{margin-right:5px;text-decoration:none;color:blue;}
#app>nav>a:hover{color:#F20;}
#app>nav>a:visited{color:#33c;}
#app>nav>a.router-link-exact-active{font-weight:bold;}
h1{margin:0;font-size:18px;}
</style>
