import dayjs from "dayjs";
import * as Xlsx from "xlsx";
import axios from "axios";
import router from "./router";
import store from "./store";
import ImageResize from "image-resize";
var weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);
axios.defaults.headers.common.Accept = "application/json";

const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

const GRADE_TYPE = ["비즈니스", "일반", "전체"];
const CONTENT_TYPE = {
  guide: "안심거래 가이드북",
  news: "부동산 주요 뉴스",
  knowledge: "부동산 상식",
};

const SOCIAL_TYPE = {
  null: "일반",
  kakao: "카카오",
  naver: "네이버",
  apple: "애플",
};

const BIZ_STATE = {
  over: "검토중",
  done: "승인",
  hold: "보류",
};

const TRADE_TYPE = {
  A1: "매매",
  B1: "전세",
  B2: "월세",
};

const MONEY_FORMAT_TYPE = {
  LITTLE: "LITTLE",
  MUCH: "MUCH",
  LOAN: "LOAN",
  RANGE: "RANGE",
  TAX: "TAX",
  MOBILE: "MOBILE",
  MOBILE2: "MOBILE2",
};

const MONEY1 = {
  masked: false,
  prefix: "",
  suffix: "",
  thousands: ",",
  decimal: ".",
  precision: 0,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  shouldRound: true,
  focusOnRight: false,
};

const MONEY2 = {
  masked: false,
  prefix: "",
  suffix: "",
  thousands: ",",
  decimal: ".",
  precision: 2,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  shouldRound: true,
  focusOnRight: false,
};

function c(e, t, a, r) {
  if ("number" != typeof e) return "0";

  var l = e,
    o = "",
    i = !1;
  l < 0 && ((l *= -1), (i = !0)), a && (l *= 1e4);
  var s = Math.floor(l / 1e8),
    c = Math.floor(l % 1e8),
    m = Math.floor(c / 1e4),
    p = Math.floor(c % 1e4);
  switch (t) {
    case MONEY_FORMAT_TYPE.MUCH:
      if (0 === l) break;
      var d = void 0;
      if (
        (l >= 1e8
          ? ((d = l / 1e8), (o = "억"))
          : l >= 1e7
          ? ((d = l / 1e7), (o = "천"))
          : l >= 1e6
          ? ((d = l / 1e6), (o = "백"))
          : l >= 1e4
          ? ((d = l / 1e4), (o = "만"))
          : l >= 1 && ((d = l), (o = "원")),
        "number" == typeof r)
      ) {
        var u = d.toString(),
          E = u.indexOf(".");
        0 === r ? (d = parseInt(d)) : E > 0 && (d = u.slice(0, E + 1 + r));
      }
      o = d + o;
      break;
    case MONEY_FORMAT_TYPE.LITTLE:
      if (0 === l) {
        o = "0";
        break;
      }
      s > 0 && (o = s.toLocaleString() + "억"),
        m > 0 && (o += m.toLocaleString());
      break;
    case MONEY_FORMAT_TYPE.LOAN:
      if (0 === l) {
        o = "0";
        break;
      }
      s > 0 && (o = s.toLocaleString() + "억"),
        m > 0 && (o += m.toLocaleString() + "만"),
        p > 0 && (o += p.toLocaleString() + "원");
      break;
    case MONEY_FORMAT_TYPE.TAX:
      if (0 === l) {
        o = "-원";
        break;
      }
      s > 0 && (o = s.toLocaleString() + "억"),
        m > 0 && (o += " " + m.toLocaleString() + "만"),
        p > 0 && (o += " " + p.toLocaleString()),
        (o += "원"),
        o.trim();
      break;
    case MONEY_FORMAT_TYPE.MOBILE:
      if (0 === l) {
        o = "0";
        break;
      }
      s > 0 && (o = s.toLocaleString() + "억"),
        m > 0 && (o += o ? " " + m.toLocaleString() : m.toLocaleString());
      break;
    case MONEY_FORMAT_TYPE.MOBILE2:
      if (0 === l) {
        o = "0";
        break;
      }
      s > 0 && (o = s.toLocaleString() + "억"),
        m > 0 &&
          (o += o
            ? " " + m.toLocaleString() + "만"
            : m.toLocaleString() + "만");
  }
  return i && (o = "-" + o), o;
}

