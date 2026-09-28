<template>
	<div class="modal show">
		<div class="modal-dim" @click="closeModal"></div>
		<div class="modal-con alert">
			<div class="text">비즈니스 회원 전용 페이지입니다.</div>
			<div class="btns">
				<button type="button" class="btn" @click="closeModal">확인</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalLogin',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
	},
};
</script>
