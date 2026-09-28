<template>
	<div class="modal show">
		<div class="modal-dim white" @click="closeModal"></div>
		<div class="modal-con white">
			<div class="modal-tit type2">
				주소검색
				<button type="button" class="btn btn-close"></button>
			</div>
			<div class="m-b--10">
				<label class="input-label txt-c--black">· 주소검색은 도로명 또는 건물명으로 검색해 주세요. </label>
			</div>
			<div class="input-wrap">
				<input type="text" class="input-text" placeholder="도로명 + 건물번호, 지번을 입력하세요" />
				<button type="button" class="btn btn-primary btn-normal">검색</button>
			</div>
			<div class="box-line m-t--20" @click="closeModal">검색결과</div>
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
