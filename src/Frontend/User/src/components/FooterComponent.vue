<template>
	<div class="footer">
		<div class="footer-wrap">
			<div class="footer-left">
				<!--<div class="logo"></div>-->
				<div class="m-block">
					<button type="button" class="btn" @click="$btnOnRouter('/center/notice')">공지사항</button>
					<button type="button" class="btn" @click="$btnOnRouter('/center/news')">뉴스</button>
					<button type="button" class="btn">회사소개</button>
					<button type="button" class="btn">유어픽 공고</button>
				</div>
				<div class="m-block footer-menu">
					<div class="footer-menu--tit">문의</div>
					<div class="footer-menu--text">이메일(고객전용) : help@yourpick.kr</div>
					<div class="footer-menu--text">이메일(외부기관전용) : info@yourpick.kr</div>
				</div>
				<div class="info">
					<strong>주식회사 유어픽</strong><br />
					대표자: 김세빈 | 대표번호: 02-2677-5319<br />
					사업자번호: 619-87-02860 | 통신판매업신고번호: 제2024-인천서구-0326호<br />
					주소: (본점) 인천광역시 서구 청라루비로 95 701호 PL6<br />
					<span class="m-r--20">&nbsp;&nbsp;&nbsp;</span>
					(지점) 서울특별시 영등포구 선유로 49길 4 SK1 TOWER 703호<br />
					<button type="button" class="btn" @click="termsModal = true">이용약관</button>
					<button type="button" class="btn" @click="courseModal = true">개인정보처리방침</button>
				</div>
			</div>
			<div class="footer-right">
				<div class="footer-menu">
					<div class="footer-menu--tit">서비스</div>
					<button type="button" class="btn" @click="$btnOnRouter('/center/notice')">공지사항</button>
					<button type="button" class="btn" @click="$btnOnRouter('/center/news')">뉴스</button>
				</div>
				<div class="footer-menu">
					<div class="footer-menu--tit">회사</div>
					<button type="button" class="btn">회사소개</button>
					<button type="button" class="btn">유어픽 광고</button>
				</div>
				<div class="footer-menu">
					<div class="footer-menu--tit">문의</div>
					<div class="footer-menu--text">이메일(고객전용) : help@yourpick.kr</div>
					<div class="footer-menu--text">이메일(외부기관전용) : info@yourpick.kr</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" v-bind:class="{ show: termsModal }">
		<div class="modal-dim" @click="termsModal = false"></div>
		<div class="modal-con lg">
			<div class="modal-tit">
				이용약관
				<button type="button" class="btn btn-close" @click="termsModal = false"></button>
			</div>
			<div class="txt-only scroll" v-html="termsContent"></div>
		</div>
	</div>
	<div class="modal" v-bind:class="{ show: courseModal }">
		<div class="modal-dim" @click="courseModal = false"></div>
		<div class="modal-con lg">
			<div class="modal-tit">
				개인정보처리방침
				<button type="button" class="btn btn-close" @click="courseModal = false"></button>
			</div>
			<div class="txt-only scroll" v-html="courseContent"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FooterComponent',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	data() {
		return {
			termsModal: false,
			courseModal: false,
			termsContent: '',
			courseContent: '',
		};
	},

	created() {
		this.termsModalContent();
		this.courseModalContent();
	},
	updated() {},
	methods: {
		termsModalContent() {
			this.$apiGET('/user/term').then(data => {
				this.termsContent = data.content;
			});
		},
		courseModalContent() {
			this.$apiGET('/user/policy').then(data => {
				this.courseContent = data.content;
			});
		},
	},
};
</script>
