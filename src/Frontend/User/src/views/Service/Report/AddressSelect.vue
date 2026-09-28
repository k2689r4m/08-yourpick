<template>
  <div class="tab-list type3">
    <button type="button" class="btn tab-btn active">간편검색</button>
    <button type="button" class="btn tab-btn">소재지번으로찾기</button>
    <button type="button" class="btn tab-btn">도로명주소로찾기</button>
    <div class="tab-right">
      <button
        type="button"
        class="btn tooltip-btn"
        @click="toggleActive('toggle')"
        ref="toggle"
      >
        <span></span>간편검색이란?
      </button>
      <div class="tooltip-con">
        ⊙ 올바른 검색 · 검색 방법 - 소재지번, 도로명주소, 건물명을 이용하여
        간편하게 검색 할 수 있는 서비스 예) 서울 서초구 반포대로 99 / 서울
        서초구 서초동 1539-1 / 서울 서초구 우체국 / 서초구 우체국 등 토지
        등기사항증명서 검색 시 : 서초동 967 (행정구역, 지번으로 검색) 건물
        등기사항증명서 검색 시 : 서초동 967 (행정구역 또는 지번으로 검색),
        서초대로 219 (도로명 또는 건물번호로 검색) 집합건물 등기사항증명서 검색
        시 : 서초 푸르지오 101동 1201호 (건물명칭, 동, 호로 검색) ※ 집합건물
        검색 시 소재지번 또는 도로명, 건물명칭, 동/호를 입력 후 검색하시면 보다
        정확한 검색결과를 얻을 수 있습니다. 예) 도곡동 91-5 삼성래미안 101동
        101호 / 남부순환로 2803 삼성래미안 101동 101호 · 소재지번 - 소재지번으로
        검색 올바른 소재지번 키워드 : 서울 서초구 서초동 967(O) / 서초구 서초동
        967(O) / 서초동 967(O) 잘못된 소재지번 키워드 : 서울 중구 서초동 967(X)
        · 도로명주소 - 도로명주소로 검색 올바른 도로명주소 키워드 : 서울시
        서초구 서초대로 219(O) / 서초구 서초대로 219(O) / 서초대로 219(O) 잘못된
        도로명주소 키워드 : 서울시 종로구 서초대로 219(X) ※ 도로명주소가
        병기되지 않은 부동산 등기사항증명서는 도로명주소로 검색되지 않을 수
        있사오니 검색되지 않는 등기사항증명서는 소재지번을 입력하여 검색하시기
        바랍니다. · 건물명 - 명칭으로 검색 서울특별시 강남구 삼성동
        삼성래미안(O) / 서울특별시 강남구 삼성래미안(O) / 강남구 삼성래미안(O) /
        삼성래미안(O) ※ 건물명칭이 등기기록에 기재되어 있지 않거나, 알고계신
        명칭과 상이할 수 있습니다. 건물명칭으로 원하시는 검색결과가 조회되지
        않을 경우, 건물명칭을 제외한 "소재지번 또는 도로명주소"로 검색하시기
        바랍니다. 예) 도곡동 91-5 101동 101호 / 남부순환로 2803 101동 101호 ⊙
        검색 제한 · 1글자 검색제한 - 1글자만 입력 후 검색 시 검색제한 ※ 왕, 길,
        로 등 1글자만 입력 후 검색 시 너무 많은 검색결과가 조회되므로 검색을
        제한함 · 시/도명만 입력시 검색제한 - 시/도명만 입력 후 검색 시 검색제한
        ※ 서울특별시, 경기도, 부산광역시 등 시/도만 입력 후 검색 시 너무 많은
        검색결과가 조회되므로 검색을 제한함 ⊙ 선택 입력 · 부동산구분, 시/도,
        등기기록상태 - 부동산구분, 시/도, 등기기록상태를 특정 조건으로 선택 후
        검색 시 보다 정확한 검색결과를 얻을 수 있음
      </div>
    </div>
  </div>
  <div class="input-wrap m-t--20">
    <div class="badge-wrap">
      <!-- <span class="badge">경기도 안산시 단원구 신길동 1447 안산신길온천역휴먼빌2차 아파트</span>
			<span class="badge">101동</span>
			<span class="badge">101호<button type="button" class="btn btn-delete">&times;</button></span> -->
      <span class="badge">{{ dataInfo.jibunAddr }} </span>
      <!-- <span class="badge" v-if="isItem && isItem.bildName">{{ isItem.bildName ? isItem.bildName + '동' : '' }}</span>
			<span class="badge" v-if="isItem && isItem.hoName"
				>{{ isItem.hoName ? isItem.hoName + '호' : ''
				}}<button type="button" class="btn btn-delete">&times;</button></span
			> -->
    </div>
    <!-- <input type="text" class="input-text" value="경기도 안산시 단원구 신길동 1447" /> -->
    <button type="button" class="btn btn-normal btn-primary">검색</button>
  </div>

  <!-- <div class="m-block mobile-radio--list">
		<label class="radio">
			<input type="radio" name="radio" checked />
			<span class="box">
				<span class="line">
					<span class="label">건축물 명칭</span>
					안산신길온천역휴먼빌2차 아파트
				</span>
				<span class="line">
					<span class="label">동 명칭</span>
					101동
				</span>
				<span class="line">
					<span class="label">호 명칭</span>
					101호
				</span>
				<span class="line">
					<span class="label">연면적(㎡)</span>
					84.111
				</span>
			</span>
		</label>
		<label class="radio">
			<input type="radio" name="radio" />
			<span class="box">
				<span class="line">
					<span class="label">건축물 명칭</span>
					안산신길온천역휴먼빌2차 아파트
				</span>
				<span class="line">
					<span class="label">동 명칭</span>
					101동
				</span>
				<span class="line">
					<span class="label">호 명칭</span>
					101호
				</span>
				<span class="line">
					<span class="label">연면적(㎡)</span>
					84.111
				</span>
			</span>
		</label>
	</div> -->

  <!-- <div class="table-wrap m-t--20 m-none">
		<table class="table text-center type3">
			<colgroup>
				<col width="50px" />
				<col width="" />
				<col width="150px" />
				<col width="150px" />
				<col width="150px" />
			</colgroup>
			<tr>
				<th>&nbsp;</th>
				<th class="txt-left">건축물 명칭</th>
				<th>동 명칭</th>
				<th>호 명칭</th>
				<th>연면적(㎡)</th>
			</tr>
			<tr v-for="(item, idx) in itemList" :key="'adr_' + idx">
				<td>
					<label class="input-checkbox">
						<input type="radio" name="adr" v-model="isItem" :value="item" />
						<span class="box"></span>
					</label>
				</td>
				<td class="txt-left">{{ dataInfo.bdNm }}</td>
				<td>{{ item.dongNm }}</td>
				<td>{{ item.hoNm }}</td>
				<td>-</td>
			</tr>
		</table>
	</div>

	<div class="btn-wrap m-t--40">
		<button type="button" class="btn btn-big btn-primary w-160" @click="nextStep">선택</button>
	</div> -->

  <ul class="report-radio--list type2 m-t--30">
    <li class="item">
      <div class="input-wrap m-p--0">
        <SlimSelect class="input-select" :data="dongList" :events="adrEvent">
        </SlimSelect>
      </div>
    </li>
    <li class="item">
      <div class="input-wrap m-p--0">
        <SlimSelect class="input-select" :data="floorList" :events="adrEvent">
        </SlimSelect>
      </div>
    </li>

    <li class="item">
      <div class="input-wrap m-p--0">
        <SlimSelect class="input-select" :data="hoList" :events="adrEvent">
        </SlimSelect>
      </div>
    </li>
  </ul>
  <div class="btn-wrap m-t--40">
    <button
      type="button"
      class="btn btn-big btn-primary w-160"
      @click="nextStep"
    >
      선택
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlimSelect from "@slim-select/vue";

