<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-agree">
					<div class="tit">약관 동의</div>
					<label class="input-checkbox">
						<input type="checkbox" v-model="agrStAll" @click="allSelect" />
						<span class="box round"></span>
						<span class="text"
							>모두 동의 합니다.<br /><span class="sub"
								>이용약관, 개인정보 수집 및 이용, 마케팅 · 이벤트정보 수신(선택)에 모두 동의합니다.
							</span></span
						>
					</label>
					<div class="hr"></div>
					<ul class="checkbox-list">
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt1" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									유어픽 서비스 이용약관 동의
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt2" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									개인정보 수집 및 이용에 대한 동의
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt3" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									만 14세 이상입니다.
								</span>
							</label>
						</li>
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt4" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--grey">[선택]</span>
									마케팅 · 이벤트 정보 알림 수신에 동의합니다.
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
					</ul>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="nextPage">다음</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Agree',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return {
			agrStAll: false,
			agrSt1: false,
			agrSt2: false,
			agrSt3: false,
			agrSt4: false,
		};
	},

	created() {},
	updated() {},
	methods: {
		allSelect() {
			if (this.agrStAll) {
				this.agrSt1 = false;
				this.agrSt2 = false;
				this.agrSt3 = false;
				this.agrSt4 = false;
			} else {
				this.agrSt1 = true;
				this.agrSt2 = true;
				this.agrSt3 = true;
				this.agrSt4 = true;
			}
		},
		ckSelect() {
			if (!(this.agrSt1 && this.agrSt2 && this.agrSt3 && this.agrSt4)) {
				this.agrStAll = false;
			}
		},
		nextPage() {
			if (!(this.agrSt1 && this.agrSt2 && this.agrSt3)) {
				alert('약관에 동의 해주세요');
				return;
			}

			this.userData.agreeSt = this.agrSt4;
			this.$store.dispatch('callSetUserData2', this.userData);

			this.$btnOnRouter('/business/join');
		},
	},
};
</script>
