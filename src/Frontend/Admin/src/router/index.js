import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import headerComp from '../components/HeaderComponent';
import sideComp from '../components/SideComponent';

const rDashboard = {
	path: '/dashboard',
	name: 'Dashboard',
	meta: { dashboard: true },
	components: {
		default: () => import('../views/Dashboard.vue'),
		header: headerComp,
		side: sideComp,
	},
};

const rUser = {
	path: '/user',
	name: 'User',
	redirect: '/user/list',
	meta: { user: true },
	components: {
		default: () => import('../views/User/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'userList',
			component: () => import('../views/User/UserList.vue'),
		},
		{
			path: 'userList/:id',
			component: () => import('../views/User/UserDetail.vue'),
		},
		{
			path: 'userList/biz/:id',
			component: () => import('../views/User/BizDetail.vue'),
		},
		{
			path: 'approval',
			component: () => import('../views/User/Approval.vue'),
		},
		{
			path: 'approval/:id',
			component: () => import('../views/User/ApprovalDetail.vue'),
		},
		{
			path: 'sms',
			component: () => import('../views/User/SMS.vue'),
		},
		{
			path: 'kakao',
			component: () => import('../views/User/Kakao.vue'),
		},
	],
};

const rStatistics = {
	path: '/statistics',
	name: 'Statistics',
	redirect: '/statistics/accessor',
	meta: { statistics: true },
	components: {
		default: () => import('../views/Statistics/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'accessor',
			component: () => import('../views/Statistics/Accessor.vue'),
		},
		{
			path: 'join',
			component: () => import('../views/Statistics/Join.vue'),
		},
		{
			path: 'report',
			component: () => import('../views/Statistics/Report.vue'),
		},
		{
			path: 'inquiry',
			component: () => import('../views/Statistics/Inquiry.vue'),
		},
		{
			path: 'sales',
			component: () => import('../views/Statistics/Sales.vue'),
		},
	],
};

const rReport = {
	path: '/report',
	name: 'report',
	redirect: '/report/ReportList',
	meta: { report: true },
	components: {
		default: () => import('../views/Report/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'reportList',
			component: () => import('../views/Report/ReportList.vue'),
		},
		{
			path: 'issuance',
			component: () => import('../views/Report/Issuance.vue'),
		},
	],
};

const rContents = {
	path: '/contents',
	name: 'contents',
	redirect: '/contents/mgrView',
	meta: { contents: true },
	components: {
		default: () => import('../views/Contents/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'mgrView',
			component: () => import('../views/Contents/MgrView.vue'),
		},
		{
			path: 'news',
			component: () => import('../views/Contents/News.vue'),
		},
		{
			path: 'register',
			component: () => import('../views/Contents/Register.vue'),
		},
		{
			path: 'modi/:id',
			component: () => import('../views/Contents/Modi.vue'),
		},
		{
			path: 'tip',
			component: () => import('../views/Contents/Tip.vue'),
		},
	],
};

const rTicket = {
	path: '/ticket',
	name: 'ticket',
	redirect: '/ticket/sendMgr',
	meta: { ticket: true },
	components: {
		default: () => import('../views/Ticket/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'sendMgr',
			component: () => import('../views/Ticket/SendMgr.vue'),
		},
		{
			path: 'useMgr',
			component: () => import('../views/Ticket/UseMgr.vue'),
		},
	],
};

const rInquiry = {
	path: '/inquiry',
	name: 'inquiry',
	redirect: '/inquiry/inqList',
	meta: { inquiry: true },
	components: {
		default: () => import('../views/Inquiry/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'inqList',
			component: () => import('../views/Inquiry/InqList.vue'),
		},
		{
			path: 'inqList/:id',
			component: () => import('../views/Inquiry/InqDetail.vue'),
		},
		{
			path: 'bizInqList',
			component: () => import('../views/Inquiry/BizInqList.vue'),
		},
		{
			path: 'bizInqList/:id',
			component: () => import('../views/Inquiry/BizInqDetail.vue'),
		},
	],
};

