<template>
<div id="app">
	<nav>
		<span :class="{env:true,dev:dev}">{{env}}</span>
		<router-link v-for="route in $router.options.routes" v-if="route.path !== '*'" :to="route.path">{{route.component.name}}</router-link>
	</nav>
	<router-view />
</div>
</template>

<script>
const isDev = process.env.NODE_ENV === 'development';

export default {
	name: 'App',
	data() {
		return {
			title: '',
			userTitle: '用户列表',
			sexs: ['女','男'],
			env: isDev ? 'Development' : 'Product',
			dev: isDev
		}
	}
}
</script>

<style>
body{margin:0;font-size:14px;}
.container{width:800px;margin:0 auto;}
#app>nav{background:#bbb;padding:10px;}
#app>nav>span.env{float:right;color:green;}
#app>nav>span.dev{color:red;}
#app>nav>a{margin-right:5px;text-decoration:none;color:blue;}
#app>nav>a:visited{color:#33c;}
#app>nav>a:hover{color:#F20;}
#app>nav>a.router-link-exact-active:first-child,#app>nav>a.router-link-active:not(:first-child){font-weight:bold;}
#app>nav>a.router-link-exact-active{color:#F60;}
h1{margin:0;font-size:18px;}
</style>
