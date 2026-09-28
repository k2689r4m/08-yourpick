const axios = require('axios');
const convert = require('xml-js');
var exports = module.exports = {};
const requestIp = require('request-ip');
const db = require('./database/connect/config');
const multer = require("multer");
const fs = require("fs");
const imgToPDF = require('image-to-pdf')

const { Builder, Browser, By, Key, until, WebDriver, Select } = require("selenium-webdriver");
const chromeDriver = require("selenium-webdriver/chrome");
const chromeOptions = new chromeDriver.Options();



// const webdriverManager = require('webdriver-manager');
const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;
const regex = /[^0-9]/g;
const machineNo = process.env.MY_NAME;


let ST = 'start';
let driver = null;
let serverInfo = null;


const adrObj = {
    '11': { code: '1001', name: '서울특별시' },
    '26': { code: '1027', name: '부산광역시' },
    '27': { code: '1044', name: '대구광역시' },
    '28': { code: '1053', name: '인천광역시' },
    '29': { code: '1064', name: '광주광역시' },
    '30': { code: '1070', name: '대전광역시' },
    '31': { code: '1076', name: '울산광역시' },
    '36': { code: '1082', name: '세종특별자치시' },
    '41': { code: '1083', name: '경기도' },
    '43': { code: '1151', name: '충청북도' },
    '44': { code: '1167', name: '충청남도' },
    '45': { code: '1185', name: '전북특별자치도' },
    '46': { code: '1202', name: '전라남도' },
    '47': { code: '1225', name: '경상북도' },
    '48': { code: '1251', name: '경상남도' },
    '50': { code: '1275', name: '제주특별자치도' },
    '51': { code: '1132', name: '강원특별자치도' },
};

function getAdrCode(pnu){
    const city = adrObj[pnu.substr(0, 2)].code
    const dvsn = pnu.substr(0, 5);
    const sec = pnu.substr(5, 5);
    const ji = pnu.substr(11, 4);
    const bun = pnu.substr(15, 4);

    return {
        city: city,
        dvsn: dvsn,
        sec: sec,
        ji: Number(ji) + '',
        bun: bun == '0000' ? null : Number(bun) + '',
    }
};

function isEmpty(value){
    if( value == "" || value == null || value == 'undefined' || value == undefined ){
      return null;
    }else{
      return value;
    }
};

function isCheckDate(value){
    if(!value){
        return null;
    }
    
    if(value.length == 6){
        return value += '01';
    }

    return value;
}

const TIME_ZONE = 9 * 60 * 60 * 1000;

const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
            carry[group] = [];
        }

        carry[group].push(el);
        return carry;
    }, {});
}

const randomSleep = async (min=2500, max=4500) => { 
    const num = Math.floor(Math.random() * (max - min)) + min;
    await sleep(num);
}

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

const typeList = {
    A1:		'f_A1',     //매매
    B1:		'f_B1',     //전세
    B2:		'f_B2',     //월세
    B3:		'f_B3',     //단기임대
};

const filterList = {
    APT:		'f_APT',    //아파트
    SG:		  'f_SG',     //상가
    SMS:		'f_SMS',    //사무실
    GM:		  'f_GM',     //건물
    GJCG:		'f_GJCG',   //공장/창고
    DDDGG:	'f_DDDGG',  //단독/다가구
    TJ:		  'f_TJ',     //토지
};

const TRADE = {
    DEAL : "A1",
    LEASE : "B1",
    RENT : "B2",
    SHORTERMRENT : "B3"
}

const TRADE_LIST = [
    "A1",
    "B1",
    "B2"
];


const FINANCE_TYPE = {
    NONE : "00",
    BELOW_THIRTY : "10",
    ABOVE_THIRTY : "20"
};

const FINANCE_TYPE_LIST = [
    {
        LABEL: "없음",
        CODE: FINANCE_TYPE.NONE
    }, 
    {
        LABEL: "시세 대비 30% 미만",
        CODE: FINANCE_TYPE.BELOW_THIRTY
    }, 
    {
        LABEL: "시세 대비 30% 이상",
        CODE: FINANCE_TYPE.ABOVE_THIRTY
    }
];

const MONEY_FORMAT_TYPE = {
	LITTLE: 'LITTLE',
	MUCH: 'MUCH',
	LOAN: 'LOAN',
	RANGE: 'RANGE',
	TAX: 'TAX',
	MOBILE: 'MOBILE',
	MOBILE2: 'MOBILE2',
};

function c(e, t, a, r) {
	if ('number' != typeof e) return '0';
	var l = e,
		o = '',
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
					? ((d = l / 1e8), (o = '억'))
					: l >= 1e7
					? ((d = l / 1e7), (o = '천'))
					: l >= 1e6
					? ((d = l / 1e6), (o = '백'))
					: l >= 1e4
					? ((d = l / 1e4), (o = '만'))
					: l >= 1 && ((d = l), (o = '원')),
				'number' == typeof r)
			) {
				var u = d.toString(),
					E = u.indexOf('.');
				0 === r ? (d = parseInt(d)) : E > 0 && (d = u.slice(0, E + 1 + r));
			}
			o = d + o;
			break;
		case MONEY_FORMAT_TYPE.LITTLE:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += m.toLocaleString());
			break;
		case MONEY_FORMAT_TYPE.LOAN:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += m.toLocaleString() + '만'),
				p > 0 && (o += p.toLocaleString() + '원');
			break;
		case MONEY_FORMAT_TYPE.TAX:
			if (0 === l) {
				o = '-원';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += ' ' + m.toLocaleString() + '만'),
				p > 0 && (o += ' ' + p.toLocaleString()),
				(o += '원'),
				o.trim();
			break;
		case MONEY_FORMAT_TYPE.MOBILE:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += o ? ' ' + m.toLocaleString() : m.toLocaleString());
			break;
		case MONEY_FORMAT_TYPE.MOBILE2:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += o ? ' ' + m.toLocaleString() + '만' : m.toLocaleString() + '만');
	}
	return i && (o = '-' + o), o;
}

function isBetween (curDate, minDate, maxDate){
    return curDate.getTime() >= minDate.getTime() && curDate.getTime() <= maxDate.getTime();
};

