<template>
  <div class="header" v-if="checkLevel == 1">
    <!-- <button type="button" class="btn m-btn" @click="mMenu = true"></button> -->
    <!-- <button
      type="button"
      class="btn a-btn"
      @click="$btnOnRouter('/alarmList')"
    ></button> -->
    <div class="m-menu" v-bind:class="{ active: mMenu }" id="mMenu">
      <div class="m-menu--dim"></div>
      <div class="m-menu--wrap">
        <button
          type="button"
          class="btn btn-close"
          @click="mMenu = false"
        ></button>
        <div class="top">
          <button
            type="button"
            class="btn btn-xsm btn-line white"
            @click="$store.dispatch('callSetModalLogin', true)"
          >
            로그인
          </button>
          <button
            type="button"
            class="btn btn-xsm btn-line white m-l--5"
            @click="$btnOnRouter('/join')"
          >
            회원가입
          </button>
        </div>
        <button
          type="button"
          class="btn btn-menu active"
          @click="toggleActive('toggle1')"
          ref="toggle1"
        >
          유어픽안심서비스
        </button>
        <div class="btn-menu--wrap">
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/report'), (mMenu = false)"
          >
            유어픽안심서비스란?
          </button>
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/report/request'), (mMenu = false)"
          >
            안심거래리포트
          </button>
          <!-- <button type="button" class="btn btn" @click="$btnOnRouter('/alarm/request'), (mMenu = false)">
						전입신고알리미
					</button> -->
        </div>
        <button
          type="button"
          class="btn btn-menu"
          @click="toggleActive('toggle2')"
          ref="toggle2"
        >
          부동산정보
        </button>
        <div class="btn-menu--wrap">
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/real/search'), (mMenu = false)"
          >
            실거래가
          </button>
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/app/search'), (mMenu = false)"
          >
            공시지가
          </button>
        </div>
      </div>
    </div>
    <div class="left">
      <h1 class="logo" @click="$btnOnRouter('/')"></h1>
      <div class="left-menu">
        <button type="button" class="btn">유어픽안심서비스</button>
        <button type="button" class="btn">부동산정보</button>
      </div>
    </div>
    <div class="right">
      <div class="right-menu">
        <button type="button" class="btn">유어픽비즈니스</button>
      </div>
      <div class="user">
        <button
          type="button"
          class="btn btn-sm btn-line white"
          @click="$store.dispatch('callSetModalLogin', true)"
        >
          로그인
        </button>
        <button
          type="button"
          class="btn btn-sm btn-line white m-l--10"
          @click="$btnOnRouter('/join')"
        >
          회원가입
        </button>
      </div>
    </div>
    <div class="dropdown">
      <div class="dropdown-menu">
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/report'), (mMenu = false)"
        >
          유어픽안심서비스란?
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/report/request'), (mMenu = false)"
        >
          안심거래리포트
        </button>
        <!-- <button type="button" class="btn" @click="$btnOnRouter('/alarm/request'), (mMenu = false)">
					전입신고 알리미
				</button> -->
      </div>
      <div class="dropdown-menu">
        <button type="button" class="btn" @click="$btnOnRouter('/real/search')">
          실거래가
        </button>
        <button type="button" class="btn" @click="$btnOnRouter('/app/search')">
          공시지가
        </button>
      </div>
      <div class="dropdown-right">
        <!-- <button type="button" class="btn">로그아웃</button> -->
      </div>
    </div>
  </div>
  <div class="header" v-else-if="checkLevel == 2">
    <!-- <button type="button" class="btn m-btn" @click="mMenu = true"></button> -->
    <button
      type="button"
      class="btn a-btn"
      @click="$btnOnRouter('/alarmList')"
    ></button>
    <div class="m-menu" v-bind:class="{ active: mMenu }" id="mMenu">
      <div class="m-menu--dim"></div>
      <div class="m-menu--wrap">
        <button
          type="button"
          class="btn btn-close"
          @click="mMenu = false"
        ></button>
        <div class="top">
          <button
            type="button"
            class="btn btn-my"
            @click="$btnOnRouter('/mypage/info')"
          >
            마이페이지
          </button>
          <div class="user">
            <div class="img-wrap">
              <img v-if="userImg" :src="userImg" alt="" />
            </div>
            {{ userInfo.name }}님
            <button
              type="button"
              class="btn btn-xsm btn-line white"
              @click="$apiLOGOUT()"
            >
              로그아웃
            </button>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-menu"
          @click="toggleActive('toggle1')"
          ref="toggle1"
        >
          유어픽안심서비스
        </button>
        <div class="btn-menu--wrap">
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/report'), (mMenu = false)"
          >
            유어픽안심서비스란?
          </button>
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/report/request'), (mMenu = false)"
          >
            안심거래리포트
          </button>
          <!-- <button type="button" class="btn btn" @click="$btnOnRouter('/alarm/request'), (mMenu = false)">
						전입신고알리미
					</button> -->
        </div>
        <button
          type="button"
          class="btn btn-menu"
          @click="toggleActive('toggle2')"
          ref="toggle2"
        >
          부동산정보
        </button>
        <div class="btn-menu--wrap">
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/real/search'), (mMenu = false)"
          >
            실거래가
          </button>
          <button
            type="button"
            class="btn btn"
            @click="$btnOnRouter('/app/search'), (mMenu = false)"
          >
            공시지가
          </button>
        </div>
      </div>
    </div>
    <div class="left">
      <h1 class="logo" @click="$btnOnRouter('/')"></h1>
      <div class="left-menu">
        <button type="button" class="btn">유어픽안심서비스</button>
        <button type="button" class="btn">부동산정보</button>
      </div>
    </div>
    <div class="right">
      <div class="right-menu">
        <button type="button" class="btn" @click="$btnOnRouter('/mypage/info')">
          마이페이지
        </button>
      </div>
      <div class="user">
        <div class="img-wrap">
          <img v-if="userImg" :src="userImg" alt="" />
        </div>
        {{ userInfo.name }}님
      </div>
    </div>
    <div class="dropdown">
      <div class="dropdown-menu">
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/report'), (mMenu = false)"
        >
          유어픽안심서비스란?
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/report/request'), (mMenu = false)"
        >
          안심거래리포트
        </button>
        <!-- <button type="button" class="btn" @click="$btnOnRouter('/alarm/request'), (mMenu = false)">
					전입신고 알리미
				</button> -->
      </div>
      <div class="dropdown-menu">
        <button type="button" class="btn" @click="$btnOnRouter('/real/search')">
          실거래가
        </button>
        <button type="button" class="btn" @click="$btnOnRouter('/app/search')">
          공시지가
        </button>
      </div>
      <div class="dropdown-right">
        <button type="button" class="btn" @click="$apiLOGOUT()">
          로그아웃
        </button>
      </div>
    </div>
  </div>
  <div class="header" v-else-if="checkLevel == 3">
    <div class="left">
      <h1 class="logo business" @click="$btnOnRouter('/business')"></h1>
    </div>
    <div class="right">
      <div class="right-menu">
        <button type="button" class="btn">전체메뉴</button>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-line white m-l--30"
        @click="$btnOnRouter('/business/login')"
      >
        로그인
      </button>
      <button
        type="button"
        class="btn btn-sm btn-line white m-l--10"
        @click="$btnOnRouter('/business/agree')"
      >
        회원가입
      </button>
    </div>
    <div class="dropdown right">
      <div class="dropdown-menu">
        <div class="tit">고객센터</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/center/notice')"
        >
          공지사항
        </button>
        <button type="button" class="btn" @click="$btnOnRouter('/center/news')">
          뉴스
        </button>
      </div>
      <div class="dropdown-menu">
        <div class="tit">상품관리</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/pay')"
        >
          상품결제
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/ticket')"
        >
          내 이용권
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/report')"
        >
          리포트 보관함
        </button>
      </div>
      <div class="dropdown-menu">
        <div class="tit">마이페이지</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/info')"
        >
          내 정보 관리
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/payHistory')"
        >
          결제내역
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/inquiry')"
        >
          서비스 문의
        </button>
      </div>
    </div>
  </div>
  <div class="header" v-else-if="checkLevel == 4">
    <div class="left">
      <h1 class="logo business" @click="$btnOnRouter('/business/main')"></h1>
    </div>
    <button
      type="button"
      class="btn a-btn"
      @click="$btnOnRouter('/alarmList')"
    ></button>
    <div class="right">
      <div class="right-menu">
        <button type="button" class="btn">전체메뉴</button>
      </div>
      <div class="user">
        <div class="img-wrap">
          <img v-if="userImg" :src="userImg" alt="" />
        </div>
        {{ userInfo.name }}님
      </div>
    </div>
    <div class="dropdown right">
      <div class="dropdown-menu">
        <div class="tit">고객센터</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/center/notice')"
        >
          공지사항
        </button>
        <button type="button" class="btn" @click="$btnOnRouter('/center/news')">
          뉴스
        </button>
      </div>
      <div class="dropdown-menu">
        <div class="tit">상품관리</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/pay')"
        >
          상품결제
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/ticket')"
        >
          내 이용권
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/report')"
        >
          리포트 보관함
        </button>
      </div>
      <div class="dropdown-menu">
        <div class="tit">마이페이지</div>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/info')"
        >
          내 정보 관리
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/payHistory')"
        >
          결제내역
        </button>
        <button
          type="button"
          class="btn"
          @click="$btnOnRouter('/business/inquiry')"
        >
          서비스 문의
        </button>
      </div>
      <div class="dropdown-right">
        <button type="button" class="btn" @click="$apiLOGOUT()">
          로그아웃
        </button>
      </div>
    </div>
  </div>

  <div class="mo-gnb">
    <button
      type="button"
      class="btn btn-report"
      v-bind:class="{ active: currentRouteName == 'report' }"
      @click="$btnOnRouter('/report')"
    >
      안심서비스
    </button>
    <button
      type="button"
      class="btn btn-home"
      v-bind:class="{ active: currentRouteName == 'main' }"
      @click="$btnOnRouter('/')"
    >
      홈
    </button>
    <button
      type="button"
      class="btn btn-more"
      v-bind:class="{ active: currentRouteName == 'mypage' }"
      @click="$btnOnRouter('/mypage/menu')"
    >
      더보기
    </button>
  </div>

  <ModalLogin
    v-if="$store.getters.getModalLogin"
    @closeModal="closeModalLogin"
  />
