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
					labels: ['2022.6', '2022.7', '2022.8', '2022.9', '2022.10', '2022.11'],
					datasets: [
						{
							label: 'AAAA',
							data: [40, 39, 10, 40, 39, 80, 40, 90],
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
