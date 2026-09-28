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
      <div class="my-card--tit">
        기본 정보<button
          type="button"
          class="btn btn-right"
          @click="modal2 = true"
        >
          회원탈퇴
        </button>
      </div>
      <div class="my-photo">
        <div class="img-wrap">
          <img v-if="userInfo.imgSrc" :src="userInfo.imgSrc" alt="" />
        </div>
        <label class="btn-set">
          <input type="file" accept="image/*" @change="imgFileUp($event)" />
        </label>
      </div>
      <div class="input-wrap">
        <label class="input-label">· 이름</label>
        <input type="text" class="input-text" v-model="userInfo.name" />
      </div>
      <div class="input-wrap">
        <label class="input-label">· 생년월일</label>
        <input
          type="date"
          class="input-text input-date"
          v-model="userInfo.birthday"
        />
      </div>
      <div class="input-wrap">
        <label class="input-label">· 휴대폰번호</label>
        <input type="text" class="input-text" v-model="userInfo.phone1" />
        <span class="unit">-</span>
        <input type="text" class="input-text" v-model="userInfo.phone2" />
        <span class="unit">-</span>
        <input type="text" class="input-text" v-model="userInfo.phone3" />
      </div>
      <div class="input-wrap">
        <label class="input-label">· 이메일 아이디</label>
        <input
          type="text"
          class="input-text"
          v-model="userInfo.email"
          disabled
        />
        <span class="unit">@</span>

        <SlimSelect v-model="userInfo.emailCom" class="input-select" disabled>
          <option>naver.com</option>
          <option>nate.com</option>
          <option>hanmail.net</option>
          <option>gmail.com</option>
          <option>kakao.com</option>
        </SlimSelect>
      </div>
      <div v-if="!userInfo.socialType" class="input-wrap">
        <label class="input-label">· 비밀번호</label>
        <input type="password" class="input-text" value="asdasdasd" disabled />
        <button
          type="button"
          class="btn btn-line input-btn"
          @click="modal = true"
        >
          비밀번호 변경
        </button>
      </div>
      <div class="hr"></div>
      <div class="btn-wrap">
        <button
          type="button"
          class="btn btn-big btn-primary"
          @click="updateInfo"
        >
          수정 완료
        </button>
      </div>
    </div>
  </div>
  <ModalInfo v-if="modal" @closeModal="closeModal" @passChang="passChang" />
  <ModalInfo2 v-if="modal2" @closeModal="closeModal" />
</template>

<script>
import { mapGetters } from "vuex";
import SlimSelect from "@slim-select/vue";
import ModalInfo from "../../components/Modal/MyPage/ModalInfo";
import ModalInfo2 from "../../components/Modal/MyPage/ModalInfo2";

export default {
  name: "Main",
  components: { ModalInfo, ModalInfo2, SlimSelect },
  computed: {
    ...mapGetters({
      userInfo_: "getUserInfo",
    }),
  },
  data() {
    return {
      modal: false,
      modal2: false,
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
        imgSrc: null,
      },
      userImgFile: null,

      oldPW: null,
      newPW: null,
    };
  },

  created() {
    this.getInfo();
  },
  updated() {},
  methods: {
    closeModal() {
      this.modal = false;
      this.modal2 = false;
    },
    getInfo() {
      this.$apiGET("/api/mypage/info").then((re) => {
        re.birthday = this.$dateFormat(re.birthday, "YYYY-MM-DD");
        re.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`);
        this.userInfo = re;

        this.$apiImgGET("/api/user/image").then((data) => {
          this.userInfo.imgSrc = data;
        });
      });
    },
    passChang(oldPW, newPW) {
      // console.log(oldPW, newPW);
      this.oldPW = oldPW;
      this.newPW = newPW;
    },
    updateInfo() {
      // this.$apiPOST('/api/mypage/info/update', this.userInfo).then(re => {
      // 	if (re) {
      // 		this.$store.dispatch('callSetUserInfo', this.userInfo_.level);
      // 		alert('수정 완료');
      // 	}
      // });

      this.$apiFormData2(
        "/api/mypage/info/update",
        this.userInfo,
        this.userImgFile ? [this.userImgFile] : []
      ).then((re) => {
        if (re) {
          if (this.oldPW && this.newPW) {
            this.$apiPOST("/api/mypage/pwd/change", {
              password: this.oldPW,
              passwd: this.newPW,
            }).then(() => {
              this.oldPW = null;
              this.newPW = null;
            });
          }

          this.$store.dispatch("callSetUserInfo", this.userInfo_.level);
          alert("수정 완료");
        }
      });
    },
    imgFileUp(e) {
      if (!e.target.files.length) {
        return;
      }

      if (!e.target.files[0].type.match("image/.*")) {
        alert("이미지 확장자만 업로드 가능합니다.");
        return;
      }

      this.userImgFile = e.target.files[0];
      this.userInfo.imgSrc = URL.createObjectURL(this.userImgFile);

      // this.$apiFormData(
      // 	'/api/mypage/info/update',
      // 	this.userInfo,
      // 	[this.userImg.file],
      // ).then(re => {
      // 	if (re) {
      // 		this.$btnOnRouter('/business/complete');
      // 	}
      // });
    },
  },
};
</script>
