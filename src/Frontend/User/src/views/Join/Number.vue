<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
					<div class="join-logo"></div>
					&nbsp;&nbsp; 일반 회원가입
				</div>
				<div class="join-input">
					<div class="tit">휴대폰 인증</div>
					<div class="sub">
						<!-- +82 10 4154 5319로 전송된 인증번호를 입력해 주세요. -->
						{{ userData.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`) }}로 전송된 인증번호를 입력해 주세요.
					</div>
					<div class="input-wrap count m-p--0">
						<span class="text txt-c--blue">{{ TimerStr }}</span>
						<input type="tel" class="input-text" placeholder="인증번호 6자리" v-model="otpNum" />
					</div>
					<div class="m-t--30 txt-c--grey txt-size--15">
						인증 문자를 받지 못하셨나요?
						<button type="button" class="btn m-l--10 txt-c--dgrey txt-size--15" @click="reOTP">
							<strong>다시받기</strong>
						</button>
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="checkOTP">인증번호 확인</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Number',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData',
		}),
	},
	data() {
		return {
			otpNum: '',
			Timer: null,
			TimeCounter: 180,
			TimerStr: '03:00',
		};
	},

	created() {
		this.Timer = this.timerStart();
	},
	unmounted() {
		clearInterval(this.Timer);
	},
	updated() {},
	methods: {
		reOTP() {
			this.$apiPOST('/user/join/cert', this.userData).then(re => {
				if (re) {
					clearInterval(this.Timer);
					this.Timer = this.timerStart();

					this.$store.dispatch('callSetUserData', this.userData);
					this.$btnOnRouter('/join/number');
				}
			});
		},
		checkOTP() {
			this.$apiPOST('/user/join/cert/check', {
				phone: this.userData.phone,
				otpNum: this.otpNum,
			}).then(re => {
				if (re) {
					this.$btnOnRouter('/join/infoInput');
				} else {
					alert('잘못된 인증번호 입니다. 다시 시도해주세요.');
				}
			});
		},
		prettyTime() {
			// 시간 형식으로 변환 리턴
			let time = this.TimeCounter / 60;
			let minutes = parseInt(time);
			let secondes = Math.round((time - minutes) * 60);
			return minutes.toString().padStart(2, '0') + ':' + secondes.toString().padStart(2, '0');
		},
		timerStart() {
			// 1초에 한번씩 start 호출
			this.TimeCounter = 180;
			var interval = setInterval(() => {
				this.TimeCounter--; //1초씩 감소
				this.TimerStr = this.prettyTime();

				if (this.TimeCounter <= 0) {
					this.timerStop(interval);
					this.TimerStr = '03:00';
					this.Timer = null;
					this.optSt = false;
					alert('인증시간(3분)이 초과되었습니다. 다시 시도해주세요.');
				}
			}, 1000);
			return interval;
		},
		timerStop(Timer) {
			clearInterval(Timer);
			this.TimeCounter = 0;
		},
	},
};
</script>
