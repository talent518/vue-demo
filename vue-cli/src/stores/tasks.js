import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		tasks: [],
		taskCount: 0,
		unstartCount: 0,
		runningCount: 0,
		completedCount: 0
	},
	mutations: {
		addTask: function(state, payload) {
			state.tasks.push(payload);
			state[payload.status+'Count']++;
			state.taskCount++;
		},
		delTask: function(state, payload) {
			let t = state.tasks.splice(payload,1)[0];
			if(t) {
				state[t.status+'Count']--;
				state.taskCount--;
			}
		}
	},
	actions: {
	},
	getters: {
		unstartTasks(state) {
			return state.tasks.filter(item=>item.status === 'unstart');
		},
		runningTasks(state) {
			return state.tasks.filter(item=>item.status === 'running');
		},
		completedTasks(state) {
			return state.tasks.filter(item=>item.status === 'completed');
		},
	}
});

export default store;