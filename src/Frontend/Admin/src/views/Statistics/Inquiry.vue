<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">문의 통계</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: tab }" @click="tab = true">
					오늘 등록된 문의 차트
				</button>
			</div>
			<div class="tab-con">
				<BarChart v-if="chart1ST" :chartData="barChartData"></BarChart>
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
					<button type="button" class="btn btn-sm btn-secondary" @click="$makeExcelFile(itemList, '문의 통계.xlsx')">
						엑셀다운
					</button>
				</div>
			</div>
			<div class="table-wrap">
				<table class="table">
					<tr>
						<th width="20%">일자</th>
						<th>전체</th>
						<th>일반 회원 문의 등록</th>
						<th>비즈니스 회원 문의 등록</th>
						<th>처리 현황</th>
					</tr>
					<tr v-for="item in itemList" :key="'item_' + item.id">
						<td>{{ item.일자 }}</td>
						<td>{{ item.전체 }}</td>
						<td>{{ item[`일반 회원 문의 등록`] }}</td>
						<td>
							{{ item[`비즈니스 회원 문의 등록`] }}
						</td>
						<td>
							{{ item[`처리 현황`] }}
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import BarChart from '../../components/chart/BarChart.vue';

export default {
	name: 'Approval',
	components: { BarChart },
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
			barChartData: {
				labels: ['2022.6', '2022.7', '2022.8'],
				datasets: [
					{
						data: [60, 20, 10],
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

			this.$apiGET('/admin/st/inq?date_s=' + this.searchOption.date_s + '&date_e=' + this.searchOption.date_e).then(
				re => {
					this.itemList = re;
				},
			);
		},
		getChartData() {
			this.$apiGET('/admin/st/inq/today').then(re => {
				let labelList = [];
				let dataList = [];
				for (let i = 0; i < re.length; i++) {
					labelList.push(re[i].label);
					dataList.push(re[i].cnt);
				}

				this.barChartData.labels = labelList;
				this.barChartData.datasets[0].data = dataList;

				this.chart1ST = true;
			});
		},
	},
};
</script>

<style></style>
