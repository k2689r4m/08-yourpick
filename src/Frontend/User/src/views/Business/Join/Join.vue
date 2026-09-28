<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-input">
					<div class="tit">회원정보 입력</div>
					<div class="input-wrap">
						<label class="input-label">· 이메일 아이디</label>
						<div v-if="!emailCom" class="input-guide error">
							올바르지 않은 이메일입니다. 이메일 형식에 맞게 입력해주세요.
						</div>
						<input type="text" class="input-text" v-model="email" />
						<span class="unit">@</span>

						<SlimSelect v-model="emailCom" class="input-select">
							<option value="">이메일 선택</option>
							<option>naver.com</option>
							<option>nate.com</option>
							<option>hanmail.net</option>
							<option>gmail.com</option>
							<option>kakao.com</option>
						</SlimSelect>
					</div>
					<div class="input-wrap pass">
						<label class="input-label">· 비밀번호</label>
						<div class="input-guide">8~20자 이내 영문, 숫자, 특수문자 조합</div>
						<button
							type="button"
							class="btn view"
							v-bind:class="{ active: passwdSt1 }"
							@click="passwdSt1 = !passwdSt1"
						></button>
						<input v-if="passwdSt1" type="text" class="input-text" v-model="passwd1" />
						<input v-else type="password" class="input-text" v-model="passwd1" />
					</div>
					<div class="input-wrap pass">
						<label class="input-label">· 비밀번호 확인</label>
						<div v-if="passwd1 == passwd2 && passwd1 && passwd2" class="input-guide collect">
							비밀번호가 일치합니다.
						</div>
						<div v-else class="input-guide error">비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</div>
						<button
							type="button"
							class="btn view"
							v-bind:class="{ active: passwdSt2 }"
							@click="passwdSt2 = !passwdSt2"
						></button>
						<input v-if="passwdSt2" type="text" class="input-text" v-model="passwd2" />
						<input v-else type="password" class="input-text" v-model="passwd2" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 회원 유형 선택</label>

						<SlimSelect v-model="userType" class="input-select">
							<option>선택</option>
							<option>개업 공인중개사</option>
						</SlimSelect>
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="nextStep">다음</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SlimSelect from '@slim-select/vue';

export default {
	name: 'Join',
	components: { SlimSelect },
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return { email: '', emailCom: '', passwd1: '', passwd2: '', passwdSt1: false, passwdSt2: false, userType: '' };
	},

	created() {},
	updated() {},
	methods: {
		nextStep() {
			if (!(this.email && this.emailCom)) {
				alert('잘못된 이메일입니다.');
				return;
			}

			if (!(this.passwd1 == this.passwd2 && this.passwd1 && this.passwd2)) {
				alert('잘못된 비밀번호입니다.');
				return;
			}

			if (!this.userType) {
				alert('회원 유형을 선택해주세요.');
				return;
			}

			this.userData.email = this.email + '@' + this.emailCom;
			this.userData.password = this.passwd1;
			this.userData.userType = this.userType;

			this.$store.dispatch('callSetUserData2', this.userData);
			this.$btnOnRouter('/business/add');

			// this.$apiPOST('/user/join/create', this.userData).then(re => {
			// 	if (re) {
			// 		this.$btnOnRouter('/join/complete');
			// 	}
			// });

			// @click="$btnOnRouter('/business/infoInput')"
		},
	},
};
</script>
