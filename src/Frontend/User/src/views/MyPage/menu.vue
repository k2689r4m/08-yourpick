<template>
  <div class="section">
    <!-- <button type="button" class="btn btn-full btn-primary">로그인 및 회원가입</button> -->
    <div class="my-minfo">
      <div class="photo">
        <div class="img-wrap">
          <img src="" alt="" />
        </div>
      </div>
      <div class="text">
        <div class="line">
          <strong>{{ userInfo.name }}</strong>
          <span v-if="userInfo.level == 1">유어픽 일반회원</span>
          <span v-else-if="userInfo.level == 2" class="txt-c--primary"
            >유어픽 비즈니스 회원</span
          >
        </div>
        <div class="line">
          {{ userInfo.email }}
        </div>
      </div>
    </div>
    <div class="my-mmenu">
      <div class="hr"></div>
      <div class="my-mmenu--tit">마이페이지</div>
      <button type="button" class="btn btn-menu">내 정보 관리</button>
      <button type="button" class="btn btn-menu">내 이용권</button>
      <button type="button" class="btn btn-menu">리포트 보관함</button>
      <button type="button" class="btn btn-menu">결제 내역</button>
      <button type="button" class="btn btn-menu">서비스 문의</button>
      <div class="hr"></div>
      <div class="my-mmenu--tit">고객센터</div>
      <button type="button" class="btn btn-menu">공지사항</button>
      <button type="button" class="btn btn-menu">뉴스</button>
      <div class="hr"></div>
      <div class="my-mmenu--tit">앱 정보</div>
      <button type="button" class="btn btn-menu">개인정보처리방침</button>
      <button type="button" class="btn btn-menu">이용약관</button>
      <div class="app-info">
        버전
        <div class="right">
          1.2.901
          <button type="button" class="btn btn-sm btn-primary">업데이트</button>
        </div>
      </div>
      <div class="hr"></div>
      <div class="my-mmenu--tit">계정 관리</div>
      <button type="button" class="btn btn-menu">로그아웃</button>
      <button type="button" class="btn btn-menu">탈퇴</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "menu",
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
    }),
  },
  data() {
    return {};
  },

  created() {},
  updated() {},
  methods: {},
};
</script>
