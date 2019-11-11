Object.defineProperty(Object.prototype, 'clean', {
	get:function(){
		return function() {
			var k, ret = {};
			for(k in this) {
				if(Object.isPrototypeOf(this[k]))
					ret[k] = this[k].clean();
				else {
					ret[k] = this[k];
					this[k] = undefined;
				}
			}
			return ret;
		};
	}
});
Object.defineProperty(Array.prototype, 'clean', {
	get:function(){
		return function(i, n) {
			if(i === undefined)
				i = 0;
			else if(i < 0)
				i = Math.max(0, this.length + i);
			
			return this.splice(i, n || this.length);
		};
	}
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 全局组件
// import Users from './components/Users.vue';
// Vue.component('users', Users);

// 配置路由
import Home from './components/Home';
import HelloWorld from './components/HelloWorld';
import VueRouter from 'vue-router';
const router = new VueRouter({
	routes: [
		{path:'/',component:Home},
		{path:'/hello-world',component:HelloWorld},
	],
	mode: "history"
});

import VueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
window.app = new Vue({
	router,
	el: '#app',
	components: { App },
	template: '<App/>'
});
