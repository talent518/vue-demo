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
import VueResource from 'vue-resource';
import router from './router';
import App from './App'

Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */
window.app = new Vue({
	router,
	el: '#app',
	components: { App },
	template: '<App/>'
});
