<template>
	<Line
		:options="chartOptions"
		:data="chartData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
	/>
</template>
<script>
import { Line } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	Colors,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Colors);

export default {
	name: 'LineChart',
	components: { Line },
	props: {
		chartId: {
			type: String,
			default: 'line-chart',
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
					labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
					datasets: [
						{
							label: 'AAAA',
							data: [25, 27, 30, 33, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
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
				tooltips: {
					enabled: false,
				},
				scales: {
					x: {
						ticks: {
							// Include a dollar sign in the ticks
							// callback: function (value, index, ticks) {
							// 	console.log(ticks);
							// 	return '';
							// },
						},
						grid: {
							color: function (context) {
								if (context.tick.value == 2 || context.tick.value == 3) {
									return 'rgba(0,0,0, 1)';
								}
								return 'rgba(0,0,0, 0)';
							},
						},
					},
					y: {
						afterDataLimits: scale => {
							scale.max = scale.max * 1.2;
						},
						grid: {
							color: function () {
								return 'rgba(0,0,0, 0)';
							},
						},
					},
				},
				tension: 0.4,
			},
		};
	},
	created() {},
	computed: {},
	methods: {},
};
</script>
