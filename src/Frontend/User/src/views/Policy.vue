<template>
  <div class="container">
    <div class="txt-only scroll" v-html="courseContent"></div>
  </div>
</template>

<script>
export default {
  name: "Onboarding",
  components: {},
  setup() {
    return {
    };
  },
  computed: {},
  data() {
    return {
      courseContent:'',
    };
  },
  created() {
    this.courseModalContent();
  },
  updated() {},
  methods: {
    courseModalContent() {
			this.$apiGET('/user/policy').then(data => {
				this.courseContent = data.content;
			});
		},
  },
};
</script>
