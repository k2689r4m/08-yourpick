<template>
	<div class="container">
		<div class="section w-1000">
			<div class="section-tit boder-grey">변동 알림 서비스 신청</div>
			<div class="my-card w-1000">
				<div class="my-card--tit mm-0">* 보안문자</div>
				<div class="m-block m-t--10"></div>
				<img src="https://www.gov.kr/nlogin/captcha?id=0.8335820637855433" alt="보안문자" />
				<div class="input-wrap m-t--10">
					<input type="text" class="input-text" />
				</div>
			</div>
			<div class="btn-wrap m-t--90">
				<button type="button" class="btn btn-primary btn-big" @click="nextStep">확인</button>
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
