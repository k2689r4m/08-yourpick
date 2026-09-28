<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap">
				<div class="join-logo"></div>
				<div class="join-tit">가입을 시작합니다!</div>
				<div class="join-sub">유어픽 만의 안심서비스를 이용해보세요</div>
				<div class="join-card--wrap">
					<button type="button" class="btn join-card" @click="$btnOnRouter('/join/agree')">
						<div class="icon user"></div>
						<div class="tit">일반회원</div>
						<div class="sub">유어픽 안심서비스를 이용하기 위해서 회원가입 해주세요.</div>
					</button>
					<button type="button" class="btn join-card" @click="$btnOnRouter('/business/agree')">
						<div class="icon business"></div>
						<div class="tit">비즈니스 회원</div>
						<div class="sub">공인중개사, 업계종사자를 위한 비즈니스 회원가입이에요.</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Join',
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
