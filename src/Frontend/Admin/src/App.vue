<template>
	<div class="wrap">
		<router-view name="header"></router-view>
		<div class="lnb-exist">
			<router-view name="side"></router-view>
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
