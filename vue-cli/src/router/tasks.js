import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import All from '@/components/tasks-vuex/All';
import Unstart from '@/components/tasks-vuex/Unstart';
import Running from '@/components/tasks-vuex/Running';
import Completed from '@/components/tasks-vuex/Completed';

export default [
	{path:'', component:All},
	{path:'unstart', component:Unstart},
	{path:'running', component:Running},
	{path:'completed', component:Completed}
];