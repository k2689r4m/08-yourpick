<template>
	<ul class="pagination b-pagination pagination-sm" v-if="pageData != null && pageData.list.length">
		<li class="page-item" v-bind:class="{ disabled: 1 == page }">
			<button type="button" class="page-link" @click="getItemList(1)">
				<b-icon-chevron-double-left />
			</button>
		</li>
		<li class="page-item" v-bind:class="{ disabled: pageData.first == null }">
			<button type="button" class="page-link" @click="pageData.first !== null ? getItemList(pageData.first) : ''">
				<b-icon-chevron-left />
			</button>
		</li>
		<li
			v-for="pg in pageData.list"
			v-bind:key="'pg_' + pg"
			class="page-item"
			v-bind:class="{ active: pageData.currentPage == pg }"
		>
			<button type="button" class="page-link" @click="getItemList(pg)">{{ pg }}</button>
		</li>
		<li class="page-item" v-bind:class="{ disabled: pageData.end == null }">
			<button type="button" class="page-link" @click="pageData.end !== null ? getItemList(pageData.end) : ''">
				<b-icon-chevron-right />
			</button>
		</li>
		<li class="page-item" v-bind:class="{ disabled: pageData.totalPage == page }">
			<button type="button" class="page-link" @click="getItemList(pageData.totalPage)">
				<b-icon-chevron-double-right />
			</button>
		</li>
	</ul>
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
