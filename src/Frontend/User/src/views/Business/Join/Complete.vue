<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-done">
					<div class="icon"></div>
					<div class="tit">회원 가입 신청 환료!</div>
					<div class="sub">관련 서류 검토가 완료되면 비즈니스 회원가입 승인이 완료됩니다.</div>
					<div class="btn-wrap">
						<button type="button" class="btn btn-big btn-primary" @click="$btnOnRouter('/business/login')">
							로그인하기
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Complete',
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
