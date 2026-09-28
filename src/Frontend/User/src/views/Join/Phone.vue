<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
					<div class="join-logo"></div>
					&nbsp;&nbsp; 일반 회원가입
				</div>
				<div class="join-input">
					<div class="tit">휴대폰 인증</div>
					<div class="sub">가입을 위해 본인의 휴대폰 번호를 인증해 주세요</div>
					<div class="input-wrap">
						<label class="input-label">· 이름</label>
						<input type="text" class="input-text" v-model="userName" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 생년월일</label>
						<input
							type="text"
							class="input-text"
							v-model="userBirthday"
							@change="userBirthday = userBirthday.replace(/[^0-9]/g, '')"
							placeholder="예) 19880501"
						/>
					</div>
					<div class="input-wrap">
						<label class="input-label">· 휴대폰 번호</label>
						<input
							type="tel"
							class="input-text"
							v-model="userPhone"
							@change="userPhone = userPhone.replace(/[^0-9]/g, '')"
							placeholder="‘-’를 제외한 휴대폰 번호 입력"
						/>
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="nextPage">인증번호 받기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Phone',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData',
		}),
	},
	data() {
		return {
			userName: '',
			userBirthday: '',
			userPhone: '',
		};
	},
	created() {},
	updated() {},
	methods: {
		nextPage() {
			this.userBirthday = this.userBirthday.replace(/[^0-9]/g, '');
			this.userPhone = this.userPhone.replace(/[^0-9]/g, '');

			if (!this.userName) {
				alert('이름을 입력해주세요.');
				return;
			}
			if (!this.userBirthday) {
				alert('생년월일을 입력해주세요.');
				return;
			}
			if (this.userBirthday.replace(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '')) {
				alert('잘못된 생년월일 입니다.');
				return;
			}
			if (!this.userPhone) {
				alert('휴대폰번호를 입력해주세요.');
				return;
			}

			this.userData.name = this.userName;
			this.userData.birthday = this.userBirthday;
			this.userData.phone = this.userPhone;

			this.$apiPOST('/user/join/cert', this.userData).then(re => {
                if(re?.status == 0){
                    this.$store.dispatch('callSetUserData', this.userData);
                    this.$btnOnRouter('/join/number');
                }else if(re?.status == 1){
                    this.$btnOnRouter('/join/exist',{phone: this.userData.phone});
                }
			});
		},
	},
};
</script>
