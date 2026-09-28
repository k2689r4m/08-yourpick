<template>
	<div class="report-tit">
		거래 금액 입력
		<span class="sm">({{ title }})</span>
	</div>
	<div class="report-input">
		<input type="number" class="input-text" :placeholder="placeholder" v-model="price" />
		<span class="unit">(단위 : 만원)</span>
		<span class="guide">{{ $formatMoney(price, $MONEY_FORMAT_TYPE.TAX) }}</span>
	</div>
	<div class="report-input" v-if="dataInfo.tradeType == 'B2'">
		<input type="number" class="input-text" placeholder="월세금액을 입력해주세요." v-model="rentPrice" />
		<span class="unit">(단위 : 만원)</span>
		<span class="guide">{{ $formatMoney(rentPrice, $MONEY_FORMAT_TYPE.TAX) }}</span>
	</div>
	<div class="btn-wrap m-t--40">
		<button type="button" class="btn btn-big btn-primary w-160" @click="nextStep">다음</button>
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
			title: null,
			placeholder: null,
			price: null,
			rentPrice: null,
		};
	},
	created() {
		this.init();
	},
	updated() {},
	methods: {
		init() {
			if (this.dataInfo.tradeType == 'A1') {
				this.title = '매매';
				this.placeholder = '매매금액을 입력해주세요.';
			} else if (this.dataInfo.tradeType == 'B1') {
				this.title = '전세';
				this.placeholder = '전세금액을 입력해주세요.';
			} else if (this.dataInfo.tradeType == 'B2') {
				this.title = '월세';
				this.placeholder = '보증금액을 입력해주세요.';
			}
		},
		nextStep() {
			if (this.dataInfo.tradeType == 'A1') {
				this.dataInfo.dealPrice = this.price;
			} else if (this.dataInfo.tradeType == 'B1') {
				this.dataInfo.leasePrice = this.price;
			} else if (this.dataInfo.tradeType == 'B2') {
				this.dataInfo.leasePrice = this.price;
				this.dataInfo.rentPrice = this.rentPrice;
			}

			this.$store.dispatch('callSetReportInfo', this.dataInfo);
			this.$btnOnRouter('/report/request/serviceType');
		},
	},
};
</script>
