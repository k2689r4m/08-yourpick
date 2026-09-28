<template>
	<div class="spinner-border--wrap" v-if="isLoading">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div class="header">
		<div class="left">
			<!-- <button @click="testImg">1111111</button> -->
			<h1 class="header-logo" @click="btnMain">YOURPICK ADMIN</h1>
		</div>
		<div class="right">
			<div class="user">
				<!-- {{ $store.getters.getUserInfo.mem_name }} 님({{ $store.getters.getUserInfo.mem_id }}) -->
				{{ $store.getters.getUserInfo.mem_name }}
				<button type="button" class="btn btn-light btn-sm" @click="$apiLOGOUT()">로그아웃</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderComponent',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
		checkLevel() {
			if (this.$store.getters.getUserInfo.level == 9) {
				return true;
			} else {
				return false;
			}
		},
	},
	data() {
		return {
			isLoading: false,
		};
	},
	watch: {
		// $route(to, form) {
		// 	if (to.path !== form.path && to.path != '/Post') {
		// 		this.getPostCk();
		// 	}
		// },
	},
	created() {},
	updated() {},
	methods: {},
};
</script>
