<template>
  <div class="section">
    <div class="my-tit">
      <button
        type="button"
        class="btn btn-back m-block"
        @click="$btnOnRouterBack()"
      ></button>
      리포트 보관함
    </div>
    <div class="tab-list type1">
      <button type="button" class="btn tab-btn active">안심거래리포트</button>
    </div>
    <div class="p-t--10 p-b--10" v-if="itemList.length">
      <button type="button" class="btn btn-normal btn-line" @click="delItem">
        선택 삭제
      </button>
    </div>
    <div class="table-wrap">
      <table class="table text-center" v-if="itemList.length">
        <tr>
          <th>
            <label class="input-checkbox">
              <input type="checkbox" v-model="allST" @change="allSelect" />
              <span class="box"></span>
            </label>
          </th>
          <th>발급내역</th>
          <th>발급된 주소</th>
          <th>발급일</th>
          <th>프린트</th>
          <th>표제부</th>
          <th>등기부</th>
          <th>계약서</th>
          <th>확인항목</th>
        </tr>
        <tr v-for="item in itemList" :key="'reportre_' + item.id">
          <td>
            <label class="input-checkbox">
              <input type="checkbox" v-model="item.delST" />
              <span class="box"></span>
            </label>
          </td>
          <td>안심거래리포트</td>
          <td>
            {{ item.siNm }} {{ item.sggNm }} {{ item.emdNm }}
            {{ item.complexName }}
          </td>
          <td>{{ $dateFormat(item.updated_at, "YYYY.MM.DD") }}</td>
          <td>
            <button
              type="button"
              class="btn btn-print"
              @click="openReport(item.id, item.tradeType)"
            ></button>
          </td>
          <td>
            <button
              v-if="item.buildId"
              type="button"
              class="btn btn-list"
              @click="getBuildFile(item.buildId)"
            ></button>
            <button
              v-else
              type="button"
              class="btn btn-list2"
            ></button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-list"
              @click="getRegFile(item.regId)"
            ></button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-pen"
              @click="getEtcFile(item.tradeType)"
            ></button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-check"
              @click="getEtcFile('0')"
            ></button>
          </td>
        </tr>
      </table>
      <template v-else>
        <div class="p-t--10 p-b--10">
          <button type="button" class="btn btn-normal btn-line">
            선택 삭제
          </button>
        </div>
        <table class="table text-center">
          <tr>
            <th>
              <label class="input-checkbox">
                <input type="checkbox" v-model="allST" @change="allSelect" />
                <span class="box"></span>
              </label>
            </th>
            <th>발급내역</th>
            <th>발급된 주소</th>
            <th>발급일</th>
            <th>프린트</th>
            <th>표제부</th>
            <th>등기부</th>
            <th>계약서</th>
            <th>확인항목</th>
          </tr>
        </table>
        <div class="p-60 txt-c--grey txt-size--15 txt-center">
          발급된 리포트내역이 없습니다.
        </div>
      </template>
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
    openReport(id, tradeType) {
      let w = window.screen.availWidth;
      let h = window.screen.availHeight;
      let attr = "width=" + w + ", height=" + h + ", resizable=no, status=no";

      if (tradeType == "A1") {
        window.open("/result/maemae/" + id, "", attr);
      } else if (tradeType == "B1") {
        window.open("/result/jeonse/" + id, "", attr);
      } else if (tradeType == "B2") {
        window.open("/result/monthly/" + id, "", attr);
      }
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
    getEtcFile(mode) {
      let fileName = "";
      let id = null;

      console.log(mode);

      if (mode == "A1") {
        id = 1;
        fileName = "자사 매매 계약서(특약사항).pdf";
      } else if (mode == "B1") {
        id = 2;
        fileName = "자사 임대차 계약서(전세,특약사항).pdf";
      } else if (mode == "B2") {
        id = 3;
        fileName = "자사 임대차 계약서(월세,특약사항).pdf";
      } else if (mode == "0") {
        id = 4;
        fileName = "계약 안심 체크 리스트.jpg";
      }

      this.$apiImgGET("/api/reg/file?rid=" + id).then((re) => {
        const link = document.createElement("a");
        link.href = re;
        link.style.display = "none";

        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    getBuildFile(rid) {
      this.$apiImgGET("/api/build/file?rid=" + rid).then((re) => {
        const link = document.createElement("a");
        link.href = re;
        link.style.display = "none";

        link.download = "표제부.pdf";

        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    getRegFile(rid) {
      this.$apiImgGET("/api/reg/file?rid=" + rid).then((re) => {
        const link = document.createElement("a");
        link.href = re;
        link.style.display = "none";

        link.download = "등기부.pdf";

        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    delItem() {
      let idList = [];
      for (let i = 0; i < this.itemList.length; i++) {
        if (this.itemList[i].delST == true) {
          idList.push(this.itemList[i].id);
        }
      }

      this.$apiPOST("/api/mypage/report/del", { idList: idList }).then(() => {
        this.allST = false;
        this.getItemList(1);
      });
    },
    getItemList(pg) {
      this.$apiGET("/api/mypage/report?pg=" + (pg - 1) * this.itemSize).then(
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
