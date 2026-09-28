<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">서비스 요금 관리</div>
			<div class="tab-con">
				<div class="table-top">
					<div class="left">
						<div class="tit">일반 상품 이용권</div>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th rowspan="2">사용</th>
							<th rowspan="2">서비스 명</th>
							<th rowspan="2">서비스 내용</th>
							<th colspan="6">범위</th>
						</tr>
						<tr>
							<th>정상가</th>
							<th>할인금액</th>
							<th>이용료</th>
							<th>할인율</th>
							<th>개수</th>
							<th>기간(Month)</th>
						</tr>
						<tr v-for="item in itemList" :key="'item_' + item.id">
							<td>
								<label class="input-checkbox">
									<input type="checkbox" true-value="Y" false-value="N" v-model="item.st" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ item.name }}</td>
							<td><input type="text" class="form-control" v-model="item.info" /></td>
							<td>
								<input type="number" class="form-control" v-model="item.full_price" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.sale_price" @change="saleCalc" disabled />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.price" @change="saleCalc" disabled />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.sale_rate" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.cnt" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.use_date_month" @change="saleCalc" />
							</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">비즈니스 상품 이용권</div>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th rowspan="2">사용</th>
							<th rowspan="2">서비스 명</th>
							<th rowspan="2">서비스 내용</th>
							<th colspan="6">범위</th>
						</tr>
						<tr>
							<th>정상가</th>
							<th>할인금액</th>
							<th>이용료</th>
							<th>할인율</th>
							<th>개수</th>
							<th>기간(Month)</th>
						</tr>
						<tr v-for="item in bizItemList" :key="'item_' + item.id">
							<td>
								<label class="input-checkbox">
									<input type="checkbox" true-value="Y" false-value="N" v-model="item.st" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ item.name }}</td>
							<td><input type="text" class="form-control" v-model="item.info" /></td>
							<td>
								<input type="number" class="form-control" v-model="item.full_price" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.sale_price" @change="saleCalc" disabled />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.price" @change="saleCalc" disabled />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.sale_rate" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.cnt" @change="saleCalc" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="item.use_date_month" @change="saleCalc" />
							</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap mt-4">
					<button type="button" class="btn btn-sm btn-primary" @click="saveItem">수정</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Kakao',
	components: {},
	data() {
		return {
			itemList: [],
			bizItemList: [],
		};
	},
	created() {
		this.getItemList();
	},
	computed: {},
	methods: {
		getItemList() {
			this.$apiGET('/admin/pay/good').then(data => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].grade == 1) {
						this.itemList.push(data[i]);
					} else if (data[i].grade == 0) {
						this.bizItemList.push(data[i]);
					}
				}
			});
		},
		saleCalc() {
			for (let i = 0; i < this.itemList.length; i++) {
				this.itemList[i].sale_price = Math.floor(this.itemList[i].full_price * (this.itemList[i].sale_rate * 0.01));
				this.itemList[i].price = Math.floor(this.itemList[i].full_price - this.itemList[i].sale_price);
			}
			for (let i = 0; i < this.bizItemList.length; i++) {
				this.bizItemList[i].sale_price = Math.floor(
					this.bizItemList[i].full_price * (this.bizItemList[i].sale_rate * 0.01),
				);
				this.bizItemList[i].price = Math.floor(this.bizItemList[i].full_price - this.bizItemList[i].sale_price);
			}
		},
		saveItem() {
			let itemList = [];
			itemList.push(...this.itemList);
			itemList.push(...this.bizItemList);

			this.saleCalc(itemList);

			this.$apiPOST('/admin/pay/good', { itemList: itemList }).then(() => {
				alert('저장완료');
			});
		},
	},
};
</script>

<style></style>
