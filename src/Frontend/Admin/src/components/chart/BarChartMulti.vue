<template>
	<Bar
		:options="chartOptions"
		:data="chartData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
		:backdrop="true"
	/>
</template>
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);

export default {
	name: 'BarChartMulti',
	components: { Bar },
	props: {
		chartId: {
			type: String,
			default: 'bar-chart-multi',
		},
		datasetIdKey: {
			type: String,
			default: 'label',
		},
		width: {
			type: Number,
			default: 1000,
		},
		height: {
			type: Number,
			default: 200,
		},
		cssClasses: {
			default: '',
			type: String,
		},
		styles: {
			type: Object,
			default: () => {},
		},
		plugins: {
			type: Array,
			default: () => [],
		},
		chartData: {
			type: Object,
			default: () => {
				return {
					labels: ['2022.6.10', '2022.6.11', '2022.6.12'],
					datasets: [
						{
							label: 'AAAA',
							data: [15, 49, 20],
						},
						{
							label: 'AAAA',
							data: [40, 39, 10],
						},
					],
				};
			},
		},
	},
	data() {
		return {
			chartOptions: {
				responsive: false,
				maintainAspectRatio: false,
				scales: {
					x: {},
					y: {
						afterDataLimits: scale => {
							scale.max = scale.max * 1.2;
						},
					},
				},
			},
		};
	},
	created() {},
	computed: {},
	methods: {},
};
</script>
