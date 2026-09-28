<template>
  <div class="content">
    <div class="section">
      <div class="section-tit">이용권 사용 관리</div>
      <div class="tab-con">
        <div class="search-top">
          <div class="left">
            <!-- <div class="input-label">서비스</div>
            <div class="input-label">
              <select class="form-select">
                <option>선택</option>
              </select>
            </div> -->
            <div class="input-label">상세내용</div>
            <div class="input-label">
              <input type="text" class="form-control" v-model="searchKeyword" />
            </div>
          </div>
          <div class="right">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="getItemList(1)"
            >
              검색
            </button>
          </div>
        </div>
        <div class="table-top">
          <div class="left"></div>
          <div class="right">
            <!-- <select class="form-select">
              <option>정렬</option>
            </select> -->
            <select class="form-select" v-model="itemSize">
              <option value="10">10개</option>
              <option value="30">30개</option>
              <option value="50">50개</option>
            </select>
          </div>
        </div>
        <div class="table-wrap">
          <table class="table">
            <tr>
              <th rowspan="2">No</th>
              <th rowspan="2">발행수</th>
              <th colspan="3">사용내역</th>
              <th rowspan="2">서비스</th>
              <th rowspan="2">제공범위<br />(회원)</th>
              <th rowspan="2">사용제한<br />(계정당)</th>
              <th rowspan="2">만료일</th>
              <th rowspan="2">발급번호</th>
              <th rowspan="2">이용권 명</th>
              <th rowspan="2">상세내용</th>
            </tr>
            <tr>
              <th>사용</th>
              <th>미사용</th>
              <th>사용율</th>
            </tr>
            <tr v-for="(item, idx) in ticketList" :key="'list_' + item.id">
              <td>{{ idx + 1 + (page - 1) * itemSize }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.use_cnt }}</td>
              <td>{{ item.unuse_cnt }}</td>
              <td>{{ item.rate }}%</td>
              <td>{{ item.name }}</td>
              <td>
                <span v-if="item.grade == 0">비즈니스회원</span>
                <span v-else-if="item.grade == 1">일반회원</span>
                <span v-else>전체회원</span>
              </td>
              <td>{{ item.cnt }}</td>
              <td>{{ $dateFormat(item.dateE, "YYYY-MM-DD") }}</td>
              <td>{{ item.number }}</td>
              <td>무료 이용권</td>
              <td>{{ item.info }}</td>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
export default {
  name: "Kakao",
  components: { Pagination },
  data() {
    return {
      ticketList: [],

      searchKeyword: "",

      page: 1,
      pageData: null,
      totalCount: null,
      itemSize: 30,
      blockSize: 5,
    };
  },
  created() {
    this.getItemList(1);
  },
  computed: {},
  methods: {
    getTicket() {
      this.$apiGET("/admin/ticket/use/get").then((re) => {
        console.log(re);
        this.ticketList = re;
      });
    },
    getItemList(pg) {
      this.$apiGET(
        "/admin/ticket/use/get?pg=" +
          (pg - 1) * this.itemSize +
          "&size=" +
          this.itemSize +
          "&keyword=" +
          this.searchKeyword
      ).then((data) => {
        this.ticketList = data.item;
        console.log(this.ticketList);

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

<style></style>
