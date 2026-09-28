<template>
	<div class="container">
		<div class="section w-1000">
			<div class="section-tit boder-grey">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				변동 알림 서비스 신청
			</div>
			<div class="my-card w-1000">
				<div class="my-card--tit">
					신청 정보 입력
					<span class="right">* 표시는 필수 입력사항입니다.</span>
				</div>
				<div class="input-wrap">
					<label class="input-label">* 성명</label>
					<input type="text" class="input-text" :value="userInfo.name" disabled />
				</div>
				<div class="input-wrap">
					<label class="input-label">* 주민등록번호</label>
					<input type="number" class="input-text" v-model="userInfo.RRN1" />
					<span class="unit">-</span>
					<input type="number" class="input-text" v-model="userInfo.RRN2" />
				</div>
				<div class="input-wrap mo-block">
					<label class="input-label">* 주소</label>
					<button type="button" class="btn btn-primary btn-normal" @click="modalST = true">주소검색</button>
					<span v-if="!userInfo.jibunAddr" class="input-guide top">
						기본 주소<span class="txt-c--primary">* 주민등록지 주소를 입력하세요.</span>
					</span>
					<input
						type="text"
						class="input-text"
						v-bind:class="{ error: !userInfo.jibunAddr }"
						readonly
						:value="userInfo.jibunAddr"
					/>
				</div>
				<div class="input-wrap mo-block m-t-0">
					<label class="input-label"></label>
					<span class="input-guide top">
						상세 주소
						<span class="txt-c--primary" v-if="!userInfo.detailAddr">예) 101동 101호 (삼성동, 삼성아파트)</span>
					</span>
					<input
						type="text"
						class="input-text"
						v-bind:class="{ error: !userInfo.detailAddr }"
						v-model="userInfo.detailAddr"
					/>
				</div>
				<div class="input-wrap">
					<label class="input-label">* 휴대폰번호</label>
					<input type="text" class="input-text" :value="userInfo.phone1" disabled />
					<span class="unit">-</span>
					<input type="text" class="input-text" :value="userInfo.phone2" disabled />
					<span class="unit">-</span>
					<input type="text" class="input-text" :value="userInfo.phone3" disabled />
				</div>
			</div>
			<div class="btn-wrap m-t--90">
				<button type="button" class="btn btn-primary btn-big" @click="nextStep">다음</button>
			</div>
		</div>
	</div>
	<ModalApp v-if="modalST" @closeModal="closeModal" @resultAddress="resultAddress" />
</template>
<script>
import { mapGetters } from 'vuex';
import ModalApp from '../../../components/Alarm/ModalRequest';

export default {
	name: 'Request',
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
				id: null,
				name: null,
				phone1: null,
				phone2: null,
				phone3: null,
				RRN1: null,
				RRN2: null,
				jibunAddr: '',
				detailAddr: '',

				applyType: '',
				applyJibunAddr: '',
				applyDetailAddr: '',
				applyService: '',
			},
		};
	},

	created() {
		console.log(this.applyData);
		this.getInfo();
	},
	updated() {},
	methods: {
		getInfo() {
			this.$apiGET('/api/mypage/info').then(re => {
				this.userInfo.id = re.id;
				this.userInfo.name = re.name;
				this.userInfo.phone1 = re.phone1;
				this.userInfo.phone2 = re.phone2;
				this.userInfo.phone3 = re.phone3;
			});
		},
		closeModal() {
			this.modalST = false;
		},
		resultAddress(isAdr) {
			this.userInfo.jibunAddr = isAdr.jibunAddr;
			this.closeModal();
		},
		nextStep() {
			this.$store.dispatch('callSetApplyData', this.userInfo);
			this.$btnOnRouter('/alarm/request2');
		},
	},
};
</script>
