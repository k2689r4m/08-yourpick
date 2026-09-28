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
				<div class="date">{{ item.refDate }}</div>
			</button>
			<div class="con">
				<iframe :src="item.url">
					<p>현재 사용 중인 브라우저는 iframe 요소를 지원하지 않습니다!</p>
				</iframe>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'News',
	components: {},
	computed: {},
	data() {
		return {
			itemList: [],
		};
	},

	created() {
		this.getItemList();
	},
	updated() {},
	methods: {
		getItemList() {
			let path = '/user/news';
			if (this.$store.getters.getUserInfo.level == 2) {
				path = '/api/news';
			}

			this.$apiGET(path).then(data => {
				for (let i = 0; i < data.length; i++) {
					data[i].st = false;
				}

				this.itemList = data;
			});
		},
	},
};
</script>