export default {
  name: "Alarm",
  components: { SlimSelect },
  computed: {
    ...mapGetters({
      dataInfo: "getReportInfo",
    }),
  },
  data() {
    return {
      adrEvent: { afterChange: this.selectAdr },

      itemList: [],
      isItem: null,
      dongNm: "",
      floorNm: "",
      hoNm: "",

      dongList: [],
      floorList: [],
      hoList: [],
    };
  },

  created() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
      this.getAdr1();
    },
    toggleActive(tg) {
      this.$refs[tg].classList.contains("active")
        ? this.$refs[tg].classList.remove("active")
        : this.$refs[tg].classList.add("active");
    },
    selectAdr(e) {
      const tg = e[0].value;

      if (tg.level == -1) {
        return;
      } else if (tg.level == 1) {
        this.dongNm = tg.dongNm;
        this.getAdr2();
      } else if (tg.level == 2) {
        this.floorNm = tg;
        this.getAdr3();
      } else if (tg.level == 3) {
        this.hoNm = tg.hoNm;
      }
    },
    getAdr1() {
      this.$apiGET(
        "/user/addr/linkDetail" +
          "?admCd=" +
          this.dataInfo.admCd +
          "&rnMgtSn=" +
          this.dataInfo.rnMgtSn +
          "&buldMnnm=" +
          this.dataInfo.buldMnnm +
          "&buldSlno=" +
          this.dataInfo.buldSlno
      ).then((re) => {
        this.dongList = [
          {
            value: {
              level: -1,
              admCd: null,
              buldMnnm: null,
              buldSlno: null,
              dongNm: null,
              rnMgtSn: null,
              udrtYn: null,
            },
            text: "동",
          },
        ];

        this.floorList = [
          {
            value: {
              level: -1,
              floorNm: null,
              itemList: [],
            },
            text: "층",
          },
        ];

        this.hoList = [
          {
            value: {
              level: -1,
              hoNm: null,
            },
            text: "호",
          },
        ];

        for (let i = 0; i < re.length; i++) {
          if (re[i].dongNm == "") {
            re[i].dongNm = "없음";
          }
          this.dongList.push({
            value: { ...re[i], level: 1 },
            text: re[i].dongNm,
          });
        }
      });
    },
    getAdr2() {
      const dongNm = this.dongNm == "없음" ? "" : this.dongNm;

      this.$apiGET(
        "/user/addr/linkDetail2" +
          "?admCd=" +
          this.dataInfo.admCd +
          "&rnMgtSn=" +
          this.dataInfo.rnMgtSn +
          "&buldMnnm=" +
          this.dataInfo.buldMnnm +
          "&buldSlno=" +
          this.dataInfo.buldSlno +
          "&dongNm=" +
          dongNm
      ).then((re) => {
        this.floorList = [
          {
            value: {
              level: -1,
              floorNm: null,
              itemList: [],
            },
            text: "층",
          },
        ];

        this.hoList = [
          {
            value: {
              level: -1,
              hoNm: null,
            },
            text: "호",
          },
        ];

        const _re = this.$groupBy(re, "floorNm");

        for (const key of Object.keys(_re)) {
          this.floorList.push({
            value: {
              floorNm: key == "" ? "없음" : key,
              level: 2,
              itemList: _re[key],
            },
            text: key == "" ? "없음" : key,
          });
        }
      });
    },
    getAdr3() {
      this.hoList = [
        {
          value: {
            level: -1,
            hoNm: null,
          },
          text: "호",
        },
      ];

      for (let i = 0; i < this.floorNm.itemList.length; i++) {
        if (this.floorNm.itemList[i].hoNm == "") {
          this.floorNm.itemList[i].hoNm = "없음";
        }
        this.hoList.push({
          value: { hoNm: this.floorNm.itemList[i].hoNm, level: 3 },
          text: this.floorNm.itemList[i].hoNm,
        });
      }
    },

    nextStep() {
      // if (!this.isItem) {
      // 	return;
      // }

      let _dataInfo = this.dataInfo;
      _dataInfo.dongNm = this.dongNm == "없음" ? "" : this.dongNm;
      _dataInfo.floorNm =
        this.floorNm.floorNm == undefined
          ? ""
          : this.floorNm.floorNm == "없음"
          ? ""
          : this.floorNm.floorNm;
      _dataInfo.hoNm = this.hoNm;

      this.$store.dispatch("callSetReportInfo", _dataInfo);
      this.$btnOnRouter("/report/request/tradeType");
    },
  },
};
</script>
