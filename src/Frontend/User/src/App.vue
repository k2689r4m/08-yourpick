<template>
	<router-view name="header"></router-view>
	<router-view></router-view>
	<router-view name="footer"></router-view>
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
	methods: {
		checkRoute() {
			if (
				this.currentRouteName == 'LoginView' ||
				this.currentRouteName == 'UserDetail' ||
				this.currentRouteName == 'MapDetail' ||
				this.currentRouteName == 'MapWrite' ||
				this.currentRouteName == 'PrintPage' ||
				this.currentRouteName == 'PrintPage2' ||
				this.currentRouteName == 'RentPrintPage' ||
				this.currentRouteName == 'RentPrintPage2' ||
				this.currentRouteName == 'LeaseMapDetail' ||
				this.currentRouteName == 'LeaseMapWrite' ||
				this.currentRouteName == 'LeaseUserDetail' ||
				this.currentRouteName == 'LeaseUserAdmin2' ||
				this.currentRouteName == 'MapSearch2' ||
				this.currentRouteName == 'LeaseMapSearch2' ||
				this.currentRouteName == 'UserAdmin2' ||
				this.currentRouteName == 'ScrapingDetail' ||
				this.currentRouteName == 'ScrapingDetail2'
			) {
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>
