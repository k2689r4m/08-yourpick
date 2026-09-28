<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">안심거래리포트 발급 현황</div>
			<div class="tab-con">
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="15%" />
							<col width="35%" />
							<col width="15%" />
							<col width="35%" />
						</colgroup>
						<tr>
							<th>오늘 발급현황</th>
							<td>{{ st.day }}건</td>
							<th>발급 실패</th>
							<td>{{ st.fail }}건</td>
						</tr>
						<tr>
							<th>이달 발급 현황</th>
							<td colspan="3">{{ st.month }}건</td>
						</tr>
					</table>
				</div>
				<div class="search-top">
					<div class="left">
						<div class="input-label">
							<select class="form-select">
								<option>이름</option>
							</select>
						</div>
						<input type="text" class="form-control md" v-model="searchOption.keyword" @keyup.enter="getItemList(1)" />
						<input type="date" class="form-control sm" v-model="searchOption.date_s" />
						<div class="search-top--text">~</div>
						<input type="date" class="form-control sm" v-model="searchOption.date_e" />
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="getExcel">엑셀다운</button>
						<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
					</div>
				</div>
				<div class="table-top">
					<div class="left"></div>
					<div class="right">
						<select class="form-select" v-model="searchOption.adr">
							<option value="">지역별</option>
							<option v-for="item in adrList" :key="'adr_' + item.cortarno" :value="item.cortarno.substr(0, 2)">
								{{ item.name }}
							</option>
						</select>
						<select class="form-select" v-model="searchOption.buildingType">
							<option value="">거래유형</option>
							<option value="아파트">아파트</option>
							<option value="오피스텔">오피스텔</option>
						</select>
						<select class="form-select" v-model="searchOption.tradeType">
							<option value="">건물유형</option>
							<option value="A1">매매</option>
							<option value="B1">전세</option>
							<option value="B2">월세</option>
						</select>
					</div>
				</div>
				<div class="tab-btn">
					<button
						type="button"
						class="btn tab"
						v-bind:class="{ active: mode == 'normal' }"
						@click="clearSearch('normal')"
					>
						발급 현황
					</button>
					<button type="button" class="btn tab" v-bind:class="{ active: mode == 'fail' }" @click="clearSearch('fail')">
						발급 실패 현황
					</button>
				</div>
				<div class="table-wrap">
					<table class="table" v-if="mode == 'normal'">
						<tr>
							<th>No</th>
							<th>이름</th>
							<th>이메일</th>
							<th>휴대폰번호</th>
							<th>회원유형</th>
							<th>발급주소</th>
							<th>거래유형</th>
							<th>건물유형</th>
							<th>결제항목</th>
							<th>발급일</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'mem_' + item.id">
							<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ $phoneMask(item.phone) }}</td>
							<td>{{ item.userType }}</td>
							<td>{{ item.address }}</td>
							<td>{{ $TRADE_TYPE[item.tradeType] }}</td>
							<td>{{ item.mainPurpsCdNm }}</td>
							<td>{{ item.payType }}</td>
							<td>{{ item.updated_at }}</td>
						</tr>
					</table>
					<table class="table" v-else>
						<tr>
							<th>No</th>
							<th>이름</th>
							<th>이메일</th>
							<th>휴대폰번호</th>
							<th>회원유형</th>
							<th>발급주소</th>
							<th>거래유형</th>
							<th>건물유형</th>
							<th>발급일</th>
							<th>실패원인</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'mem_' + item.id">
							<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ $phoneMask(item.phone) }}</td>
							<td>{{ item.userType }}</td>
							<td>{{ item.address }}</td>
							<td>{{ $TRADE_TYPE[item.tradeType] }}</td>
							<td>{{ item.mainPurpsCdNm }}</td>
							<td>{{ item.updated_at }}</td>
							<td></td>
						</tr>
					</table>
				</div>
				<Pagination
					@getItemList="getItemList"
					:page="page"
					:pageData="pageData"
					:totalCount="totalCount"
					:itemSize="itemSize"
					:blockSize="blockSize"
				></Pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Pagination from '../../components/Pagination';
export default {
	name: 'Kakao',
	components: { Pagination },
	data() {
		return {
			mode: 'normal',
			itemList: [],
			adrList: [],

			st: {
				day: 0,
				fail: 0,
				month: 0,
			},

			searchOption: {
				adr: '',
				buildingType: '',
				tradeType: '',
				keyword: '',
				date_s: '',
				date_e: '',
			},

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,
		};
	},
	created() {
		this.getItemList(1);
		this.$apiGET('/user/adr?step=1&id=city').then(re => {
			this.adrList = re;
		});

		this.$apiGET('/admin/report/st').then(re => {
			this.st = re;
		});
	},
	computed: {},
	methods: {
		clearSearch(mode) {
			this.mode = mode;
			this.searchOption = {
				adr: '',
				buildingType: '',
				tradeType: '',
				keyword: '',
				date_s: '',
				date_e: '',
			};
			this.itemList = [];
			this.getItemList(1);
		},
		getItemList(pg) {
			if (this.searchOption.date_s) {
				if (!this.searchOption.date_e) {
					this.searchOption.date_e = '2999-01-01';
				}
			}

			if (this.searchOption.date_e) {
				if (!this.searchOption.date_s) {
					this.searchOption.date_s = '1800-01-01';
				}
			}

			let path = '';
			if (this.mode == 'normal') {
				path = '/admin/report?pg=';
			} else {
				path = '/admin/report/fail?pg=';
			}

			this.$apiGET(
				path +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&keyword=' +
					this.searchOption.keyword +
					'&adr=' +
					this.searchOption.adr +
					'&buildingType=' +
					this.searchOption.buildingType +
					'&tradeType=' +
					this.searchOption.tradeType +
					'&date_s=' +
					this.searchOption.date_s +
					'&date_e=' +
					this.searchOption.date_e,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		getExcel() {
			if (this.searchOption.date_s) {
				if (!this.searchOption.date_e) {
					this.searchOption.date_e = '2999-01-01';
				}
			}

			if (this.searchOption.date_e) {
				if (!this.searchOption.date_s) {
					this.searchOption.date_s = '1800-01-01';
				}
			}

			let path = '';
			let fileName = '';
			if (this.mode == 'normal') {
				path = '/admin/report/all';
				fileName = '리포트 발급현황.xlsx';
			} else {
				path = '/admin/report/fail/all';
				fileName = '리포트 실패현황.xlsx';
			}

			this.$apiGET(
				path +
					'?keyword=' +
					this.searchOption.keyword +
					'&adr=' +
					this.searchOption.adr +
					'&buildingType=' +
					this.searchOption.buildingType +
					'&tradeType=' +
					this.searchOption.tradeType +
					'&date_s=' +
					this.searchOption.date_s +
					'&date_e=' +
					this.searchOption.date_e,
			).then(re => {
				this.$makeExcelFile(re, fileName);
			});
		},
	},
};
</script>

<style></style>
