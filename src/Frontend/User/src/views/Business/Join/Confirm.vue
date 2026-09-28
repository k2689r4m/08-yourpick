<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-input p-b--30">
					<div class="tit">대표자 인증</div>
					<div class="sub txt-c--black">중개사무소 조회</div>
					<ul class="dot-list">
						<li class="dot-list--item">앞서 조회 한 중개사무소의 사업자 대표자 본인 인증을 진행합니다.</li>
						<li class="dot-list--item">
							<span class="txt-c--primary">
								진행 과정에서 해당 대표자 본인 명의에 본인인증수단(휴대전화)을 필요로 합니다.
							</span>
						</li>
						<li class="dot-list--item">대표자 인증이 불가할 경우, 유어픽 비즈니스 이용이 제한됩니다.</li>
					</ul>
				</div>
				<div class="join-input p-t--30 p-b--30">
					<div class="input-wrap">
						<label class="input-label">· 사업자 상호</label>
						<input type="text" class="input-text" :value="userData.office.medOfficeNm" readonly />
					</div>
					<div class="input-wrap">
						<label class="input-label">· 사업자 대표명</label>
						<input type="text" class="input-text" :value="userData.office.rprsvNm" readonly />
					</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="$btnOnRouter('/business/confirm2')">
						대표자 인증 진행
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Confirm',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
