<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-done">
					<div class="icon"></div>
					<div class="tit">회원가입 완료!</div>
					<div class="sub">유어픽 회원이 되신 것을 축하드립니다.</div>
					<div class="btn-wrap">
						<button type="button" class="btn btn-big btn-primary" @click="$btnOnRouter('/')">로그인하기</button>
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
