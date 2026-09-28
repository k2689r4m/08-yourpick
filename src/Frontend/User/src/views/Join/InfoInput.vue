<template>
  <div class="container container-only">
    <div class="section">
      <div class="join-wrap card">
        <div class="join-top">
          <button
            type="button"
            class="btn btn-back m-block"
            @click="$btnOnRouterBack()"
          ></button>
          <div class="join-logo"></div>
          &nbsp;&nbsp; 일반 회원가입
        </div>
        <div class="join-input">
          <div class="tit">회원정보 입력</div>
          <div class="input-wrap">
            <label class="input-label">· 이메일 아이디</label>
            <div v-if="!emailCom" class="input-guide error">
              올바르지 않은 이메일입니다. 이메일 형식에 맞게 입력해주세요.
            </div>
            <input type="text" class="input-text" v-model="email" />
            <span class="unit">@</span>
            <SlimSelect v-model="emailCom" class="input-select">
              <option value="">이메일 선택</option>
              <option>naver.com</option>
              <option>nate.com</option>
              <option>hanmail.net</option>
              <option>gmail.com</option>
              <option>kakao.com</option>
            </SlimSelect>
          </div>
          <div class="input-wrap pass" v-if="!userData.socialType">
            <label class="input-label">· 비밀번호</label>
            <div v-if="!checkPW(passwd1)" class="input-guide error">
                8~20자 이내 영문, 숫자, 특수문자 조합으로 만들어주세요.
            </div>
            <div v-else class="input-guide">8~20자 이내 영문, 숫자, 특수문자 조합</div>
            <button
              type="button"
              class="btn view"
              v-bind:class="{ active: passwdSt1 }"
              @click="passwdSt1 = !passwdSt1"
            ></button>
            <input
              v-if="passwdSt1"
              type="text"
              class="input-text"
              v-model="passwd1"
            />
            <input
              v-else
              type="password"
              class="input-text"
              v-model="passwd1"
            />
          </div>
          <div class="input-wrap pass" v-if="!userData.socialType">
            <label class="input-label">· 비밀번호 확인</label>
            <div
              v-if="passwd1 == passwd2 && passwd1 && passwd2"
              class="input-guide collect"
            >
              비밀번호가 일치합니다.
            </div>
            <div v-else class="input-guide error">
              비밀번호가 일치하지 않습니다. 다시 입력해 주세요.
            </div>

            <button
              type="button"
              class="btn view"
              v-bind:class="{ active: passwdSt2 }"
              @click="passwdSt2 = !passwdSt2"
            ></button>
            <input
              v-if="passwdSt2"
              type="text"
              class="input-text"
              v-model="passwd2"
            />
            <input
              v-else
              type="password"
              class="input-text"
              v-model="passwd2"
            />
          </div>
        </div>
        <div class="btn-wrap">
          <button
            type="button"
            class="btn btn-big btn-primary"
            @click="sendInfo"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlimSelect from "@slim-select/vue";
export default {
  name: "InfoInput",
  components: { SlimSelect },
  computed: {
    ...mapGetters({
      userData: "getUserData",
    }),
  },
  data() {
    return {
      selectModel: null,
      email: "",
      emailCom: "",
      passwd1: "",
      passwd2: "",
      passwdSt1: false,
      passwdSt2: false,
    };
  },

  created() {},
  updated() {},
  methods: {
    sendInfo() {
      // $btnOnRouter('/join/complete')"

      if (!(this.email && this.emailCom)) {
        alert("잘못된 이메일입니다.");
        return;
      }

      if (!this.userData.socialType) {
        if (!(this.passwd1 == this.passwd2 && this.passwd1 && this.passwd2) || !this.checkPW(this.passwd1)) {
          alert("잘못된 비밀번호입니다.");
          return;
        }

        this.userData.password = this.passwd1;
      } else {
        this.userData.password = null;
      }

      this.userData.email = this.email + "@" + this.emailCom;

      this.$apiPOST("/user/join/create", this.userData).then((re) => {
        console.log("13123123123213312");
        if (re) {
          this.$btnOnRouter("/join/complete");
        }
      });
    },
    checkPW(txt){
        var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
        if( !reg.test(txt) ) {
            return false;
        }
        return true;
    },
  },
};
</script>
