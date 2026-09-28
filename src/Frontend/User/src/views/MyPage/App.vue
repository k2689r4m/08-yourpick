<template>
	<div class="container my-page">
		<div class="my-top">
			<div class="img-wrap">
				<img v-if="userImg" :src="userImg" alt="" />
			</div>
			<div class="txt-wrap">
				<div class="name">
					{{ userInfo.name }}
					<button type="button" class="btn">유어픽 일반 회원</button>
				</div>
				<div class="mail">{{ userInfo.email }}</div>
			</div>
			<button type="button" class="btn btn-logout" @click="$apiLOGOUT()">로그아웃</button>
		</div>
		<div class="my-menu">
			<button
				type="button"
				class="btn"
				v-bind:class="{ active: currentRouteName == 'info' }"
				@click="$btnOnRouter('/mypage/info')"
			>
				내 정보 관리
			</button>
			<button
				type="button"
				class="btn"
				v-bind:class="{ active: currentRouteName == 'myTicket' }"
				@click="$btnOnRouter('/mypage/ticket')"
			>
				내 이용권
			</button>
			<button
				type="button"
				class="btn"
				v-bind:class="{ active: currentRouteName == 'myReport' }"
				@click="$btnOnRouter('/mypage/report')"
			>
				리포트 보관함
			</button>
			<button
				type="button"
				class="btn"
				v-bind:class="{ active: currentRouteName == 'pay' }"
				@click="$btnOnRouter('/mypage/pay')"
			>
				결제 내역
			</button>
			<button
				type="button"
				class="btn"
				v-bind:class="{ active: currentRouteName == 'inquiry' || currentRouteName == 'inquiryDetail' }"
				@click="$btnOnRouter('/mypage/inquiry')"
			>
				서비스 문의
			</button>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'App',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
		...mapGetters({
			userInfo: 'getUserInfo',
		}),
	},
	data() {
		return {
            userImg: null,
        };
	},
	created() {
        this.setUserImg();
    },
	methods: {
        setUserImg(){
            this.$apiImgGET('/api/user/image').then(data => {
                this.userImg = data;
            });
        },
    },
};
</script>
