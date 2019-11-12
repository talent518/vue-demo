import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/components/Home';
import HelloWorld from '@/components/HelloWorld';
import Files from '@/components/Files';
import fileRoutes from './files';

export default new VueRouter({
	routes: [
		{path:'/', component:Home},
		{path:'/hello-world', component:HelloWorld},
		{path:'/files', component:Files,children:fileRoutes},
		{path:'*', component:{template:'<h1 style="padding:10px;color:red;">404 - Not Found</h1>'}}
	],
	mode: "history"
});