<template>
	<ul class="report-radio--list width2">
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="itemType" value="아파트" />
					<span class="box type2"></span>
					<span class="text">아파트</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="itemType" value="오피스텔" />
					<span class="box type2"></span>
					<span class="text">오피스텔</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="itemType" value="연립다세대" />
					<span class="box type2"></span>
					<span class="text">연립다세대</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="itemType" value="단독주택" />
					<span class="box type2"></span>
					<span class="text">단독주택</span>
				</label>
			</div>
		</li>
		<li class="item">
			<div class="item-wrap">
				<label class="input-radio">
					<input type="radio" name="radio" v-model="itemType" value="none" />
					<span class="box type2"></span>
					<span class="text">잘 모르겠어요</span>
				</label>
			</div>
		</li>
	</ul>
	<div class="btn-wrap m-t--40">
		<button type="button" class="btn btn-big btn-primary w-160" @click="nextStep">선택</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Alarm',
	components: {},
	computed: {
		...mapGetters({
			dataInfo: 'getReportInfo',
		}),
	},
	data() {
		return {
			itemType: '아파트',
		};
	},

	created() {},
	updated() {},
	methods: {
		nextStep() {
			this.dataInfo.itemType = this.itemType;

			this.$store.dispatch('callSetReportInfo', this.dataInfo);

			this.$btnOnRouter('/report/request/tradePrice');
		},
	},
};
</script>
