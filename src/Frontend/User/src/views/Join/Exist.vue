<template>
	<div class="container container-only">
		<div class="section">
			<div class="join-wrap card">
				<div class="join-top">
					<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
					<div class="join-logo"></div>
					&nbsp;&nbsp; 일반 회원가입
				</div>
				<div class="join-input p-b--0">
					<div class="tit">{{ $route.query.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`) }} 로 가입된 계정이 있어요.</div>
					<div class="sub">기존 계정을 통해 로그인해주세요.</div>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="goLogin">로그인하기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Exist',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {
        
    },
	updated() {},
	methods: {
        goLogin(){
            this.$store.dispatch("callSetModalLogin", true);
            this.$btnOnRouter('/');
        }
    },
};
</script>
