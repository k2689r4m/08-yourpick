<template>
	<div class="container">
		<div class="section">
			<div class="section-tit">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				실거래가 조회
			</div>
			<div class="add-list m-b--60">
				<p class="text">{{ address }}</p>
			</div>
			<div class="tab-list type2">
				<button
					type="button"
					class="btn tab-btn"
					v-bind:class="{ active: dataInfo.tradeType == 'A' }"
					@click="(dataInfo.tradeType = 'A'), getItem()"
				>
					매매
				</button>
				<button
					type="button"
					class="btn tab-btn"
					v-bind:class="{ active: dataInfo.tradeType == 'B' }"
					@click="(dataInfo.tradeType = 'B'), getItem()"
				>
					전월세
				</button>
			</div>
			<div class="tab-con">
				<div class="property-top">
					<label class="label">· 년도</label>
					<SlimSelect :data="yearList" :events="yearEvent" class="input-select sm"> </SlimSelect>
					<label class="label">· 면적</label>
					<SlimSelect :data="areaList" :events="areaEvent" class="input-select sm"> </SlimSelect>
				</div>
				<template v-if="dataInfo.tradeType == 'A'">
					<div class="tab-con--tit">매매 실거래가</div>
					<div class="table-wrap">
						<table class="table type2">
							<tr>
								<th>계약일</th>
								<th>거래금액(만원)</th>
								<th>전용면적(㎡)</th>
								<th>층</th>
							</tr>
							<tr v-for="(item, idx) in itemList" :key="'item_' + idx">
								<td>{{ $dateFormat(item.tradeYearMonth, 'YY.MM.DD') }}</td>
								<td>{{ $formatMoney(item.dealPrice, $MONEY_FORMAT_TYPE.LITTLE) }}</td>
								<td>{{ item.exclusiveArea }}</td>
								<td>{{ item.floor }}층</td>
							</tr>
						</table>
					</div>
					<div class="tab-con--tit">
						매매 실거래가 차트
						<span class="right">2024.01 국토교통부 기준</span>
					</div>
				</template>
				<template v-else>
					<div class="tab-con--tit">전월세 실거래가</div>
					<div class="table-wrap">
						<table class="table type2">
							<tr>
								<th>계약일</th>
								<th>보증금(만원)</th>
								<th>월세(만원)</th>
								<th>전용면적(㎡)</th>
								<th>층</th>
							</tr>
							<tr v-for="(item, idx) in itemList" :key="'item_' + idx">
								<td>{{ $dateFormat(item.tradeYearMonth, 'YY.MM.DD') }}</td>
								<td>{{ $formatMoney(item.leasePrice, $MONEY_FORMAT_TYPE.LITTLE) }}</td>
								<td>{{ item.rentPrice }}</td>
								<td>{{ item.exclusiveArea }}</td>
								<td>{{ item.floor }}층</td>
							</tr>
						</table>
					</div>
					<div class="tab-con--tit">
						전월세 실거래가 차트
						<span class="right">2024.01 국토교통부 기준</span>
					</div>
				</template>

				<div class="chart-wrap">
					<canvas id="myChart"></canvas>
					<div class="txt-only txt-c--grey m-t--30">
						· 거래가는 월별 평균 거래금액을 뜻합니다.<br />
						· 전월세는 월세 금액이 없고, 전세금만 있는 자료만 나타납니다.
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js/auto';
import SlimSelect from '@slim-select/vue';
import { shallowRef } from 'vue';

export default {
	name: 'Main',
	components: { SlimSelect },
	computed: {},
	data() {
		return {
			dataInfo: { tradeType: 'A', year: '', area: '' },
			address: '',
			areaList: [],
			yearList: [],
			areaEvent: { afterChange: this.selectArea },
			yearEvent: { afterChange: this.selectYear },
			itemList: [],
			chartData: null,
		};
	},

	created() {
		window.formatMoney = this.$formatMoney;
		this.getInfo();

		this.$nextTick(() => {
			this.chartData = 
			shallowRef(
			
			new Chart(document.getElementById('myChart'), {
				type: 'line',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: [],
							borderWidth: 4,
							borderColor:'#f72891',
							backgroundColor:'transparent',
							radius:7,
							pointBackgroundColor: '#fff',
						},
					],
				},
				options: {
					spanGaps: true,
					plugins: {
						legend: {
							display: false,
						},
						tooltip:{
							callbacks:{
								label: function(context) {
									let label = context.dataset.label || '';
									return context.dataset.label + ': ' + window.formatMoney(context.raw, 'TAX');
								}
							}
						},
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								callback: function (value) {
									return window.formatMoney(value, 'TAX');
								}
							}
						},
						x: {
							grid: {
								display: false,
							},
						},
					},
				},
			})
			
			);
		});
	},
	updated() {},
	methods: {
		selectArea(e) {
			const tg = e[0].value;

			this.dataInfo.area = tg;

			this.getItem();
		},
		selectYear(e) {
			const tg = e[0].value;

			this.dataInfo.year = tg;

			this.getItem();
		},
		getInfo() {
			this.$apiGET('/user/real?id=' + this.$route.params.id).then(re => {
				this.address = re.address;
				this.areaList = [{ value: '전체', text: '전체' }];
				for (let i = 0; i < re.area.length; i++) {
					this.areaList.push({ value: re.area[i], text: re.area[i] });
				}

				this.yearList = [];
				for (let i = 0; i < re.year.length; i++) {
					this.yearList.push({ value: re.year[i], text: re.year[i] });
				}
			});
		},
		getItem() {
			if (!(this.dataInfo.year && this.dataInfo.area)) {
				return;
			}

			this.$apiGET(
				'/user/real/list?id=' +
					this.$route.params.id +
					'&type=' +
					this.dataInfo.tradeType +
					'&area=' +
					this.dataInfo.area +
					'&year=' +
					this.dataInfo.year,
			).then(re => {
				this.itemList = re.item;
				this.chartData.data.labels = re.chart.date;
				this.chartData.data.datasets[0].data = re.chart.price;
				this.chartData.update();
			});
		},
	},
};
</script>