function formatMoney(e, t, a) {
    return c(e, t, !0, a);
}
function formatMoneyBasedOnWon(e, t, a) {
    var r = e;
    return 'string' == typeof e && (r = parseInt(e, 10)), c(r, t, !1, a);
}

function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}

function ck(val) {
    if(val == undefined){
        return false;
    }
    else if(val == null){
        return false;
    }
    else if(val == ''){
        return false;
    }
    else if(val == '-'){
        return false;
    }
    else{
        return true;
    }
}
  
function getFinanceInfo(e, a, n) {
    if ((n === TRADE.DEAL || a !== FINANCE_TYPE.NONE) && isNumber(e) && e > 0)
        return formatMoney(e, MONEY_FORMAT_TYPE.LOAN) + "원";
    if (isNumber(a)) {
        var r = FINANCE_TYPE_LIST.find(function(e) {
            return e.CODE === a
        });
        if (r)
            return r.LABEL
    }
    return null;
}

async function initScraping(){
    // console.log("driver init");

    // chromeOptions.addArguments("window-size=360,800"); //
    chromeOptions.addArguments("--remote-allow-origins=*");
    chromeOptions.addArguments("--no-sandbox");

    // const user_agent = "Mozilla/5.0 (Linux; Android 9; SM-G975F) AppleWebKit/535.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/535.36";
    // chromeOptions.addArguments("user-agent=" + user_agent);


    // chromeOptions.options_["mobileEmulation"] = {"deviceName" : "Galaxy S5"}; // 

    driver = await new Builder('./chromedriver')
        .forBrowser(Browser.CHROME)
        .setChromeOptions(chromeOptions)
        .build();
  
    driver.manage().setTimeouts({ 
        implicit: 30000, // 30초
        pageLoad: 30000, // 30초
        script: 30000, // 30초
    });
}

async function initScrapingMobile(){
    console.log("driver init Mobile");

    chromeOptions.addArguments("window-size=360,800"); //
    chromeOptions.addArguments("--remote-allow-origins=*");
    chromeOptions.addArguments("--no-sandbox");


    chromeOptions.options_["mobileEmulation"] = {"deviceName" : "Galaxy S5"}; // 

    driver = await new Builder('./chromedriver')
        .forBrowser(Browser.CHROME)
        .setChromeOptions(chromeOptions)
        .build();
  
    driver.manage().setTimeouts({ 
        implicit: 30000, // 30초
        pageLoad: 30000, // 30초
        script: 30000, // 30초
    });
}

async function getPUNCode(jibun_addr) {
    const re = await axios.get('http://api.vworld.kr/req/search?key='+process.env.VWORLD_KEY+'&request=search&type=address&category=parcel&query='+jibun_addr);

    if(!(re.data.response.status == "OK" && re.data.response.result?.items?.length)){
        return false;
    }
    
    return re.data.response.result.items[0].id
};


