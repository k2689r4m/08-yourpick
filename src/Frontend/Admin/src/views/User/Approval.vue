<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">승인관리</div>
			<div class="tab-con">
				<div class="search-top">
					<div class="left">
						<div class="input-label">
							<select class="form-select" v-model="searchOption.mode">
								<option value="name">이름</option>
								<option value="email">이메일</option>
								<option value="phone">연락처</option>
							</select>
						</div>
						<input type="text" class="form-control md" v-model="searchOption.keyword" @keyup.enter="getItemList(1)" />
						<div class="input-label">진행상태</div>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="all" />
							<span class="checkbox radio"></span>
							<span class="text">전체</span>
						</label>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="over" />
							<span class="checkbox radio"></span>
							<span class="text">검토중</span>
						</label>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="done" />
							<span class="checkbox radio"></span>
							<span class="text">승인</span>
						</label>
						<label class="input-checkbox">
							<input type="radio" name="radio" v-model="searchOption.state" value="hold" />
							<span class="checkbox radio"></span>
							<span class="text">보류</span>
						</label>
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
					</div>
				</div>
				<div class="table-top">
					<div class="left"></div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-danger" @click="deleteUser">삭제</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th></th>
							<th>번호</th>
							<th>구분</th>
							<th>이름</th>
							<th>이메일</th>
							<th>연락처</th>
							<th>접수일</th>
							<th>상태</th>
						</tr>
						<tr
							v-for="(item, idx) in itemList"
							:key="'mem_' + item.id"
							@click="$btnOnRouter('/user/approval/' + item.id)"
						>
							<td @click.stop>
								<label class="input-checkbox">
									<input type="checkbox" v-model="item.st" />
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
	name: 'Approval',
	components: { Pagination },
	data() {
		return {
			itemList: [],
			mode: 'normal',

			searchOption: {
				mode: 'name',
				keyword: '',
				state: 'all',
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
				state: 'all',
			};
			this.getItemList(1);
		},
		getItemList(pg) {
			let keyword = '';
			if (this.searchOption.mode == 'phone' && this.searchOption.keyword) {
				keyword = this.searchOption.keyword.replace(/-/g, '');
			} else {
				keyword = this.searchOption.keyword;
			}

			this.$apiGET(
				'/admin/biz?pg=' +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&mode=' +
					this.searchOption.mode +
					'&keyword=' +
					keyword +
					'&state=' +
					this.searchOption.state,
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
		deleteUser() {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			let idList = [];
			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].st) {
					idList.push(this.itemList[i].id);
				}
			}

			if (!idList.length) {
				return;
			}

			this.$apiPOST('/admin/biz/delete', { idList: idList }).then(() => {
				this.getItemList(1);
			});
		},
	},
};
</script>

<style></style>
