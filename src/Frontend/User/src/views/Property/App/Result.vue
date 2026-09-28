<template>
	<div class="container">
		<div class="section">
			<div class="section-tit">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				공시지가 조회
			</div>
			<div class="txt-right txt-size--14 txt-c--grey">2023.01 국토교통부 기준</div>
			<div class="add-list m-t--10">
				<p class="text">{{ this.$route.query.address }}</p>
			</div>
			<div class="tab-con m-t--30">
				<div class="property-top">
					<label class="label">· 동</label>
					<SlimSelect :data="dongList" :events="dongEvent" class="input-select sm"> </SlimSelect>
					<label class="label">· 면적</label>
					<SlimSelect :data="areaList" :events="areaEvent" class="input-select sm"> </SlimSelect>
				</div>
				<div class="tab-con--tit">공시가격</div>
				<div class="table-wrap">
					<table class="table type2">
						<tr>
							<th>공시기준</th>
							<th>단지명</th>
							<th>동</th>
							<th>호수</th>
							<th>전용면적(㎡)</th>
							<th>공동주택가격(만원)</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'item_' + idx">
							<td>{{ item.year + '.' + item.month }}</td>
							<td>{{ item.complexName }}</td>
							<td>{{ item.dongNm }}</td>
							<td>{{ item.hoNm }}</td>
							<td>{{ item.exclusiveArea }}</td>
							<td>{{ $formatMoney(item.publicPrice / 10000, $MONEY_FORMAT_TYPE.LITTLE) }}</td>
						</tr>
					</table>
				</div>
				<div class="txt-only txt-c--grey m-t--30">
					· 공시가격은 공동주택공시가격을 의미하므로, 단독주택을제외한 아파트, 연립, 다세대주택이 조회 대상입니다.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SlimSelect from '@slim-select/vue';
export default {
	name: 'Main',
	components: { SlimSelect },
	computed: {},
	data() {
		return {
			dataInfo: { dong: '', area: '' },
			itemList: [],
			dongList: [],
			areaList: [],
			areaEvent: { afterChange: this.selectArea },
			dongEvent: { afterChange: this.selectDong },
		};
	},

	created() {
		this.getDong();
	},
	updated() {},
	methods: {
		selectArea(e) {
			const tg = e[0].value;

			this.dataInfo.area = tg;

			this.getItem();
		},
		selectDong(e) {
			const tg = e[0].value;
			this.dataInfo.dong = tg;
			this.dataInfo.area = '전체';

			this.getArea();
		},
		getDong() {
			this.$apiGET(
				'/user/app/dong?admCd=' +
					this.$route.query.admCd +
					'&lnbrMnnm=' +
					this.$route.query.lnbrMnnm +
					'&lnbrSlno=' +
					this.$route.query.lnbrSlno,
			).then(re => {
				this.dongList = [];
				for (let i = 0; i < re.length; i++) {
					this.dongList.push({ value: re[i], text: re[i] == '' ? '전체' : re[i] });
				}

				if (!this.dongList.length) {
					this.dongList.push({ value: '', text: '전체' });
				}

				// this.areaList = [{ value: '전체', text: '전체' }];
				// for (let i = 0; i < re.area.length; i++) {
				// 	this.areaList.push({ value: re.area[i], text: re.area[i] });
				// }

				this.getArea();
			});
		},
		getArea() {
			this.$apiGET(
				'/user/app/area?admCd=' +
					this.$route.query.admCd +
					'&lnbrMnnm=' +
					this.$route.query.lnbrMnnm +
					'&lnbrSlno=' +
					this.$route.query.lnbrSlno +
					'&dongNm=' +
					this.dataInfo.dong,
			).then(re => {
				this.areaList = [{ value: '전체', text: '전체' }];
				for (let i = 0; i < re.length; i++) {
					this.areaList.push({ value: re[i], text: re[i] });
				}
				this.getItem();
			});
		},
		getItem() {
			if (!this.dataInfo.dong && !this.dataInfo.area) {
				return;
			}

			this.$apiGET(
				'/user/app/list?admCd=' +
					this.$route.query.admCd +
					'&lnbrMnnm=' +
					this.$route.query.lnbrMnnm +
					'&lnbrSlno=' +
					this.$route.query.lnbrSlno +
					'&dongNm=' +
					this.dataInfo.dong +
					'&area=' +
					this.dataInfo.area,
			).then(re => {
				this.itemList = re;
			});
		},
	},
};
</script>
