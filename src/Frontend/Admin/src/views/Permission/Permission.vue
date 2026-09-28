<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">관리자 계정 관리</div>
			<div class="table-top">
				<div class="left"></div>
				<div class="right">
					<router-link type="button" class="btn btn-sm btn-primary" to="/permission/perAdd">관리자 추가</router-link>
				</div>
			</div>
			<div class="table-wrap">
				<table class="table">
					<tr>
						<th>번호</th>
						<th>계정</th>
						<th>이름</th>
						<th>생성일</th>
						<th>대시보드</th>
						<th>회원관리</th>
						<th>통계</th>
						<th>리포트관리</th>
						<th>콘텐츠관리</th>
						<th>이용권관리</th>
						<th>문의관리</th>
						<th>결제관리</th>
						<th>매출관리</th>
						<th>권한관리</th>
						<th>고객센터</th>
					</tr>
					<tr
						v-for="(item, idx) in itemList"
						:key="'mem_' + item.id"
						@click="$btnOnRouter('/permission/perEdit/' + item.id)"
					>
						<td>{{ idx + 1 + (page - 1) * itemSize }}</td>
						<td>{{ item.mem_id }}</td>
						<td>{{ item.mem_name }}</td>
						<td>{{ $dateFormat(item.created_at, 'YYYY-MM-DD') }}</td>
						<td>{{ item.dashboard }}</td>
						<td>{{ item.user }}</td>
						<td>{{ item.statistics }}</td>
						<td>{{ item.report }}</td>
						<td>{{ item.contents }}</td>
						<td>{{ item.ticket }}</td>
						<td>{{ item.inquiry }}</td>
						<td>{{ item.pay }}</td>
						<td>{{ item.sales }}</td>
						<td>{{ item.permission }}</td>
						<td>{{ item.CS }}</td>
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
</template>

<script>
import Pagination from '../../components/Pagination';
export default {
	name: 'MainUser',
	components: { Pagination },
	data() {
		return {
			itemList: [],

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
			this.$apiGET('/admin/admin?pg=' + (pg - 1) * this.itemSize + '&size=' + this.itemSize).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
	},
};
</script>

<style></style>