const rPay = {
	path: '/pay',
	name: 'pay',
	redirect: '/pay/priceMgr',
	meta: { pay: true },
	components: {
		default: () => import('../views/Pay/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'priceMgr',
			component: () => import('../views/Pay/PriceMgr.vue'),
		},
		{
			path: 'payList',
			component: () => import('../views/Pay/PayList.vue'),
		},
		{
			path: 'proof',
			component: () => import('../views/Pay/Proof.vue'),
		},
	],
};

const rSales = {
	path: '/sales',
	name: 'sales',
	meta: { sales: true },
	components: {
		default: () => import('../views/Sales/Sales.vue'),
		header: headerComp,
		side: sideComp,
	},
};

const rPermission = {
	path: '/permission',
	name: 'permission',
	redirect: '/permission/perList',
	meta: { permission: true },
	components: {
		default: () => import('../views/Permission/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'perList',
			component: () => import('../views/Permission/Permission.vue'),
		},
		{
			path: 'perAdd',
			component: () => import('../views/Permission/Add.vue'),
		},
		{
			path: 'perEdit/:id',
			component: () => import('../views/Permission/Edit.vue'),
		},
	],
};

const rCS = {
	path: '/cs',
	name: 'cs',
	redirect: '/cs/notiList',
	meta: { cs: true },
	components: {
		default: () => import('../views/CS/Main.vue'),
		header: headerComp,
		side: sideComp,
	},
	children: [
		{
			path: 'notiList',
			component: () => import('../views/CS/NotiList.vue'),
		},
		{
			path: 'notiRegist',
			component: () => import('../views/CS/NotiRegist.vue'),
		},
		{
			path: 'notiList/:id',
			component: () => import('../views/CS/NotiModi.vue'),
		},
		{
			path: 'newList',
			component: () => import('../views/CS/NewList.vue'),
		},
		{
			path: 'newsRegist',
			component: () => import('../views/CS/NewsRegist.vue'),
		},
		{
			path: 'newList/:id',
			component: () => import('../views/CS/NewsModi.vue'),
		},
		{
			path: 'terms',
			component: () => import('../views/CS/Terms.vue'),
		},
		{
			path: 'policy',
			component: () => import('../views/CS/Policy.vue'),
		},
	],
};

const routes = [
	{
		path: '/test',
		name: 'test',
		components: {
			default: () => import('../views/Test.vue'),
			header: headerComp,
			side: sideComp,
		},
		header: headerComp,
		side: sideComp,
	},
	{
		path: '/LoginView',
		name: 'LoginView',
		component: () => import('../views/LoginView.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/',
		name: 'main',
		components: {
			default: () => import('../views/Main.vue'),
			header: headerComp,
			side: sideComp,
		},
	},
	rDashboard, //대시보드
	rUser, //회원 관리
	rStatistics, //통계
	rReport, //리포트 관리
	rContents, //콘텐츠 관리
	rTicket, //이용권 관리
	rInquiry, //문의 관리
	rPay, //결제 관리
	rSales, //매출 관리
	rPermission, //권한 관리
	rCS, //고객센터
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const storeToken = store.getters.getToken;

	if (to.matched.some(record => record.meta.unauthorized)) {
		return next();
	} else if (to.matched.some(record => record.meta.dashboard)) {
		if (store.getters.getUserInfo.dashboard == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.user)) {
		if (store.getters.getUserInfo.user == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.statistics)) {
		if (store.getters.getUserInfo.statistics == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.report)) {
		if (store.getters.getUserInfo.report == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.contents)) {
		if (store.getters.getUserInfo.contents == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.ticket)) {
		if (store.getters.getUserInfo.ticket == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.inquiry)) {
		if (store.getters.getUserInfo.inquiry == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.pay)) {
		if (store.getters.getUserInfo.pay == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.sales)) {
		if (store.getters.getUserInfo.sales == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.permission)) {
		if (store.getters.getUserInfo.permission == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (to.matched.some(record => record.meta.CS)) {
		if (store.getters.getUserInfo.CS == 'Y') {
			return next();
		}
		alert('접근권한이 없습니다.');
		return next('/');
	} else if (storeToken) {
		return next();
	}

	// alert('로그인 해주세요');
	return next('/LoginView');
});

export default router;
