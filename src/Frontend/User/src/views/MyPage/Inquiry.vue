<template>
  <div class="section">
    <div class="my-tit">
      <button
        type="button"
        class="btn btn-back m-block"
        @click="$btnOnRouter('/mypage/menu')"
      ></button
      >서비스 문의
    </div>
    <div class="tab-list type1">
      <button
        type="button"
        class="btn tab-btn"
        v-bind:class="{ active: tapMenu == 1 }"
        @click="changeMenu(1)"
      >
        1:1 상담하기
      </button>
      <button
        type="button"
        class="btn tab-btn"
        v-bind:class="{ active: tapMenu == 2 }"
        @click="changeMenu(2)"
      >
        1:1 문의내역
      </button>
    </div>

    <template v-if="tapMenu == 1">
      <div class="my-guide">
        · 유어픽에서 제공하는 서비스와 관련하여 문의사항을 올려주시면 빠른 시일
        내에 답변 드리겠습니다.<br />
        · 업무 종료 이후 접수된 문의 · 일요일 · 공휴일에 접수된 문의는
        답변시간이 지연 될 수 있으니 양해 부탁드립니다.<br />
        · 고객센터 운영시간 평일 09~18시
      </div>
      <div class="hr sm"></div>
      <div class="row">
        <div class="col-6">
          <div class="input-wrap">
            <label class="input-label">· 아이디</label>
            <strong class="unit">{{ userInfo_.email }}</strong>
          </div>
        </div>
        <div class="hr sm m-block"></div>
        <div class="col-6">
          <div class="input-wrap">
            <label class="input-label">· 비밀번호</label>
            <input
              type="password"
              class="input-text"
              placeholder="비밀번호 입력"
              v-model="inquData.pw"
            />
          </div>
        </div>
      </div>
      <div class="hr sm"></div>
      <div class="input-wrap">
        <label class="input-label">· 제목</label>
        <input type="text" class="input-text" v-model="inquData.title" />
      </div>
      <div class="hr sm"></div>
      <div class="input-wrap">
        <label class="input-label">· 내용</label>
        <textarea
          class="input-textarea"
          rows="10"
          v-model="inquData.memo"
        ></textarea>
      </div>
      <div class="hr sm"></div>
      <div class="btn-wrap">
        <button type="button" class="btn btn-big btn-dark" @click="clearInqu">
          다시쓰기
        </button>
        <button type="button" class="btn btn-big btn-primary" @click="sendInqu">
          등록
        </button>
      </div>
    </template>
    <template v-else-if="tapMenu == 2">
      <div class="my-guide">
        · 업무 종료 이후 접수된 문의 · 일요일 · 공휴일에 접수된 문의는
        답변시간이 지연 될 수 있으니 양해 부탁드립니다.<br />
        · 고객센터 운영시간 평일 09~18시
      </div>
      <div class="table-wrap">
        <template v-if="itemList.length">
          <table class="table text-center">
            <tr>
              <th>번호</th>
              <th>결제일</th>
              <th>제목</th>
              <th>답변</th>
            </tr>
            <tr
              v-for="(item, idx) in itemList"
              :key="'inquList_' + item.id"
              @click="$btnOnRouter('/mypage/inquiry/' + item.id)"
              class="pointer"
            >
              <td>{{ idx + 1 + (page - 1) * itemSize }}</td>
              <td>{{ $dateFormat(item.qDate, "YYYY.MM.DD") }}</td>
              <td>{{ item.qTitle }}</td>
              <td>
                <template v-if="item.aDate">답변완료</template>
                <template v-else
                  ><span class="txt-c--grey">미답변</span></template
                >
              </td>
            </tr>
          </table>

          <Pagination
            @getItemList="getItemList"
            :page="page"
            :pageData="pageData"
            :totalCount="totalCount"
            :itemSize="itemSize"
            :blockSize="blockSize"
          ></Pagination>
        </template>
        <template v-else>
          <table class="table text-center">
            <tr>
              <th>번호</th>
              <th>결제일</th>
              <th>제목</th>
              <th>답변</th>
            </tr>
          </table>
          <div class="p-60 txt-c--grey txt-size--15 txt-center">
            등록된 문의 내역이 없습니다.
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Pagination from "../../components/Pagination";

export default {
  name: "Main",
  components: { Pagination },
  computed: {
    ...mapGetters({
      userInfo_: "getUserInfo",
    }),
  },
  data() {
    return {
      tapMenu: 2,
      itemList: [],
      inquData: {
        title: "",
        memo: "",
        pw: "",
      },

      page: 1,
      pageData: null,
      totalCount: null,
      itemSize: 10,
      blockSize: 5,
    };
  },

  created() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
      this.getItemList(this.page);
    },
    changeMenu(m) {
      this.tapMenu = m;
      if (this.tapMenu == 2) {
        this.getItemList(this.page);
      }
    },
    getItemList(pg) {
      this.$apiGET("/api/mypage/inqu?pg=" + (pg - 1) * this.itemSize).then(
        (data) => {
          this.itemList = data.item;

          this.totalCount = data.pageInfo.totalCount;
          this.page = pg;
          this.pageData = this.$pageDataSetting(
            this.totalCount,
            this.itemSize,
            this.blockSize,
            this.page
          );
        }
      );
    },
    clearInqu() {
      this.inquData = { title: "", memo: "", pw: "" };
    },
    sendInqu() {
      if (!this.inquData.pw) {
        alert("비밀번호를 입력해 주세요.");
        return;
      }

      if (!this.inquData.title) {
        alert("제목을 입력해 주세요.");
        return;
      }

      if (!this.inquData.memo) {
        alert("내용을 입력해 주세요.");
        return;
      }

      this.$apiPOST("/api/mypage/inqu/add", this.inquData).then((re) => {
        if (re) {
          alert("등록완료");
          this.clearInqu();
        }
      });
    },
  },
};
</script>
