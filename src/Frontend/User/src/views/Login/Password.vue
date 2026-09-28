<template>
  <div class="container container-only">
    <div class="section">
      <div class="join-wrap card">
        <div class="join-top">
          <div class="join-logo"></div>
          &nbsp;&nbsp; 비밀번호 찾기
        </div>
        <div class="join-input">
          <div class="tit">
            이메일 주소를 입력해주시면<br />
            가입된 휴대폰 번호로<br class="m-block" />
            임시 비밀번호를 전송해 드립니다.
          </div>
          <div class="input-wrap" :class="{ direct: emailCom == 'input' }">
            <label class="input-label">· 이메일 아이디</label>
            <input
              type="text"
              class="input-text input"
              v-model="emailComInput"
              v-if="emailCom == 'input'"
            />
            <div class="input-guide error" v-if="emailError">
              존재하는 이메일 정보가 없습니다. 다시 입력해 주세요
            </div>
            <input type="text" class="input-text" v-model="emailId" />
            <span class="unit">@</span>
            <SlimSelect v-model="emailCom" class="input-select">
              <option selected>이메일 선택</option>
              <option value="input">직접입력</option>
              <option>naver.com</option>
              <option>nate.com</option>
              <option>hanmail.net</option>
              <option>gmail.com</option>
              <option>kakao.com</option>
            </SlimSelect>
          </div>
        </div>
        <div class="btn-wrap">
          <button
            type="button"
            class="btn btn-big btn-primary"
            @click="tempPassSend()"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlimSelect from "@slim-select/vue";
export default {
  name: "Main",
  components: { SlimSelect },
  computed: {},
  data() {
    return {
      emailId: "",
      emailCom: "",
      emailComInput: "",
      emailError: false,
    };
  },

  created() {},
  updated() {},
  methods: {
    tempPassSend() {
      let emailCom = "";
      this.emailCom == "input"
        ? (emailCom = this.emailComInput)
        : (emailCom = this.emailCom);
      this.$apiPOST("/user/re/passwd", {
        email: this.emailId + "@" + emailCom,
      }).then((re) => {
        console.log(re);
        re ? this.$btnOnRouter("/password/done") : (this.emailError = true);
      });
    },
  },
};
</script>