async function DBCall(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    

    try{
        return reData[0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

async function DBOriginCall(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    
    try{
        return reData[0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

async function DBOneCall(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return reData[0][0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

async function DBPageCall(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return {item: reData[0][0], pageInfo: reData[0][1][0]};
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

function m2ToPy(val){
    return (val * M2_PY_EX).toFixed(2);
}

function isEmptyNull(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    	return null;
  	}else{
    	return value;
  	}
}

function isEmptyZero(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return 0;
    }else{
        return value;
    }
}

function moneyKrToNum(val){
    if(val == null){
        return null;
    }

    const val2 = val.replace(/,/gi, '');
    let dVal = 0;
    const val3 = val2.split(" ");

    for(let i=0;i<val3.length;i++){
        if(val3[i].includes('억')){
            const val4 = val3[i].replace(/억/gi, '');
            dVal += Number(val4) * 10000;
        }else{
            dVal += Number(val3[i]);
        }
    }

    return dVal;
}

function getUserAgent(){
    const userAgentList = [
        "mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.61 safari/537.36",
        "mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/605.1.15 (khtml, like gecko) version/15.0 safari/605.1.15",
        "mozilla/5.0 (iphone; cpu iphone os 15_0_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) mobile/15e148 kakaotalk 9.5.1",
        "mozilla/5.0 (iphone; cpu iphone os 15_0_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/15.0 mobile/15e148 safari/604.1",
        "mozilla/5.0 (iphone; cpu iphone os 15_0 like mac os x) applewebkit/605.1.15 (khtml, like gecko) crios/94.0.4606.52 mobile/15e148 safari/604.1",
        "mozilla/5.0 (linux; android 11; sm-a908n build/rp1a.200720.012; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/94.0.4606.80 mobile safari/537.36;kakaotalk 2309520",
        "mozilla/5.0 (linux; android 11; sm-a908n) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.71 mobile safari/537.36",
        "mozilla/5.0 (linux; android 11; sm-a908n build/rp1a.200720.012; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/80.0.3987.163 whale/1.0.0.0 crosswalk/25.80.14.29 mobile safari/537.36 naver(inapp; search; 1000; 11.6.7)",
        "mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.61 safari/537.36",
        "mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.71 safari/537.36 edg/94.0.992.38",
        "mozilla/5.0 (windows nt 10.0; wow64; trident/7.0; .net4.0c; .net4.0e; .net clr 2.0.50727; .net clr 3.0.30729; .net clr 3.5.30729; zoom 3.6.0; rv:11.0) like gecko",
        "Mozilla/5.0 (Linux; Android 13; SM-S908N Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.43 Mobile Safari/537.36 Instagram 311.0.0.32.118 Android (33/13; 420dpi; 1080x2115; samsung; SM-S908N; b0q; qcom; ko_KR; 545986896)",
    ];

    const idx = Math.floor(Math.random() * (userAgentList.length - 0)) + 0;
    
    return `xhr.setRequestHeader('user-agent', '${userAgentList[idx]}');`;
}

async function getNaverHscNo(){
    console.log("NAVER HSC NO START");
    await driver.manage().window().setRect({x: 0, y: 0, width: 360, height: 800});
    await driver.get('https://m.land.naver.com');
    
    await randomSleep();

    const adrInfo = await DBOneCall(`CALL SP_SC_ADR_GET_HSC(?)`,[machineNo]);
    console.log(adrInfo);

    if(adrInfo == undefined){
        return '';
    }

    if(!adrInfo){
        return 'naver_get_hsc_no';
    }
    console.log(adrInfo.adr3);
    const queryParam =  `https://m.land.naver.com/complex/ajax/complexListByCortarNo?cortarNo=${adrInfo.adr3}`;
    const reData_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false);xhr.send(); return xhr.responseText;`);

    let reData = null;

    try{
        reData = JSON.parse(reData_);

        console.log(reData);
    }catch(e){
        console.log("해당 주소 없음");
        await DBCall(`CALL SP_SC_ADR_UPDATE_HSC(?,?,?)`,[adrInfo.adr3, machineNo, 'end']);
        return 'naver_get_hsc_no';
    }

    const itemList = reData.result;

    const checkIdlist = await DBCall(`CALL SP_SC_HSC_CHECK(?)`,[adrInfo.adr3]);

    for(let i=0;i<itemList.length;i++){
        if(!checkIdlist.find(e => e.hscpNo == itemList[i].hscpNo)){
            await DBCall(`CALL SP_SC_HSC_ADD(?,?,?,?,?,?,?)`,[
                itemList[i].hscpNo,
                itemList[i].cortarNo,
                itemList[i].hscpNm,
                itemList[i].hscpTypeCd,
                itemList[i].hscpTypeNm,
                itemList[i].lat,
                itemList[i].lng
            ]);
        }
    }

    console.log("해당 주소 추가 완료");

    await DBCall(`CALL SP_SC_ADR_UPDATE_HSC(?,?,?)`,[adrInfo.adr3, machineNo, 'end']);
    await randomSleep();

    return 'naver_get_hsc_no';
}

//VL:JWJT:DDDGG:SGJT:HOJT:OR
async function getNaverHscNo2(){
    await driver.manage().window().setRect({x: 0, y: 0, width: 360, height: 800});
    // https://new.land.naver.com/houses
    await driver.get('https://new.land.naver.com/houses');
    
    await randomSleep();

    const adrInfo = await DBOneCall(`CALL SP_SC_ADR_GET_HSC(?)`,[machineNo]);

    if(adrInfo == undefined){
        return '';
    }

    if(!adrInfo){
        return 'naver_get_hsc_no2';
    }

    console.log("NAVER2 HSC NO START :: " + adrInfo.adr3);
    const token = (await driver.executeScript(`return App.state.token;`)).token;
    // adrInfo.adr3 = '4413310400';
    
    let isMoreData = true;
    let page = 1;

    try{
        do{
            const user_agent = getUserAgent();
            const queryParam =  `https://new.land.naver.com/api/articles?cortarNo=${adrInfo.adr3}&order=rank&realEstateType=VL:JWJT:DDDGG:SGJT:HOJT:OR&tradeType=&tag=::::::::&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=0&areaMax=900000000&oldBuildYears&recentlyBuildYears&minHouseHoldCount&maxHouseHoldCount&showArticle=false&sameAddressGroup=false&minMaintenanceCost&maxMaintenanceCost&priceType=RETAIL&directions=&page=${page++}&articleState`;
            const reData_ = await driver.executeScript(`const xhr = new XMLHttpRequest(); xhr.open('get','${queryParam}', false); xhr.setRequestHeader('Authorization','Bearer ${token}'); ${user_agent} xhr.send(); return xhr.responseText;`);
            let reData = JSON.parse(reData_);
            isMoreData = reData.isMoreData;

            const articleList = reData.articleList;

            for(let i=0;i<articleList.length;i++){
                // console.log(
                //     adrInfo.adr3,
                //     articleList[i].articleNo,
                //     articleList[i].tradeTypeCode,
                //     articleList[i].realEstateTypeCode,
                //     articleList[i].realEstateTypeName,
                // );

                // await getArticle(articleList[i].articleNo, token);
                await DBCall(`CALL SP_SC_HSC_ADD2(?,?,?,?,?)`,[
                    adrInfo.adr3,
                    articleList[i].articleNo,
                    articleList[i].tradeTypeCode,
                    articleList[i].realEstateTypeCode,
                    articleList[i].realEstateTypeName,
                ]);
            }
            
        }while(isMoreData)

        // console.log(reData);
        await DBCall(`CALL SP_SC_ADR_UPDATE_HSC(?,?,?)`,[adrInfo.adr3, machineNo, 'end']);

        return 'naver_get_hsc_no2';
    }catch(e){
        console.log("getNaverHscNo2 ERR");
        console.log(e);
        if(e.name == 'InvalidSelectorError'){
        }else{
            await DBCall(`CALL SP_SC_ADR_UPDATE_HSC(?,?,?)`,[adrInfo.adr3, machineNo, 'end']);
        }

        driver.quit();
        driver = null;
        await randomSleep(300000,400000);

        return 'naver_get_hsc_no2';
    }
}

async function getArticle(){
    // console.log("getArticle START");
    try{
        await driver.manage().window().setRect({x: 0, y: 0, width: 360, height: 800});
        await driver.get('https://new.land.naver.com/houses');
        await randomSleep();


        const adrInfo = await DBOneCall(`CALL SP_SC_GET_HSC2(?)`,[machineNo]);
        if(adrInfo == undefined){
            return '';
        }
    
        if(!adrInfo){
            return 'getArticle';
        }
    
        const articleNo = adrInfo.articleNo;



        const token = (await driver.executeScript(`return App.state.token;`)).token;

        const user_agent = getUserAgent();
        const queryParam =  `https://new.land.naver.com/api/articles/${articleNo}?complexNo=`;
        const reData_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false); xhr.setRequestHeader('Authorization','Bearer ${token}'); ${user_agent} xhr.send(); return xhr.responseText;`);
        let reData = JSON.parse(reData_);

        if(!reData.articleDetail?.cityNo){
            await DBCall(`CALL SP_SC_HSC_INFO_UPDATE2(?,?,?,?)`,[articleNo, machineNo, 'end', null]);
            return 'getArticle';
        }

        console.log(
            Number(articleNo),
            reData.articleDetail.cityNo,
            reData.articleDetail.cortarNo,
            reData.articleDetail.pnu,
            
            reData.articleDetail.tradeTypeCode,
            reData.articleDetail.realestateTypeCode,
            reData.articleDetail.realestateTypeName,
            reData.articleDetail.tradeBuildingTypeCode,   

            reData.articleFloor.correspondingFloorCount ? (reData.articleFloor.correspondingFloorCount == '-' ? null : reData.articleFloor.correspondingFloorCount) : null,
            reData.articleFloor.totalFloorCount ? (reData.articleFloor.totalFloorCount == '-' ? null : reData.articleFloor.totalFloorCount) : null,
            reData.articleFloor.undergroundFloorCount ? (reData.articleFloor.undergroundFloorCount == '-' ? null : reData.articleFloor.undergroundFloorCount) : null,
            reData.articleFloor.uppergroundFloorCount ? (reData.articleFloor.uppergroundFloorCount == '-' ? null : reData.articleFloor.uppergroundFloorCount) : null,

            reData.articleFacility.buildingUseAprvYmd,

            reData.articlePrice.warrantPrice ? reData.articlePrice.warrantPrice : null,
            reData.articlePrice.rentPrice ? reData.articlePrice.rentPrice : null,
            reData.articlePrice.dealPrice ? reData.articlePrice.dealPrice : null,

            reData.articleSpace.groundSpace ? reData.articleSpace.groundSpace : null,
            reData.articleSpace.totalSpace ? reData.articleSpace.totalSpace : null,
            reData.articleSpace.buildingSpace ? reData.articleSpace.buildingSpace : null,
            reData.articleSpace.supplySpace ? reData.articleSpace.supplySpace : null,
            reData.articleSpace.exclusiveSpace ? reData.articleSpace.exclusiveSpace : null,
        );

        await DBCall(`CALL SP_SC_ARTICLE_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
            articleNo,
            reData.articleDetail.cityNo,
            reData.articleDetail.cortarNo,
            reData.articleDetail.pnu,
            
            reData.articleDetail.tradeTypeCode,
            reData.articleDetail.realestateTypeCode,
            reData.articleDetail.realestateTypeName,
            reData.articleDetail.tradeBuildingTypeCode,   

            reData.articleFloor.correspondingFloorCount ? (reData.articleFloor.correspondingFloorCount == '-' ? null : reData.articleFloor.correspondingFloorCount) : null,
            reData.articleFloor.totalFloorCount ? (reData.articleFloor.totalFloorCount == '-' ? null : reData.articleFloor.totalFloorCount) : null,
            reData.articleFloor.undergroundFloorCount ? (reData.articleFloor.undergroundFloorCount == '-' ? null : reData.articleFloor.undergroundFloorCount) : null,
            reData.articleFloor.uppergroundFloorCount ? (reData.articleFloor.uppergroundFloorCount == '-' ? null : reData.articleFloor.uppergroundFloorCount) : null,

            reData.articleFacility.buildingUseAprvYmd,

            reData.articlePrice.dealPrice ? reData.articlePrice.dealPrice : null,
            reData.articlePrice.warrantPrice ? reData.articlePrice.warrantPrice : null,
            reData.articlePrice.rentPrice ? reData.articlePrice.rentPrice : null,

            reData.articleSpace.groundSpace ? reData.articleSpace.groundSpace : null,
            reData.articleSpace.totalSpace ? reData.articleSpace.totalSpace : null,
            reData.articleSpace.buildingSpace ? reData.articleSpace.buildingSpace : null,
            reData.articleSpace.supplySpace ? reData.articleSpace.supplySpace : null,
            reData.articleSpace.exclusiveSpace ? reData.articleSpace.exclusiveSpace : null,
        ]);

        await DBCall(`CALL SP_SC_HSC_INFO_UPDATE2(?,?,?,?)`,[articleNo, machineNo, 'end', null]);

        // driver.quit();
        // driver = null;

        return 'getArticle';
    }catch(e){
        console.log("ARTICLE ERR");
        console.log(e);

        driver.quit();
        driver = null;
        // await randomSleep(300000,400000);

        return 'getArticle';
    }
}


async function getNaverHsc(){
    // console.log("NAVER HSC START");
    await driver.manage().window().setRect({x: 0, y: 0, width: 360, height: 800});
    const adrInfo = await DBOneCall(`CALL SP_SC_GET_HSC(?)`,[machineNo]);

    if(adrInfo == undefined){
        return '';
    }

    if(!adrInfo){
        return 'naver_get_hsc';
    }
    console.log(adrInfo);

    await driver.get(`https://m.land.naver.com/complex/info/${adrInfo.hscpNo}`);
    await randomSleep();

    const reLand = await driver.executeScript(`return land.complexDetail.jsonPageData;`);
    reLand.company = null;


    //건설사 찾기
    const mainDom = await driver.findElement(By.xpath("//*[@id=\"_basic_content_cd\"]/article[1]"));
    const tgDomList = await mainDom.findElements(By.xpath("//span[@class=\"tit\"]"));

    for(let i=0;i<tgDomList.length;i++){
        const tg = await tgDomList[i].getText();
        
        if(tg == '건설사'){
            reLand.company = await tgDomList[i].findElement(By.xpath("../span[2]")).getText();
            break;
        }
    }
       
    await DBCall(`CALL SP_SC_HSC_ATC_ADD(?,?,?,?,?,?,?,?,?)`,[
        adrInfo.cortarNo,
        adrInfo.hscpNo,
        reLand.hscpNm,
        reLand.hscpTypeCd,
        reLand.rletTpNm,
        reLand.cortarNm,
        reLand.addr,
        reLand.roadAddr,
        reLand.company
    ]);
        
    
        
 
    let a1List = [];
    let b1List = [];
    let b2List = [];

    let page = 1;

    if(adrInfo.page){
        page = adrInfo.page;
    }

    doSt = true;
    do{
        const queryParam =  'https://m.land.naver.com/complex/getComplexArticleList' +
        '?hscpNo=' + adrInfo.hscpNo +
        '&cortarNo=' + adrInfo.cortarNo +
        '&tradTpCd=A1:B1:B2' +
        '&ptpNo=' +
        '&order=point_' + 
        '&showR0=N' + 
        '&page=' + (page++);

        const reData_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false);xhr.send(); return xhr.responseText;`);
        const reData = JSON.parse(reData_);
        const ptpObj = reData.result;
        const itemList = ptpObj.list;

        for(let i=0;i<itemList.length;i++){
            const prcInfo =  moneyKrToNum(itemList[i].prcInfo);

            await DBCall(`CALL SP_SC_HSC_PRC_ADD(?,?,?,?,?,?,?,?,?)`,[
                adrInfo.cortarNo,
                adrInfo.hscpNo,
                reLand.rletTpNm,
                itemList[i].tradTpCd,
                prcInfo.dVal,
                prcInfo.rVal,
                itemList[i].prcInfo,
                Number(itemList[i].spc1),
                Number(itemList[i].spc2)
            ]);
        }

        await DBCall(`CALL SP_SC_HSC_INFO_UPDATE(?,?,?,?)`,[adrInfo.hscpNo, machineNo, 'start', page-1]);
        console.log(adrInfo.hscpNo, machineNo, 'start', page-1);

        if(ptpObj.moreDataYn == 'N'){
            doSt = false;
        }
        await randomSleep();
    }while(doSt);


    await DBCall(`CALL SP_SC_HSC_INFO_UPDATE(?,?,?,?)`,[adrInfo.hscpNo, machineNo, 'end', null]);
    await randomSleep();

    return 'naver_get_hsc';
}

let errorObj = null;
async function getNaver(){
    console.log(machineNo);
    const adrInfo = await DBOneCall(`CALL SP_SC_GET_HSC(?)`,[machineNo]);

    if(adrInfo == undefined){
        return '';
    }

    if(!adrInfo){
        return 'naver_get';
    }

    const hscpNo = adrInfo.hscpNo;
    // const hscpNo = 100501;
    console.log("단지id\t\t:\t",  hscpNo);
    
    let queryParam = '';
    await driver.manage().window().setRect({x: 0, y: 0, width: 360, height: 800});

    await driver.get(`https://new.land.naver.com/complexes?ms=37.566427,126.977872,13&a=APT:PRE&e=RETAIL`);
    await randomSleep();

    const token = (await driver.executeScript(`return App.state.token;`)).token;

    queryParam =  `https://new.land.naver.com/api/complexes/${hscpNo}?sameAddressGroup=false` ;
    const aptInfo_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false); xhr.setRequestHeader('Authorization','Bearer ${token}'); xhr.send(); return xhr.responseText;`);
    const aptInfo = JSON.parse(aptInfo_);
    
    const sPnu = aptInfo.complexDetail.detailAddress.split(' ');
    const dPnu = sPnu.length == 1 ? sPnu[0] : sPnu[1];

    const pnu_ = dPnu.split('-');
    const xPnu = aptInfo.complexDetail.cortarNo + '1' + (pnu_.length == 1 ? pnu_[0].padStart(4,'0') + '0000': pnu_[0].padStart(4,'0') + pnu_[1].padStart(4,'0'));

    const regExp = /^[0-9]+$/;
    const pnu = regExp.test(xPnu) ? xPnu : null;

    errorObj = aptInfo;
    

    await DBCall(`CALL SP_SC_COMPLEX_ADD(?,?,?,?,?,?,?,?,?,?,?)`,[
        aptInfo.complexDetail.cortarNo,
        aptInfo.complexDetail.complexNo,
        aptInfo.complexDetail.complexName,
        aptInfo.complexDetail.address,
        aptInfo.complexDetail.detailAddress,
        aptInfo.complexDetail.roadAddress,
        aptInfo.complexDetail.realEstateTypeCode,
        aptInfo.complexDetail.realEstateTypeName,
        isEmpty(aptInfo.complexDetail.constructionCompanyName),
        isCheckDate(isEmpty(aptInfo.complexDetail.useApproveYmd)),
        pnu
    ]);


    let isMoreData = false;
    let hoPage = 1;
    let reHoList = [];
    do{
        queryParam =  `https://new.land.naver.com/api/articles/complex/${hscpNo}?realEstateType=OPST%3AAPT&tradeType=&tag=%3A%3A%3A%3A%3A%3A%3A%3A&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=0&areaMax=900000000&oldBuildYears&recentlyBuildYears&minHouseHoldCount&maxHouseHoldCount&showArticle=false&sameAddressGroup=false&minMaintenanceCost&maxMaintenanceCost&priceType=RETAIL&directions=&page=${hoPage}&complexNo=${hscpNo}&buildingNos=&areaNos=&type=list&order=rank`;
        const hoList_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false); xhr.setRequestHeader('Authorization','Bearer ${token}'); xhr.send(); return xhr.responseText;`);
        const hoList = JSON.parse(hoList_);

        if(!('isMoreData' in hoList) || !('articleList' in hoList)){
            break;
        }

        if(!hoList.articleList.length){
            break;
        }
        reHoList = reHoList.concat(hoList.articleList);

        isMoreData = hoList.isMoreData;
        hoPage++;
    }while(isMoreData);
    
    const GAreaList = groupBy(reHoList, 'areaName');
    let G_AVG = {};

    for (var key in GAreaList) {
        G_AVG[key] = {
            A1: {dealOrWarrantPrc:null, cnt:null, AVG:null},
            B1: {dealOrWarrantPrc:null, cnt:null, AVG:null},
            B2: {dealOrWarrantPrc:null, rentPrc:null, cnt:null, AVG1:null, AVG2:null},
        };
    }

    // await randomSleep(400000,400000);

    for (var key in GAreaList) {
        const GTradeType = groupBy(GAreaList[key], 'tradeTypeCode');
        
        for (var key_ in GTradeType) {
            if(key_ == 'B3'){
                continue;
            }

            for(let i=0;i<GTradeType[key_].length;i++){
                G_AVG[key][key_].dealOrWarrantPrc += moneyKrToNum(GTradeType[key_][i].dealOrWarrantPrc);

                if(key_ == 'B2'){
                    G_AVG[key][key_].rentPrc += moneyKrToNum(GTradeType[key_][i].rentPrc);
                }
                
                G_AVG[key][key_].cnt++;
            }
        }
    }

    for (var key in G_AVG) {
        G_AVG[key].A1.AVG = G_AVG[key].A1.dealOrWarrantPrc ? Math.floor(G_AVG[key].A1.dealOrWarrantPrc / G_AVG[key].A1.cnt) : null;
        G_AVG[key].B1.AVG = G_AVG[key].B1.dealOrWarrantPrc ? Math.floor(G_AVG[key].B1.dealOrWarrantPrc / G_AVG[key].B1.cnt) : null;

        G_AVG[key].B2.AVG1 = G_AVG[key].B2.dealOrWarrantPrc ? Math.floor(G_AVG[key].B2.dealOrWarrantPrc / G_AVG[key].B2.cnt) : null;
        G_AVG[key].B2.AVG2 = G_AVG[key].B2.rentPrc ? Math.floor(G_AVG[key].B2.rentPrc / G_AVG[key].B2.cnt) : null;
    }

    // 호가
    let hoPrcList = [];
    for(let i=0;i<aptInfo.complexPyeongDetailList.length;i++){
        let avgInfo = {
            dealPriceAvg : null,
            leasePriceAvg : null,
            rentDepositAvg : null,
            rentPriceAvg : null,
        };

        if(G_AVG[aptInfo.complexPyeongDetailList[i].pyeongName]){
            avgInfo.dealPriceAvg = G_AVG[aptInfo.complexPyeongDetailList[i].pyeongName].A1.AVG;
            avgInfo.leasePriceAvg = G_AVG[aptInfo.complexPyeongDetailList[i].pyeongName].B1.AVG;
            avgInfo.rentDepositAvg = G_AVG[aptInfo.complexPyeongDetailList[i].pyeongName].B2.AVG1;
            avgInfo.rentPriceAvg = G_AVG[aptInfo.complexPyeongDetailList[i].pyeongName].B2.AVG2;
        };

        hoPrcList.push({
            cortarNo: aptInfo.complexDetail.cortarNo,
            complexNo: aptInfo.complexDetail.complexNo,
            pyeongNo: aptInfo.complexPyeongDetailList[i].pyeongNo,
            realEstateTypeCode: aptInfo.complexDetail.realEstateTypeCode,
            supplyAreaDouble: aptInfo.complexPyeongDetailList[i].supplyAreaDouble,
            pyeongName: aptInfo.complexPyeongDetailList[i].pyeongName,
            supplyArea: aptInfo.complexPyeongDetailList[i].supplyArea,
            pyeongName2: aptInfo.complexPyeongDetailList[i].pyeongName2,
            supplyPyeong: aptInfo.complexPyeongDetailList[i].supplyPyeong,
            exclusiveArea: aptInfo.complexPyeongDetailList[i].exclusiveArea,
            exclusivePyeong: aptInfo.complexPyeongDetailList[i].exclusivePyeong,
            exclusiveRate: aptInfo.complexPyeongDetailList[i].exclusiveRate,
            dealPriceMin: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMin)),
            dealPriceMax: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMax)),
            dealPriceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMin),
            dealPriceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMax),
            dealPricePerSpaceMin:  moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMin)),
            dealPricePerSpaceMax:  moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMax)),
            dealPricePerSpaceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMin),
            dealPricePerSpaceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMax),
            leasePriceMin: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMin)),
            leasePriceMax: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMax)),
            leasePriceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMin),
            leasePriceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMax),
            leasePricePerSpaceMin: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMin)),
            leasePricePerSpaceMax: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMax)),
            leasePricePerSpaceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMin),
            leasePricePerSpaceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMax),
            leasePriceRateMin: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceRateMin),
            leasePriceRateMax: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceRateMax),
            rentDepositPriceMin: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMin)),
            rentDepositPriceMax: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMax)),
            rentDepositPriceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMin),
            rentDepositPriceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMax),
            rentPriceMin: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMin)),
            rentPriceMax: moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMax)),
            rentPriceMinKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMin),
            rentPriceMaxKor: isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMax),

            dealPriceAvg : avgInfo.dealPriceAvg,
            leasePriceAvg : avgInfo.leasePriceAvg,
            rentDepositAvg : avgInfo.rentDepositAvg,
            rentPriceAvg : avgInfo.rentPriceAvg,
        });

        await DBCall(`CALL SP_SC_HOPRC_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
            aptInfo.complexDetail.cortarNo,
            aptInfo.complexDetail.complexNo,
            aptInfo.complexPyeongDetailList[i].pyeongNo,
            aptInfo.complexDetail.realEstateTypeCode,
            aptInfo.complexPyeongDetailList[i].supplyAreaDouble,
            aptInfo.complexPyeongDetailList[i].pyeongName,
            aptInfo.complexPyeongDetailList[i].supplyArea,
            aptInfo.complexPyeongDetailList[i].pyeongName2,
            aptInfo.complexPyeongDetailList[i].supplyPyeong,
            aptInfo.complexPyeongDetailList[i].exclusiveArea,
            aptInfo.complexPyeongDetailList[i].exclusivePyeong,
            aptInfo.complexPyeongDetailList[i].exclusiveRate,
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPriceMax),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.dealPricePerSpaceMax),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceMax),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePricePerSpaceMax),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceRateMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.leasePriceRateMax),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentDepositPriceMax),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMin)),
            moneyKrToNum(isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMax)),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMin),
            isEmpty(aptInfo.complexPyeongDetailList[i].articleStatistics?.rentPriceMax),
            avgInfo.dealPriceAvg,
            avgInfo.leasePriceAvg,
            avgInfo.rentDepositAvg,
            avgInfo.rentPriceAvg,
        ]);
    }
    
    // console.log(hoPrcList);


    //실거래가
    const isDate = new Date((new Date).getTime() + TIME_ZONE);
    const maxDate = (new Date(isDate.getFullYear() + '.' + (isDate.getMonth()+1) + '.' + 1));
    const minDate = (new Date((isDate.getFullYear()-2) + '.' + (isDate.getMonth()+1) + '.' + 1));
    let realPrcList = [];
    for(let py=0;py<hoPrcList.length;py++){
        // console.log(hoPrcList[py].pyeongNo + '---------------------------');
        
        for(let i=0;i<TRADE_LIST.length;i++){
            let moreSt = false;
            let addedRowCount = null;

            do{
                queryParam =  `https://new.land.naver.com/api/complexes/${hscpNo}/prices/real?complexNo=${hscpNo}&tradeType=${TRADE_LIST[i]}&year=5&priceChartChange=false&areaNo=${hoPrcList[py].pyeongNo}&type=table`;
                if(moreSt && addedRowCount){
                    queryParam += '&addedRowCount='+addedRowCount;
                }

                const prcInfo_ = await driver.executeScript(`const xhr = new XMLHttpRequest();xhr.open('get','${queryParam}', false); xhr.setRequestHeader('Authorization','Bearer ${token}'); xhr.send(); return xhr.responseText;`);
                const prcInfo = JSON.parse(prcInfo_);
                addedRowCount = prcInfo.addedRowCount;

                if(!prcInfo.realPriceOnMonthList.length){
                    moreSt = false;
                }
                
                // console.log(moreSt, aptInfo.complexDetail.cortarNo, aptInfo.complexDetail.complexNo, TRADE_LIST[i]);
                // console.log(prcInfo.realPriceOnMonthList.length);

                for(let mm=0;mm<prcInfo.realPriceOnMonthList.length;mm++){
                    const tg = prcInfo.realPriceOnMonthList[mm].realPriceList;

                    for(let ii=0;ii<tg.length;ii++){
                        // deleteYn 취소여부
                        const curDate = new Date(tg[ii].tradeYear + '.' + tg[ii].tradeMonth + '.' + 1);
                        moreSt = isBetween(curDate, minDate, maxDate);

                        if(moreSt && tg[ii].deleteYn != 'O'){
                            realPrcList.push({
                                cortarNo: aptInfo.complexDetail.cortarNo,
                                complexNo: aptInfo.complexDetail.complexNo,
                                realEstateTypeCode: aptInfo.complexDetail.realEstateTypeCode,
                                pyeongNo: hoPrcList[py].pyeongNo,
                                pyeongName: hoPrcList[py].pyeongName,
                                supplyAreaDouble: hoPrcList[py].supplyAreaDouble,
                                tradeType: tg[ii].tradeType,
                                floor: tg[ii].floor,
                                tradeYearMonth: tg[ii].formattedTradeYearMonth,
                                dealPrice: isEmpty(tg[ii].dealPrice),
                                leasePrice: isEmpty(tg[ii].leasePrice),
                                rentPrice: isEmpty(tg[ii].rentPrice),
                                priceKor: tg[ii].formattedPrice, 
                            });

                            await DBCall(`CALL SP_SC_REALPRC_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                                aptInfo.complexDetail.cortarNo,
                                aptInfo.complexDetail.complexNo,
                                aptInfo.complexDetail.realEstateTypeCode,
                                hoPrcList[py].pyeongNo,
                                hoPrcList[py].pyeongName,
                                hoPrcList[py].supplyAreaDouble,
                                tg[ii].tradeType,
                                tg[ii].floor,
                                tg[ii].formattedTradeYearMonth,
                                isEmpty(tg[ii].dealPrice),
                                isEmpty(tg[ii].leasePrice),
                                isEmpty(tg[ii].rentPrice),
                                tg[ii].formattedPrice
                            ]);
                        }
                    }
                }   
               
            }while(moreSt);
        }
    }


   
    

    await DBCall(`CALL SP_SC_HSC_INFO_UPDATE(?,?,?,?)`,[adrInfo.hscpNo, machineNo, 'end', null]);
    await randomSleep();

    return 'naver_get';
}



async function getBuild(id, rid, pnu, dong){
    let state = false;
    let queryParam = '';
    await driver.manage().window().maximize();

    await driver.get(`https://www.eais.go.kr/moct/bci/aaa02/BCIAAA02L01`);
    const originalWindow = await driver.getWindowHandle();
    await randomSleep();

    await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div[2]/button")).click();
    await randomSleep();


    //로그인
    const inputID = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div/div[1]/div[1]/dl/dd[1]/input"));
    const inputPW = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div/div[1]/div[1]/dl/dd[2]/input"));

    inputID.sendKeys('k2689r4m');
    inputPW.sendKeys('#29ey9hx674');

    await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div/div[1]/div[1]/button")).click();
    await randomSleep();


    await driver.get(`https://www.eais.go.kr/moct/bci/aaa02/BCIAAA02L01`);
    await randomSleep();


    //지번 조회
    await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[1]/div[2]/button[2]")).click();
    await randomSleep();

    // const dong = null;
    // const pnu = '1121510300102250022';
    const pnuObj = getAdrCode(pnu);
    const tgNmObj = {
        city: '',
        dvsn: '',
        sec: '',
        jibun: '',
        dong: '',
    };
    let tgAdr = '';

    console.log(getAdrCode(pnu));

    const selectElement1 = await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/select[1]'))
    const select1 = new Select(selectElement1)
    await select1.selectByValue(pnuObj.city)
    await randomSleep();
    tgNmObj.city = await (await select1.getFirstSelectedOption()).getText();

    const selectElement2 = await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/select[2]'))
    const select2 = new Select(selectElement2)
    await select2.selectByValue(pnuObj.dvsn)
    await randomSleep();
    tgNmObj.dvsn = await (await select2.getFirstSelectedOption()).getText();

    const selectElement3 = await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/select[3]'))
    const select3 = new Select(selectElement3)
    await select3.selectByValue(pnuObj.sec)
    tgNmObj.sec = await (await select3.getFirstSelectedOption()).getText();

    const selectElement4 = await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/select[4]'))
    const select4 = new Select(selectElement4)
    await select4.selectByValue('0')

    const inputJI = await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/input[1]"));
    const inputPUN = await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/input[2]"));

    await inputJI.sendKeys(pnuObj.ji);
    tgNmObj.jibun = pnuObj.ji;

    if(pnuObj.bun){
        await inputPUN.sendKeys(pnuObj.bun);
        tgNmObj.jibun = pnuObj.ji + '-' + pnuObj.bun;
    }



    //조회하기
    await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/button[2]")).click();
    await randomSleep();
    

    //표제부
    await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[3]/ul/li[4]/a")).click();
    await randomSleep();

    const tgDom = await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[3]/div/div[4]/table/tbody/div/div/div[1]/div[2]/div[3]/div[2]/div/div"));
    const tgList = await tgDom.findElements(By.xpath("./child::div"));

    for(let i=0;i<tgList.length;i++){
        let tgDong = await tgList[i].findElement(By.xpath("div[3]")).getText();

        if(dong){
            if(tgDong.replace(/[^0-9]/g, "") == dong.replace(/[^0-9]/g, "")){
                await tgList[i].findElement(By.xpath("div[1]/div/div/div/div[2]/input")).click();
                await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[2]/button")).click();
                await randomSleep();
                await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[2]/button")).click();
                await randomSleep();
                await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div[5]/button[2]")).click();
                await randomSleep();
                
                tgNmObj.dong = tgDong;
                tgAdr = tgNmObj.city + ' ' + tgNmObj.dvsn + ' ' + tgNmObj.sec + ' ' + tgNmObj.jibun + ' ' + tgNmObj.dong;

                break;
            }
        }else{
            if(tgDong == "동명칭 없음"){
                await tgList[i].findElement(By.xpath("div[1]/div/div/div/div[2]/input")).click();
                await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[2]/button")).click();
                await randomSleep();
                await driver.findElement(By.xpath("/html/body/div/div/div/div[3]/div[2]/div/div[2]/div[2]/button")).click();
                await randomSleep();
                await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div[5]/button[2]")).click();
                await randomSleep();
                
                tgNmObj.dong = tgDong;
                tgAdr = tgNmObj.city + ' ' + tgNmObj.dvsn + ' ' + tgNmObj.sec + ' ' + tgNmObj.jibun + ' ' + tgNmObj.dong;

                break;
            }
        }
    }

    if(!tgAdr){
        console.log("NOT tgAdr !");
        return false;
    }
    console.log(tgAdr);


    const tableDom = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/div[2]/div/div[4]/table/tbody"));
    await randomSleep(5000, 6000);
    const tableList = await tableDom.findElements(By.xpath("./child::tr"));
    

    for(let i=0;i<tableList.length-1;i++){
        let tableSt = await tableList[i].findElement(By.xpath("td[5]/a")).getText();
        let tableAdr = await tableList[i].findElement(By.xpath("td[4]")).getText();
        
        console.log(tableAdr, tableSt);

        if(tableAdr == tgAdr && tableSt == '발급'){
            await tableList[i].findElement(By.xpath("td[5]/a")).click();

            await driver.wait(
                async () => (await driver.getAllWindowHandles()).length === 2,
                1000
            );

            const windows = await driver.getAllWindowHandles();
            windows.forEach(async handle => {
                if (handle !== originalWindow) {
                    await driver.switchTo().window(handle);
                }
            });

            
            await randomSleep(3000,5000);
            let curIdx = 1;
            let curIdx_ = 1;
            let pages = [];            

            do{
                curIdx = curIdx_;
                const base64_image = await driver.executeScript("return document.querySelector('canvas').toDataURL('image/png').substring(21);");

                pages.push(`data:image/png;base64${base64_image}`);

                await driver.findElement(By.xpath("/html/body/div/div/div[1]/table/tbody/tr/td/div/nobr/button[9]")).click();
                await randomSleep();

                curIdx_ = Number(await (await driver.findElement(By.xpath("/html/body/div/div/div[1]/table/tbody/tr/td/div/nobr/input[1]"))).getAttribute("value"));
            }while(curIdx != curIdx_);

            // imgToPDF(pages, [841.89, 595.28]).pipe(fs.createWriteStream('output.pdf'))
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            const reData = await axios.post('https://yourpick.co.kr:3000/user/pdfsave',{
                rid: rid,
                imgList:pages,
            });



            if(reData.data){
                state = true;
            }else{
                state = false;
            }
            break;
        }
    }

    if(state){
        await DBCall(`CALL SP_SC_BUILD_UPDATE(?,?)`,[id, 'end']);
    }else{
        await DBCall(`CALL SP_SC_BUILD_UPDATE(?,?)`,[id, 'fail']);
    }

    driver.quit();
    driver = null;

    return true;
}


async function startScraping(){
    // let mode = 'naver_get_hsc';      //
    // let mode = 'naver_get_hsc_no';   //공동 기준 데이터
    // let mode = 'naver_get';  //공동 데이터 
    // let mode = 'naver_get_hsc_no2';  //단독 데이터   기준 데이터 로드
    let mode = 'getArticle';    //단독 데이터

    while(true){
        errorObj = null;
        try{
            if(driver == null){
                await initScraping();
            }

            if(mode == 'naver_get_hsc_no'){
                mode = await getNaverHscNo();
            }
            else if(mode == 'naver_get_hsc_no2'){
                mode = await getNaverHscNo2();
            }
            else if(mode == 'naver_get_hsc'){
                mode = await getNaverHsc();
            }
            else if(mode == 'naver_get'){
                mode = await getNaver();
            }
            else if(mode == 'getArticle'){
                mode = await getArticle();
            }
            else{
                console.log("END");
            }
        }
        catch(e){
            if(driver != null){
                console.log("xxxxxxxxxxxxxxxxx");
                console.log("탐지됨");
                console.log(e);
                if(errorObj){
                    console.log("=============================================================");
                    console.log("지역id\t\t:\t",  errorObj.complexDetail.cortarNo);
                    console.log("단지id\t\t:\t",  errorObj.complexDetail.complexNo);
                    console.log("단지이름\t:\t",  errorObj.complexDetail.complexName);
                    console.log("주소\t\t:\t",    errorObj.complexDetail.address);
                    console.log("지번\t\t:\t",    errorObj.complexDetail.detailAddress);
                    console.log("도로명\t\t:\t",  errorObj.complexDetail.roadAddress);
                    console.log("apt\t\t:\t",     errorObj.complexDetail.realEstateTypeCode);
                    console.log("아파트\t\t:\t",  errorObj.complexDetail.realEstateTypeName);
                    console.log("건설사\t\t:\t",   isEmpty(errorObj.complexDetail.constructionCompanyName));
                    console.log("사용승인일\t:\t", isEmpty(errorObj.complexDetail.useApproveYmd));
                    console.log("=============================================================");
                }
                console.log("xxxxxxxxxxxxxxxxx");
                // await randomSleep(3500, 4200);

                driver.quit();
                driver = null;
                
                await randomSleep(350000, 420000);
            }else{
                console.log(e);
                await randomSleep(3500, 4200);
            }
        }
        await randomSleep(500, 1000);
    }

}





async function startBulidingReg(){
    while(true){
        const target = await DBOneCall(`CALL SP_SC_BUILD_GET()`);

        try{
            if(target){
                
                if(driver == null){
                    await initScraping();
                }
                
                mode = await getBuild(target.id, target.rid, target.pnu, target.dong ? target.dong : null);
            }
        }catch(e){
            if(target){
                await DBCall(`CALL SP_SC_BUILD_UPDATE(?,?)`,[target.id, 'fail']);
            }

            if(driver != null){
                driver.quit();
                driver = null;
            }

            await randomSleep();
        }
     
        await randomSleep();
    }
}

startScraping();
// startBulidingReg();