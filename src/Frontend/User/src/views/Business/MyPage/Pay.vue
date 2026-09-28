<template>
	<div class="container">
		<div class="section">
			<div class="my-tit m-b--0">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				상품결제
			</div>
			<div class="my-sub">패키지 상품<span>VAT 별도 금액</span></div>
			<div class="my-pay">
				<div class="my-pay--con" v-for="item in serviceList" :key="'se_'+item.gId">
					<div class="tit">{{item.name}}<br /><span class="txt-c--primary">{{item.cnt}}건</span> 패키지</div>
					<div class="con">
						<div class="before">
							정상가
							<span class="price">{{ $numberMask(item.full_price) }}원</span>
						</div>
						<div class="after">
							{{ item.sale_rate }}% 할인가
							<span class="price">{{ $numberMask(item.price) }}원</span>
						</div>
					</div>
					<div class="con">
						<div class="before m-b--0">
							이용기간
							<span class="date txt-c--black">{{ item.dateE }}까지</span>
						</div>
					</div>
					<button type="button" class="btn btn-md" @click="nextPage(item.gId)">구매하기</button>
				</div>
				<!-- <div class="my-pay--con">
					<div class="tit">안심거래리포트<br /><span class="txt-c--primary">50건</span> 패키지</div>
					<div class="con">
						<div class="before">
							정상가
							<span class="price">250,000원</span>
						</div>
						<div class="after">
							76% 할인가
							<span class="price">60,000원</span>
						</div>
					</div>
					<div class="con">
						<div class="before m-b--0">
							이용기간
							<span class="date txt-c--black">{{ $dateAdd(3) }}까지</span>
						</div>
					</div>
					<button type="button" class="btn btn-md" @click="nextPage(2)">구매하기</button>
				</div>
				<div class="my-pay--con">
					<div class="tit">안심거래리포트<br /><span class="txt-c--primary">70건</span> 패키지</div>
					<div class="con">
						<div class="before">
							정상가
							<span class="price">350,000원</span>
						</div>
						<div class="after">
							76% 할인가
							<span class="price">84,000원</span>
						</div>
					</div>
					<div class="con">
						<div class="before m-b--0">
							이용기간
							<span class="date txt-c--black">{{ $dateAdd(3) }}까지</span>
						</div>
					</div>
					<button type="button" class="btn btn-md" @click="nextPage(3)">구매하기</button>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Pay',
	components: {},
	computed: {},
	data() {
		return {
            serviceList: [],
			bizPayInfo: { type: null, price1: null, price2: null, price3: null },
		};
	},

	created() {
        this.getServiceItem();
    },
	updated() {},
	methods: {
        getServiceItem() {
			this.$apiGET('/api/goods/biz').then(re => {
				this.serviceList = re;
			});
		},
		nextPage(mode) {
			// if (mode == 1) {
			// 	this.bizPayInfo.type = 30;
			// 	this.bizPayInfo.price1 = 150000;
			// 	this.bizPayInfo.price2 = 114000;
			// 	this.bizPayInfo.price3 = 36000;
			// } else if (mode == 2) {
			// 	this.bizPayInfo.type = 50;
			// 	this.bizPayInfo.price1 = 250000;
			// 	this.bizPayInfo.price2 = 190000;
			// 	this.bizPayInfo.price3 = 60000;
			// } else if (mode == 3) {
			// 	this.bizPayInfo.type = 70;
			// 	this.bizPayInfo.price1 = 350000;
			// 	this.bizPayInfo.price2 = 266000;
			// 	this.bizPayInfo.price3 = 84000;
			// }
			// this.$store.dispatch('callSetBizPayInfo', this.bizPayInfo);
            this.$store.dispatch('callSetGoodId', mode);
			this.$btnOnRouter('/business/pay/pay');
		},
	},
};
</script>
