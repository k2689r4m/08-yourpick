<template>
	<div class="container">
		<div class="section">
			<div class="tab-list type1">
				<button
					type="button"
					class="btn tab-btn"
					v-bind:class="{ active: currentRouteName == 'notice' }"
					@click="$btnOnRouter('/center/notice')"
				>
					공지사항
				</button>
				<button
					type="button"
					class="btn tab-btn"
					v-bind:class="{ active: currentRouteName == 'news' }"
					@click="$btnOnRouter('/center/news')"
				>
					뉴스
				</button>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	name: 'App',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	data() {
		return {};
	},
	created() {},
	methods: {},
};
</script>
