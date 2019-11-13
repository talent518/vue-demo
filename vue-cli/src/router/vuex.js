import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import All from '@/components/vuex/All';
import Unstart from '@/components/vuex/Unstart';
import Running from '@/components/vuex/Running';
import Completed from '@/components/vuex/Completed';

export default [
	{path:'', component:All},
	{path:'unstart', component:Unstart},
	{path:'running', component:Running},
	{path:'completed', component:Completed}
];