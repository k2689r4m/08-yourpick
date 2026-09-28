<template>
	<div class="modal show">
		<div class="modal-dim" @click="closeModal"></div>
		<div class="modal-con">
			<div class="modal-tit">
				회원탈퇴
				<button type="button" class="btn btn-close" @click="closeModal"></button>
			</div>
			<div class="txt-only p-b--30">
				회원탈퇴를 신청하기 전에 아래 안내 사항을 한 번 더 확인해 주세요.<br />
				1. 회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.<br />
				2. 회원 탈퇴 시, 회원 전용 웹 서비스 이용이 불가합니다.<br />
				3. 탈퇴시 회원 정보 및 찜 서비스, 등록한 게시물 이용 기록이 모두 삭제됩니다.<br />
				4. 회원 정보 및 서비스 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.<br />
				5. 광고를 위한 매물이 등록되어 있을 경우, 탈퇴 시 모든 정보는 삭제 처리됩니다.
			</div>
			<div class="input-wrap m-p--0">
				<SlimSelect v-model="selectModel" class="input-select">
					<option value="">탈퇴 사유를 선택해 주세요.</option>
					<option>탈퇴 후 재가입 하려함</option>
					<option>더 이상 이용하지 않음</option>
					<option>원하는 정보가 아니라서</option>
					<option>사용하기 불편해서</option>
				</SlimSelect>
			</div>
			<div class="input-wrap m-t--20 m-p--0">
				<textarea
					class="input-textarea"
					rows="5"
					placeholder="다른 사유가 있다면 입력해 주세요."
					v-model="moreMemo"
				></textarea>
			</div>
			<div class="input-wrap m-t--20 m-p--0">
				<label class="input-checkbox">
					<input type="checkbox" v-model="agree" />
					<span class="box"></span>
					<span class="text">안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
				</label>
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn btn-big btn-primary" @click="sendPost">확인</button>
			</div>
		</div>
	</div>
</template>

<script>
import SlimSelect from '@slim-select/vue';

export default {
	name: 'ModalLogin',
	components: { SlimSelect },
	computed: {},
	data() {
		return {
			selectModel: null,
			agree: false,
			moreMemo: '',
		};
	},

	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
		sendPost() {
			if (!this.selectModel) {
				alert('탈퇴 사유를 선택해 주세요.');
				return;
			}

			if (!this.agree) {
				alert('안내사항에 동의를 해주세요.');
				return;
			}

			this.$apiPOST('/api/mypage/info/quit', {
				reason: this.selectModel,
				moreMemo: this.moreMemo,
			}).then(re => {
				if (re) {
					this.$apiLOGOUT();
				}
			});
		},
	},
};
</script>
