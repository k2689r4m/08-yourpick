<template>
	<ul class="board-list">
		<li class="board-list--item" v-for="item in itemList" :key="'item_' + item.id">
			<button
				type="button"
				class="btn tit"
				@click="item.st = !item.st"
				v-bind:class="{ active: item.st || item.id == this.$route.query.id }"
			>
				<div class="text">{{ item.title }}</div>
				<div class="date">{{ item.date }}</div>
			</button>
			<div class="con" v-html="item.content"></div>
		</li>
	</ul>
	<Pagination
		@getItemList="getItemList"
		:page="page"
		:pageData="pageData"
		:totalCount="totalCount"
		:itemSize="itemSize"
		:blockSize="blockSize"
	></Pagination>
</template>

<script>
import Pagination from '../../components/Pagination';
export default {
	name: 'Notice',
	components: { Pagination },
	computed: {},
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
	updated() {},
	methods: {
		getItemList(pg) {
			let path = '/user/noti?pg=';
			if (this.$store.getters.getUserInfo.level == 2) {
				path = '/api/noti?pg=';
			}

			this.$apiGET(path + (pg - 1) * this.itemSize + '&size=' + this.itemSize).then(data => {
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
