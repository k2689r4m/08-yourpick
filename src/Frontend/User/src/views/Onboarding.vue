<template>
  <div class="container">
    <div class="onboarding">
      <button
        type="button"
        class="btn btn-close"
        @click="$btnOnRouter('/')"
      ></button>
      <swiper :modules="modules" :slides-per-view="1" :pagination="true">
        <swiper-slide>
          <div class="tit">누구보다 빠르게, <br />남들보다 편리하게!</div>
          <div class="con">
            유어픽 안심서비스를 통해 편리하고 안전한 서비스를
            <br />시작해보세요!
          </div>
          <div class="img">
            <img src="../assets/images/onboarding1.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="tit">이제는 더 이상 <br />낯설고 어렵지 않아요!</div>
          <div class="con">
            집을 알아볼 때, 봐야하는 필수 자료들을 취합하여<br />
            핵심 내용들 위주로 제공해드려요!
          </div>
          <div class="img">
            <img src="../assets/images/onboarding2.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="tit">스스로가 <br />집을 지키는 습관을 길러야 해요!</div>
          <div class="con">
            안전하게 집을 스스로 지킬 수 있도록<br />
            다양한 가치 있는 서비스와 함께해요!
          </div>
          <div class="img">
            <img src="../assets/images/onboarding3.png" alt="" />
          </div>
        </swiper-slide>
      </swiper>

      <div class="btn-wrap">
        <button type="button" class="btn btn-full btn-kakao" @click="btnKakao">
          카카오로 계속하기
        </button>
        <button type="button" class="btn btn-full btn-naver" @click="btnNaver">
          네이버로 계속하기
        </button>
        <div id="naverIdLogin"></div>
        <vue-apple-login
          className="btn btn-full btn-apple"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        ></vue-apple-login>
        <button type="button" class="btn btn-full btn-etc" @click="goLogin">
          다른 방법으로 시작하기
        </button>
      </div>
      <div class="txt-center">
        <button type="button" class="btn btn-link" @click="$btnOnRouter('/')">
          로그인하지 않고 둘러보기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  name: "Onboarding",
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  computed: {},
  data() {
    return {};
  },
  created() {},
  updated() {},
  methods: {
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
    onSuccess(data) {
      console.log(data);
      // this.signedIn = true;
    },
    onFailure(error) {
      console.log(error);
    },
    goLogin(){
        this.$store.dispatch("callSetModalLogin", true);
        this.$btnOnRouter('/');
    },
  },
};
</script>
