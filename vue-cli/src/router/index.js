import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/components/Home';
import Ajax from '@/components/Ajax';
import Files from '@/components/Files';
import fileRoutes from './files';
import Filters from '@/components/Filters';
import Vuex from '@/components/Vuex';
import vuexRoutes from './vuex';
import Tabs from '@/components/Tabs';
import ElasticSearch from '@/components/ElasticSearch';

export default new VueRouter({
	routes: [
		{path:'/', component:Home},
		{path:'/ajax', component:Ajax},
		{path:'/files', component:Files,children:fileRoutes},
		{path:'/filters', component:Filters},
		{path:'/vuex', component:Vuex,children:vuexRoutes},
		{path:'/tabs', component:Tabs},
		{path:'/elastic-search', component:ElasticSearch},
		{path:'*', component:{template:'<h1 style="padding:10px;color:red;">404 - Not Found</h1>'}}
	],
	mode: "history"
});