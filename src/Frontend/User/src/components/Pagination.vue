<template>
	<div class="pagination m-none" v-if="pageData != null && pageData.list.length">
		<button type="button" class="btn prev" :disabled="1 == page" @click="getItemList(1)"></button>
		<button
			type="button"
			class="btn first"
			:disabled="pageData.first == null"
			@click="pageData.first !== null ? getItemList(pageData.first) : ''"
		></button>
		<button
			v-for="pg in pageData.list"
			v-bind:key="'pg_' + pg"
			type="button"
			class="btn num"
			v-bind:class="{ active: pageData.currentPage == pg }"
			@click="getItemList(pg)"
		>
			{{ pg }}
		</button>
		<button
			type="button"
			class="btn next"
			:disabled="pageData.end == null"
			@click="pageData.end !== null ? getItemList(pageData.end) : ''"
		></button>
		<button
			type="button"
			class="btn last"
			:disabled="pageData.totalPage == page"
			@click="getItemList(pageData.totalPage)"
		></button>
		<!-- <span class="more">...</span> -->
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		// songInfo: Object,

		// 데이터 타입만 정의 or 아래와 같이 디폴트 값도 정의
		page: {
			type: Number,
			default: 1,
		},
		pageData: {
			type: Object,
		},
		totalCount: {
			type: Number,
			default: 1,
		},
		itemSize: {
			type: Number,
			default: 1,
		},
		blockSize: {
			type: Number,
			default: 1,
		},
	},
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {
		getItemList(pg) {
			this.$emit('getItemList', pg);
		},
	},
};
</script>
