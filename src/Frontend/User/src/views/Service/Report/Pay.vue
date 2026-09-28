<template>
	<PayPage :payType="'normal'"></PayPage>
</template>

<script>
import PayPage from '../../../components/pay/PayPage';

export default {
	name: 'Alarm',
	components: { PayPage },
	computed: {},
	data() {
		return {};
	},
	created() {},
	updated() {},
	methods: {},
};
</script>
