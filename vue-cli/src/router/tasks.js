import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import All from '@/components/TasksVuexAll';
import Unstart from '@/components/TasksVuexUnstart';
import Running from '@/components/TasksVuexRunning';
import Completed from '@/components/TasksVuexCompleted';

export default [
	{path:'', component:All},
	{path:'unstart', component:Unstart},
	{path:'running', component:Running},
	{path:'completed', component:Completed}
];