<template>
	<div class="container">
		<div class="section">
			<div class="section-tit">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				실거래가 조회
			</div>
			<div class="search-wrap lg">
				<input type="text" class="input-text" placeholder="도로명주소, 건물명 또는 지번입력" v-model="addr" @keyup.enter="getAddr()"/>
				<button type="button" class="btn btn-search" @click="getAddr"></button>
				<!-- @click="$btnOnRouter('/real/result')" -->
			</div>
			<div v-if="adrList.length" class="add-list">
				<button
					v-for="(isAdr, idx) in adrList"
					:key="'adrList_' + idx"
					type="button"
					class="btn"
					@click="selectAddress(isAdr)"
				>
					{{ isAdr.jibunAddr }}
				</button>
				<div class="pagination">
					<button type="button" class="btn">1</button>
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
		return {
			adrList: [],
			addr: '',
		};
	},

	created() {},
	updated() {},
	methods: {
		getAddr() {
			if (!this.addr) {
				return;
			}

			this.$apiGET('/user/addr/link?addr=' + this.addr).then(re => {
                if(!re.length){
                    alert("검색 결과 없음");
                }
				this.adrList = re;
			});
		},
		selectAddress(item) {
			this.$apiPOST('/user/real/adr/search', item).then(re => {
				if (!re) {
					alert('해당 매물은 실거래 기록이 없습니다.');
					return;
				}

				this.$btnOnRouter('/real/result/' + re.complexNo);
			});
		},
	},
};
</script>
