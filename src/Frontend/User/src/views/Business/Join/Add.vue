<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<div class="join-logo type-busi"></div>
				</div>
				<div class="join-input p-b--30">
					<div class="tit">중개사무소 정보 입력</div>
					<div class="sub txt-c--black">중개사무소 조회</div>
					<ul class="dot-list">
						<li class="dot-list--item">
							<span class="txt-c--primary">
								유어픽비즈니스 회원가입은 국가공간정보포털의 부동산중개업 정보에 등록된 중개사무소를 개설 등록한
								대표자(개업공인중개사가) 회원가입 가능합니다.
							</span>
						</li>
						<li class="dot-list--item">‘조회하기’버튼 클릭 후, 중개사무소를 검색하면 관련 정보가 자동입력 됩니다.</li>
						<li class="dot-list--item">중개사무소가 검색되지 않을 경우 고객센터(0000-0000)로 연락바랍니다.</li>
					</ul>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="modal = true">조회하기</button>
				</div>
			</div>
		</div>
	</div>
	<ModalAdd v-if="modal" @closeModal="closeModal" />
</template>

<script>
import ModalAdd from '../../../components/Modal/Business/ModalAdd';

export default {
	name: 'Add',
	components: { ModalAdd },
	computed: {},
	data() {
		return { modal: false };
	},

	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.modal = false;
		},
	},
};
</script>
