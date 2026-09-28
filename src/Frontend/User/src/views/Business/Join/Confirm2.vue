<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-input p-b--30">
					<div class="tit">대표자 휴대폰 인증</div>
					<div class="input-wrap">
						<label class="input-label">· 이름</label>
						<input type="text" class="input-text" :value="userData.office.rprsvNm" readonly />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 생년월일</label>
						<input type="text" class="input-text" placeholder="예) 880501" v-model="this.userData.birthday" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 휴대폰 번호</label>
						<!-- <SlimSelect v-model="selectModel" class="input-select w-sm">
							<option>통신사 선택</option>
						</SlimSelect> -->

						<input
							type="text"
							class="input-text"
							placeholder="‘-’를 제외한 휴대폰 번호 입력"
							v-model="userData.phone"
							@change="userData.phone = $allNumberMask(userData.phone)"
						/>
					</div>
				</div>
				<div class="join-agree p-t--30">
					<div class="tit">대표자 인증 약관</div>
					<label class="input-checkbox">
						<input type="checkbox" v-model="agrStAll" @change="allSelect" />
						<span class="box round"></span>
						<span class="text">모두 동의 합니다.</span>
					</label>
					<div class="hr"></div>
					<ul class="checkbox-list">
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt1" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									개인정보 수집 / 이용 동의
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
									고유식별정보 처리 동의
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
									통신사 이용약관 동의
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt4" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									서비스 이용약관 동의
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
						<li class="checkbox-list--item">
							<label class="input-checkbox">
								<input type="checkbox" v-model="agrSt5" @change="ckSelect" />
								<span class="box check"></span>
								<span class="text">
									<span class="txt-c--primary">[필수]</span>
									개인정보 제3자 제공 동의
								</span>
							</label>
							<button type="button" class="btn more">보기</button>
						</li>
					</ul>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="nextStep">인증번호 받기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
// import SlimSelect from '@slim-select/vue';
export default {
	name: 'Confirm2',
	components: {
		// SlimSelect
	},
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return { agrStAll: false, agrSt1: false, agrSt2: false, agrSt3: false, agrSt4: false, agrSt5: false };
	},

	created() {},
	updated() {},
	methods: {
		allSelect() {
			if (!this.agrStAll) {
				this.agrSt1 = false;
				this.agrSt2 = false;
				this.agrSt3 = false;
				this.agrSt4 = false;
				this.agrSt5 = false;
			} else {
				this.agrSt1 = true;
				this.agrSt2 = true;
				this.agrSt3 = true;
				this.agrSt4 = true;
				this.agrSt5 = true;
			}
		},
		ckSelect() {
			if (!(this.agrSt1 && this.agrSt2 && this.agrSt3 && this.agrSt4 && this.agrSt5)) {
				this.agrStAll = false;
			}
		},
		nextStep() {
			if (!this.$birthCheck(this.userData.birthday)) {
				alert('올바른 생년월일을 입력해 주세요.');
				return;
			}

			if (!this.userData.phone) {
				alert('올바른 휴대폰번호를 입력해 주세요.');
				return;
			}

			if (!(this.agrSt1 && this.agrSt2 && this.agrSt3 && this.agrSt4 && this.agrSt5)) {
				alert('약관에 동의 해주세요');
				return;
			}

			this.$apiPOST('/user/join/cert', this.userData).then(re => {
				if (re) {
					this.$store.dispatch('callSetUserData2', this.userData);
					this.$btnOnRouter('/business/number');
				}
			});
		},
	},
};
</script>
