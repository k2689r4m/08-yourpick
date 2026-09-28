<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Naver",
  components: {},
  setup() {
    return {
    };
  },
  computed: {},
  data() {
    return {
    };
  },
  created() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
			this.$apiGET(`/user/login/naver?code=${this.$route.query.code}&state=${this.$route.query.state}`).then(() => {
			});
		},
  },
};
</script>
