<template>
	<div class="login-wrap">
		<div class="login">
			<h2 class="login-tit">ADMIN LOGIN</h2>
			<div class="mb-3 input-wrap">
				<b-icon-person-fill />
				<input
					class="form-control"
					type="text"
					placeholder="아이디를 입력하세요"
					v-model="userInfo.userId"
					@keyup.enter="btnLogin"
				/>
			</div>
			<div class="mb-4 input-wrap">
				<b-icon-lock-fill />
				<input
					class="form-control"
					type="password"
					placeholder="비밀번호를 입력하세요"
					v-model="userInfo.password"
					@keyup.enter="btnLogin"
				/>
			</div>
			<button class="btn btn-primary btn-block" type="submit" @click="btnLogin">로그인</button>
			<p class="login-guide">* 관리자 페이지 접속은 PC에서만 가능하며,<br />모바일 접속은 권장 하지 않습니다.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginView',
	data() {
		return { userInfo: { userId: '', password: '' } };
	},
	components: {},
	created() {},
	computed: {},
	methods: {
		btnLogin() {
			this.$apiLOGIN('/user/admin/login', this.userInfo).then(re => {
				if (re.status == 200) {
					this.$btnOnLogin(9);
				}
			});
		},
	},
};
</script>

<style></style>
