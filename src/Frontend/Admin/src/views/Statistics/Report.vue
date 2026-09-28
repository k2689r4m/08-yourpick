<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">리포트 통계</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: tab }" @click="tab = true">
					월별 통계 차트(최근 6개월)
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: !tab }" @click="tab = false">
					주별 통계 차트(최근 8주)
				</button>
			</div>
			<div class="tab-con" v-if="tab">
				<LineChart v-if="chart1ST" :chartData="lineChartData"></LineChart>
			</div>
			<div class="tab-con" v-if="!tab">
				<LineChart v-if="chart2ST" :chartData="lineChartData2"></LineChart>
			</div>
			<div class="table-top mt-4">
				<div class="left">
					<div class="tit">일자별 요약</div>
				</div>
			</div>
			<div class="search-top">
				<div class="left">
					<input type="date" class="form-control sm" v-model="searchOption.date_s" />
					<div class="search-top--text">~</div>
					<input type="date" class="form-control sm m-r--1" v-model="searchOption.date_e" />
					<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
				</div>
				<div class="right">
					<button type="button" class="btn btn-sm btn-secondary">구글애드</button>
					<button type="button" class="btn btn-sm btn-secondary" @click="$makeExcelFile(itemList, '접속자.xlsx')">
						엑셀다운
					</button>
				</div>
			</div>
			<div class="table-wrap">
				<table class="table">
					<tr>
						<th width="20%">일자</th>
						<th>안심거래리포트</th>
					</tr>
					<tr v-for="item in itemList" :key="'item_' + item.id">
						<td>{{ item.일자 }}</td>
						<td>{{ item.안심거래리포트 }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from '../../components/chart/LineChart.vue';

export default {
	name: 'Approval',
	components: { LineChart },
	data() {
		return {
			itemList: [],
			monthList: { labels: [], data: [] },
			weekList: [],
			searchOption: {
				date_s: '',
				date_e: '',
			},
			tab: true,
			chart1ST: false,
			lineChartData: {
				labels: [],
				datasets: [
					{
						label: '총 안심거래리포트 수',
						data: [],
					},
				],
			},
			chart2ST: false,
			lineChartData2: {
				labels: [],
				datasets: [
					{
						label: '총 안심거래리포트 수',
						data: [],
					},
				],
			},
		};
	},
	created() {
		this.getItemList();
		this.getChartData();
	},
	computed: {},
	methods: {
		getItemList() {
			if (this.searchOption.date_s) {
				if (!this.searchOption.date_e) {
					this.searchOption.date_e = '2999-01-01';
				}
			}

			if (this.searchOption.date_e) {
				if (!this.searchOption.date_s) {
					this.searchOption.date_s = '1800-01-01';
				}
			}

			this.$apiGET('/admin/st/report?date_s=' + this.searchOption.date_s + '&date_e=' + this.searchOption.date_e).then(
				re => {
					this.itemList = re;
				},
			);
		},
		getChartData() {
			this.$apiGET('/admin/st/report/month').then(re => {
				let labelList = [];
				let dataList = [];
				for (let i = 0; i < re.length; i++) {
					labelList.push(re[i].label);
					dataList.push(re[i].cnt);
				}

				this.lineChartData.labels = labelList;
				this.lineChartData.datasets[0].data = dataList;

				this.chart1ST = true;
			});

			this.$apiGET('/admin/st/report/week').then(re => {
				let labelList = [];
				let dataList = [];
				for (let i = 0; i < re.length; i++) {
					labelList.push(re[i].label);
					dataList.push(re[i].cnt);
				}

				this.lineChartData2.labels = labelList;
				this.lineChartData2.datasets[0].data = dataList;

				this.chart2ST = true;
			});
		},
	},
};
</script>

<style></style>
