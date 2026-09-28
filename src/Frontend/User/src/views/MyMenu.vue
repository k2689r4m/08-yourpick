<template>
  <div class="container my-page">
    <div class="section">
      <div v-if="userInfo.level == 1" class="my-minfo">
        <div class="photo">
          <div class="img-wrap">
            <img v-if="userImg" :src="userImg" alt="" />
          </div>
        </div>
        <div class="text">
          <div class="line">
            <strong>{{ userInfo.name }}</strong
            ><span>유어픽 일반회원</span>
          </div>
          <div class="line">{{ userInfo.email }}</div>
        </div>
      </div>
      <div v-else-if="userInfo.level == 2" class="my-minfo">
        <div class="photo">
          <div class="img-wrap">
            <img v-if="userImg" :src="userImg" alt="" />
          </div>
        </div>
        <div class="text">
          <div class="line">
            <strong>{{ userInfo.name }}</strong
            ><span class="txt-c--primary">유어픽 비즈니스 회원</span>
          </div>
          <div class="line">{{ userInfo.email }}</div>
        </div>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-full btn-primary"
          @click="$store.dispatch('callSetModalLogin', true)"
        >
          로그인 및 회원가입
        </button>
      </div>
      <div class="my-mmenu">
        <div class="hr"></div>
        <template v-if="userInfo.level == 1">
          <div class="my-mmenu--tit">마이페이지</div>
          <button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/infoView')"
          >
            내 정보 관리</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/ticket')"
          >
            내 이용권</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/report')"
          >
            리포트 보관함</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/pay')"
          >
            결제 내역</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/inquiry')"
          >
            서비스 문의
          </button>
          <div class="hr"></div>
        </template>
        <template v-else-if="userInfo.level == 2">
          <div class="my-mmenu--tit">마이페이지</div>
          <button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/mypage/infoView')"
          >
            내 정보 관리</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/business/payHistory')"
          >
            결제 내역</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/business/inquiry')"
          >
            서비스 문의
          </button>
          <div class="hr"></div>
          <div class="my-mmenu--tit">상품관리</div>
          <button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/business/pay')"
          >
            상품결제</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/business/ticket')"
          >
            내 이용권</button
          ><button
            type="button"
            class="btn btn-menu"
            @click="$btnOnRouter('/business/report')"
          >
            리포트 보관함
          </button>
          <div class="hr"></div>
        </template>
        <div class="my-mmenu--tit">고객센터</div>
        <button
          type="button"
          class="btn btn-menu"
          @click="$btnOnRouter('/center/notice')"
        >
          공지사항</button
        ><button
          type="button"
          class="btn btn-menu"
          @click="$btnOnRouter('/center/news')"
        >
          뉴스
        </button>
        <div class="hr"></div>
        <div class="my-mmenu--tit">앱 정보</div>
        <button type="button" class="btn btn-menu" @click="courseModal = true">
          개인정보처리방침</button
        ><button type="button" class="btn btn-menu" @click="termsModal = true">
          이용약관
        </button>
        <div class="app-info">
          버전
          <div class="right">
            1.2.901
            <button type="button" class="btn btn-sm btn-primary">
              업데이트
            </button>
          </div>
        </div>
        <template v-if="userInfo.level != null">
          <div class="hr"></div>
          <div class="my-mmenu--tit">계정 관리</div>
          <button type="button" class="btn btn-menu" @click="logoutMoal = true">
            로그아웃</button
          ><button type="button" class="btn btn-menu">탈퇴</button>
        </template>
      </div>
    </div>

    <div class="modal" v-bind:class="{ show: termsModal }">
      <div class="modal-dim" @click="termsModal = false"></div>
      <div class="modal-con lg">
        <div class="modal-tit">
          이용약관
          <button
            type="button"
            class="btn btn-close"
            @click="termsModal = false"
          ></button>
        </div>
        <div class="txt-only scroll" v-html="termsContent"></div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ show: courseModal }">
      <div class="modal-dim" @click="courseModal = false"></div>
      <div class="modal-con lg">
        <div class="modal-tit">
          개인정보처리방침
          <button
            type="button"
            class="btn btn-close"
            @click="courseModal = false"
          ></button>
        </div>
        <div class="txt-only scroll" v-html="courseContent"></div>
      </div>
    </div>
    <div class="modal show" v-if="logoutMoal">
      <div class="modal-dim" @click="logoutMoal = false"></div>
      <div class="modal-con alert">
        <div class="text">로그아웃 하시겠습니까?</div>
        <div class="btns type2">
          <button type="button" class="btn" @click="logoutMoal = false">
            취소
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="
              logoutMoal = false;
              $apiLOGOUT();
            "
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyMenu",
  components: {},
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
    }),
  },
  data() {
    return {
      termsModal: false,
      courseModal: false,
      termsContent: "",
      courseContent: "",
      userImg: null,
      logoutMoal: false,
    };
  },

  created() {
    this.termsModalContent();
    this.courseModalContent();
    this.setUserImg();
  },
  updated() {},
  methods: {
    termsModalContent() {
      this.$apiGET("/user/term").then((data) => {
        this.termsContent = data.content;
      });
    },
    courseModalContent() {
      this.$apiGET("/user/policy").then((data) => {
        this.courseContent = data.content;
      });
    },
    setUserImg() {
      this.$apiImgGET("/api/user/image").then((data) => {
        this.userImg = data;
      });
    },
  },
};
</script>
