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
	name: 'BarChart',
	components: { Bar },
	props: {
		chartId: {
			type: String,
			default: 'bar-chart',
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
					labels: ['2022.6', '2022.7', '2022.8'],
					datasets: [
						{
							data: [60, 20, 10],
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
				plugins: {
					legend: {
						display: false,
					},
				},
				backgroundColor: [
					'rgba(226,234,60, 0.3)', // Bar 1
					'rgba(194,172,57, 0.3)', // Bar 2
					'rgba(16,44,139, 0.3)', // Bar 3
					'rgba(179,138,114, 0.3)', // Bar 4
					'rgba(77,212,123, 0.3)', // Bar 5
					'rgba(156,167,20, 0.3)', // Bar 6
					'rgba(166,2,136, 0.3)', // Bar 7
					'rgba(70,123,116, 0.3)', // Bar 8
					'rgba(54,185,183, 0.3)', // Bar 9
					'rgba(154,251,39, 0.3)', // Bar 10
					'rgba(155,12,8, 0.3)', // Bar 11
					'rgba(171,212,68, 0.3)', // Bar 12
				],
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
