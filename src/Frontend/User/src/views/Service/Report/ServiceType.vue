<template>
	<div class="report-tit">서비스 결제 항목</div>
	<ul class="report-radio--list">
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" value="one" v-model="serviceType" />
					<span class="box type2"></span>
					<span class="text">1회 이용권</span>
				</label>
			</div>
			<div class="item-wrap box" v-if="serviceType == 'one' && !serviceList.normalGood && normalItem">
				<div class="tit">{{ normalItem.info }}</div>
				<div class="before-price">{{ $numberMask(normalItem.full_price) }}원</div>
				<div class="sale">
					<span class="text">{{ normalItem.sale_rate }}%할인</span>
				</div>
				<div class="after-price">{{ $numberMask(normalItem.price) }}원</div>
			</div>
			<div class="item-wrap box" v-else-if="serviceType == 'one' && serviceList.normalGood">
				<div class="line">
					<div class="label">상품명</div>
					{{ serviceList.normalGood.info }}
				</div>
				<div class="line">
					<div class="label">잔여건수</div>
					{{ serviceList.normalGood.cnt }}
				</div>
				<div class="line">
					<div class="label">이용기간</div>
					{{ serviceList.normalGood.dateE }} 까지
				</div>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" value="free" v-model="serviceType" />
					<span class="box type2"></span>
					<span class="text">무료 이용권</span>
				</label>
			</div>
			<div class="item-wrap box" v-if="serviceType == 'free'">
				<template v-if="serviceList.freeGood != null">
					<div class="line">
						<div class="label">상품명</div>
						{{ serviceList.freeGood.info }}
					</div>
					<div class="line">
						<div class="label">잔여건수</div>
						{{ serviceList.freeGood.cnt }}
					</div>
					<div class="line">
						<div class="label">이용기간</div>
						{{ serviceList.freeGood.dateE }} 까지
					</div>
					<div class="line">
						<div class="label sm">(* 무료 이용권 이용 시, 1개가 차감됩니다.)</div>
					</div>
				</template>
				<!-- 이용권 없을시 -->
				<div class="none" v-else>
					<div class="icon"></div>
					보유한 무료이용권이 없습니다.
				</div>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" value="bus" v-model="serviceType" />
					<span class="box type2"></span>
					<span class="text">비즈니스 회원 이용권</span>
				</label>
				<span class="top-text">비즈니스 회원 전용</span>
			</div>
			<div class="item-wrap box" v-if="serviceType == 'bus'">
				<template v-if="serviceList.bizGood != null">
					<div class="line">
						<div class="label">상품명</div>
						{{ serviceList.bizGood.info }}
					</div>
					<div class="line">
						<div class="label">잔여건수</div>
						{{ serviceList.bizGood.cnt }}
					</div>
					<div class="line">
						<div class="label">이용기간</div>
						{{ serviceList.bizGood.dateE }} 까지
					</div>
					<div class="txt-center">
						<button type="button" class="btn btn-primary btn-normal" @click="$btnOnRouter('/business/pay')">
							상품 구매
						</button>
					</div>
				</template>
				<!-- 이용권 없을시 -->
				<div class="none" v-else>
					<div class="icon"></div>
					보유한 상품이 없습니다.
					<div class="txt-center">
						<button
							type="button"
							class="btn btn-primary btn-normal m-t--20"
							@click="modalShow = true"
							v-if="userType == 1"
						>
							상품 구매
						</button>
						<button
							type="button"
							class="btn btn-primary btn-normal m-t--20"
							@click="$btnOnRouter('/business/pay')"
							v-else
						>
							상품 구매
						</button>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<div class="btn-wrap m-t--40">
		<button type="button" class="btn btn-big btn-primary w-160" @click="payService()">결제하기</button>
	</div>
	<ModalPay v-if="modalShow" @closeModal="modalShow = false" />
</template>

<script>
import { mapGetters } from 'vuex';
import ModalPay from '../../../components/Modal/Service/ModalPay';
export default {
	name: 'Alarm',
	components: { ModalPay },
	computed: {
		...mapGetters({
			goodId: 'getGoodId',
		}),
	},
	data() {
		return {
			serviceType: 'one',
			modalShow: false,
			serviceList: {},
			userType: '',
			serviceId: '',
			normalItem: null,
		};
	},

	created() {
		this.getServiceItem();
		this.getUserType();
	},
	updated() {},
	methods: {
		getServiceItem() {
			this.$apiGET('/api/goods').then(re => {
				if (!re.normalGood) {
					this.$apiGET('/api/goods/normal').then(no => {
						this.normalItem = no;
					});
				}
				this.serviceList = re;
			});
		},
		getUserType() {
			this.$apiGET('/api/grade').then(re => {
				// 0 비즈니스 1 일반
				this.userType = re.grade;
			});
		},
		payService() {
			if (this.serviceType == 'one') {
				if (this.serviceList.normalGood == null) {
					this.serviceId = this.normalItem.gId;
					// this.$btnOnRouter('/report/request/pay', { id: this.serviceId });
                    this.$store.dispatch('callSetGoodId', this.serviceId);
                    this.$btnOnRouter('/report/request/pay');
					return;
				} else this.serviceId = this.serviceList.normalGood.gId;
			} else if (this.serviceType == 'free') {
				if (this.serviceList.freeGood == null) {
					alert('무료 이용권이 없습니다.');
					return;
				} else this.serviceId = this.serviceList.freeGood.gId;
			} else if (this.serviceType == 'bus') {
				if (this.serviceList.bizGood == null) {
					alert('비즈니스 회원 이용권이 없습니다.');
					return;
				} else this.serviceId = this.serviceList.bizGood.gId;
			}
			this.$btnOnRouter('/report/request/publish', { id: this.serviceId });
		},
	},
};
</script>
