<template>
	<div class="modal show">
		<div class="modal-dim" @click="closeModal"></div>
		<div class="modal-con">
			<div class="modal-tit">
				주소 검색
				<button type="button" class="btn btn-close" @click="closeModal"></button>
			</div>
			<div class="search-wrap">
				<input type="text" class="input-text" v-model="adr" @keyup.enter="getAddr" />
				<button type="button" class="btn btn-search" @click="getAddr"></button>
			</div>
			<div class="checklist-box scroll">
				<label v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
					<input type="radio" name="addRadio" v-model="isItem" :value="isAdr" />
					<div class="box">
						<div class="line">
							<span class="con">{{ isAdr.jibunAddr }}</span>
						</div>
					</div>
				</label>
			</div>
			<div class="btn-wrap">
				<button
					type="button"
					class="btn btn-full btn-primary"
					@click="$emit('resultAddress', isItem)"
					:disabled="!isItem"
				>
					확인
				</button>
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

			adr: '',
			adrList: [],
			isItem: null,
		};
	},
	created() {},
	updated() {},
	methods: {
		getAddr() {
			this.isItem = null;
			let addr = '';
			addr = this.adr;

			if (!addr) {
				return;
			}

			this.$apiGET('/user/addr/link?addr=' + addr).then(re => {
				this.adrList = re;
			});
		},
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
