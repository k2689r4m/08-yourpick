<template>
	<div class="container">
		<div class="section">
			<div class="complete">
				<div class="icon card"></div>
				<div class="tit">알림 서비스 신청이 완료되었습니다.</div>
				<div class="con">정상 처리가 되었을 경우 신청하신 번호로 문자가 발송됩니다.</div>
				<button type="button" class="btn btn-primary btn-big" @click="$btnOnRouter('/')">메인페이지 이동</button>
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
