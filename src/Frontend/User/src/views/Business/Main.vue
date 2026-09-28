<template>
	<div class="container">
		<div class="business-main--top">
			<!-- <div class="swiper-wrapper">
				<div class="swiper-slide first">
					<div class="left">
						<div class="tip">투명하고 신뢰성 있는 고객 응대를 위해</div>
						<div class="tit">
							<span class="txt-c--primary">안심거래리포트</span>로<br />
							똑똑하게 중개하세요!
						</div>
					</div>
					<div class="right">
						<img src="../../assets/images/icons/business_top_img1.svg" alt="" />
					</div>
				</div>
				<div class="swiper-slide second">
					<div class="left">
						<div class="tip">비용 절감 및 업무 효율성을 위해</div>
						<div class="tit">
							<span class="txt-c--primary">유어픽 비즈니스 회원</span>이 되어<br />
							패키지 상품을 경험해보세요!
						</div>
					</div>
					<div class="right">
						<img src="../../assets/images/icons/business_top_img2.svg" alt="" />
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div> -->

			<swiper
				:pagination="{
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
				}"
				:modules="modules"
			>
				<swiper-slide class="first">
					<div class="left">
						<div class="tip">투명하고 신뢰성 있는 고객 응대를 위해</div>
						<div class="tit">
							<span class="txt-c--primary">안심거래리포트</span>로<br />
							똑똑하게 중개하세요!
						</div>
					</div>
					<div class="right">
						<img src="../../assets/images/icons/business_top_img1.svg" alt="" />
					</div>
				</swiper-slide>
				<swiper-slide class="second">
					<div class="left">
						<div class="tip">비용 절감 및 업무 효율성을 위해</div>
						<div class="tit">
							<span class="txt-c--primary">유어픽 비즈니스 회원</span>이 되어<br />
							패키지 상품을 경험해보세요!
						</div>
					</div>
					<div class="right">
						<img src="../../assets/images/icons/business_top_img2.svg" alt="" />
					</div>
				</swiper-slide>
			</swiper>
			<div class="swiper-pagination"></div>
		</div>

		<div class="business-main--guide">
			<div class="state">
				<div class="icon icon-1"><span class="num">1</span></div>
				<div class="tit">회원 정보 입력</div>
				<div class="con">
					해당되는 회원 유형을 선택하여 <br />
					회원 정보를 정확히 입력해주세요.
				</div>
			</div>
			<div class="state">
				<div class="icon icon-2"><span class="num">2</span></div>
				<div class="tit">회원 가입 신청</div>
				<div class="con">
					선택한 회원 유형의 관련 서류의<br />
					확인 절차가 이루어집니다.
				</div>
			</div>
			<div class="state">
				<div class="icon icon-3"><span class="num">3</span></div>
				<div class="tit">승인 완료</div>
				<div class="con">
					관련 서류의 검토가 완료되면<br />
					회원가입의 승인이 완료됩니다!
				</div>
			</div>
		</div>

		<div class="business-btn--wrap">
			<button type="button" class="btn btn-primary" @click="$btnOnRouter('/business/agree')">
				비즈니스 회원가입 바로가기
			</button>
		</div>
	</div>
</template>

<script>
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
	name: 'MainLogin',
	components: { Swiper, SwiperSlide },
	computed: {},
	data() {
		return { modules: [Pagination] };
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