function base64toFile(base_data, filename) {
  var arr = base_data.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

async function apiGET(_path) {
  const path = process.env.VUE_APP_HOST_BACK + _path;

  let msg = "잠시후 다시 시도 해주세요.";
  try {
    const storeToken = store.getters.getToken;

    if (storeToken) {
      axios.defaults.headers.common.authorization = storeToken.accessToken;
      axios.defaults.headers.common.refresh = storeToken.refreshToken;
    }

    const re = await axios.get(path);

    if (re.data.status == 402) {
      const ref = await axios.get(
        process.env.VUE_APP_HOST_BACK + "/user/refresh"
      );
      axios.defaults.headers.common.authorization = ref.data.data.accessToken;
      axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

      store.dispatch("callSetToken", {
        accessToken: ref.data.data.accessToken,
        refreshToken: ref.data.data.refreshToken,
      });

      const re_ = await axios.get(path);
      return re_.data;
    } else {
      return re.data;
    }
  } catch (e) {
    if (e.response?.status == 401) {
      axios.defaults.headers.common.authorization = "";
      axios.defaults.headers.common.refresh = "";

      router.push({
        name: "LoginView",
      });
      return;
    } else {
      if (e.response.data.message) {
        alert(msg);
      }
    }
  }
}
async function apiPOST(_path, param) {
  const path = process.env.VUE_APP_HOST_BACK + _path;

  let msg = "잠시후 다시 시도 해주세요.";
  try {
    const storeToken = store.getters.getToken;

    if (storeToken) {
      axios.defaults.headers.common.authorization = storeToken.accessToken;
      axios.defaults.headers.common.refresh = storeToken.refreshToken;
    }

    const re = await axios.post(path, param);
    if (re.data.status == 402) {
      const ref = await axios.get(
        process.env.VUE_APP_HOST_BACK + "/user/refresh"
      );
      axios.defaults.headers.common.authorization = ref.data.data.accessToken;
      axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

      store.dispatch("callSetToken", {
        accessToken: ref.data.data.accessToken,
        refreshToken: ref.data.data.refreshToken,
      });

      const re_ = await axios.post(path, param);
      return re_.data;
    } else {
      return re.data;
    }
  } catch (e) {
    if (e.response?.status == 400) {
      if (e.response?.data?.errors?.length) {
        alert(e.response?.data.errors[0].msg);
      }
      return false;
    } else if (e.response?.status == 401) {
      axios.defaults.headers.common.authorization = "";
      axios.defaults.headers.common.refresh = "";

      router.push({
        name: "LoginView",
      });
      return;
    } else if (e.response?.status == 500) {
      if (e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert(msg);
      }

      return false;
    } else {
      if (e.response.data.message) {
        alert(msg);
      }
    }
    return;
  }
}
async function apiImgGET(_path) {
  const path = process.env.VUE_APP_HOST_BACK + _path;

  try {
    const storeToken = store.getters.getToken;

    if (storeToken) {
      axios.defaults.headers.common.authorization = storeToken.accessToken;
      axios.defaults.headers.common.refresh = storeToken.refreshToken;
    }

    const re = await axios.get(path, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
      responseType: "blob",
    });

    return URL.createObjectURL(re.data);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default {
  apiGET(_path) {
    return apiGET(_path);
  },
  apiPOST(_path, param) {
    return apiPOST(_path, param);
  },

  install(Vue) {
    Vue.config.globalProperties.$GRADE_TYPE = GRADE_TYPE;
    Vue.config.globalProperties.$CONTENT_TYPE = CONTENT_TYPE;
    Vue.config.globalProperties.$SOCIAL_TYPE = SOCIAL_TYPE;
    Vue.config.globalProperties.$BIZ_STATE = BIZ_STATE;
    Vue.config.globalProperties.$TRADE_TYPE = TRADE_TYPE;

    Vue.config.globalProperties.$MONEY_FORMAT_TYPE = MONEY_FORMAT_TYPE;

    Vue.config.globalProperties.$MONEY1 = MONEY1;
    Vue.config.globalProperties.$MONEY1 = MONEY2;

    Vue.config.globalProperties.$phoneMask = (str) => {
      if (!str || !str.length) {
        return "";
      }

      return str.replace(
        /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        "$1-$2-$3"
      );
    };

    Vue.config.globalProperties.$numberMask = (str_) => {
      const str = str_ + "";
      if (!str || !str.length) {
        return "";
      }

      return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    Vue.config.globalProperties.$makeExcelFile = (dataList, fileName) => {
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(dataList);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet1");
      Xlsx.writeFile(workBook, fileName);
    };

    Vue.config.globalProperties.$btnOnRouter = (path, query = null) => {
      router.push({ path: path, query: query });
    };

    Vue.config.globalProperties.$dateFormat = (val, format) => {
      return dayjs(val).format(format);
    };

    Vue.config.globalProperties.$dateMonthFormat = () => {
      return {
        s: dayjs().subtract(1, "M").format("YYYY-MM-DD"),
        e: dayjs().format("YYYY-MM-DD"),
      };
    };

    Vue.config.globalProperties.$btnOnRouterBack = () => {
      router.go(-1);
    };

    Vue.config.globalProperties.$btnOnLogin = (level = null) => {
      store.dispatch("callSetUserInfo", level);
    };

    Vue.config.globalProperties.$py_m2_ex = (val) => {
      return Number((val * PY_M2_EX).toFixed(2));
    };

    Vue.config.globalProperties.$m2_py_ex = (val) => {
      return Number((val * M2_PY_EX).toFixed(2));
    };

    Vue.config.globalProperties.$dateWeekFormat = () => {
      return {
        s: dayjs().weekday(1).format("YYYY-MM-DD"),
        e: dayjs().weekday(7).format("YYYY-MM-DD"),
      };
    };

    Vue.config.globalProperties.$dateNowFormat = () => {
      return {
        s: dayjs().format("YYYY-MM-DD"),
        e: dayjs().format("YYYY-MM-DD"),
      };
    };

    Vue.config.globalProperties.$datetimeNowFormat = () => {
      return dayjs().format("YYYY-MM-DD hh:mm:ss");
    };

    Vue.config.globalProperties.$datetimeFormat = (day) => {
      if (typeof day != "string") {
        return null;
      } else if (day == "0000-00-00" || day == null || !day.length) {
        return null;
      } else {
        return dayjs(day).format("MM-DD hh:mm");
      }
    };

    Vue.config.globalProperties.$dateSub = (day) => {
      const masTime = new Date(day);
      const todayTime = new Date();
      todayTime.setHours(0, 0, 0, 0);
      const diff = masTime - todayTime;
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (diffDay < 0) {
        return "";
      } else if (diffDay == 0) {
        return "오늘까지";
      } else {
        return "D-" + diffDay;
      }
    };

    Vue.config.globalProperties.$numberToKorean = (number) => {
      if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
    };

    Vue.config.globalProperties.$formatMoney = (e, t, a) => {
      return c(e, t, !0, a);
    };

    Vue.config.globalProperties.$formatMoneyBasedOnWon = (e, t, a) => {
      var r = e;
      return "string" == typeof e && (r = parseInt(e, 10)), c(r, t, !1, a);
    };

    Vue.config.globalProperties.$groupBy = (data, key) => {
      return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
          carry[group] = [];
        }

        carry[group].push(el);
        return carry;
      }, {});
    };
    Vue.config.globalProperties.$isEmpty = (value) => {
      if (
        value == "" ||
        value == null ||
        value == undefined ||
        (value != null &&
          typeof value == "object" &&
          !Object.keys(value).length)
      ) {
        return false;
      } else {
        return true;
      }
    };
    Vue.config.globalProperties.$pageDataSetting = (
      total,
      limit,
      block,
      page
    ) => {
      this.isAllCheck = false;
      const totalPage = Math.ceil(total / limit);
      let currentPage = page;
      const first =
        currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null;
      const end =
        totalPage !== currentPage
          ? parseInt(currentPage, 10) + parseInt(1, 10)
          : null;

      let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1;
      let endIndex =
        startIndex + block > totalPage ? totalPage : startIndex + block - 1;
      let list = [];
      for (let index = startIndex; index <= endIndex; index++) {
        list.push(index);
      }
      return { first, end, list, currentPage, totalPage };
    };
    Vue.config.globalProperties.$objCompare = (pt1, pt2) => {
      if (pt1.x === pt2.x && pt1.y === pt2.y) {
        return true;
      }
      return false;
    };

    Vue.config.globalProperties.$apiGET = apiGET;

    Vue.config.globalProperties.$apiPOST = apiPOST;
    Vue.config.globalProperties.$apiImgGET = apiImgGET;

    Vue.config.globalProperties.$apiLOGIN = async (_path, param) => {
      const path = process.env.VUE_APP_HOST_BACK + _path;

      try {
        const re = await axios.post(path, param);

        axios.defaults.headers.common.authorization =
          "Bearer " + re.data.token.accessToken;
        axios.defaults.headers.common.refresh =
          "Bearer " + re.data.refreshToken;

        store.dispatch("callSetToken", {
          accessToken: "Bearer " + re.data.token.accessToken,
          refreshToken: "Bearer " + re.data.token.refreshToken,
        });

        // axios.defaults.headers.common.authorization = re.headers.authorization;
        // axios.defaults.headers.common.refresh = re.headers.refresh;

        // store.dispatch('callSetToken', { accessToken: re.headers.authorization, refreshToken: re.headers.refresh });

        return re.data;
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        }
        return;
      }
    };

    Vue.config.globalProperties.$apiLOGOUT = async () => {
      const path = process.env.VUE_APP_HOST_BACK + "/admin/logout";
      try {
        const storeToken = store.getters.getToken;
        if (storeToken) {
          axios.defaults.headers.common.authorization = storeToken.accessToken;
          axios.defaults.headers.common.refresh = storeToken.refreshToken;
        } else {
          store.dispatch("callSetToken", { accessToken: "", refreshToken: "" });
          store.dispatch("callSetUserInfo", null);

          return true;
        }

        const re = await axios.post(path);

        if (re.data.status == 402) {
          const ref = await axios.get(
            process.env.VUE_APP_HOST_BACK + "/user/refresh"
          );
          axios.defaults.headers.common.authorization =
            ref.data.data.accessToken;
          axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

          store.dispatch("callSetToken", {
            accessToken: ref.data.data.accessToken,
            refreshToken: ref.data.data.refreshToken,
          });

          await axios.post(path);

          return true;
        }

        store.dispatch("callSetToken", { accessToken: "", refreshToken: "" });
        store.dispatch("callSetUserInfo", null);

        router.push({
          name: "LoginView",
        });

        return true;
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        }
        return;
      }
    };

    Vue.config.globalProperties.$apiIMG = async (_path, param, imgList) => {
      const path = process.env.VUE_APP_HOST_BACK + _path;
      let msg = "잠시후 다시 시도 해주세요.";
      try {
        const header = { "Content-Type": "multipart/form-data" };
        let form = new FormData();
        // let img = files;

        form.append("bid", param);

        for (let i = 0; i < imgList.length; i++) {
          form.append("images", imgList[i].file);

          if (!imgList[i].src && imgList[i].fileSrc) {
            //신규
            form.append("info_" + i, 0);
          } else if (imgList[i].src && imgList[i].fileSrc) {
            //수정
            form.append("info_" + i, 1);
          } else {
            //idle
            form.append("info_" + i, -1);
          }
        }

        const storeToken = store.getters.getToken;

        if (storeToken) {
          axios.defaults.headers.common.authorization = storeToken.accessToken;
          axios.defaults.headers.common.refresh = storeToken.refreshToken;
        }

        const re = await axios.post(path, form, header);
        if (re.data.status == 402) {
          const ref = await axios.get(
            process.env.VUE_APP_HOST_BACK + "/user/refresh"
          );
          axios.defaults.headers.common.authorization =
            ref.data.data.accessToken;
          axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

          store.dispatch("callSetToken", {
            accessToken: ref.data.data.accessToken,
            refreshToken: ref.data.data.refreshToken,
          });

          const re_ = await axios.post(path, form, header);
          return re_.data;
        } else {
          return re.data;
        }
      } catch (e) {
        if (e.response?.status == 400) {
          if (e.response?.data?.errors?.length) {
            alert(e.response?.data.errors[0].msg);
          }
          return false;
        } else if (e.response?.status == 401) {
          axios.defaults.headers.common.authorization = "";
          axios.defaults.headers.common.refresh = "";

          router.push({
            name: "LoginView",
          });
          return;
        } else {
          if (e.response.data.message) {
            alert(msg);
          }
        }
        return;
      }
    };

    Vue.config.globalProperties.$apiFILE = async (
      _path,
      param,
      fileObj,
      fileName
    ) => {
      const path = process.env.VUE_APP_HOST_BACK + _path;
      let msg = "잠시후 다시 시도 해주세요.";
      try {
        const header = { "Content-Type": "multipart/form-data" };
        let form = new FormData();
        // let img = files;

        form.append("bid", param);
        form.append("fileName", fileName);
        form.append("file", fileObj);

        const storeToken = store.getters.getToken;

        if (storeToken) {
          axios.defaults.headers.common.authorization = storeToken.accessToken;
          axios.defaults.headers.common.refresh = storeToken.refreshToken;
        }

        const re = await axios.post(path, form, header);
        if (re.data.status == 402) {
          const ref = await axios.get(
            process.env.VUE_APP_HOST_BACK + "/user/refresh"
          );
          axios.defaults.headers.common.authorization =
            ref.data.data.accessToken;
          axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

          store.dispatch("callSetToken", {
            accessToken: ref.data.data.accessToken,
            refreshToken: ref.data.data.refreshToken,
          });

          const re_ = await axios.post(path, form, header);
          return re_.data;
        } else {
          return re.data;
        }
      } catch (e) {
        if (e.response?.status == 400) {
          if (e.response?.data?.errors?.length) {
            alert(e.response?.data.errors[0].msg);
          }
          return false;
        } else if (e.response?.status == 401) {
          axios.defaults.headers.common.authorization = "";
          axios.defaults.headers.common.refresh = "";

          router.push({
            name: "LoginView",
          });
          return;
        } else {
          if (e.response.data.message) {
            alert(msg);
          }
        }
        return;
      }
    };

    Vue.config.globalProperties.$apiPOST_ADD = async (_path, param) => {
      const path = process.env.VUE_APP_HOST_BACK + _path;
      let msg = "잠시후 다시 시도 해주세요.";
      try {
        const header = { "Content-Type": "multipart/form-data" };
        let form = new FormData();
        // let img = files;

        form.append("title", param.title);
        form.append("memo", param.memo);
        form.append("memList", param.memList);

        // console.log(param.fileObj[]);

        for (let i = 0; i < param.fileObj.length; i++) {
          form.append("files", param.fileObj[i]);
        }

        const storeToken = store.getters.getToken;

        if (storeToken) {
          axios.defaults.headers.common.authorization = storeToken.accessToken;
          axios.defaults.headers.common.refresh = storeToken.refreshToken;
        }

        const re = await axios.post(path, form, header);
        if (re.data.status == 402) {
          const ref = await axios.get(
            process.env.VUE_APP_HOST_BACK + "/user/refresh"
          );
          axios.defaults.headers.common.authorization =
            ref.data.data.accessToken;
          axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

          store.dispatch("callSetToken", {
            accessToken: ref.data.data.accessToken,
            refreshToken: ref.data.data.refreshToken,
          });

          const re_ = await axios.post(path, form, header);
          return re_.data;
        } else {
          return re.data;
        }
      } catch (e) {
        if (e.response?.status == 400) {
          if (e.response?.data?.errors?.length) {
            alert(e.response?.data.errors[0].msg);
          }
          return false;
        } else if (e.response?.status == 401) {
          axios.defaults.headers.common.authorization = "";
          axios.defaults.headers.common.refresh = "";

          router.push({
            name: "LoginView",
          });
          return;
        } else {
          if (e.response.data.message) {
            alert(msg);
          }
        }
        return;
      }
    };

    Vue.config.globalProperties.$apiDOWN = async (_path, fileType) => {
      const path = process.env.VUE_APP_HOST_BACK + _path;

      let msg = "잠시후 다시 시도 해주세요.";
      try {
        const storeToken = store.getters.getToken;

        if (storeToken) {
          axios.defaults.headers.common.authorization = storeToken.accessToken;
          axios.defaults.headers.common.refresh = storeToken.refreshToken;
        }

        const re = await axios.get(path, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: fileType,
          },
        });

        if (re.data.status == 402) {
          const ref = await axios.get(
            process.env.VUE_APP_HOST_BACK + "/user/refresh"
          );
          axios.defaults.headers.common.authorization =
            ref.data.data.accessToken;
          axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

          store.dispatch("callSetToken", {
            accessToken: ref.data.data.accessToken,
            refreshToken: ref.data.data.refreshToken,
          });

          const re_ = await axios.get(path);
          return re_.data;
        } else {
          return re.data;
        }
      } catch (e) {
        if (e.response?.status == 401) {
          axios.defaults.headers.common.authorization = "";
          axios.defaults.headers.common.refresh = "";

          router.push({
            name: "LoginView",
          });
          return;
        } else {
          if (e.response.data.message) {
            alert(msg);
          }
        }
      }
    };

    Vue.config.globalProperties.$imgResize = async (file) => {
      var imageResize = new ImageResize({
        format: "png",
        quality: 0.6,
      });

      let _base64 = await imageResize.play(file);
      let _file = base64toFile(_base64, file.name);

      return { file: _file, base64: _base64 };
    };

    Vue.config.globalProperties.$checkPer = (mid) => {
      // console.log(store.getters.getUserInfo.mem_uid, mid);
      if (
        store.getters.getUserInfo.mem_uid == mid ||
        store.getters.getUserInfo.mem_type == "master"
      ) {
        return true;
      } else {
        return false;
      }
    };
  },
};
