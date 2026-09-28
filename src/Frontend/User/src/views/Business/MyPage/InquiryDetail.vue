<template>
	<div class="container">
		<div class="section" v-if="item">
			<div class="my-card">
				<div class="my-card--tit border-grey">
					<p class="sm">{{ $dateFormat(item.qDate, 'YYYY.MM.DD') }}</p>
					{{ item.qTitle }}
				</div>
				<div class="txt-only" v-html="item.qMemo?.split('\n').join('<br />')"></div>
			</div>
			<div class="my-card bg-grey" v-if="item?.aDate">
				<div class="my-card--tit border-grey">
					<p class="sm">{{ $dateFormat(item.aDate, 'YYYY.MM.DD') }}</p>
					{{ item.aTitle }}
				</div>
				<div class="txt-only" v-html="item.aMemo?.split('\n').join('<br />')"></div>
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn btn-normal btn-line" @click="$btnOnRouter('/business/inquiry')">
					목록으로
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Main',
	components: {},
	computed: {},
	data() {
		return {
			item: null,
		};
	},

	created() {
		this.getItem();
	},
	updated() {},
	methods: {
		getItem() {
			this.$apiGET('/api/mypage/inqu/item?id=' + this.$route.params.id).then(data => {
				this.item = data;
			});
		},
	},
};
</script>
