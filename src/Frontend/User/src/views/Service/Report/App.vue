<template>
	<div class="container">
		<div class="section w-1000">
			<div class="report-tit m-block">
				<button type="button" class="btn btn-back" @click="$btnOnRouterBack()"></button>
				{{ currentRouteName.name }}
			</div>
			<ul class="report-state">
				<li class="item" v-bind:class="{ active: 1 == currentRouteName.level }">
					<div class="num">1</div>
				</li>
				<li class="item" v-bind:class="{ active: 2 == currentRouteName.level }">
					<div class="num">2</div>
				</li>
				<li class="item" v-bind:class="{ active: 3 == currentRouteName.level }">
					<div class="num">3</div>
				</li>
				<li class="item" v-bind:class="{ active: 4 == currentRouteName.level }">
					<div class="num">4</div>
				</li>
				<li class="item" v-bind:class="{ active: 5 == currentRouteName.level }">
					<div class="num">5</div>
				</li>
				<li class="item" v-bind:class="{ active: 6 == currentRouteName.level }">
					<div class="num">6</div>
				</li>
				<li class="item" v-bind:class="{ active: 7 == currentRouteName.level }">
					<div class="num">7</div>
				</li>
				<li class="item" v-bind:class="{ active: 8 == currentRouteName.level }">
					<div class="num">8</div>
				</li>
			</ul>
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