</template>

<script>
import ModalLogin from "../components/Modal/Login/ModalLogin";
import { mapGetters } from "vuex";

export default {
  name: "HeaderComponent",
  components: { ModalLogin },
  computed: {
    currentRouteName() {
      try {
        if (this.$route.name == "main") {
          return "main";
        } else if (this.$route.name == "notice" || this.$route.name == "news") {
          return "mypage";
        } else {
          const path = this.$route.path.split("/");
          return path[1];
        }
      } catch (e) {
        e;
        return false;
      }
    },
    checkLevel() {
      if (this.$store.getters.getUserInfo.level == 2) {
        return 4;
      } else if (this.$store.getters.getUserInfo.level == 1) {
        return 2;
      } else {
        if (this.$route.path.includes("business")) {
          return 3;
        } else {
          return 1;
        }
      }
    },
    ...mapGetters({
      userInfo: "getUserInfo",
    }),
  },
  data() {
    return {
      modalLogin: false,
      mMenu: false,
      toggle: false,
      toggle2: false,

      userImg: null,
    };
  },
  watch: {
    // $route(to, form) {},
  },
  created() {
    window.resultAddress = this.resultAddress;
    this.socialLogin();
    this.accessLog();
    this.setUserImg();
    this.setUserInfo();
  },
  updated() {},
  methods: {
    searchAddress() {
      window.naver.maps.Service.geocode(
        { address: this.adr },
        function (status, re) {
          if (status === window.naver.maps.Service.Status.ERROR) {
            alert("Something wrong!");
            return;
          }
          if (!re.result.total) {
            alert("검색결과가 없습니다.");
            return;
          }

          window.resultAddress(re.v2.addresses[0]);
        }
      );
    },
    resultAddress(item) {
      this.marker?.setMap(null);
      this.jibunAddress = "";
      this.roadAddress = "";
      this.zonecode = null;

      console.log(item);

      if (item.jibunAddress.indexOf(item.addressElements[6].longName) != -1) {
        let str = item.jibunAddress.split(" ");

        for (let i = 0; i < str.length; i++) {
          if (str[i] == item.addressElements[6].longName) {
            str.splice(i, 1);

            item.jibunAddress = str.join(" ");
          }
        }
      }
      item.jibunAddress = item.jibunAddress.replace("서울특별시", "서울시");
      this.jibunAddress = item.jibunAddress;

      if (item.roadAddress.indexOf(item.addressElements[6].longName) != -1) {
        let str = item.roadAddress.split(" ");

        for (let i = 0; i < str.length; i++) {
          if (str[i] == item.addressElements[6].longName) {
            str.splice(i, 1);

            item.roadAddress = str.join(" ");
          }
        }
      }

      item.roadAddress = item.roadAddress.replace("서울특별시", "서울시");
      this.roadAddress = item.roadAddress;

      if (this.roadAddress) {
        this.roadAddress += "(" + item.addressElements[2].longName + ")";
      }

      this.point = { x: item.x, y: item.y };
      this.zonecode =
        item.addressElements[8].longName == ""
          ? 0
          : Number(item.addressElements[8].longName);

      this.map.setCenter({ lat: this.point.y, lng: this.point.x });

      this.marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(this.point.y, this.point.x),
        map: this.map,
      });
    },
    closeModalLogin() {
      this.$store.dispatch("callSetModalLogin", false);
    },
    toggleActive(tg) {
      this.$refs[tg].classList.contains("active")
        ? this.$refs[tg].classList.remove("active")
        : this.$refs[tg].classList.add("active");
    },
    socialLogin() {
      if ("accessToken" in this.$route.query) {
        this.$apiSocialLOGIN(this.$route.query);
        // this.$btnOnLogin(1);
        // this.$btnOnRouter("/");
      } else if ("error" in this.$route.query) {
        alert(this.$route.query.error);
        // this.$btnOnRouter("/");
      }
    },
    accessLog() {
      this.$apiPOST("/user/access").then(() => {});
    },
    setUserImg() {
      this.$apiImgGET("/api/user/image").then((data) => {
        this.userImg = data;
      });
    },
    setUserInfo(){
        if(this.$store.getters.getUserInfo.level){
            this.$apiGET('/api/mypage/info').then(re => {
                this.$store.dispatch('callSetUserInfo2', re);
            });
        }
    }
  },
};
</script>
