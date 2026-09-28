<template>
	<div class="container">
		<div class="section">
			<div class="section-tit">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				공시지가 조회
			</div>
			<div class="section-sub">
				· 공시가격은 공동주택공시가격을 의미하므로, 단독주택을제외한 아파트, 연립, 다세대주택이 조회 대상입니다.
			</div>
			<div class="search-wrap lg">
				<input type="text" class="input-text" placeholder="도로명주소, 건물명 또는 지번입력" v-model="addr" @keyup.enter="getAddr()"/>
				<button type="button" class="btn btn-search" @click="getAddr"></button>
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
		return { adrList: [], addr: '' };
	},

	created() {},
	updated() {},
	methods: {
		// $btnOnRouter('/app/result')
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
			console.log(item.admCd);
			console.log(item.lnbrMnnm);
			console.log(item.lnbrSlno);
			// console.log(item.dongNm);

			this.$btnOnRouter('/app/result', {
				admCd: item.admCd,
				lnbrMnnm: item.lnbrMnnm,
				lnbrSlno: item.lnbrSlno,
				address: item.jibunAddr,
			});
		},
	},
};
</script>
