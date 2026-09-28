<template>
  <div class="container type-alarm">
    <div class="section p-t--30">
      <div class="my-tit type2">
        <button
          type="button"
          class="btn btn-back m-block"
          @click="$btnOnRouterBack()"
        ></button>
        알림
      </div>
      <div class="my-alarm--top">
        <div class="left">읽지 않은 알림 {{ noReadCount }}건</div>
        <div class="right">
          <!-- <SlimSelect :data="alarmList" class="input-select sm"> </SlimSelect> -->
          <select
            class="txt-right select-custom"
            @change="alarmListShow(selectType)"
            v-model="selectType"
          >
            <option value="all">전체알림</option>
            <option value="1">안심거래리포트</option>
            <option value="0">공지사항</option>
          </select>
        </div>
      </div>
      <ul class="my-alarm--list">
        <li
          class="item"
          v-for="item in alarmSelectList"
          :key="'alarm_' + item.id"
          :class="{ notread: item.st == 'N' }"
        >
          <div
            class="icon"
            :class="{ alarm: item.type == 1, notice: item.type == 0 }"
          ></div>
          <div class="text">
            <template v-if="item.type == 1">
              {{ userInfo.name }}님! 안심거래리포트 발급이 완료되었어요.
              <button
                type="button"
                class="btn"
                @click="
                  alarmRead(item.id);
                  $btnOnRouter('/mypage/report');
                "
              >
                [바로 확인하기]
              </button>
            </template>
            <template v-if="item.type == 0">
              <p class="type">[공지사항]</p>
              <button
                type="button"
                class="btn"
                @click="
                  alarmRead(item.id);
                  $btnOnRouter('/center/notice');
                "
              >
                {{ item.notice_title }}
              </button>
            </template>
            <p class="time">
              {{ $dateLapse(item.created_at) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlimSelect from "@slim-select/vue";

export default {
  name: "alarm",
  components: {},
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
    }),
  },
  data() {
    return {
      alarmList: [],
      alarmSelectList: [],
      noReadCount: 0,
      selectType: "all",
    };
  },

  created() {
    this.getAlarmList();
    this.alarmListShow(this.selectType);
  },
  updated() {},
  methods: {
    getAlarmList() {
      this.$apiGET("/api/inform").then((data) => {
        this.alarmList = data;
        this.alarmSelectList = data;
        for (let i = 0; i < this.alarmList.length; i++) {
          if (this.alarmList[i].st == "N") {
            this.noReadCount++;
          }
        }
      });
    },
    alarmRead(readId) {
      this.$apiPOST("/api/inform", { id: readId }).then(() => {});
    },
    alarmListShow(type) {
      if (type == "all") {
        this.alarmSelectList = this.alarmList;
      } else {
        this.alarmSelectList = [];
        for (let i = 0; i < this.alarmList.length; i++) {
          if (this.alarmList[i].type == Number(type)) {
            this.alarmSelectList.push(this.alarmList[i]);
          }
        }
      }
    },
  },
};
</script>
