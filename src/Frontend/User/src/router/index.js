import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import headerComp from "../components/HeaderComponent";
// import busHeaderComp from '../components/Business/HeaderComponent';
import footerComp from "../components/FooterComponent";

const routes = [
  {
    path: "/",
    name: "main",
    components: {
      default: () => import("../views/Main"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/alarmList",
    name: "alarmList",
    components: {
      default: () => import("../views/Alarm"),
    },
  },
  {
    path: "/g/term",
    name: "gTerm",
    components: {
      default: () => import("../views/Term"),
    },
  },
  {
    path: "/g/policy",
    name: "gPolicy",
    components: {
      default: () => import("../views/Policy"),
    },
  },
  {
    path: "/onboarding",
    name: "onboarding",
    components: {
      default: () => import("../views/Onboarding"),
    },
  },
  {
    path: "/join",
    name: "join",
    components: {
      default: () => import("../views/Join/Join"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/agree",
    name: "agree",

    components: {
      default: () => import("../views/Join/Agree"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/complete",
    name: "complete",

    components: {
      default: () => import("../views/Join/Complete"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/exist",
    name: "exist",

    components: {
      default: () => import("../views/Join/Exist"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/infoInput",
    name: "infoInput",

    components: {
      default: () => import("../views/Join/InfoInput"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/number",
    name: "number",

    components: {
      default: () => import("../views/Join/Number"),
    //   header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/join/phone",
    name: "phone",

    components: {
      default: () => import("../views/Join/Phone"),
    //   header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/password",
    name: "password",

    components: {
      default: () => import("../views/Login/Password"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/password/re",
    name: "passwordRe",

    components: {
      default: () => import("../views/Login/PasswordRe"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/password/done",
    name: "passwordDone",

    components: {
      default: () => import("../views/Login/PasswordDone"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/center",
    name: "center",
    redirect: "/center/notice",
    components: {
      default: () => import("../views/Notice/App"),
      header: headerComp,
      footer: footerComp,
    },
    children: [
      {
        path: "notice",
        name: "notice",
        component: () => import("../views/Notice/Notice"),
      },
      {
        path: "news",
        name: "news",
        component: () => import("../views/Notice/News"),
      },
    ],
  },

  {
    path: "/business",
    name: "business",
    components: {
      default: () => import("../views/Business/Main"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/main",
    name: "businessMain",
    components: {
      default: () => import("../views/Business/MainLogin"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/business/login",
    name: "businessLoign",

    components: {
      default: () => import("../views/Business/Login/Login"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/business/agree",
    name: "businessAgree",

    components: {
      default: () => import("../views/Business/Join/Agree"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/join",
    name: "businessJoin",

    components: {
      default: () => import("../views/Business/Join/Join"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/add",
    name: "businessAdd",

    components: {
      default: () => import("../views/Business/Join/Add"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/infoInput",
    name: "businessInfoInput",

    components: {
      default: () => import("../views/Business/Join/InfoInput"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/confirm",
    name: "businessConfirm",

    components: {
      default: () => import("../views/Business/Join/Confirm"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/confirm2",
    name: "businessConfirm2",

    components: {
      default: () => import("../views/Business/Join/Confirm2"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/number",
    name: "businessNumber",
    components: {
      default: () => import("../views/Business/Join/Number"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/complete",
    name: "businessComplete",
    components: {
      default: () => import("../views/Business/Join/Complete"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/info",
    name: "businessInfo",
    components: {
      default: () => import("../views/Business/MyPage/Info"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/pay",
    name: "businessPay",
    components: {
      default: () => import("../views/Business/MyPage/Pay"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/pay/pay",
    name: "businessPayPay",
    components: {
      default: () => import("../views/Business/MyPage/PayPay"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/report",
    name: "businessReport",
    components: {
      default: () => import("../views/Business/MyPage/Report"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/ticket",
    name: "businessTicket",
    components: {
      default: () => import("../views/Business/MyPage/Ticket"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/payHistory",
    name: "businessPayHistory",
    components: {
      default: () => import("../views/Business/MyPage/PayHistory"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/inquiry",
    name: "businessInquiry",
    components: {
      default: () => import("../views/Business/MyPage/Inquiry"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/business/inquiry/:id",
    name: "businessInquiryDetail",
    components: {
      default: () => import("../views/Business/MyPage/InquiryDetail"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/report",
    name: "report",
    components: {
      default: () => import("../views/Service/Report"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/report/request",
    name: "reportRequest",
    redirect: "/report/request/addressSearch",
    meta: { authRequired: true, modal: "login" },
    components: {
      default: () => import("../views/Service/Report/App"),
      header: headerComp,
      footer: footerComp,
    },
    children: [
      {
        path: "addressSearch",
        name: { name: "주소검색", level: 1 },
        component: () => import("../views/Service/Report/AddressSearch"),
      },
      {
        path: "addressSelect",
        name: { name: "주소선택", level: 2 },
        component: () => import("../views/Service/Report/AddressSelect"),
      },
      {
        path: "tradeType",
        name: { name: "거래유형", level: 3 },
        component: () => import("../views/Service/Report/TradeType"),
      },
      {
        path: "typeSelect",
        name: { name: "건물유형", level: 4 },
        component: () => import("../views/Service/Report/TypeSelect"),
      },
      {
        path: "tradePrice",
        name: { name: "거래금액", level: 5 },
        component: () => import("../views/Service/Report/TradePrice"),
      },
      {
        path: "serviceType",
        name: { name: "결제", level: 6 },
        component: () => import("../views/Service/Report/ServiceType"),
      },
      {
        path: "pay",
        name: { name: "결제", level: 6 },
        component: () => import("../views/Service/Report/Pay"),
      },
      {
        path: "publish",
        name: { name: "발급중", level: 7 },
        component: () => import("../views/Service/Report/Publish"),
      },
      {
        path: "complete",
        name: { name: "발급완료", level: 8 },
        component: () => import("../views/Service/Report/PayComplete"),
      },
    ],
  },

  {
    path: "/result/maemae/:id",
    name: "maemae",
    meta: { authRequired: true },
    components: {
      default: () => import("../views/Report/Maemae"),
    },
  },
  {
    path: "/result/jeonse/:id",
    name: "jeonse",
    meta: { authRequired: true },
    components: {
      default: () => import("../views/Report/Jeonse"),
    },
  },
  {
    path: "/result/monthly/:id",
    name: "monthly",
    meta: { authRequired: true },
    components: {
      default: () => import("../views/Report/Monthly"),
    },
  },

  {
    path: "/alarm",
    name: "alarm",
    components: {
      default: () => import("../views/Service/Alarm"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/alarm/request",
    name: "request",
    meta: { authRequired: true, modal: "login" },
    components: {
      default: () => import("../views/Service/Alarm/Request"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/alarm/request2",
    name: "request2",
    meta: { authRequired: true, modal: "login" },
    components: {
      default: () => import("../views/Service/Alarm/Request2"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/alarm/request3",
    name: "request3",
    meta: { authRequired: true, modal: "login" },
    components: {
      default: () => import("../views/Service/Alarm/Request3"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/alarm/complete",
    name: "alarmComplete",
    meta: { authRequired: true, modal: "login" },
    components: {
      default: () => import("../views/Service/Alarm/Complete"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/app/search",
    name: "appSearch",
    components: {
      default: () => import("../views/Property/App/Search"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/app/result",
    name: "appResult",
    components: {
      default: () => import("../views/Property/App/Result"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/real/search",
    name: "realSearch",
    components: {
      default: () => import("../views/Property/Real/Search"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/real/result/:id",
    name: "realResult",
    components: {
      default: () => import("../views/Property/Real/Result"),
      header: headerComp,
      footer: footerComp,
    },
  },
  {
    path: "/mypage/menu",
    name: "MyMenu",
    components: {
      default: () => import("../views/MyMenu"),
      header: headerComp,
      footer: footerComp,
    },
  },

  {
    path: "/mypage",
    name: "mypage",
    redirect: "/mypage/info",
    meta: { authRequired: true, modal: null },
    components: {
      default: () => import("../views/MyPage/App"),
      header: headerComp,
      footer: footerComp,
    },
    children: [
      {
        path: "info",
        name: "info",
        component: () => import("../views/MyPage/Info"),
      },
      {
        path: "infoView",
        name: "infoView",
        component: () => import("../views/MyPage/InfoView"),
      },
      {
        path: "ticket",
        name: "myTicket",
        component: () => import("../views/MyPage/Ticket"),
      },
      {
        path: "report",
        name: "myReport",
        component: () => import("../views/MyPage/Report"),
      },
      {
        path: "pay",
        name: "pay",
        component: () => import("../views/MyPage/Pay"),
      },
      {
        path: "inquiry",
        name: "inquiry",
        component: () => import("../views/MyPage/Inquiry"),
      },
      {
        path: "inquiry/:id",
        name: "inquiryDetail",
        component: () => import("../views/MyPage/InquiryDetail"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
    // if (savedPosition) {
    // 	return savedPosition;
    // } else {
    // return { x: 0, y: 0 };
    // }
  },
});

router.beforeEach(async (to, from, next) => {
  const storeToken = store.getters.getToken;

  if(from.name != 'exist' && from.name != 'onboarding'){
    store.dispatch("callSetModalLogin", false);
  }

  if (to.matched.some((record) => record.meta.authRequired)) {
    if (storeToken) {
      return next();
    } else {
      if (to.meta?.modal == "login") {
        store.dispatch("callSetModalLogin", true);
        return next(false);
      } else {
        return next("/");
      }
    }
  } else {
    return next();
  }
});

export default router;
