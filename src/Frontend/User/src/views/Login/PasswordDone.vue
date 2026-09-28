<template>
  <div class="container container-only">
    <div class="section">
      <div class="join-wrap card">
        <div class="join-done">
          <div class="icon"></div>
          <div class="tit">임시 비밀번호가 발송 되었습니다.</div>
          <div class="sub">임시 비밀번호로 로그인해주세요.</div>
          <div class="btn-wrap type3">
            <button
              type="button"
              class="btn btn-big btn-primary"
              @click="$btnOnRouter('/')"
            >
              확인</button
            ><br />
            <!-- <button type="button" class="btn btn-big btn-white m-t--10">
              이메일 재발송 하기
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  computed: {},
  data() {
    return {};
  },

  created() {},
  updated() {},
  methods: {},
};
</script>
