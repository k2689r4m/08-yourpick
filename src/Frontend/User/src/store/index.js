import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';
import seon from '../seon';

export default createStore({
	state: {
		token: { accessToken: '', refreshToken: '' },
		modalLogin: false,
		userInfo: { level: null, email: null, phone: null, name: null, socialType: null },
        userImg: null,
		postST: false,
        goodId: null,
		reportInfo: {
			admCd: null, //행정구역코드
			rnMgtSn: null, //도로명코드
			dongNm: null, //동이름
			siNm: null, //시도명
			sggNm: null, //시군구명
			emdNm: null, //읍면동명
			liNm: null, //법정리명
			lnbrMnnm: null, //지번본번(번지)
			lnbrSlno: null, //지번부번(호)
			rn: null, //도로명
			buldMnnm: null, //건물본번
			buldSlno: null, //건물부번
			bdNm: null, //건물명
			jibunAddr: null,
			roadAddr: null,
			hoNm: null, //호이름
			floorNm: null, //층

			itemType: null, //아파트, 오피스텔
			tradeType: null, //거래 유형

			dealPrice: null, //매매가
			leasePrice: null, //전세금, 보증금
			rentPrice: null, //월세

            pnu: null,
		},
		userData: {
			name: null,
			birthday: null,
			phone: null,
			email: null,
			password: null,
			agreeSt: null,
		},

		userData2: {
			name: null,
			birthday: null,
			phone: null,
			email: null, //이메일
			password: null, //비번
			agreeSt: null, //약관
			userType: null, //회원유형
			office: null,

			bizFile: null,
			midFile: null,
		},

		applyData: {
			id: null,
			name: null,
			phone1: null,
			phone2: null,
			phone3: null,
			RRN1: null,
			RRN2: null,
			jibunAddr: '',
			detailAddr: '',

			applyType: '',
			applyJibunAddr: '',
			applyDetailAddr: '',
			applyService: '',
		},

		bizPayInfo: { type: null, price1: null, price2: null, price3: null },
	},
	mutations: {
		setToken(state, data) {
			state.token = data;
		},
		setModalLogin(state, data) {
			state.modalLogin = data;
		},
		setUserInfo(state, data) {
			state.userInfo.level = data;
		},
		setUserInfo1(state, data) {
			state.userInfo.email = data.email + '@' + data.emailCom;
			state.userInfo.phone = data.phone;
			state.userInfo.name = data.name ? data.name : data.rprsvNm;
            state.userInfo.socialType = data.socialType;
		},
		setReportInfo(state, data) {
			state.reportInfo = data;
		},
		setUserData(state, data) {
			state.userData = data;
		},
		setUserData2(state, data) {
			state.userData2 = data;
		},

		setApplyData(state, data) {
			state.applyData = data;
		},
		setBizPayInfo(state, data) {
			state.bizPayInfo = data;
		},
        setGoodId(state, data) {
			state.goodId = data;
		},
        setUserImg(state, data) {
			state.userImg = data;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		callSetToken({ state, commit }, data) {
			commit('setToken', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetModalLogin({ state, commit }, data) {
			commit('setModalLogin', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetUserInfo({ state, commit }, data) {
			const level = state.userInfo.level;
			commit('setUserInfo', data);

			if (data == null) {
				if (level == 2) {
					router.push({ path: '/business' });
				} else {
					router.push({ path: '/' });
				}
			} else if (data == level) {
				if (data == 1) {
					seon.apiGET('/api/mypage/info').then(re => {
						commit('setUserInfo1', re);
					});
				} else if (data == 2) {
					console.log('~~');
				}
			} else {
				if (data == 1) {
					seon.apiGET('/api/mypage/info').then(re => {
						commit('setUserInfo1', re);
					});
					router.push({ path: '/' });
				} else if (data == 2) {
					seon.apiGET('/api/biz/mypage/info').then(re => {
						commit('setUserInfo1', re);
					});
					console.log('~~');

					router.push({ path: '/business/main' });
				}
			}

            window.parent.location.reload();
		},

        // eslint-disable-next-line no-unused-vars
		callSetUserInfo2({ state, commit }, data) {
            commit('setUserInfo1', data);
		},

        // eslint-disable-next-line no-unused-vars
        callSetUserImg({ state, commit }, data) {
            commit('setUserImg', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetReportInfo({ state, commit }, data) {
			commit('setReportInfo', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetUserData({ state, commit }, data) {
			commit('setUserData', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetUserData2({ state, commit }, data) {
			commit('setUserData2', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetApplyData({ state, commit }, data) {
			commit('setApplyData', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetBizPayInfo({ state, commit }, data) {
			commit('setBizPayInfo', data);
		},

        // eslint-disable-next-line no-unused-vars
		callSetGoodId({ state, commit }, data) {
			commit('setGoodId', data);
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

		getModalLogin(state) {
			return state.modalLogin;
		},

		getUserInfo(state) {
			return state.userInfo;
		},

		getReportInfo(state) {
			return state.reportInfo;
		},

		getUserData(state) {
			return state.userData;
		},
		getUserData2(state) {
			return state.userData2;
		},

		getApplyData(state) {
			return state.applyData;
		},

		getBizPayInfo(state) {
			return state.bizPayInfo;
		},

        getGoodId(state) {
			return state.goodId;
		},

        getUserImg(state) {
			return state.userImg;
		},
	},
	modules: {},
	plugins: [createPersistedState({ key: 'vuexStore', storage: window.sessionStorage })],
});
