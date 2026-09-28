<template>
  <div class="section">
    <div class="my-tit">
      <button
        type="button"
        class="btn btn-back m-block"
        @click="$btnOnRouterBack()"
      ></button>
      결제 내역
    </div>
    <div class="p-b--10 txt-right m-t---20">
      <button
        type="button"
        class="btn btn-normal btn-line"
        v-if="itemList.length"
        @click="delItem"
      >
        선택 삭제
      </button>
    </div>
    <div class="table-wrap">
      <table class="table text-center">
        <tr>
          <th>
            <label class="input-checkbox">
              <input type="checkbox" v-model="allST" @change="allSelect" />
              <span class="box"></span>
            </label>
          </th>
          <th>상품명</th>
          <th>결제일</th>
          <th>결제 수단</th>
          <th>처리상태</th>
        </tr>
        <tr v-for="item in itemList" :key="'reportre_' + item.id">
          <td>
            <label class="input-checkbox">
              <input type="checkbox" v-model="item.delST" />
              <span class="box"></span>
            </label>
          </td>
          <td>{{ item.info }}</td>
          <td>{{ $dateFormat(item.initDate, "YYYY.MM.DD") }}</td>
          <td>
            <template v-if="item.payType == 'bank'">
              가상계좌(무통장)입금
            </template>
            <template v-else-if="item.payType == 'card'"> 신용카드 </template>
            <template v-else-if="item.payType == 'naver'">
              간편결제 - 네이버페이
            </template>
            <template v-else-if="item.payType == 'kakao'">
              간편결제 - 카카오페이
            </template>
            <template v-else-if="item.payType == 'payco'">
              간편결제 - payco
            </template>
            <template v-else-if="item.payType == 'toss'">
              간편결제 - toss
            </template>
          </td>
          <td>
            <template v-if="item.cancelDate"> 취소 </template>
            <template v-else-if="item.sucssDate"> 발급완료 </template>
            <template v-else> 실패 </template>
          </td>
        </tr>
      </table>
      <!-- 리스트 없을시 -->
      <div
        v-if="itemList == ''"
        class="p-60 txt-c--grey txt-size--15 txt-center"
      >
        결제 내역이 없습니다.
      </div>
    </div>

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
      allST: false,

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
    allSelect() {
      if (this.allST) {
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].delST = true;
        }
      } else {
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].delST = false;
        }
      }
    },
    delItem() {
      let idList = [];
      for (let i = 0; i < this.itemList.length; i++) {
        if (this.itemList[i].delST == true) {
          idList.push(this.itemList[i].id);
        }
      }

      this.$apiPOST("/api/mypage/pay/del", { idList: idList }).then(() => {
        this.allST = false;
        this.getItemList(1);
      });
    },
    getItemList(pg) {
      this.$apiGET("/api/mypage/pay?pg=" + (pg - 1) * this.itemSize).then(
        (data) => {
          for (let i = 0; i < data.item.length; i++) {
            data.item[i].delST = false;
          }

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
  },
};
</script>
