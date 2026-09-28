<template>
	<div class="lnb-wrap">
		<div class="lnb-tit"><b-icon-arrow-right-circle-fill />사이트 바로가기</div>
		<ul class="lnb-list">
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.dashboard == 'Y'">
				<router-link
					type="button"
					class="btn tit only"
					to="/dashboard"
					v-bind:class="{ active: currentRouteName == 'dashboard' }"
				>
					<b-icon-graph-up />&nbsp;대시보드
				</router-link>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.user == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'user',
						fold: menuSt1,
					}"
					@click="menuSt1 = !menuSt1"
				>
					<b-icon-person-fill />&nbsp; 회원관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/user/userList"
						v-bind:class="{ active: currentRouteName2 == 'userList' }"
					>
						회원목록
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/user/approval"
						v-bind:class="{ active: currentRouteName2 == 'approval' }"
					>
						승인관리
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/user/sms"
						v-bind:class="{ active: currentRouteName2 == 'sms' }"
					>
						문자발송
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/user/kakao"
						v-bind:class="{ active: currentRouteName2 == 'kakao' }"
					>
						카카오알림톡
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.statistics == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'statistics',
						fold: menuSt2,
					}"
					@click="menuSt2 = !menuSt2"
				>
					<b-icon-bar-chart-fill />&nbsp; 통계
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/statistics/accessor"
						v-bind:class="{ active: currentRouteName2 == 'accessor' }"
					>
						접속자 통계
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/statistics/join"
						v-bind:class="{ active: currentRouteName2 == 'join' }"
					>
						가입자 통계
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/statistics/report"
						v-bind:class="{ active: currentRouteName2 == 'report' }"
					>
						리포트 통계
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/statistics/inquiry"
						v-bind:class="{ active: currentRouteName2 == 'inquiry' }"
					>
						문의 통계
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/statistics/sales"
						v-bind:class="{ active: currentRouteName2 == 'sales' }"
					>
						매출 통계
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.report == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'report',
						fold: menuSt3,
					}"
					@click="menuSt3 = !menuSt3"
				>
					<b-icon-file-earmark-fill />&nbsp; 리포트 관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/report/reportList"
						v-bind:class="{ active: currentRouteName2 == 'reportList' }"
					>
						안심거래리포트 발급 현황
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/report/issuance"
						v-bind:class="{ active: currentRouteName2 == 'issuance' }"
					>
						리포트 대량 발급
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.contents == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'contents',
						fold: menuSt4,
					}"
					@click="menuSt4 = !menuSt4"
				>
					<b-icon-grid-fill />&nbsp; 콘텐츠 관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/contents/mgrView"
						v-bind:class="{ active: currentRouteName2 == 'mgrView' }"
					>
						콘텐츠 관리 화면
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/contents/news"
						v-bind:class="{ active: currentRouteName2 == 'news' }"
					>
						부동산 주요 뉴스
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/contents/tip"
						v-bind:class="{ active: currentRouteName2 == 'tip' }"
					>
						부동산 상식
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.ticket == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'ticket',
						fold: menuSt5,
					}"
					@click="menuSt5 = !menuSt5"
				>
					<b-icon-credit-card2-back-fill />&nbsp; 이용권 관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/ticket/sendMgr"
						v-bind:class="{ active: currentRouteName2 == 'sendMgr' }"
					>
						이용권 발송 관리
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/ticket/useMgr"
						v-bind:class="{ active: currentRouteName2 == 'useMgr' }"
					>
						이용권 사용 관리
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.inquiry == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'inquiry',
						fold: menuSt6,
					}"
					@click="menuSt6 = !menuSt6"
				>
					<b-icon-chat-left-fill />&nbsp; 문의 관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/inquiry/inqList"
						v-bind:class="{ active: currentRouteName2 == 'inqList' }"
					>
						일반 회원 문의 현황
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/inquiry/bizInqList"
						v-bind:class="{ active: currentRouteName2 == 'bizInqList' }"
					>
						비즈니스 회원 문의 현황
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.pay == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'pay',
						fold: menuSt7,
					}"
					@click="menuSt7 = !menuSt7"
				>
					<b-icon-wallet2 />&nbsp; 결제 관리
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/pay/priceMgr"
						v-bind:class="{ active: currentRouteName2 == 'priceMgr' }"
					>
						서비스 요금 관리
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/pay/payList"
						v-bind:class="{ active: currentRouteName2 == 'payList' }"
					>
						서비스 결제 현황
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/pay/proof"
						v-bind:class="{ active: currentRouteName2 == 'proof' }"
					>
						결제 증빙
					</router-link>
				</div>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.sales == 'Y'">
				<router-link
					type="button"
					class="btn tit only"
					to="/sales"
					v-bind:class="{ active: currentRouteName == 'sales' }"
				>
					<b-icon-cash-coin />&nbsp; 매출 관리
				</router-link>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.permission == 'Y'">
				<router-link
					type="button"
					class="btn tit only"
					to="/permission"
					v-bind:class="{ active: currentRouteName == 'permission' }"
				>
					<b-icon-person-plus-fill />&nbsp; 권한 관리
				</router-link>
			</li>
			<li class="lnb-list--item" v-if="$store.getters.getUserInfo.CS == 'Y'">
				<button
					type="button"
					class="btn tit"
					v-bind:class="{
						active: currentRouteName == 'cs',
						fold: menuSt8,
					}"
					@click="menuSt8 = !menuSt8"
				>
					<b-icon-megaphone-fill />&nbsp; 고객센터
				</button>
				<div class="con">
					<router-link
						type="button"
						class="btn menu"
						to="/cs/notiList"
						v-bind:class="{ active: currentRouteName2 == 'notiList' }"
					>
						공지사항
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/cs/newList"
						v-bind:class="{ active: currentRouteName2 == 'newList' }"
					>
						뉴스
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/cs/terms"
						v-bind:class="{ active: currentRouteName2 == 'terms' }"
					>
						이용약관
					</router-link>
					<router-link
						type="button"
						class="btn menu"
						to="/cs/policy"
						v-bind:class="{ active: currentRouteName2 == 'policy' }"
					>
						개인정보 처리방침
					</router-link>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'SideComponent',
	components: {},
	computed: {
		currentRouteName() {
			try {
				const pathList = this.$route.fullPath.split('/');

				return pathList[1];
			} catch {
				return false;
			}
		},
		currentRouteName2() {
			try {
				const pathList = this.$route.fullPath.split('/');

				return pathList[2];
			} catch {
				return false;
			}
		},
	},
	data() {
		return {
			menuSt1: false,
			menuSt2: false,
			menuSt3: false,
			menuSt4: false,
			menuSt5: false,
			menuSt6: false,
			menuSt7: false,
			menuSt8: false,
		};
	},
	watch: {},
	created() {},
	updated() {},
	methods: {},
};
</script>
