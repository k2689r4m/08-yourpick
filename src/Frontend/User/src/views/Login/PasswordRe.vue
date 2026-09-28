<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo"></div>
					&nbsp;&nbsp; 새로운 비밀번호 설정
				</div>
				<div class="join-input">
					<div class="input-wrap pass">
						<label class="input-label">· 새로운 비밀번호</label>
						<div class="input-guide">8~20자 이내 영문, 숫자, 특수문자 조합</div>
						<button type="button" class="btn view"></button>
						<input type="password" class="input-text" value="asdasd2323" />
					</div>
					<div class="input-wrap pass">
						<label class="input-label">· 비밀번호 확인</label>
						<div class="input-guide error">비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</div>
						<button type="button" class="btn view active"></button>
						<input type="text" class="input-text" value="asdasd1212" />
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="$btnOnRouter('/')">다음</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Main',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
