<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">부동산 상식</div>
			<div class="tab-con">
				<div class="search-top">
					<div class="left">
						<div class="input-label">
							<select class="form-select">
								<option>제목</option>
							</select>
						</div>
						<input type="text" class="form-control" />
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-primary">검색</button>
					</div>
				</div>
				<div class="table-top">
					<div class="left"></div>
					<div class="right">
						<select class="form-select">
							<option value="new">최신순</option>
							<option value="view">조회수순</option>
						</select>
						<select class="form-select">
							<option>30개</option>
						</select>
						<button type="button" class="btn btn-sm btn-primary" @click="$btnOnRouter('Register')">등록하기</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="50px" />
							<col width="auto" />
							<col width="150px" />
							<col width="150px" />
							<col width="150px" />
							<col width="150px" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>제목</th>
							<th>글쓴이</th>
							<th>작성일</th>
							<th>조회</th>
							<th>노출상태</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'new_' + item.id">
							<td>
								{{ idx + 1 + (page - 1) * itemSize }}
							</td>
							<td class="left pointer" @click="$btnOnRouter('modi/' + item.id)">{{ item.content }}</td>
							<td>{{ item.mem_name }}</td>
							<td>{{ $dateFormat(item.refDate, 'YYYY-MM-DD') }}</td>
							<td>{{ item.cnt }}</td>
							<td>{{ item.isVisible }}</td>
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
			itemList: null,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 30,
			blockSize: 5,

			searchOption: {
				mode: 'knowledge',
				keyword: '',
				sort: 'new', //최신 : new , 조회수 : view
			},
		};
	},
	created() {
		this.getItemList(1);
	},
	computed: {},
	methods: {
		getItemList(pg) {
			this.$apiGET(
				'/admin/content?pg=' +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&mode=' +
					this.searchOption.mode +
					'&keyword=' +
					this.searchOption.keyword +
					'&sort=' +
					this.searchOption.sort,
			).then(data => {
				for (let i = 0; i < data.item.length; i++) {
					data.item[i].st = false;
				}
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
