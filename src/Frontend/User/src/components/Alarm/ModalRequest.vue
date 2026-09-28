<template>
	<div class="modal show">
		<div class="modal-dim white" @click="closeModal"></div>
		<div class="modal-con white">
			<div class="modal-tit type2">
				주소검색
				<button type="button" class="btn btn-close" @click="closeModal"></button>
			</div>
			<div class="m-b--10">
				<label class="input-label txt-c--black">· 주소검색은 도로명 또는 건물명으로 검색해 주세요. </label>
			</div>
			<div class="input-wrap">
				<input
					type="text"
					class="input-text"
					placeholder="도로명 + 건물번호, 지번을 입력하세요"
					v-model="adr"
					@keyup.enter="getAddr"
					ref="adrRef"
				/>
				<button type="button" class="btn btn-primary btn-normal" @click="getAddr">검색</button>
			</div>
			<ul class="report-add--list" v-if="adrList.length">
				<li class="item" v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
					<span class="name">
						<span class="badge">도로명 주소</span>
						{{ isAdr.jibunAddr }}
					</span>
					<button type="button" class="btn btn-line btn-sm" @click="resultAddress(isAdr)">선택</button>
				</li>
			</ul>

			<!-- <div class="box-line m-t--20">검색결과</div> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalRequest',
	components: {},
	computed: {},
	data() {
		return {
			adr: '',
			adrList: [],
		};
	},
	mounted() {
		this.$refs.adrRef.focus();
	},
	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
		getAddr() {
			this.$apiGET('/user/addr/link?addr=' + this.adr).then(re => {
				if (!re.length) {
					return;
				}

				this.adrList = re;
			});
		},
		resultAddress(isAdr) {
			this.$emit('resultAddress', isAdr);
		},
	},
};
</script>
