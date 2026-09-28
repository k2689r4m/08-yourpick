<template>
    <div class="container">
		<div class="section w-1000 p-t--0">
            <PayPage :payType="'bus'"></PayPage>
        </div>
    </div>
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
