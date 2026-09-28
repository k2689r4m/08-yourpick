<template>
	<div class="content">
		<LineChart :width="600" :height="200"></LineChart>
	</div>
</template>

<script>
import LineChart from '../components/chart/LineChart2.vue';

export default {
	name: 'MainUser',
	components: { LineChart },
	data() {
		return {
			lineChartData: {
				labels: ['2022.6', '2022.7', '2022.8', '2022.9', '2022.10', '2022.11'],
				datasets: [
					{
						label: 'AAAA',
						data: [40, 39, 10, 40, 39, 80, 40, 90],
					},
				],
			},
		};
	},
	created() {},
	computed: {},
	methods: {},
};
</script>

<style></style>
