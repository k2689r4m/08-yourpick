<template>
	<ul class="report-radio--list">
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="tradeType" value="A1" />
					<span class="box type2"></span>
					<span class="text">매매</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="tradeType" value="B1" />
					<span class="box type2"></span>
					<span class="text">전세</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="tradeType" value="B2" />
					<span class="box type2"></span>
					<span class="text">월세</span>
				</label>
			</div>
		</li>
	</ul>
	<div class="btn-wrap m-t--40">
		<button type="button" class="btn btn-big btn-primary w-160" @click="nextStep">선택</button>
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
		return {
			tradeType: 'A1',
		};
	},

	created() {},
	updated() {},
	methods: {
		nextStep() {
			this.dataInfo.tradeType = this.tradeType;

			this.$store.dispatch('callSetReportInfo', this.dataInfo);

			this.$btnOnRouter('/report/request/typeSelect');
		},
	},
};
</script>
