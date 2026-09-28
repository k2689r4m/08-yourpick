import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';
import seon from '../seon';

export default createStore({
	state: {
		token: { accessToken: '', refreshToken: '' },
		userInfo: {
			level: null,
			id: null,
			mem_id: null,
			mem_name: null,
			created_at: null,
			dashboard: null,
			user: null,
			statistics: null,
			report: null,
			contents: null,
			ticket: null,
			inquiry: null,
			pay: null,
			sales: null,
			permission: null,
			CS: null,
		},
	},
	mutations: {
		setToken(state, data) {
			state.token = data;
		},
		setUserInfo(state, data) {
			state.userInfo.level = data;
		},
		setUserInfo1(state, data) {
			state.userInfo.id = data.id;
			state.userInfo.mem_id = data.mem_id;
			state.userInfo.mem_name = data.mem_name;
			state.userInfo.created_at = data.created_at;
			state.userInfo.dashboard = data.dashboard;
			state.userInfo.user = data.user;
			state.userInfo.statistics = data.statistics;
			state.userInfo.report = data.report;
			state.userInfo.contents = data.contents;
			state.userInfo.ticket = data.ticket;
			state.userInfo.inquiry = data.inquiry;
			state.userInfo.pay = data.pay;
			state.userInfo.sales = data.sales;
			state.userInfo.permission = data.permission;
			state.userInfo.CS = data.CS;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		callSetToken({ state, commit }, data) {
			commit('setToken', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetUserInfo({ state, commit }, data) {
			seon.apiGET('/admin/myinfo').then(re => {
				commit('setUserInfo1', re);
				router.push({ path: '/' });
			});
		},
	},
	getters: {
		getToken(state) {
			if (state.token.accessToken && state.token.refreshToken) {
				return { accessToken: state.token.accessToken, refreshToken: state.token.refreshToken };
			} else {
				return false;
			}
		},

		getUserInfo(state) {
			return state.userInfo;
		},
	},
	modules: {},
	plugins: [createPersistedState({ key: 'vuexStore', storage: window.sessionStorage })],
});
