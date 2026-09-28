<template>
	<div class="modal show">
		<div class="modal-dim" @click="closeModal"></div>
		<div class="modal-con">
			<div class="modal-tit">
				비밀번호 변경
				<button type="button" class="btn btn-close" @click="closeModal"></button>
			</div>
			<template v-if="!passSt">
				<div class="my-lock">
					<div class="icon"></div>
					개인정보를 안전하게 보호하기 위해<br />
					비밀번호 확인 후 변경 할 수 있습니다.
				</div>
				<div class="input-wrap pass">
					<label class="input-label">· 기존 비밀번호 확인</label>
					<div v-if="rePass == false" class="input-guide error">비밀번호가 일치하지 않습니다.</div>
					<button type="button" class="btn view" v-bind:class="{ active: viewST }" @click="viewST = !viewST"></button>
					<input v-if="viewST" type="text" class="input-text" v-model="password" />
					<input v-else type="password" class="input-text" v-model="password" />
				</div>
				<div class="p-b--20"></div>
				<div class="hr"></div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="checkPass">확인</button>
				</div>
			</template>
			<template v-else-if="passSt">
				<div class="input-wrap pass">
					<label class="input-label">· 새로운 비밀번호</label>
					<div v-if="!checkPW(chagePass.passwd1)" class="input-guide error">
                        8~20자 이내 영문, 숫자, 특수문자 조합으로 만들어주세요.
                    </div>
                    <div v-else class="input-guide">8~20자 이내 영문, 숫자, 특수문자 조합</div>
					<button
						type="button"
						class="btn view"
						v-bind:class="{ active: viewST1 }"
						@click="viewST1 = !viewST1"
					></button>
					<input v-if="viewST1" type="text" class="input-text" v-model="chagePass.passwd1" />
					<input v-else type="password" class="input-text" v-model="chagePass.passwd1" />
				</div>
				<div class="input-wrap pass">
					<label class="input-label">· 비밀번호 확인</label>
					<div
						v-if="chagePass.passwd1 == chagePass.passwd2 && chagePass.passwd1 && chagePass.passwd2"
						class="input-guide collect"
					>
						비밀번호가 일치합니다.
					</div>
					<div v-else class="input-guide error">비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</div>
					<button
						type="button"
						class="btn view"
						v-bind:class="{ active: viewST2 }"
						@click="viewST2 = !viewST2"
					></button>
					<input v-if="viewST2" type="text" class="input-text" v-model="chagePass.passwd2" />
					<input v-else type="password" class="input-text" v-model="chagePass.passwd2" />
				</div>
				<div class="p-b--20"></div>
				<div class="hr"></div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="changePass">확인</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalLogin',
	components: {},
	computed: {},
	data() {
		return {
			passSt: false,
			password: '',
			viewST: false,
			viewST1: false,
			viewST2: false,
			rePass: null,
			chagePass: { passwd1: '', passwd2: '' },
		};
	},

	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
		checkPass() {
			this.$apiPOST('/api/mypage/pwd/check', { password: this.password }).then(re => {
				if (re) {
					this.rePass = re;
					this.passSt = true;
				} else {
					this.rePass = re;
				}
			});
		},
		changePass() {
            if (!(this.chagePass.passwd1 == this.chagePass.passwd2 && this.chagePass.passwd1 && this.chagePass.passwd2) || !this.checkPW(this.chagePass.passwd1)) {
                alert("잘못된 비밀번호입니다.");
                return;
            }

            this.$emit('passChang',this.password, this.chagePass.passwd1);
            this.closeModal();
			// this.$apiPOST('/api/mypage/pwd/change', { password: this.password, passwd: this.chagePass.passwd1 }).then(() => {
			// 	this.closeModal();
			// });
		},
        checkPW(txt){
            var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
            if( !reg.test(txt) ) {
                return false;
            }
            return true;
        },
	},
};
</script>
