<template>
  <div class="section">
    <div class="my-tit type2">
      <button
        type="button"
        class="btn btn-back m-block"
        @click="$btnOnRouterBack()"
      ></button>
      내 정보 관리
    </div>
    <div class="my-card">
      <div class="my-info--view">
        <div class="label">· 프로필 이미지</div>
        <div class="right">
          <div class="img-wrap">
            <img v-if="userImg" :src="userImg" alt="" />
          </div>
        </div>
      </div>
      <div class="my-info--view">
        <div class="label">· 이름</div>
        <div class="right">
          {{ userInfo.name }}
        </div>
      </div>
      <div class="my-info--view">
        <div class="label">· 생년월일</div>
        <div class="right">
          {{ userInfo.birthday }}
        </div>
      </div>
      <div class="my-info--view">
        <div class="label">· 휴대폰 번호</div>
        <div class="right">
          {{ userInfo.phone1 }}-{{ userInfo.phone2 }}-{{ userInfo.phone3 }}
        </div>
      </div>
      <div class="my-info--view">
        <div class="label">· 이메일 아이디</div>
        <div class="right">{{ userInfo.email }}@{{ userInfo.emailCom }}</div>
      </div>
      <template v-if="userInfo.userType != null">
        <div class="my-info--view">
          <div class="label">· 회원유형</div>
          <div class="right">
            {{ userInfo.userType }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 중개사무소명</div>
          <div class="right">
            {{ userInfo.medOfficeNm }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 대표자명</div>
          <div class="right">
            {{ userInfo.name }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 중개사무소 주소</div>
          <div class="right">
            {{ userInfo.address }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 대표 연락처</div>
          <div class="right">
            {{ userInfo.telno }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 사업자 등록번호</div>
          <div class="right">
            {{ userInfo.businessNum }}
          </div>
        </div>
        <div class="my-info--view">
          <div class="label">· 중개사 등록번호</div>
          <div class="right">
            {{ userInfo.estblRegNo }}
          </div>
        </div>
      </template>
      <div class="btn-wrap">
        <button
          type="button"
          class="btn btn-big btn-primary"
          @click="$btnOnRouter('/business/info')"
          v-if="userInfo.userType != null"
        >
          정보 수정
        </button>
        <button
          type="button"
          class="btn btn-big btn-primary"
          @click="$btnOnRouter('/mypage/info')"
          v-else
        >
          정보 수정
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlimSelect from "@slim-select/vue";

export default {
  name: "Main",
  components: { SlimSelect },
  computed: {
    ...mapGetters({
      userInfo_: "getUserInfo",
    }),
  },
  data() {
    return {
        userInfo: {
            id: null,
            birthday: null,
            email: null,
            emailCom: null,
            name: null,
            phone: null,
            phone1: null,
            phone2: null,
            phone3: null,
            agreeSt: null,
        },
        userImg: null,
    };
  },

  created() {
    this.getInfo();
    this.setUserImg();
  },
  updated() {},
  methods: {
    getInfo() {
      this.$apiGET("/api/mypage/info").then((re) => {
        re.birthday = this.$dateFormat(re.birthday, "YYYYMMDD");
        re.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`);
        this.userInfo = re;
      });
    },
    setUserImg(){
        this.$apiImgGET('/api/user/image').then(data => {
            this.userImg = data;
        });
    },
  },
};
</script>
