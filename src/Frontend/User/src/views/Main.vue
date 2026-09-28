<template>
  <div class="container main" @click="(adrList = []), (isItem = null)">
    <div class="section main-user m-block">
      <div class="user-info" v-if="checkLevel == 1">
        <div class="img-wrap"></div>
        <button
          type="button"
          class="btn"
          @click="$store.dispatch('callSetModalLogin', true)"
        >
          <strong>로그인</strong>해주세요
        </button>
      </div>
      <div class="user-info" v-else>
        <div class="img-wrap"><img v-if="userImg" :src="userImg" alt="" /></div>
        <strong>{{ userInfo.name }}</strong
        >님, 안녕하세요.
      </div>
    </div>
    <div class="section main-top mobile m-block">
      <div class="text">A부터 Z까지 솔루션 분석, <br />안심거래리포트!</div>
      <div class="bottom">
        해당 주소에 대한 핵심 내용 전달
        <button type="button" class="btn" @click="$btnOnRouter('/report')">
          발급하기
        </button>
      </div>
    </div>
    <div class="section main-top m-none">
      <div class="main-top--info">
        <div class="info-left">
          <div class="tit-top">주소 입력만 하면 빠르고 간편하게!</div>
          <div class="tit">
            부동산 안심거래 솔루션,
            <img src="../assets/images/logo_ko.png" alt="" />
          </div>
          <div class="m-block img-wrap">
            <img src="../assets/images/main_top_img.svg" alt="" />
          </div>
          <div class="con">
            안심거래리포트를 통해 안전하게 집에 대한 분석을 받아보세요.<br />
            해당 주소 건물에 대한 가격 분석, 권리 분석, 전세사기 분석 등<br />
            우리가 봐야 할 핵심 내용만 구성하여 제공해드려요.
          </div>
          <div class="btns">
            <button
              type="button"
              class="btn btn-round btn-md btn-primary"
              @click="$btnOnRouter('/report')"
            >
              자세히 보기
            </button>
            <button
              type="button"
              class="btn btn-round btn-md btn-white"
              @click="sampleModal = true"
            >
              리포트 샘플 보기
            </button>
          </div>
        </div>
        <div class="info-right">
          <div class="img-wrap">
            <img src="../assets/images/main_top_img.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="main-top--search">
        <div class="tit">
          1분 내에 리포트 발급이
          <br class="m-block" />완료되는
          <span class="txt-c--primary">자동화 솔루션</span>이에요!
        </div>
        <div class="search-wrap">
          <input
            type="text"
            class="input-text"
            placeholder="안심거래리포트 발급을 원하는 주소를 입력해주세요."
            v-model="adr"
            @keyup.enter="getAddr"
          />
          <button type="button" class="btn btn-primary btn-lg" @click="getAddr">
            검색하기
          </button>
        </div>

        <!-- <ul class="report-add--list" v-if="adrList.length">
                        <li class="item" v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
                            <span class="name">
                                <span class="badge">도로명 주소</span>
                                {{ isAdr.jibunAddr }}
                            </span>
                            <button type="button" class="btn btn-line btn-sm" @click="resultAddress(isAdr)">선택</button>
                        </li>
                    </ul> -->

        <div
          v-if="adrList.length"
          class="search-wrap--dropdown show"
          @click.stop
        >
          <div class="list">
            <label
              class="input-checkbox type2"
              v-for="(isAdr, idx) in adrList"
              :key="'adr3_' + idx"
            >
              <!-- <input type="radio" name="addRadio" v-model="searchIdx" :value="idx" /> -->
              <input
                type="radio"
                name="addRadio"
                v-model="isItem"
                :value="isAdr"
              />
              <span class="text">{{ isAdr.jibunAddr }}</span>
              <span class="box check"></span>
            </label>
            <!-- <label class="input-checkbox type2">
                                <input type="checkbox" />
                                <span class="text">집합건물<br />서울특별시 영등포구 선유로 49길 4 에스케이타워 [양평동4가 64-4]</span>
                                <span class="box check"></span>
                            </label> -->
          </div>
          <button
            type="button"
            class="btn btn-full btn-primary"
            @click="resultAddress"
            :disabled="!isItem"
          >
            알아보기
          </button>
          <div class="m-t--20">
            <button
              type="button"
              class="btn btn-underline txt-c--black txt-size--15"
              @click="$btnOnRouter('/report')"
            >
              <strong>안심거래리포트가 무엇인가요?</strong>
            </button>
          </div>
        </div>
      </div>
      <div class="main-top--box">
        <div class="tit">
          어렵고 낯설었던 부동산,
          <br class="m-block" />이제는 쉽고 간편하게 분석 받아보세요.
        </div>
        <div class="con">
          각 종 부동산 공적 자료들을 기반으로<br />
          해당 건물에 대한 위험성 및 안전성을 분석하여 제공하는 솔루션
          플랫폼입니다.
        </div>
      </div>
    </div>
    <div class="section m-none">
      <div class="main-tit">유어픽 안심거래 솔루션</div>
      <div class="main-sub">
        이제는 안심거래리포트를 통해 간편하고 정확하게
        <br class="m-block" />원하는 집에 대한 정보를 알아보세요!
      </div>
      <ul class="main-solution">
        <li class="main-solution--item">
          <div class="icon-1"></div>
          <div class="text">
            <div class="tit">안심거래 점수</div>
            <div class="con">
              해당 건물에 대한 유어픽 최종 안심거래 점수 제공
            </div>
          </div>
        </li>
        <li class="main-solution--item">
          <div class="icon-2"></div>
          <div class="text">
            <div class="tit">해당 및 주변 건물 가격 분석</div>
            <div class="con">동일한 면적 기준, 거래가격 적합성 판단</div>
          </div>
        </li>
        <li class="main-solution--item">
          <div class="icon-3"></div>
          <div class="text">
            <div class="tit">공적자료 기반 권리 분석</div>
            <div class="con">
              등기부 등본, 건축물대장 등 공적자료 핵심 내용 분석
            </div>
          </div>
        </li>
        <li class="main-solution--item">
          <div class="icon-4"></div>
          <div class="text">
            <div class="tit">전세사기 사전 방지</div>
            <div class="con">안전한 전세 거래를 위한 필수 확인 사항 제공</div>
          </div>
        </li>
        <li class="main-solution--item">
          <div class="icon-5"></div>
          <div class="text">
            <div class="tit">원스톱 발급 시스템</div>
            <div class="con">
              안심거래리포트 발급과 함께 공적자료 원본 및 특약사항이 삽입된
              임대차계약서를 함께 제공해요!
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="section m-block">
      <div class="main-tit">부동산 정보</div>
      <ul class="main-solution">
        <li class="main-solution--item" @click="$btnOnRouter('/real/search')">
          <div class="icon-6"></div>
          <div class="text">
            <div class="tit">실거래가 조회</div>
            <div class="con">원하는 집에 대한 실거래가 정보를 한 눈에</div>
          </div>
        </li>
        <li class="main-solution--item" @click="$btnOnRouter('/app/search')">
          <div class="icon-7"></div>
          <div class="text">
            <div class="tit">공시지가 조회</div>
            <div class="con">공동주택 적정가격 파악하기</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="section bg-pink m-none">
      <div class="main-tit type2">
        안전한 부동산 시장 환경을 조성하기 위하여<br />
        <span class="txt-c--primary">유어픽</span>이 함께 동행합니다.
      </div>
      <ul class="main-card">
        <li class="main-card--item">
          <div class="img-box">
            <img src="../assets/images/main_service_img1.png" alt="" />
          </div>
          <div class="text-box">
            <div class="logo"></div>
            <div class="tit-top">부동산 자동화 분석 솔루션,</div>
            <div class="tit">안심거래리포트</div>
            <div class="con">
              해당 주소 건물에 대한 종합 분석 리포트입니다.<br />
              <br />
              각 종 부동산 공적 자료 및 자사만의 데이터를 활용<br />
              하여 취합 및 분석을 통해 핵심 내용을 알려드려요.
            </div>
            <button
              type="button"
              class="btn btn-normal btn-primary btn-round"
              @click="$btnOnRouter('/report/request/addressSearch')"
            >
              바로가기
            </button>
          </div>
        </li>
        <!-- <li class="main-card--item">
                        <div class="img-box">
                            <img src="../assets/images/main_service_img2.png" alt="" />
                        </div>
                        <div class="text-box">
                            <div class="logo"></div>
                            <div class="tit-top">문서 조작 방지 솔루션,</div>
                            <div class="tit">전입신고 변동 알림 서비스</div>
                            <div class="con">
                                집주인이 세입자 몰래 주소를 이전시키는<br />
                                허위 전입·전출 행위가 발생하고 있습니다.<br />
                                <br />
                                이를 방지하기 위해 변동 시 알려주는 서비스예요.
                            </div>
                            <button type="button" class="btn btn-normal btn-primary btn-round">바로가기</button>
                        </div>
                    </li> -->
        <li class="main-card--item">
          <div class="img-box">
            <img src="../assets/images/main_service_img3.png" alt="" />
          </div>
          <div class="text-box">
            <div class="logo"></div>
            <div class="tit-top">기본적인 부동산 정보,</div>
            <div class="tit">실거래가, 공시지가</div>
            <div class="con">
              알아보고 있는 주소지 건물에 대한 실거래가 및<br />
              공시지가에 대한 정보를 제공해드려요.
            </div>
            <button
              type="button"
              class="btn btn-normal btn-primary btn-round"
              @click="$btnOnRouter('/real/search')"
            >
              바로가기
            </button>
          </div>
        </li>
      </ul>
    </div>
    <ul class="main-icon--list m-none">
      <li class="item">
        <div class="icon-1"></div>
        <div class="tit">누구에게나 쉬운 정보</div>
        <div class="con">
          어렵고 낯설었던 부동산 정보,<br />
          이제는 누구나 쉽고 간편하게 이용할 수 있습니다.
        </div>
      </li>
      <li class="item">
        <div class="icon-2"></div>
        <div class="tit">정보 비대칭 해결</div>
        <div class="con">
          부동산 전문가만 아는 정보가 아닌,<br />
          필요한 모든 정보들을 빠짐없이 제공합니다.
        </div>
      </li>
      <li class="item">
        <div class="icon-3"></div>
        <div class="tit">상생하는 생태계</div>
        <div class="con">
          플랫폼을 이용하는 투자자, 임대인, 임차인, 중개사<br />
          모두가 상생하는 구조를 만듭니다.
        </div>
      </li>
    </ul>
    <div class="section bg-grey m-none">
      <div class="main-tit type2">
        유어픽을 이용해주신
        <span class="line"><span>실제 고객 분들의</span></span>
        후기!
      </div>
      <ul class="main-review">
        <li class="main-review--item">
          <div class="left">
            <div class="img-wrap">
              <img src="../assets/images/icons/main_review_img1.svg" alt="" />
            </div>
            28세 직장인 정OO
          </div>
          <div class="right">
            <div class="tit">너무 편리해요!</div>
            <div class="con">
              집을 알아볼 때, 항상 부동산 자료를 어디서 찾아야 하는지 무슨
              내용을 봐야 하는지 너무 막막했거든요.. 그러다 보니 매번 주변
              사람들에게 의지만 했습니다.<br />
              <br />
              유어픽 안심거래리포트를 통해 원하던 부동산 정보들을 한 눈에 확인할
              수 있어서 너무 편리했어요! 덕분에 안전하게 원하는 집을 잘 구할 수
              있었어요. 감사합니다!
            </div>
          </div>
        </li>
        <li class="main-review--item">
          <div class="left">
            <div class="img-wrap">
              <img src="../assets/images/icons/main_review_img2.svg" alt="" />
            </div>
            36세 신혼부부 김OO
          </div>
          <div class="right">
            <div class="tit">부린이를 위한 필수 서비스!</div>
            <div class="con">
              내가 보고 있는 집의 가격이 적당하고 위험하지는 않는지 분석해주니
              너무 좋네요.<br />
              <br />
              그리고 신혼집을 알아보면서 비교해볼 집들이 너무 많았는데, 리포트
              발급 가격이 저렴해서 보고 싶은 집 정보들을 쉽고 빠르게 비교하면서
              알아볼 수 있었어요!!<br />
              <br />
              쉽고 핵심 내용들 위주로 알려줘서 부린이들에게는 강추입니다!
            </div>
          </div>
        </li>
        <li class="main-review--item">
          <div class="left">
            <div class="img-wrap">
              <img src="../assets/images/icons/main_review_img3.svg" alt="" />
            </div>
            42세 공인중개사 홍OO
          </div>
          <div class="right">
            <div class="tit">간편하고 또 정직하게!</div>
            <div class="con">
              요즘 사기가 많아서 걱정하시는 고객 분들이 많아지셨어요.<br />
              <br />
              유어픽 안심거래리포트를 보여주면서 설명을 드렸더니 더
              믿음직스럽다고 좋아하시더라구요! 덕분에 정말 많은 고객 분들에게 더
              정직하게 다가갈 수 있었습니다.<br />
              <br />
              또 빠르게 리포트를 뽑아볼 수 있으니까 고객 분들을 맞이할 때 시간을
              줄일 수 있었던 것도 큰 도움이 되어 앞으로도 고객 응대할 때 매번
              이용할 거 같아요!
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="section bg-pink--mo">
      <div class="main-tit type2 m-none">
        유어픽이 알려주는
        <span class="line"><span>부동산 상식</span></span>
      </div>
      <div class="main-tit m-block">부동산 상식</div>
      <div class="main-swiper--wrap">
        <div class="main-swiper">
          <swiper
            :modules="modules"
            :slides-per-view="2"
            :spaceBetween="20"
            :breakpoints="{
              '660': {
                slidesPerView: 4,
              },
            }"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
          >
            <swiper-slide v-for="(isTip, idx) in tipList" :key="'tip_' + idx">
              <div class="tit m-none">부동산 상식 {{ idx + 1 }}</div>
              <div
                class="con"
                v-html="isTip.content?.split('\n').join('<br />')"
              ></div>
              <a
                :href="isTip.url"
                target="_blank"
                class="btn btn-link"
                v-bind:class="{ disabled: isTip.urlNewWindow == 'N' }"
              ></a>
            </swiper-slide>
            <!-- <swiper-slide>
                                <div class="tit">부동산 상식2</div>
                                <div class="con">
                                    &lt;부린이 탈출기&gt;<br />
                                    신탁등기 계약 시, 주의사항
                                </div>
                                <button type="button" class="btn btn-link"></button>
                            </swiper-slide> -->
          </swiper>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <div class="main-bottom m-none">
      <div class="left">
        <img src="../assets/images/app_device.png" alt="" />
      </div>
      <div class="right">
        <div class="text">
          <span class="txt-c--primary">유어픽 앱</span>을 통해 더 편하게<br />
          서비스를 이용해보세요!
        </div>
        <div class="btns">
          <a href="https://play.google.com/store/search?q=%EC%9C%A0%EC%96%B4%ED%94%BD&c=apps&hl=ko-KR" target="_blank" class="btn btn-google"></a>
          <button type="button" class="btn btn-apple"></button>
        </div>
      </div>
    </div>

    <div class="modal" v-bind:class="{ show: sampleModal }">
      <div class="modal-dim" @click="sampleModal = false"></div>
      <div class="modal-con lg">
        <div class="modal-tit">
          리포트 샘플
          <button
            type="button"
            class="btn btn-close"
            @click="sampleModal = false"
          ></button>
        </div>
        <div class="txt-only scroll">
          <img src="../assets/images/report_sample_pc.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: { Swiper, SwiperSlide },
  computed: {
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
      modules: [Navigation],
      adr: "",
      adrList: [],
      tipList: "",

      userImg: null,
      isItem: null,
      sampleModal: false,
    };
  },

  created() {
    this.tipItemList();
    this.setUserImg();
  },
  updated() {},
  methods: {
    getAddr() {
      this.isItem = null;
      let addr = "";
      addr = this.adr;

      if (!addr) {
        return;
      }

      this.$apiGET("/user/addr/link?addr=" + addr).then((re) => {
        this.adrList = re;
      });
    },
    resultAddress() {
      let item = this.isItem;
      const dataInfo = {
        admCd: item.admCd,
        rnMgtSn: item.rnMgtSn,
        dongNm: item.dongNm ? item.dongNm : "",
        siNm: item.siNm,
        sggNm: item.sggNm,
        emdNm: item.emdNm,
        liNm: item.liNm ? item.liNm : "",
        lnbrMnnm: item.lnbrMnnm,
        lnbrSlno: item.lnbrSlno,
        rn: item.rn,
        buldMnnm: item.buldMnnm,
        buldSlno: item.buldSlno,
        bdNm: item.bdNm,
        jibunAddr: item.jibunAddr,
        roadAddr: item.roadAddr,
      };

      this.$store.dispatch("callSetReportInfo", dataInfo);
      this.$btnOnRouter("/report/request/addressSelect");
    },
    tipItemList() {
      this.$apiGET("/user/tip").then((re) => {
        this.tipList = re;
        console.log(this.tipList);
      });
    },
    closeModalLogin() {
      this.$store.dispatch("callSetModalLogin", false);
    },
    setUserImg() {
      this.$apiImgGET("/api/user/image").then((data) => {
        this.userImg = data;
      });
    },
  },
};
</script>
