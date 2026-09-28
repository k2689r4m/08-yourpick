<template>
  <div class="section">
    <div class="my-tit">
      <button
        type="button"
        class="btn btn-back m-block"
        @click="$btnOnRouterBack()"
      ></button>
      내 이용권
    </div>
    <div class="tab-list type1 m-b--30">
      <button
        type="button"
        class="btn tab-btn"
        v-bind:class="{ active: tapMenu == 1 }"
        @click="(tapMenu = 1), getItemList(1)"
      >
        사용 가능한 이용권
      </button>
      <button
        type="button"
        class="btn tab-btn"
        v-bind:class="{ active: tapMenu == 2 }"
        @click="(tapMenu = 2), getItemList(1)"
      >
        이용내역
      </button>
    </div>
    <template v-if="tapMenu == 1">
      <div class="table-wrap">
        <table class="table text-center">
          <tr>
            <th>구분</th>
            <th>이용권명</th>
            <th>수량</th>
            <th>유효기간</th>
            <th>남은 일자</th>
          </tr>
          <tr v-for="item in itemList" :key="'r_list_' + item.id">
            <td>{{ item.type == 0 ? "무료이용권" : "유료이용권" }}</td>
            <td>{{ item.info }}</td>
            <td>{{ item.cnt }}건</td>
            <td>
              {{ $dateFormat(item.dateS, "YYYY.MM.DD") }} ~
              {{ $dateFormat(item.dateE, "YYYY.MM.DD") }}
            </td>
            <td>{{ item.diff }}일</td>
          </tr>
        </table>
        <!-- 리스트 없을시 -->
        <div
          v-if="itemList == ''"
          class="p-60 txt-c--grey txt-size--15 txt-center"
        >
          사용가능한 이용권이 없습니다.
        </div>
      </div>
    </template>

    <template v-else-if="tapMenu == 2">
      <div class="table-wrap">
        <table class="table text-center">
          <tr>
            <th>
              <label class="input-checkbox">
                <input type="checkbox" />
                <span class="box"></span>
              </label>
            </th>
            <th>구분</th>
            <th>이용권명</th>
            <th>이용 건수</th>
            <th>발급일자</th>
            <th>비고</th>
          </tr>
          <tr v-for="item in itemList" :key="'r_use_' + item.id">
            <td>
              <label class="input-checkbox">
                <input type="checkbox" />
                <span class="box"></span>
              </label>
            </td>
            <td>{{ item.type == 0 ? "무료" : "유료" }}</td>
            <td>{{ item.info }}</td>
            <td>1</td>
            <td>{{ $dateFormat(item.created_at, "YYYY.MM.DD") }}</td>
            <td>{{ item.more }}</td>
          </tr>
        </table>
        <!-- 리스트 없을시 -->
        <div
          v-if="itemList == ''"
          class="p-60 txt-c--grey txt-size--15 txt-center"
        >
          이용한 내역이 없습니다.
        </div>
      </div>
    </template>

    <Pagination
      @getItemList="getItemList"
      :page="page"
      :pageData="pageData"
      :totalCount="totalCount"
      :itemSize="itemSize"
      :blockSize="blockSize"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
export default {
  name: "Main",
  components: { Pagination },
  computed: {},
  data() {
    return {
      itemList: [],
      tapMenu: 1,

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
    getItemList(pg) {
      let mode = "";
      if (this.tapMenu == 1) {
        mode = "list";
      } else {
        mode = "use";
      }

      this.$apiGET(
        "/api/mypage/good/" + mode + "?pg=" + (pg - 1) * this.itemSize
      ).then((data) => {
        this.itemList = data.item;

        this.totalCount = data.pageInfo.totalCount;
        this.page = pg;
        this.pageData = this.$pageDataSetting(
          this.totalCount,
          this.itemSize,
          this.blockSize,
          this.page
        );
      });
    },
  },
};
</script>
