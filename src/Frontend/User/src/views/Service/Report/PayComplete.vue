<template>
	<div class="report-pub">
		<div class="icon type2"></div>
		안심거래리포트 발급 완료!<br />
		<span class="sm">발급된 리포트는 마이페이지에서 확인 가능합니다.</span>
		<div class="btn-wrap">
			<button type="button" class="btn btn-dark btn-big" @click="$btnOnRouter('/mypage/report')">리포트 보기</button>
			<button type="button" class="btn btn-primary btn-big" @click="$btnOnRouter('/')">메인페이지 이동</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Alarm',
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
