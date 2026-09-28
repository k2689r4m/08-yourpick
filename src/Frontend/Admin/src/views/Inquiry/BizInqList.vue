<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">비즈니스 문의 현황</div>
			<div class="tab-con">
				<div class="search-top">
					<div class="left">
						<div class="input-label">
							<select class="form-select">
								<option>이름</option>
							</select>
						</div>
						<input type="text" class="form-control md" v-model="searchOption.keyword" @keyup.enter="getItemList(1)" />
						<div class="input-label">처리상태</div>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="all" />
							<span class="checkbox radio"></span>
							<span class="text">전체</span>
						</label>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="ready" />
							<span class="checkbox radio"></span>
							<span class="text">대기</span>
						</label>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="done" />
							<span class="checkbox radio"></span>
							<span class="text">완료</span>
						</label>
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="getExcel">엑셀다운</button>
						<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
					</div>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">검색결과 {{ $numberMask(totalCount) }}건</div>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>번호</th>
							<th>문의제목</th>
							<th>이름</th>
							<th>회원 구분</th>
							<th>작성일</th>
							<th>처리자</th>
							<th>처리상태</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'mem_' + item.id" @click="$btnOnRouter('bizInqList/' + item.id)">
							<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
							<td>{{ item.qTitle }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.userType }}</td>
							<td>{{ item.qDate }}</td>
							<td>{{ item.mem_name }}</td>
							<td>{{ item.state }}</td>
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
	name: 'Approval',
	components: { Pagination },
	data() {
		return {
			itemList: [],

			searchOption: {
				state: 'all',
				keyword: '',
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
		getItemList(pg) {
			this.$apiGET(
				'/admin/inqu/biz?pg=' +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&keyword=' +
					this.searchOption.keyword +
					'&state=' +
					this.searchOption.state,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		getExcel() {
			this.$apiGET(
				'/admin/inqu/biz/all?state=' + this.searchOption.state + '&keyword=' + this.searchOption.keyword,
			).then(re => {
				this.$makeExcelFile(re, '비즈니스 회원 문의 현황.xlsx');
			});
		},
	},
};
</script>

<style></style>
