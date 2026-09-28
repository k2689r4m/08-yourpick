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
	Filler,
	Colors,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler, Colors);

export default {
	name: 'LineChart',
	components: { Line },
	props: {
		chartId: {
			type: String,
			default: 'line-chart-fill',
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
					labels: [
						'2022.10.11',
						'2022.10.12',
						'2022.10.13',
						'2022.10.14',
						'2022.10.15',
						'2022.10.16',
						'2022.10.17',
						'2022.10.18',
					],
					datasets: [
						{
							fill: true,
							label: 'AAAA',
							data: [40, 39, 10, 40, 39, 80, 40, 90],
						},
						{
							fill: true,
							label: 'BBBB',
							data: [1, 50, 70, 40, 39, 20, 10, 77],
						},
						{
							fill: true,
							label: 'CCCC',
							data: [9, 70, 10, 50, 69, 40, 15, 22],
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
