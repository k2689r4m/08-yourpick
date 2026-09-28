<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">콘텐츠 관리 화면</div>
			<div class="tab-con">
				<div class="table-top">
					<div class="left">
						<div class="tit">콘텐츠</div>
					</div>
				</div>
				<div class="d-flex justify-content-between mb-3">
					<div
						class="card p-3 w-100"
						v-for="(item, idx) in itemList"
						:key="'new1_' + item.id"
						v-bind:class="{ 'm-r--2': !(idx == itemList.length - 1) }"
					>
						<div class="mb-3">
							<strong class="txt-size--md">{{ $CONTENT_TYPE[item.mode] }}</strong>
						</div>
						<div>{{ item.content }}</div>
					</div>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">콘텐츠 현황</div>
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="popup = true">노출순서편집</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="33%" />
							<col width="33%" />
							<col width="33%" />
						</colgroup>
						<tr>
							<th>콘텐츠 제목</th>
							<th>콘텐츠 내용</th>
							<th>노출 순서</th>
						</tr>
						<tr v-for="item in itemList" :key="'new_' + item.id">
							<td>{{ $CONTENT_TYPE[item.mode] }}</td>
							<td>{{ item.content }}</td>
							<td>{{ item.viewSort }}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="popup-wrap" v-if="popup">
		<div class="dim"></div>
		<div class="popup">
			<div class="popup-tit">
				&nbsp;
				<button type="button" class="btn btn-close" @click="popup = false"></button>
			</div>
			<div class="popup-con">
				<div class="table-text">
					<table class="table">
						<tr>
							<th>콘텐츠 내용</th>
							<th>콘텐츠 노출순서</th>
						</tr>
						<tr v-for="so in sortList" :key="so.id + '_sor'">
							<td>{{ so.content }}</td>
							<td>
								<select class="form-select" v-model="so.viewSort" @change="ckSort($event, so.id)">
									<option value="">선택</option>
									<option :value="1">1</option>
									<option :value="2">2</option>
									<option :value="3">3</option>
									<option :value="4">4</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-secondary" @click="popup = false">취소</button>
					<button type="button" class="btn btn-sm btn-primary" @click="updateSort">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Approval',
	components: {},
	data() {
		return {
			itemList: null,
			popup: false,
			sortList: [],
			sortObj: {
				s1: null,
				s2: null,
				s3: null,
				s4: null,
			},
		};
	},
	created() {
		this.getSort();
		this.getContent();
	},
	computed: {},
	methods: {
		getSort() {
			this.$apiGET('/admin/content/sort').then(re => {
				if (re) {
					for (let i = 0; i < re.length; i++) {
						if (re[i].viewSort == null) {
							re[i].viewSort = '';
						}
					}
					this.sortList = re;
				}
			});
		},
		ckSort(e, isId) {
			const target = e.target.value;
			if (!target) {
				return;
			}

			for (let i = 0; i < this.sortList.length; i++) {
				if (this.sortList[i].viewSort == target && this.sortList[i].id != isId) {
					this.sortList[i].viewSort = '';
				}
			}
		},
		updateSort() {
			for (let i = 0; i < this.sortList.length; i++) {
				if (this.sortList[i].viewSort == 1) {
					this.sortObj.s1 = this.sortList[i].id;
				}
				if (this.sortList[i].viewSort == 2) {
					this.sortObj.s2 = this.sortList[i].id;
				}
				if (this.sortList[i].viewSort == 3) {
					this.sortObj.s3 = this.sortList[i].id;
				}
				if (this.sortList[i].viewSort == 4) {
					this.sortObj.s4 = this.sortList[i].id;
				}
			}

			this.$apiPOST('/admin/content/sort/update', this.sortObj).then(() => {
				this.popup = false;
			});
		},
		getContent() {
			this.$apiGET('/admin/content/main').then(data => {
				this.itemList = data;
			});
		},
	},
};
</script>

<style></style>
