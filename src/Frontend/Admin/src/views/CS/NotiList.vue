<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">공지사항</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: tab == 'normal' }" @click="tabActive('normal')">
					일반 회원 공지사항
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: tab == 'biz' }" @click="tabActive('biz')">
					비즈니스 회원 공지사항
				</button>
			</div>
			<div class="search-top">
				<div class="left">
					<div class="input-label">
						<select class="form-select" v-model="searchOption.keyType">
							<option value="title">제목</option>
							<option value="author">글쓴이</option>
						</select>
					</div>
					<input type="text" class="form-control" v-model="searchOption.keyword" />
				</div>
				<div class="right">
					<button type="button" class="btn btn-sm btn-primary" @click="getItemList(1)">검색</button>
				</div>
			</div>
			<div class="table-top">
				<div class="left"></div>
				<div class="right">
					<select class="form-select" v-model="searchOption.sort">
						<option value="new">최신순</option>
						<!-- <option value="add">등록일</option> -->
						<option value="view">조회수순</option>
					</select>
					<select class="form-select" v-model="itemSize">
						<option value="10">10개</option>
						<option value="30">30개</option>
						<option value="50">50개</option>
					</select>
					<button type="button" class="btn btn-sm btn-primary" @click="$btnOnRouter('notiRegist')">글쓰기</button>
					<!-- <button type="button" class="btn btn-sm btn-secondary">수정</button> -->
					<button type="button" class="btn btn-sm btn-danger" @click="itemDel">삭제</button>
				</div>
			</div>
			<div class="table-wrap" v-if="itemList">
				<table class="table">
					<colgroup>
						<col width="50px" />
						<col width="150px" />
						<col width="auto" />
						<col width="150px" />
						<col width="150px" />
						<col width="150px" />
					</colgroup>
					<tr>
						<th></th>
						<th>번호</th>
						<th>제목</th>
						<th>글쓴이</th>
						<th>작성일</th>
						<th>조회</th>
					</tr>
					<tr v-for="(item, idx) in itemList" :key="'new_' + item.id">
						<td>
							<label class="input-checkbox">
								<input type="checkbox" v-model="item.st" />
								<span class="checkbox"></span>
							</label>
						</td>
						<td>
							<!-- {{ totalCount - idx }} -->
							{{ idx + 1 + (page - 1) * itemSize }}
						</td>
						<td class="left pointer" @click="$btnOnRouter('notiList/' + item.id)">{{ item.title }}</td>
						<td>{{ item.mem_name }}</td>
						<td>{{ $dateFormat(item.refDate, 'YYYY-MM-DD') }}</td>
						<td>{{ item.cnt }}</td>
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
	name: 'Kakao',
	components: { Pagination },
	data() {
		return {
			tab: 'normal',

			itemList: null,

			delList: [],

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 30,
			blockSize: 5,

			searchOption: {
				mode: 'normal', //일반 : nomal, 비즈니스 : biz
				keyType: 'title', //검색옵션 title, author
				keyword: '', //검색어
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
				'/admin/cs/noti?pg=' +
					(pg - 1) * this.itemSize +
					'&size=' +
					this.itemSize +
					'&mode=' +
					this.searchOption.mode +
					'&keyType=' +
					this.searchOption.keyType +
					'&keyword=' +
					this.searchOption.keyword +
					'&sort=' +
					this.searchOption.sort,
			).then(data => {
				console.log(data);
				for (let i = 0; i < data.item.length; i++) {
					data.item[i].st = false;
				}
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		tabActive(mode) {
			this.tab = mode;
			this.searchOption.mode = mode;
			this.getItemList(1);
		},
		itemDel() {
			if (!confirm('삭제 하시겠습니까?')) {
				return;
			}
			this.delList = [];
			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].st) {
					this.delList.push(this.itemList[i].id);
				}
			}
			this.$apiPOST('/admin/cs/noti/del', {
				idList: this.delList, //해당 id 배열 ex) [1,15,13]
			}).then(() => {
				this.getItemList(1);
			});
		},
	},
};
</script>

<style></style>
