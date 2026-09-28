<template>
  <div class="container container-only bg-white">
    <div class="section">
      <div class="business login">
        <div class="logo"></div>
        <div class="input-wrap m-p--0">
          <label class="input-label top">아이디</label>
          <input
            type="text"
            class="input-text bg-grey"
            placeholder="이메일 아이디 입력"
            v-model="userInfo.userId"
            tabindex="1"
          />
        </div>
        <div class="input-wrap pass m-p--0">
          <label class="input-label top">비밀번호</label>
          <button
            type="button"
            class="btn view"
            v-bind:class="{ active: passST }"
            @click="passST = !passST"
          ></button>
          <input
            v-if="passST"
            type="text"
            class="input-text bg-grey"
            placeholder="8~20자 이내 영문, 숫자 특수문자 조합"
            v-model="userInfo.password"
            tabindex="2"
          />
          <input
            v-else
            type="password"
            class="input-text bg-grey"
            placeholder="8~20자 이내 영문, 숫자 특수문자 조합"
            v-model="userInfo.password"
            tabindex="2"
          />
        </div>
        <div class="bottom">
          <div class="left">
            <label class="input-checkbox">
              <input type="checkbox" />
              <span class="box"></span>
              <span class="text">아이디 저장</span>
            </label>
          </div>
          <div class="right">
            <button
              type="button"
              class="btn txt-c--grey"
              @click="$btnOnRouter('/password')"
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </div>
        <div class="btn-wrap type2">
          <button
            type="button"
            class="btn btn-full btn-primary"
            @click="btnLogin"
          >
            로그인
          </button>
          <button
            type="button"
            class="btn btn-full btn-dark"
            @click="$btnOnRouter('/business/agree')"
          >
            비즈니스 회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  computed: {},
  data() {
    return {
      passST: false,
      userInfo: {
        userId: "",
        password: "",
      },
    };
  },

  created() {},
  updated() {},
  methods: {
    btnLogin() {
      this.$apiLOGIN("/user/biz/login", this.userInfo).then((re) => {
        if (re.status == 200) {
          this.$btnOnLogin(2);
          // this.closeModal();
        }
      });
    },
  },
};
</script>
