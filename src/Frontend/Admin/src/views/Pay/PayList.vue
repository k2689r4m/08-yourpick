<template>
  <div class="content">
    <div class="section">
      <div class="section-tit">서비스 결제 현황</div>
      <div class="tab-con">
        <BarChartMulti
          v-if="chartST"
          :chartData="barChartMultiData"
        ></BarChartMulti>
        <div class="table-top">
          <div class="left">
            <div class="tit">일자별 요약</div>
          </div>
        </div>
        <div class="search-top">
          <div class="left">
            <input type="date" class="form-control sm" v-model="dateS" />
            <div class="search-top--text">~</div>
            <input type="date" class="form-control sm m-r--1" v-model="dateE" />
          </div>
          <div class="right">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="getExcel"
            >
              엑셀다운
            </button>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="getItemList()"
            >
              검색
            </button>
          </div>
        </div>
        <div class="table-wrap">
          <table class="table">
            <tr>
              <th>일자</th>
              <th>전체</th>
              <th>일반 상품</th>
              <th>비즈니스 30건 패키지</th>
              <th>비즈니스 50건 패키지</th>
              <th>비즈니스 70건 패키지</th>
            </tr>
            <tr v-for="item in itemList" :key="'item_' + item.id">
              <td>{{ item.date }}</td>
              <td>{{ item["전체"] }}</td>
              <td>{{ item["일반상품"] }}</td>
              <td>{{ item["비즈니스 30건 패키지"] }}</td>
              <td>{{ item["비즈니스 50건 패키지"] }}</td>
              <td>{{ item["비즈니스 70건 패키지"] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChartMulti from "../../components/chart/BarChartMulti.vue";
export default {
  name: "Kakao",
  components: { BarChartMulti },
  data() {
    return {
      barChartMultiData: {
        labels: [],
        datasets: [
          {
            label: "일반 상품",
            data: [],
          },
          {
            label: "비즈니스 상품",
            data: [],
          },
        ],
      },
      chartST: false,

      itemList: null,

      dateS: "",
      dateE: "",
    };
  },
  created() {
    const rDate = this.$dateMonthFormat();
    this.dateS = rDate.s;
    this.dateE = rDate.e;

    this.getChartList();
    this.getItemList();
  },
  computed: {},
  methods: {
    getItemList() {
      this.$apiGET(
        "/admin/pay/good/use?dateS=" + this.dateS + "&dateE=" + this.dateE
      ).then((data) => {
        console.log(data);
        this.itemList = data;
      });
    },
    getChartList() {
      this.$apiGET("/admin/pay/good/use/chart").then((data) => {
        this.barChartMultiData.labels = data.chart.dateList;
        this.barChartMultiData.datasets[0].data = data.chart.mode1List;
        this.barChartMultiData.datasets[1].data = data.chart.mode2List;
        this.chartST = true;
      });
    },
    getExcel() {
      this.$apiGET(
        "/admin/pay/good/use?dateS=" + this.dateS + "&dateE=" + this.dateE
      ).then((re) => {
        this.$makeExcelFile(re, "서비스 결제 현황.xlsx");
      });
    },
  },
};
</script>

<style></style>
