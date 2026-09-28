<template>
	<div class="report-pub">
		<div class="icon"></div>
		안심거래리포트 발급중입니다.<br />
		잠시 기다려주세요<br />
		<div style="font-size: 0.8em">(최대 1분 소요)</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Alarm',
	components: {},
	computed: {
		...mapGetters({
			dataInfo: 'getReportInfo',
		}),
	},
	data() {
		return {};
	},

	created() {
		// setTimeout(
		// 	function () {
		// 		this.$btnOnRouter('/report/request/complete');
		// 	}.bind(this),
		// 	1000,
		// );
		this.dataInfo.gId = this.$route.query.id;
		this.sendReport();
	},
	updated() {},
	methods: {
		sendReport() {
			this.$apiPOST('/api/report/add', this.dataInfo).then(re => {
				if (!re.st) {
					alert(re.msg);
					this.$btnOnRouterBack();
				} else {
					this.$btnOnRouter('/report/request/complete');
				}
			});
		},
	},
};
</script>
