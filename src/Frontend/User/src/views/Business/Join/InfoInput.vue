<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-input">
					<div class="tit">중개사무소 정보 입력</div>
					<div class="input-wrap">
						<label class="input-label">· 사업자 상호</label>
						<input type="text" class="input-text" v-model="userData.office.medOfficeNm" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 사업자 대표명</label>
						<input type="text" class="input-text" v-model="userData.office.rprsvNm" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 중개등록번호</label>
						<input type="text" class="input-text" v-model="userData.office.estblRegNo" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 주소지</label>
						<input type="text" class="input-text" v-model="userData.office.lctnLotnoAddr" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 전화번호</label>
						<input type="text" class="input-text" v-model="userData.office.telno" />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 사업자등록번호</label>
						<input type="number" class="input-text" placeholder="000" v-model="userData.office.businessNum1" />
						<span class="unit">-</span>
						<input type="number" class="input-text" placeholder="00" v-model="userData.office.businessNum2" />
						<span class="unit">-</span>
						<input type="number" class="input-text" placeholder="00000" v-model="userData.office.businessNum3" />
					</div>
					<div class="input-wrap m-p--d">
						<label class="input-label">
							· 관련 제출 서류 첨부<br />
							<p class="guide">(첨부파일 형식 :<br class="m-none" />png, jpg, gif, jpeg)</p>
						</label>
						<div v-if="!bizObj.src" class="input-guide error">사업자등록증을 등록해 주세요.</div>
						<div class="file">
							<div class="label">사업자등록증</div>
							<label>
								<input type="file" accept="image/*" @change="imgFileUp($event, 'biz')" ref="bizFile" />
								<div class="img-box">
									<template v-if="bizObj.src">
										<img :src="bizObj.src" alt="" />
										<button type="button" class="btn btn-delete" @click="imgFileDel('biz')">&times;</button>
									</template>
								</div>
							</label>
						</div>
						<div class="file">
							<div class="label">중개등록증</div>
							<label>
								<input type="file" accept="image/*" @change="imgFileUp($event, 'mid')" ref="midFile" />
								<div class="img-box">
									<template v-if="midObj.src">
										<img :src="midObj.src" alt="" />
										<button type="button" class="btn btn-delete" @click="imgFileDel('mid')">&times;</button>
									</template>
								</div>
							</label>
						</div>
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="nextStep">다음</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'InfoInpu',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return {
			bizObj: {
				file: null,
				src: null,
			},
			midObj: {
				file: null,
				src: null,
			},
		};
	},

	created() {},
	updated() {},
	methods: {
		imgFileUp(e, mode) {
			if (!e.target.files.length) {
				return;
			}

			if (!e.target.files[0].type.match('image/.*')) {
				alert('이미지 확장자만 업로드 가능합니다.');
				return;
			}

			if (mode == 'biz') {
				this.bizObj.file = e.target.files[0];
				this.bizObj.src = URL.createObjectURL(this.bizObj.file);
			} else {
				this.midObj.file = e.target.files[0];
				this.midObj.src = URL.createObjectURL(this.midObj.file);
			}
		},
		imgFileDel(mode) {
			if (mode == 'biz') {
				this.bizObj = { file: null, src: null };
			} else {
				this.midObj = { file: null, src: null };
			}
		},
		async nextStep() {
			if (!this.userData.office.medOfficeNm) {
				alert('상호를 입력해 주세요.');
				return;
			}
			if (!this.userData.office.rprsvNm) {
				alert('대표명을 입력해 주세요.');
				return;
			}
			if (!this.userData.office.estblRegNo) {
				alert('중개등록번호을 입력해 주세요.');
				return;
			}
			if (!this.userData.office.lctnLotnoAddr) {
				alert('주소를 입력해 주세요.');
				return;
			}
			if (!this.userData.office.telno) {
				alert('전화번호를 입력해 주세요.');
				return;
			}
			if (
				!this.userData.office.businessNum1 ||
				!this.userData.office.businessNum2 ||
				!this.userData.office.businessNum3
			) {
				alert('사업자등록번호를 입력해 주세요.');
				return;
			}
			if (!this.bizObj.src || !this.midObj.src) {
				alert('등록증을 등록해 주세요.');
				return;
			}

			this.userData.office.businessNum =
				this.userData.office.businessNum1 +
				'-' +
				this.userData.office.businessNum2 +
				'-' +
				this.userData.office.businessNum3;

			this.userData.bizFile = await this.$fileToBase64(this.bizObj.file);
			this.userData.midFile = await this.$fileToBase64(this.midObj.file);

			this.$store.dispatch('callSetUserData2', this.userData);

			this.$btnOnRouter('/business/confirm');
		},
	},
};
</script>
