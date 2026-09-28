<template>
	<div class="modal show">
		<div class="modal-dim" @click="closeModal"></div>
		<div class="modal-con">
			<div class="modal-tit">
				중개사무소 조회
				<button type="button" class="btn btn-close" @click="closeModal"></button>
			</div>
			<div class="search-wrap">
				<input
					type="text"
					class="input-text"
					placeholder="상호명 / 대표 성명 / 중개등록번호(’-’포함)"
					v-model="keyword"
					@keyup.enter="getItemList"
				/>
				<button type="button" class="btn btn-search" @click="getItemList"></button>
			</div>
			<div class="checklist-box scroll">
				<!-- 검색전 -->
				<!-- <div class="txt-c--grey m-t--10 txt-size--13">
                · 중개사무소 개설 등록 당시 신고한 내역을 기준으로 검색 바랍니다.
            </div> -->
				<!-- //검색전 -->
				<label v-for="item in itemList" :key="'key___' + item.estblRegNo">
					<input type="checkbox" v-model="item.st" />
					<div class="box">
						<div class="line">
							<span class="label">사업자 상호</span>
							<span class="con">{{ item.medOfficeNm }}</span>
						</div>
						<div class="line">
							<span class="label">사업자 대표명</span>
							<span class="con">{{ item.rprsvNm }}</span>
						</div>
						<div class="line">
							<span class="label">중개등록번호</span>
							<span class="con">{{ item.estblRegNo }}</span>
						</div>
					</div>
				</label>
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn btn-full btn-primary" @click="selectItem">확인</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ModalAdd',
	components: {},
	computed: {
		...mapGetters({
			userData: 'getUserData2',
		}),
	},
	data() {
		return {
			keyword: '',
			itemList: [],
		};
	},
	created() {},
	updated() {},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
		getItemList() {
			this.$apiGET('/user/biz?keyword=' + this.keyword).then(data => {
				for (let i = 0; i < data.length; i++) {
					data[i].st = false;
				}
				this.itemList = data;
			});
		},
		selectItem() {
			// $btnOnRouter('/business/infoInput')
			let item = null;
			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].st == true) {
					item = this.itemList[i];
					break;
				}
			}

			if (item) {
				this.userData.office = item;
				this.$store.dispatch('callSetUserData2', this.userData);
				this.$btnOnRouter('/business/infoInput');
			}
		},
	},
};
</script>
