<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">전체 회원목록</div>
			<div class="tab-con">
				<div class="search-top col">
					<div class="left">
						<div class="input-label">
							<select class="form-select" v-model="searchOption.mode">
								<option value="name">이름</option>
								<option value="email">이메일</option>
								<option value="phone">연락처</option>
							</select>
						</div>

						<input type="text" class="form-control md" v-model="searchOption.keyword" @keyup.enter="getItemList(1)" />
						<div class="input-label">가입기간</div>
						<input type="date" class="form-control sm" v-model="searchOption.date_s" />
						<div class="search-top--text">~</div>
						<input type="date" class="form-control sm m-r--1" v-model="searchOption.date_e" />
						<button type="button" class="btn btn-sm btn-light">가입기간 조회</button>
					</div>
					<div class="between mt-2">
						<div class="left">
							<div class="input-label">회원구분</div>
							<!-- <label class="input-checkbox">
								<input type="radio" name="radio" checked />
								<span class="checkbox radio"></span>
								<span class="text">전체회원</span>
							</label> -->
							<label class="input-checkbox">
								<input type="radio" name="radio" value="normal" v-model="mode" @change="clearSearch()" />
								<span class="checkbox radio"></span>
								<span class="text">일반</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio" value="biz" v-model="mode" @change="clearSearch()" />
								<span class="checkbox radio"></span>
								<span class="text">비즈니스</span>
							</label>
						</div>
						<div class="right">
							<button type="button" class="btn btn-sm btn-secondary" @click="getExcel()">엑셀다운</button>
							<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
						</div>
					</div>
				</div>
				<div class="table-top">
					<div class="left"></div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-light">알림톡 발송</button>
						<button type="button" class="btn btn-sm btn-light">문자 발송</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table" v-if="mode == 'normal'">
						<tr>
							<th></th>
							<th>번호</th>
							<th>구분</th>
							<th>이름</th>
							<th>이메일</th>
							<th>연락처</th>
							<th>가입일</th>
							<th>가입경로</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'mem_' + item.id" @click="$btnOnRouter('userList/' + item.id)">
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
							<td>일반</td>
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ $phoneMask(item.phone) }}</td>
							<td>{{ $dateFormat(item.created_at, 'YYYY-MM-DD') }}</td>
							<td>{{ $SOCIAL_TYPE[item.socialType] }}</td>
						</tr>
					</table>
					<table class="table" v-else>
						<tr>
							<th></th>
							<th>번호</th>
							<th>구분</th>
							<th>대표</th>
							<th>이메일</th>
							<th>연락처</th>
							<th>가입일</th>
							<th>상태</th>
						</tr>
						<tr
							v-for="(item, idx) in itemList"
							:key="'mem_' + item.id"
							@click="$btnOnRouter('userList/biz/' + item.id)"
						>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
							<td>{{ item.userType }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ $phoneMask(item.phone) }}</td>
							<td>{{ $dateFormat(item.created_at, 'YYYY-MM-DD') }}</td>
							<td>{{ $BIZ_STATE[item.state] }}</td>
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
	name: 'UserList',
	components: { Pagination },
	data() {
		return {
			itemList: [],
			mode: 'normal',

			searchOption: {
				mode: 'name',
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
	},
	computed: {},
	methods: {
		clearSearch() {
			this.searchOption = {
				mode: 'name',
				keyword: '',
				date_s: '',
				date_e: '',
			};
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

			let keyword = '';
			if (this.searchOption.mode == 'phone' && this.searchOption.keyword) {
				keyword = this.searchOption.keyword.replace(/-/g, '');
			} else {
				keyword = this.searchOption.keyword;
			}

			let path = '';
			if (this.mode == 'normal') {
				path = '/admin/user?pg=';
			} else {
				path = '/admin/user/biz?pg=';
			}

			this.$apiGET(
				path +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&mode=' +
					this.searchOption.mode +
					'&keyword=' +
					keyword +
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

			let keyword = '';
			if (this.searchOption.mode == 'phone' && this.searchOption.keyword) {
				keyword = this.searchOption.keyword.replace(/-/g, '');
			} else {
				keyword = this.searchOption.keyword;
			}

			let path = '';
			let fileName = '';
			if (this.mode == 'normal') {
				path = '/admin/user/all?mode=';
				fileName = '회원목록.xlsx';
			} else {
				path = '/admin/user/biz/all?mode=';
				fileName = '비즈니스 회원목록.xlsx';
			}
			this.$apiGET(
				path +
					this.searchOption.mode +
					'&keyword=' +
					keyword +
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
