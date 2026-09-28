<template>
	<div class="container">
		<div class="section w-1000">
			<div class="section-tit boder-grey">변동 알림 서비스 신청</div>
			<div class="my-card w-1000">
				<div class="my-card--tit mm-0">
					* 신청 구분
					<span class="right">* 표시는 필수 입력사항입니다.</span>
				</div>
				<div class="input-wrap m-p-0">
					<label class="input-radio">
						<input type="radio" name="radio" v-model="userInfo.applyType" value="new" />
						<span class="text-box">신규</span>
					</label>
					<label class="input-radio">
						<input type="radio" name="radio" v-model="userInfo.applyType" value="cng" />
						<span class="text-box">변경</span>
					</label>
					<label class="input-radio">
						<input type="radio" name="radio" v-model="userInfo.applyType" value="del" />
						<span class="text-box">해지</span>
					</label>
				</div>
			</div>
			<div class="my-card w-1000">
				<div class="my-card--tit mm-0">신청 대상 주소지</div>
				<div class="input-wrap mo-block m-t--40">
					<label class="input-label">* 주소</label>
					<button type="button" class="btn btn-primary btn-normal" @click="modalST = true">주소검색</button>
					<span class="input-guide top" v-if="!userInfo.applyJibunAddr">
						기본 주소<span class="txt-c--primary">* 전입통보 서비스를 받을주소를 입력하세요.</span>
					</span>
					<input
						type="text"
						class="input-text"
						v-bind:class="{ error: !userInfo.applyJibunAddr }"
						v-model="userInfo.applyJibunAddr"
						readonly
					/>
				</div>
				<div class="input-wrap mo-block m-t-0">
					<label class="input-label"></label>
					<span class="input-guide top">상세 주소</span>
					<input
						type="text"
						class="input-text"
						v-bind:class="{ error: !userInfo.applyDetailAddr }"
						v-model="userInfo.applyDetailAddr"
					/>
				</div>
			</div>
			<div class="my-card w-1000">
				<div class="my-card--tit mm-0">
					* 신청 서비스
					<span class="right">* 표시는 필수 입력사항입니다.</span>
				</div>
				<div class="input-wrap mo-block">
					<label class="input-radio m-r--20">
						<input type="radio" name="radio2" v-model="userInfo.applyService" value="jeonip" />
						<span class="box"></span>
						<span class="text">전입신고 (휴대전화 문자 전송 SMS)</span>
					</label>
					<label class="input-radio mm-t-20">
						<input type="radio" name="radio2" v-model="userInfo.applyService" value="sedaeju" />
						<span class="box"></span>
						<span class="text">세대주 변경 (휴대전화 문자 전송 SMS)</span>
					</label>
				</div>
			</div>
			<div class="btn-wrap m-t--90">
				<button type="button" class="btn btn-primary btn-big" @click="nextStep">신청하기</button>
			</div>
		</div>
	</div>
	<ModalApp v-if="modalST" @closeModal="closeModal" @resultAddress="resultAddress" />
</template>

<script>
import { mapGetters } from 'vuex';
import ModalApp from '../../../components/Alarm/ModalRequest';
export default {
	name: 'Request2',
	components: { ModalApp },
	computed: {
		...mapGetters({
			applyData: 'getApplyData',
		}),
	},
	data() {
		return {
			modalST: false,
			userInfo: {
				applyType: 'new',
				applyJibunAddr: '',
				applyDetailAddr: '',
				applyService: 'jeonip',
			},
		};
	},
	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.modalST = false;
		},
		resultAddress(isAdr) {
			this.userInfo.applyJibunAddr = isAdr.jibunAddr;
			this.closeModal();
		},
		nextStep() {
			let _applyData = this.applyData;
			_applyData.applyType = this.userInfo.applyType;
			_applyData.applyJibunAddr = this.userInfo.applyJibunAddr;
			_applyData.applyDetailAddr = this.userInfo.applyDetailAddr;
			_applyData.applyService = this.userInfo.applyService;

			this.$apiPOST('/api/alarm', _applyData).then(re => {
				console.log(re);
			});

			// this.$store.dispatch('callSetApplyData', this.userInfo);
			// this.$btnOnRouter('/alarm/complete');
		},
	},
};
</script>
