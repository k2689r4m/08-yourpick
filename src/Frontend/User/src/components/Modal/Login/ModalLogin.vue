<template>
  <div class="modal show">
    <div class="modal-dim" @click="closeModal"></div>
    <div class="modal-con login">
      <div class="modal-tit border-none">
        로그인
        <button
          type="button"
          class="btn btn-close"
          @click="closeModal"
        ></button>
      </div>
      <div class="login">
        <div class="input-wrap m-p--0">
          <div class="input-guide top error" v-if="userInfo.userId == ''">
            아이디를 입력하세요
          </div>
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
          <div class="input-guide top error" v-if="userInfo.password == ''">
            비밀번호를 확인해 주세요
          </div>
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
              <input type="checkbox" v-model="saveST" />
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
        <div class="btn-wrap">
          <button
            type="button"
            class="btn btn-full btn-primary"
            @click="btnLogin"
          >
            로그인
          </button>
        </div>
        <div class="hr"></div>
      </div>
      <div class="btn-wrap type2">
        <button type="button" class="btn btn-full btn-kakao" @click="btnKakao">
          카카오 로그인
        </button>
        <button type="button" class="btn btn-full btn-naver" @click="btnNaver">
          네이버 로그인
        </button>
        <!-- <button type="button" class="btn btn-full btn-apple"></button> -->
        <vue-apple-login
            className="btn btn-full btn-apple"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
        ></vue-apple-login>
        <div id="naverIdLogin"></div>
      </div>
      <div class="d-flex space m-t--20">
        <button
          type="button"
          class="btn txt-c--grey"
          @click="$btnOnRouter('/join')"
        >
          회원가입
        </button>
        <button
          type="button"
          class="btn txt-c--grey"
          @click="$btnOnRouter('/business/login')"
        >
          비즈니스 회원 로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalLogin",
  components: {},
  computed: {},
  data() {
    return {
      passST: false,
      saveST: false,
      userInfo: {
        userId: "",
        password: "",
      },
    };
  },

  created() {
    console.log("123213");
    const saveID = localStorage.getItem("saveID");
    if (saveID) {
      this.saveST = true;
      this.userInfo.userId = saveID;
    }
  },
  updated() {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    btnNaver() {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
        process.env.VUE_APP_NAVER_CLIENT_ID
      }&redirect_uri=${
        process.env.VUE_APP_HOST_BACK + "/user/login/naver"
      }&state=${this.$uuid.v1()}`;

      window.location.href = url;
    },
    btnKakao() {
      // birthday
      // birthyear
      // phone_number

      const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&scope=birthday,birthyear&client_id=${
        process.env.VUE_APP_KAKAO_CLIENT_ID
      }&redirect_uri=${process.env.VUE_APP_HOST_BACK + "/user/login/kakao"}`;

      window.location.href = url;
    },
    btnLogin() {
      this.$apiLOGIN("/user/login", this.userInfo).then((re) => {
        if (re.status == 200) {
          if (this.saveST) {
            localStorage.setItem("saveID", this.userInfo.userId);
          } else {
            localStorage.removeItem("saveID");
          }

          this.$btnOnLogin(1);
          this.closeModal();
        }
      });
    },
    onSuccess(data) {
        console.log(data);
        // this.signedIn = true;
    },
    onFailure(error) {
        console.log(error);
    },
  },
};
</script>
