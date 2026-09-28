const axios = require('axios');
const convert = require('xml-js');
var exports = module.exports = {};
const requestIp = require('request-ip');
const db = require('./database/connect/config');
const multer = require("multer");
const fs = require("fs");
const dayjs = require('dayjs')
const { Console } = require('console');
const { v4 } = require('uuid');
const crypto = require('crypto-js');
const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);

const TIME_ZONE = 9 * 60 * 60 * 1000;
const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;
const MONEY_FORMAT_TYPE = {
	LITTLE: 'LITTLE',
	MUCH: 'MUCH',
	LOAN: 'LOAN',
	RANGE: 'RANGE',
	TAX: 'TAX',
    TAX2: 'TAX2',
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
        case MONEY_FORMAT_TYPE.TAX2:
			if (0 === l) {
				o = '-원';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += ' ' + m.toLocaleString() + '만'),
				p > 0 && (o += ' ' + p.toLocaleString()),
				(o += '원'),
				o.trim();

            return i ? '- ' + o.trim() : '+ ' + o.trim();
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

	return i && (o = '-' + o), o.trim();
}

function isBetween(isDate_){
    const isDate = dayjs(isDate_);
    const dateS = dayjs().subtract(3, "year");
    const dateE = dayjs();
    const st = dayjs(isDate).isBetween(dateS, dateE, null, '[]');

    return st;
    // console.log(st + '   ::::   ' +  isDate.format('YYYY-MM-DD') + '  ' + dateS.format('YYYY-MM-DD') + '   ' + dateE.format('YYYY-MM-DD'));
};

async function hexToFile(rid, hex, fileName){
    try{
        filePath = 'uploads/pdf/'

        let typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16)
        }));
    
        let buffer = typedArray.buffer;
        const rFile = await fs.writeFileSync(filePath+fileName, typedArray);

    
        await exports.DBCall(`CALL SP_U_REPORT_REG_FILE_ADD(?,?,?,?,?)`,[
            rid,
            'application/pdf',
            buffer.byteLength,
            fileName,
            filePath
        ]);
    }catch(e){
        console.log('ERR ::: hexToFile');
        console.log(e);
    }
};


exports.SOCIAL_TYPE = {
	null: '일반',
	kakao: '카카오',
	naver: '네이버',
	apple: '애플',
};

exports.INFINITY = 999999999999;

exports.SIDO = {
    '서울시': '서울특별시',
    '부산시': '부산광역시',
    '대구시': '대구광역시',
    '인천시': '인천광역시',
    '광주시': '광주광역시',
    '울산시': '울산광역시',
    '세종시': '세종특별자치시',
    '서울특별시': '서울시',
    '부산광역시': '부산시',
    '대구광역시': '대구시',
    '인천광역시': '인천시',
    '광주광역시': '광주시',
    '울산광역시': '울산시',
    '세종특별자치시': '세종시',
    '경기도': '경기도',
    '충청북도':'충청북도',
    '충청남도':'충청남도',
    '전라북도':'전라북도',
    '전라남도':'전라남도',
};

exports.sendSMS = async function (toList) {
    try{
        const re = await messageService.sendMany(toList);
        return re;
    }catch(e){
        return false;
    }
},

exports.getReport4 = function(tradeType, realPrcList) {
    let DBrealPrcList1 = [];
    let DBrealPrcList2 = [];
    let exDealPrice = 0;
    let exLeasePrice = 0;
    let exRentPrice = 0;

    if(tradeType == 'A1'){
        for(let i=0;i<realPrcList.length;i++){
            if(i<3){
                DBrealPrcList1.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                dealPrice: realPrcList[i].dealPrice,
                floor: realPrcList[i].floor,
                });
            }
            else if(i<6){
                DBrealPrcList2.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                dealPrice: realPrcList[i].dealPrice,
                floor: realPrcList[i].floor,
                });
            }

            exDealPrice += realPrcList[i].dealPrice;
        }
    }else if(tradeType == 'B1'){
        for(let i=0;i<realPrcList.length;i++){
            if(i<3){
                DBrealPrcList1.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                leasePrice: realPrcList[i].leasePrice,
                floor: realPrcList[i].floor,
                });
            }
            else if(i<6){
                DBrealPrcList2.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                leasePrice: realPrcList[i].leasePrice,
                floor: realPrcList[i].floor,
                });
            }

            exLeasePrice += realPrcList[i].leasePrice;
        }
    }else if(tradeType == 'B2'){
        for(let i=0;i<realPrcList.length;i++){
            if(i<3){
                DBrealPrcList1.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                leasePrice: realPrcList[i].leasePrice,
                rentPrice: realPrcList[i].rentPrice,
                floor: realPrcList[i].floor,
                });
            }
            else if(i<6){
                DBrealPrcList2.push({
                tradeYearMonth: realPrcList[i].tradeYearMonth,
                realEstateTypeCode: realPrcList[i].realEstateTypeCode,
                leasePrice: realPrcList[i].leasePrice,
                rentPrice: realPrcList[i].rentPrice,
                floor: realPrcList[i].floor,
                });
            }

            exLeasePrice += realPrcList[i].leasePrice;
            exRentPrice += realPrcList[i].rentPrice;
        }
    }

    return {
        avgObj: {
            avgDealPrice: Number((exDealPrice/realPrcList.length).toFixed(0)),
            avgLeasePrice: Number((exLeasePrice/realPrcList.length).toFixed(0)),
            avgRentPrice: Number((exRentPrice/realPrcList.length).toFixed(0)),
        },
        realPrcList1: DBrealPrcList1,
        realPrcList2: DBrealPrcList2,
    }
};

exports.getReport5 = function(tradeType, avgObj, userPrc, typeName, hoPrc) {
    // console.log(avgObj);
    // console.log(userPrc);
    // console.log(hoPrc);
    let rObj = {
        leftRealPrc: null,
        leftRealPrcKor: null,
        leftRealInfo: null,
        rightRealPrc: null,
        rightRealPrcKor: null,
        rightRealInfo: null,

        leftHoPrcMin: null,
        leftHoPrcKorMin: null,
        leftHoInfoMin: null,
        rightHoPrcMin: null,
        rightHoPrcKorMin: null,
        rightHoInfoMin: null,

        leftHoPrcMax: null,
        leftHoPrcKorMax: null,
        leftHoInfoMax: null,
        rightHoPrcMax: null,
        rightHoPrcKorMax: null,
        rightHoInfoMax: null,

        leftHoRentPrcMin: null,
        leftHoRentPrcKorMin: null,
        leftHoRentInfoMin: null,
        rightHoRentPrcMin: null,
        rightHoRentPrcKorMin: null,
        rightHoRentInfoMin: null,

        leftHoRentPrcMax: null,
        leftHoRentPrcKorMax: null,
        leftHoRentInfoMax: null,
        rightHoRentPrcMax: null,
        rightHoRentPrcKorMax: null,
        rightHoRentInfoMax: null,

        score: 0,
        scoreInfo: [],
    };


    if(tradeType == 'A1'){
        if(!avgObj.avgDealPrice){
            rObj.leftRealPrc = null;
            rObj.leftRealPrcKor = null;
            rObj.leftRealInfo = '현재 실거래가 없음';
        }else{
            rObj.leftRealPrc = avgObj.avgDealPrice;
            rObj.leftRealPrcKor = exports.formatMoney(avgObj.avgDealPrice, MONEY_FORMAT_TYPE.TAX);
            rObj.leftRealInfo = null;
        }

        if(!avgObj.avgDealPrice){
            rObj.rightRealPrc = null;
            rObj.rightRealPrcKor = null;
            rObj.rightRealInfo = '-';
        }else if(avgObj.avgDealPrice == userPrc.dealPrice){
            rObj.rightRealPrc = 0;
            rObj.rightRealPrcKor = '동일';
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래와 동일합니다.`;
        }else if(avgObj.avgDealPrice < userPrc.dealPrice){
            rObj.rightRealPrc = userPrc.dealPrice - avgObj.avgDealPrice;
            rObj.rightRealPrcKor = exports.formatMoney(rObj.rightRealPrc, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'평균 실거래가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(avgObj.avgDealPrice > userPrc.dealPrice){
            rObj.rightRealPrc = userPrc.dealPrice - avgObj.avgDealPrice;
            rObj.rightRealPrcKor = exports.formatMoney(rObj.rightRealPrc, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래가보다 저렴합니다.`;
        }

        if(!hoPrc.dealPriceMin){
            rObj.leftHoInfoMin = '현재 호가 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
        }else{
            rObj.leftHoPrcMin = hoPrc.dealPriceMin;
            rObj.leftHoPrcKorMin = exports.formatMoney(rObj.leftHoPrcMin, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.dealPriceMax;
            rObj.leftHoPrcKorMax = exports.formatMoney(rObj.leftHoPrcMax, MONEY_FORMAT_TYPE.TAX);
        }



        if(!hoPrc.dealPriceMin){
            rObj.rightHoInfoMin = '-';
        }else if(hoPrc.dealPriceMin == userPrc.dealPrice){
            rObj.rightHoPrcMin = 0;
            rObj.rightHoPrcKorMin = '동일';
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가와 동일합니다.`;
        }else if(hoPrc.dealPriceMin < userPrc.dealPrice){
            rObj.rightHoPrcMin = userPrc.dealPrice - hoPrc.dealPriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'호가 최저가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.dealPriceMin > userPrc.dealPrice){
            rObj.rightHoPrcMin = userPrc.dealPrice - hoPrc.dealPriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가보다 저렴합니다.`;
        }

        if(!hoPrc.dealPriceMax){
            rObj.rightHoInfoMax = '-';
        }else if(hoPrc.dealPriceMax == userPrc.dealPrice){
            rObj.rightHoPrcMax = 0;
            rObj.rightHoPrcKorMax = '동일';
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가와 동일합니다.`;
        }else if(hoPrc.dealPriceMax < userPrc.dealPrice){
            rObj.rightHoPrcMax = userPrc.dealPrice - hoPrc.dealPriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'호가 최대가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.dealPriceMax > userPrc.dealPrice){
            rObj.rightHoPrcMax = userPrc.dealPrice - hoPrc.dealPriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가보다 저렴합니다.`;
        }

    }else if(tradeType == 'B1'){
        if(!avgObj.avgLeasePrice){
            rObj.leftRealPrc = null;
            rObj.leftRealPrcKor = null;
            rObj.leftRealInfo = '현재 실거래가 없음';
        }else{
            rObj.leftRealPrc = avgObj.avgLeasePrice;
            rObj.leftRealPrcKor = exports.formatMoney(avgObj.avgLeasePrice, MONEY_FORMAT_TYPE.TAX);
            rObj.leftRealInfo = null;
        }

        if(!avgObj.avgLeasePrice){
            rObj.rightRealPrc = null;
            rObj.rightRealPrcKor = null;
            rObj.rightRealInfo = '-';
        }else if(avgObj.avgLeasePrice == userPrc.leasePrice){
            rObj.rightRealPrc = 0;
            rObj.rightRealPrcKor = '동일';
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래와 동일합니다.`;
        }else if(avgObj.avgLeasePrice < userPrc.leasePrice){
            rObj.rightRealPrc = userPrc.leasePrice - avgObj.avgLeasePrice;
            rObj.rightRealPrcKor = exports.formatMoney(rObj.rightRealPrc, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'평균 실거래가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(avgObj.avgLeasePrice > userPrc.leasePrice){
            rObj.rightRealPrc = userPrc.leasePrice - avgObj.avgLeasePrice;
            rObj.rightRealPrcKor = exports.formatMoney(rObj.rightRealPrc, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightRealInfo = `해당 ${typeName} 평균 실거래가보다 저렴합니다.`;
        }

        if(!hoPrc.leasePriceMin){
            rObj.leftHoInfoMin = '현재 호가 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
        }else{
            rObj.leftHoPrcMin = hoPrc.leasePriceMin;
            rObj.leftHoPrcKorMin = exports.formatMoney(hoPrc.leasePriceMin, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.leasePriceMax;
            rObj.leftHoPrcKorMax = exports.formatMoney(hoPrc.leasePriceMax, MONEY_FORMAT_TYPE.TAX);
        }



        if(!hoPrc.leasePriceMin){
            rObj.rightHoInfoMin = '-';
        }else if(hoPrc.leasePriceMin == userPrc.leasePrice){
            rObj.rightHoPrcMin = 0;
            rObj.rightHoPrcKorMin = '동일';
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가와 동일합니다.`;
        }else if(hoPrc.leasePriceMin < userPrc.leasePrice){
            rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'호가 최저가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.leasePriceMin > userPrc.leasePrice){
            rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 호가 최저가보다 저렴합니다.`;
        }

        if(!hoPrc.leasePriceMax){
            rObj.rightHoInfoMax = '-';
        }else if(hoPrc.leasePriceMax == userPrc.leasePrice){
            rObj.rightHoPrcMax = 0;
            rObj.rightHoPrcKorMax = '동일';
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가와 동일합니다.`;
        }else if(hoPrc.leasePriceMax < userPrc.leasePrice){
            rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'호가 최대가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.leasePriceMax > userPrc.leasePrice){
            rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 호가 최대가보다 저렴합니다.`;
        }
    }else if(tradeType == 'B2'){
        if(!hoPrc.rentDepositPriceMin){
            rObj.leftHoInfoMin = '현재 호가 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
            rObj.leftHoRentInfoMin = '현재 호가 없음';
            rObj.leftHoRentInfoMax = '현재 호가 없음';
        }else{
            rObj.leftHoPrcMin = hoPrc.rentDepositPriceMin;
            rObj.leftHoPrcKorMin = exports.formatMoney(hoPrc.rentDepositPriceMin, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.rentDepositPriceMax;
            rObj.leftHoPrcKorMax = exports.formatMoney(hoPrc.rentDepositPriceMax, MONEY_FORMAT_TYPE.TAX);

            rObj.leftHoRentPrcMin = hoPrc.rentPriceMin;
            rObj.leftHoRentPrcKorMin = exports.formatMoney(hoPrc.rentPriceMin, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoRentPrcMax = hoPrc.rentPriceMax;
            rObj.leftHoRentPrcKorMax = exports.formatMoney(hoPrc.rentPriceMax, MONEY_FORMAT_TYPE.TAX);
        }


        if(!hoPrc.rentDepositPriceMin){
            rObj.rightHoInfoMin = '-';
        }else if(hoPrc.rentDepositPriceMin == userPrc.leasePrice){
            rObj.rightHoPrcMin = 0;
            rObj.rightHoPrcKorMin = '동일';
            rObj.rightHoInfoMin = `해당 ${typeName} 보증금 호가 최저가와 동일합니다.`;
        }else if(hoPrc.rentDepositPriceMin < userPrc.leasePrice){
            rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.rentDepositPriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 보증금 호가 최저가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'보증금 호가 최저가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.rentDepositPriceMin > userPrc.leasePrice){
            rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.rentDepositPriceMin;
            rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMin = `해당 ${typeName} 보증금 호가 최저가보다 저렴합니다.`;
        }

        if(!hoPrc.rentDepositPriceMax){
            rObj.rightHoInfoMax = '-';
        }else if(hoPrc.rentDepositPriceMax == userPrc.leasePrice){
            rObj.rightHoPrcMax = 0;
            rObj.rightHoPrcKorMax = '동일';
            rObj.rightHoInfoMax = `해당 ${typeName} 보증금 호가 최대가와 동일합니다.`;
        }else if(hoPrc.rentDepositPriceMax < userPrc.leasePrice){
            rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.rentDepositPriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 보증금 호가 최대가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'보증금 호가 최대가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.rentDepositPriceMax > userPrc.leasePrice){
            rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.rentDepositPriceMax;
            rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoInfoMax = `해당 ${typeName} 보증금 호가 최대가보다 저렴합니다.`;
        }




        if(!hoPrc.rentPriceMin){
            rObj.rightHoRentInfoMin = '-';
        }else if(hoPrc.rentPriceMin == userPrc.rentPrice){
            rObj.rightHoRentPrcMin = 0;
            rObj.rightHoRentPrcKorMin = '동일';
            rObj.rightHoRentInfoMin = `해당 ${typeName} 월세 호가 최저가와 동일합니다.`;
        }else if(hoPrc.rentPriceMin < userPrc.rentPrice){
            rObj.rightHoRentPrcMin = userPrc.rentPrice - hoPrc.rentPriceMin;
            rObj.rightHoRentPrcKorMin = exports.formatMoney(rObj.rightHoRentPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoRentInfoMin = `해당 ${typeName} 월세 호가 최저가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'월세 호가 최저가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.rentPriceMin > userPrc.rentPrice){
            rObj.rightHoRentPrcMin = userPrc.rentPrice - hoPrc.rentPriceMin;
            rObj.rightHoRentPrcKorMin = exports.formatMoney(rObj.rightHoRentPrcMin, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoRentInfoMin = `해당 ${typeName} 월세 호가 최저가보다 저렴합니다.`;
        }

        if(!hoPrc.rentPriceMax){
            rObj.rightHoRentInfoMax = '-';
        }else if(hoPrc.rentPriceMax == userPrc.rentPrice){
            rObj.rightHoRentPrcMax = 0;
            rObj.rightHoRentPrcKorMax = '동일';
            rObj.rightHoRentInfoMax = `해당 ${typeName} 월세 호가 최대가와 동일합니다.`;
        }else if(hoPrc.rentPriceMax < userPrc.rentPrice){
            rObj.rightHoRentPrcMax = userPrc.rentPrice - hoPrc.rentPriceMax;
            rObj.rightHoRentPrcKorMax = exports.formatMoney(rObj.rightHoRentPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoRentInfoMax = `해당 ${typeName} 월세 호가 최대가보다 비쌉니다.`;
            rObj.scoreInfo.push({rank:1, info:'월세 호가 최대가 보다 높은 금액입니다.'});
            rObj.score += 5;
        }else if(hoPrc.rentPriceMax > userPrc.rentPrice){
            rObj.rightHoRentPrcMax = userPrc.rentPrice - hoPrc.rentPriceMax;
            rObj.rightHoRentPrcKorMax = exports.formatMoney(rObj.rightHoRentPrcMax, MONEY_FORMAT_TYPE.TAX2);
            rObj.rightHoRentInfoMax = `해당 ${typeName} 월세 호가 최대가보다 저렴합니다.`;
        }
    }

    return rObj;
};

exports.getReport6 = function(tradeType, userPrc, typeName, emdNm, hoPrc) {
    // console.log(userPrc);
    // console.log(hoPrc);
    let rObj = {
        leftPerSpacePrc: null,  //평균평당가
        leftPerSpacePrcKor: null,
        leftPerSpacePrcInfo: null,
        rightPerSpacePrc: null,
        rightPerSpacePrcKor: null,
        rightPerSpacePrcInfo: null,

        leftHoPrcMax: null,  //호 최대
        leftHoPrcKorMax: null,
        leftHoInfoMax: null,
        rightHoPrcMax: null,
        rightHoPrcKorMax: null,
        rightHoInfoMax: null,

        leftHoPrcAvg: null,  //호 평균
        leftHoPrcKorAvg: null,
        leftHoInfoAvg: null,
        rightHoPrcAvg: null,
        rightHoPrcKorAvg: null,
        rightHoInfoAvg: null,

        leftHoPrcMin: null,  //호 최소
        leftHoPrcKorMin: null,
        leftHoInfoMin: null,
        rightHoPrcMin: null,
        rightHoPrcKorMin: null,
        rightHoInfoMin: null,

        leftHoRentPrcMax: null,  //호 월세 최대
        leftHoRentPrcKorMax: null,
        leftHoRentInfoMax: null,
        rightHoRentPrcMax: null,
        rightHoRentPrcKorMax: null,
        rightHoRentInfoMax: null,

        leftHoRentPrcMin: null,  //호 월세 최소
        leftHoRentPrcKorMin: null,
        leftHoRentInfoMin: null,
        rightHoRentPrcMin: null,
        rightHoRentPrcKorMin: null,
        rightHoRentInfoMin: null,

        score: 0,
        scoreInfo: [],
    };


    if(tradeType == 'A1'){
        if(!hoPrc.dealPricePerSpacAVG){
            rObj.leftPerSpacePrcInfo = '현재 정보 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
            rObj.leftHoInfoAvg = '현재 호가 없음';
            rObj.leftHoInfoMin = '현재 호가 없음';

            rObj.rightPerSpacePrcInfo = '-';
            rObj.rightHoInfoMax = '-';
            rObj.rightHoInfoAvg = '-';
            rObj.rightHoInfoMin = '-';
        }else{
            rObj.leftPerSpacePrc = hoPrc.dealPricePerSpacAVG;
            rObj.leftPerSpacePrcKor =  exports.formatMoney(hoPrc.dealPricePerSpacAVG, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.dealPriceMax;
            rObj.leftHoPrcKorMax =  exports.formatMoney(hoPrc.dealPriceMax, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcAvg = hoPrc.dealPriceAVG;
            rObj.leftHoPrcKorAvg =  exports.formatMoney(hoPrc.dealPriceAVG, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMin = hoPrc.dealPriceMin;
            rObj.leftHoPrcKorMin =  exports.formatMoney(hoPrc.dealPriceMin, MONEY_FORMAT_TYPE.TAX);

            if(hoPrc.dealPricePerSpacAVG == userPrc.dealPricePerSpace){
                rObj.rightPerSpacePrc = 0;
                rObj.rightPerSpacePrcKor = '동일';
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가와 동일합니다.`;
            }else if(hoPrc.dealPricePerSpacAVG < userPrc.dealPricePerSpace){
                rObj.rightPerSpacePrc = userPrc.dealPricePerSpace - hoPrc.dealPricePerSpacAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'평균 평당가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.dealPricePerSpacAVG > userPrc.dealPricePerSpace){
                rObj.rightPerSpacePrc = userPrc.dealPricePerSpace - hoPrc.dealPricePerSpacAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 저렴합니다.`;
            }

            //호가 최대가
            if(hoPrc.dealPriceMax == userPrc.dealPrice){
                rObj.rightHoPrcMax = 0;
                rObj.rightHoPrcKorMax = '동일';
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가와 동일합니다.`;
            }else if(hoPrc.dealPriceMax < userPrc.dealPrice){
                rObj.rightHoPrcMax = userPrc.dealPrice - hoPrc.dealPriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 최대가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.dealPriceMax > userPrc.dealPrice){
                rObj.rightHoPrcMax = userPrc.dealPrice - hoPrc.dealPriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가보다 저렴합니다.`;
            }

            //호가 평균가
            if(hoPrc.dealPriceAVG == userPrc.dealPrice){
                rObj.rightHoPrcAvg = 0;
                rObj.rightHoPrcKorAvg = '동일';
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가와 동일합니다.`;
            }else if(hoPrc.dealPriceAVG < userPrc.dealPrice){
                rObj.rightHoPrcAvg = userPrc.dealPrice - hoPrc.dealPriceAVG;
                rObj.rightHoPrcKorAvg = exports.formatMoney(rObj.rightHoPrcAvg, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 평균가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.dealPriceAVG > userPrc.dealPrice){
                rObj.rightHoPrcAvg = userPrc.dealPrice - hoPrc.dealPriceAVG;
                rObj.rightHoPrcKorAvg = exports.formatMoney(rObj.rightHoPrcAvg, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가보다 저렴합니다.`;
            }

            //호가 최저가
            if(hoPrc.dealPriceMin == userPrc.dealPrice){
                rObj.rightHoPrcMin = 0;
                rObj.rightHoPrcKorMin = '동일';
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가와 동일합니다.`;
            }else if(hoPrc.dealPriceMin < userPrc.dealPrice){
                rObj.rightHoPrcMin = userPrc.dealPrice - hoPrc.dealPriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 최저가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.dealPriceMin > userPrc.dealPrice){
                rObj.rightHoPrcMin = userPrc.dealPrice - hoPrc.dealPriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가보다 저렴합니다.`;
            }
        }
    }else if(tradeType == 'B1'){
        if(!hoPrc.leasePricePerSpaceAVG){
            rObj.leftPerSpacePrcInfo = '현재 정보 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
            rObj.leftHoInfoAvg = '현재 호가 없음';
            rObj.leftHoInfoMin = '현재 호가 없음';

            rObj.rightPerSpacePrcInfo = '-';
            rObj.rightHoInfoMax = '-';
            rObj.rightHoInfoAvg = '-';
            rObj.rightHoInfoMin = '-';
        }else{
            rObj.leftPerSpacePrc = hoPrc.leasePricePerSpaceAVG;
            rObj.leftPerSpacePrcKor =  exports.formatMoney(hoPrc.leasePricePerSpaceAVG, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.leasePriceMax;
            rObj.leftHoPrcKorMax =  exports.formatMoney(hoPrc.leasePriceMax, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcAvg = hoPrc.leasePriceAVG;
            rObj.leftHoPrcKorAvg =  exports.formatMoney(hoPrc.leasePriceAVG, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMin = hoPrc.leasePriceMin;
            rObj.leftHoPrcKorMin =  exports.formatMoney(hoPrc.leasePriceMin, MONEY_FORMAT_TYPE.TAX);

            if(hoPrc.leasePricePerSpaceAVG == userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = 0;
                rObj.rightPerSpacePrcKor = '동일';
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가와 동일합니다.`;
            }else if(hoPrc.leasePricePerSpaceAVG < userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = userPrc.leasePricePerSpace - hoPrc.leasePricePerSpaceAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'평균 평당가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePricePerSpaceAVG > userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = userPrc.leasePricePerSpace - hoPrc.leasePricePerSpaceAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 저렴합니다.`;
            }

            //호가 최대가
            if(hoPrc.leasePriceMax == userPrc.leasePrice){
                rObj.rightHoPrcMax = 0;
                rObj.rightHoPrcKorMax = '동일';
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가와 동일합니다.`;
            }else if(hoPrc.leasePriceMax < userPrc.leasePrice){
                rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 최대가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePriceMax > userPrc.leasePrice){
                rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 호가 최대가보다 저렴합니다.`;
            }

            //호가 평균가
            if(hoPrc.leasePriceAVG == userPrc.leasePrice){
                rObj.rightHoPrcAvg = 0;
                rObj.rightHoPrcKorAvg = '동일';
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가와 동일합니다.`;
            }else if(hoPrc.leasePriceAVG < userPrc.leasePrice){
                rObj.rightHoPrcAvg = userPrc.leasePrice - hoPrc.leasePriceAVG;
                rObj.rightHoPrcKorAvg = exports.formatMoney(rObj.rightHoPrcAvg, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 평균가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePriceAVG > userPrc.leasePrice){
                rObj.rightHoPrcAvg = userPrc.leasePrice - hoPrc.leasePriceAVG;
                rObj.rightHoPrcKorAvg = exports.formatMoney(rObj.rightHoPrcAvg, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoAvg = `${emdNm}에 위치한 ${typeName} 호가 평균가보다 저렴합니다.`;
            }

            //호가 최저가
            if(hoPrc.leasePriceMin == userPrc.leasePrice){
                rObj.rightHoPrcMin = 0;
                rObj.rightHoPrcKorMin = '동일';
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가와 동일합니다.`;
            }else if(hoPrc.leasePriceMin < userPrc.leasePrice){
                rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'호가 최저가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePriceMin > userPrc.leasePrice){
                rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 호가 최저가보다 저렴합니다.`;
            }
        }
    }else if(tradeType == 'B2'){
        if(!hoPrc.leasePricePerSpaceAVG){
            rObj.leftPerSpacePrcInfo = '현재 정보 없음';
            rObj.leftHoInfoMax = '현재 호가 없음';
            rObj.leftHoInfoMin = '현재 호가 없음';
            rObj.leftHoRentInfoMax = '현재 호가 없음';
            rObj.leftHoRentInfoMin = '현재 호가 없음';
            
            rObj.rightPerSpacePrcInfo = '-';
            rObj.rightHoInfoMax = '-';
            rObj.rightHoInfoMin = '-';
            rObj.rightHoRentInfoMax = '-';
            rObj.rightHoRentInfoMin = '-';
        }else{
            rObj.leftPerSpacePrc = hoPrc.leasePricePerSpaceAVG;
            rObj.leftPerSpacePrcKor =  exports.formatMoney(hoPrc.leasePricePerSpaceAVG, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMax = hoPrc.leasePriceMax;
            rObj.leftHoPrcKorMax =  exports.formatMoney(hoPrc.leasePriceMax, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoPrcMin = hoPrc.leasePriceMin;
            rObj.leftHoPrcKorMin =  exports.formatMoney(hoPrc.leasePriceMin, MONEY_FORMAT_TYPE.TAX);

            rObj.leftHoRentPrcMax = hoPrc.rentPriceMax;
            rObj.leftHoRentPrcKorMax =  exports.formatMoney(hoPrc.rentPriceMax, MONEY_FORMAT_TYPE.TAX);
            rObj.leftHoRentPrcMin = hoPrc.rentPriceMin;
            rObj.leftHoRentPrcKorMin =  exports.formatMoney(hoPrc.rentPriceMin, MONEY_FORMAT_TYPE.TAX);

            if(hoPrc.leasePricePerSpaceAVG == userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = 0;
                rObj.rightPerSpacePrcKor = '동일';
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가와 동일합니다.`;
            }else if(hoPrc.leasePricePerSpaceAVG < userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = userPrc.leasePricePerSpace - hoPrc.leasePricePerSpaceAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'평균 평당가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePricePerSpaceAVG > userPrc.leasePricePerSpace){
                rObj.rightPerSpacePrc = userPrc.leasePricePerSpace - hoPrc.leasePricePerSpaceAVG;
                rObj.rightPerSpacePrcKor = exports.formatMoney(rObj.rightPerSpacePrc, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightPerSpacePrcInfo = `${emdNm}에 위치한 ${typeName} 평균 평당가보다 저렴합니다.`;
            }

            //호가 최대가
            if(hoPrc.leasePriceMax == userPrc.leasePrice){
                rObj.rightHoPrcMax = 0;
                rObj.rightHoPrcKorMax = '동일';
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 보증금 호가 최대가와 동일합니다.`;
            }else if(hoPrc.leasePriceMax < userPrc.leasePrice){
                rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 보증금 호가 최대가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'보증금 호가 최대가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePriceMax > userPrc.leasePrice){
                rObj.rightHoPrcMax = userPrc.leasePrice - hoPrc.leasePriceMax;
                rObj.rightHoPrcKorMax = exports.formatMoney(rObj.rightHoPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMax = `${emdNm}에 위치한 ${typeName} 보증금 호가 최대가보다 저렴합니다.`;
            }

            //호가 최저가
            if(hoPrc.leasePriceMin == userPrc.leasePrice){
                rObj.rightHoPrcMin = 0;
                rObj.rightHoPrcKorMin = '동일';
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 보증금 호가 최저가와 동일합니다.`;
            }else if(hoPrc.leasePriceMin < userPrc.leasePrice){
                rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 보증금 호가 최저가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'보증금 호가 최저가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.leasePriceMin > userPrc.leasePrice){
                rObj.rightHoPrcMin = userPrc.leasePrice - hoPrc.leasePriceMin;
                rObj.rightHoPrcKorMin = exports.formatMoney(rObj.rightHoPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoInfoMin = `${emdNm}에 위치한 ${typeName} 보증금 호가 최저가보다 저렴합니다.`;
            }

            //월세 호가 최대가
            if(hoPrc.rentPriceMax == userPrc.rentPrice){
                rObj.rightHoRentPrcMax = 0;
                rObj.rightHoRentPrcKorMax = '동일';
                rObj.rightHoRentInfoMax = `${emdNm}에 위치한 ${typeName} 월세 호가 최대가와 동일합니다.`;
            }else if(hoPrc.rentPriceMax < userPrc.rentPrice){
                rObj.rightHoRentPrcMax = userPrc.rentPrice - hoPrc.rentPriceMax;
                rObj.rightHoRentPrcKorMax = exports.formatMoney(rObj.rightHoRentPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoRentInfoMax = `${emdNm}에 위치한 ${typeName} 월세 호가 최대가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'월세 호가 최대가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.rentPriceMax > userPrc.rentPrice){
                rObj.rightHoRentPrcMax = userPrc.rentPrice - hoPrc.rentPriceMax;
                rObj.rightHoRentPrcKorMax = exports.formatMoney(rObj.rightHoRentPrcMax, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoRentInfoMax = `${emdNm}에 위치한 ${typeName} 월세 호가 최대가보다 저렴합니다.`;
            }

            //월세 호가 최저가
            if(hoPrc.rentPriceMin == userPrc.rentPrice){
                rObj.rightHoRentPrcMin = 0;
                rObj.rightHoRentPrcKorMin = '동일';
                rObj.rightHoRentInfoMin = `${emdNm}에 위치한 ${typeName} 월세 호가 최저가와 동일합니다.`;
            }else if(hoPrc.rentPriceMin < userPrc.rentPrice){
                rObj.rightHoRentPrcMin = userPrc.rentPrice - hoPrc.rentPriceMin;
                rObj.rightHoRentPrcKorMin = exports.formatMoney(rObj.rightHoRentPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoRentInfoMin = `${emdNm}에 위치한 ${typeName} 월세 호가 최저가보다 비쌉니다.`;
                rObj.scoreInfo.push({rank:1, info:'월세 호가 최저가 보다 높은 금액입니다.'});
                rObj.score += 5;
            }else if(hoPrc.rentPriceMin > userPrc.rentPrice){
                rObj.rightHoRentPrcMin = userPrc.rentPrice - hoPrc.rentPriceMin;
                rObj.rightHoRentPrcKorMin = exports.formatMoney(rObj.rightHoRentPrcMin, MONEY_FORMAT_TYPE.TAX2);
                rObj.rightHoRentInfoMin = `${emdNm}에 위치한 ${typeName} 월세 호가 최저가보다 저렴합니다.`;
            }
        }
    }

    return rObj;
};

exports.getReport7 = async function(cortarNo, realEstateTypeCode, supplyAreaDouble, itemType) {
    const now = new Date();   
    let hoRegAvgPrcList = [
        {
            year: now.getFullYear(), 
            a1Avg: null, 
            b1Avg: null, 
            b2DAvg: null,   //보증금
            b2RAvg: null,   //월세
            a1AvgKor: '현재 실거래가 없음',
            b1AvgKor: '현재 실거래가 없음',
            b2DAvgKor: '현재 실거래가 없음',
            b2RAvgKor: '현재 실거래가 없음',
        },
        {
            year: now.getFullYear()-1, 
            a1Avg: null, 
            b1Avg: null, 
            b2DAvg: null,   //보증금
            b2RAvg: null,   //월세
            a1AvgKor: '현재 실거래가 없음',
            b1AvgKor: '현재 실거래가 없음',
            b2DAvgKor: '현재 실거래가 없음',
            b2RAvgKor: '현재 실거래가 없음',
        },
        {
            year: now.getFullYear()-2, 
            a1Avg: null, 
            b1Avg: null, 
            b2DAvg: null,   //보증금
            b2RAvg: null,   //월세
            a1AvgKor: '현재 실거래가 없음',
            b1AvgKor: '현재 실거래가 없음',
            b2DAvgKor: '현재 실거래가 없음',
            b2RAvgKor: '현재 실거래가 없음',
        },
    ];

    const tradeType = ['A1','B1','B2'];

    for(let ty=0;ty<tradeType.length;ty++){
        let hoRegAvgPrcList_ = [];
        if(itemType == 'APT' || itemType == 'OPST'){
            hoRegAvgPrcList_ = await exports.DBCall(`CALL SP_U_RESULT_REPORT_AVG_REGION_${tradeType[ty]}_PRC(?,?,?,?,?,?)`,[
                cortarNo,
                realEstateTypeCode,
                supplyAreaDouble,
                now.getFullYear(),
                now.getFullYear()-1,
                now.getFullYear()-2
            ]);
        }else{
            hoRegAvgPrcList_ = await exports.DBCall(`CALL SP_U_RESULT_REPORT_AVG_REGION_A_${tradeType[ty]}_PRC(?,?,?,?,?)`,[
                cortarNo,
                supplyAreaDouble,
                now.getFullYear(),
                now.getFullYear()-1,
                now.getFullYear()-2
            ]);
        }

        for(let i=0;i<hoRegAvgPrcList.length;i++){
            for(let x=0;x<hoRegAvgPrcList_.length;x++){
                if(hoRegAvgPrcList[i].year == hoRegAvgPrcList_[x].year){
                    if(tradeType[ty] == 'A1'){
                        hoRegAvgPrcList[i].a1Avg = hoRegAvgPrcList_[x].a1Avg;
                        hoRegAvgPrcList[i].a1AvgKor = exports.formatMoney(hoRegAvgPrcList_[x].a1Avg, MONEY_FORMAT_TYPE.TAX);
                    }else if(tradeType[ty] == 'B1'){
                        hoRegAvgPrcList[i].b1Avg = hoRegAvgPrcList_[x].b1Avg;
                        hoRegAvgPrcList[i].b1AvgKor = exports.formatMoney(hoRegAvgPrcList_[x].b1Avg, MONEY_FORMAT_TYPE.TAX);
                    }else if(tradeType[ty] == 'B2'){
                        hoRegAvgPrcList[i].b2DAvg = hoRegAvgPrcList_[x].b2DAvg;
                        hoRegAvgPrcList[i].b2RAvg = hoRegAvgPrcList_[x].b2RAvg;
                        hoRegAvgPrcList[i].b2DAvgKor = exports.formatMoney(hoRegAvgPrcList_[x].b2DAvg, MONEY_FORMAT_TYPE.LITTLE);
                        hoRegAvgPrcList[i].b2RAvgKor = exports.formatMoney(hoRegAvgPrcList_[x].b2RAvg, MONEY_FORMAT_TYPE.LITTLE);
                    }
                }
            }
        }
    }
    return hoRegAvgPrcList;
};

exports.getReport8 = async function(tradeType, userPrc, cortarNo, realEstateTypeCode, supplyAreaDouble, itemType) {
    let companyAvgPrcObj = 
        {
            'true':{
                a1Avg: null, 
                b1Avg: null, 
                b2Avg: null,   
                a1AvgKor: '현재 실거래가 없음',
                b1AvgKor: '현재 실거래가 없음',
                b2AvgKor: '현재 실거래가 없음',
            },
            'false':{
                a1Avg: null, 
                b1Avg: null, 
                b2Avg: null,   
                a1AvgKor: '현재 실거래가 없음',
                b1AvgKor: '현재 실거래가 없음',
                b2AvgKor: '현재 실거래가 없음',
            },

            pricePer: '5%',
            truePer: '5%',
            falsePer: '5%',
        }

    if(itemType == 'DDDGG' || itemType == 'JT'){
        return companyAvgPrcObj;
    }

    const companyAvgPrcList_ = await exports.DBCall(`CALL SP_U_RESULT_REPORT_COMPANY_${tradeType}_PRC(?,?,?)`,[
        cortarNo,
        realEstateTypeCode,
        supplyAreaDouble
    ]);
    const companyAvgPrcObj_ = {
        true: companyAvgPrcList_[0],
        false: companyAvgPrcList_[1],
    }

    const price = userPrc.dealPrice ? userPrc.dealPrice : userPrc.leasePrice;
    let comPrcMax = price;
    if(tradeType == 'A1'){
        companyAvgPrcObj.true.a1Avg = companyAvgPrcObj_.true.a1Avg;
        companyAvgPrcObj.true.a1AvgKor = companyAvgPrcObj.true.a1Avg ? '평균 매매가 ' + exports.formatMoney(companyAvgPrcObj.true.a1Avg, MONEY_FORMAT_TYPE.TAX) : '현재 실거래가 없음';

        companyAvgPrcObj.false.a1Avg = companyAvgPrcObj_.false.a1Avg;
        companyAvgPrcObj.false.a1AvgKor = companyAvgPrcObj.false.a1Avg ? '평균 매매가 ' + exports.formatMoney(companyAvgPrcObj.false.a1Avg, MONEY_FORMAT_TYPE.TAX) : '현재 실거래가 없음';

        if(comPrcMax < companyAvgPrcObj.true.a1Avg){
            comPrcMax = companyAvgPrcObj.true.a1Avg;
        }
        if(comPrcMax < companyAvgPrcObj.false.a1Avg){
            comPrcMax = companyAvgPrcObj.false.a1Avg;
        }

        comPrcMax += (comPrcMax * 0.4);
        companyAvgPrcObj.pricePer =  Math.floor((price / comPrcMax) * 100) + '%'
        companyAvgPrcObj.truePer = companyAvgPrcObj.true.a1Avg ? Math.floor((companyAvgPrcObj.true.a1Avg / comPrcMax) * 100) + '%' : '2%';
        companyAvgPrcObj.falsePer = companyAvgPrcObj.false.a1Avg ? Math.floor((companyAvgPrcObj.false.a1Avg / comPrcMax) * 100) + '%' : '2%';
    }else if(tradeType == 'B1'){
        companyAvgPrcObj.true.b1Avg = companyAvgPrcObj_.true.b1Avg;
        companyAvgPrcObj.true.b1AvgKor = companyAvgPrcObj.true.b1Avg ? '평균 전세가 ' + exports.formatMoney(companyAvgPrcObj.true.b1Avg, MONEY_FORMAT_TYPE.TAX) : '현재 실거래가 없음';

        companyAvgPrcObj.false.b1Avg = companyAvgPrcObj_.false.b1Avg;
        companyAvgPrcObj.false.b1AvgKor = companyAvgPrcObj.false.b1Avg ? '평균 전세가 ' + exports.formatMoney(companyAvgPrcObj.false.b1Avg, MONEY_FORMAT_TYPE.TAX) : '현재 실거래가 없음';

        if(comPrcMax < companyAvgPrcObj.true.b1Avg){
            comPrcMax = companyAvgPrcObj.true.b1Avg;
        }
        if(comPrcMax < companyAvgPrcObj.false.b1Avg){
            comPrcMax = companyAvgPrcObj.false.b1Avg;
        }

        comPrcMax += (comPrcMax * 0.4);
        companyAvgPrcObj.pricePer =  Math.floor((price / comPrcMax) * 100) + '%'
        companyAvgPrcObj.truePer = companyAvgPrcObj.true.b1Avg ? Math.floor((companyAvgPrcObj.true.b1Avg / comPrcMax) * 100) + '%' : '2%';
        companyAvgPrcObj.falsePer = companyAvgPrcObj.false.b1Avg ? Math.floor((companyAvgPrcObj.false.b1Avg / comPrcMax) * 100) + '%' : '2%';
    }else if(tradeType == 'B2'){
        companyAvgPrcObj.true.b1Avg = companyAvgPrcObj_.true.b1Avg;
        companyAvgPrcObj.false.b1Avg = companyAvgPrcObj_.false.b1Avg;
        companyAvgPrcObj.true.b2Avg = companyAvgPrcObj_.true.b2Avg;
        companyAvgPrcObj.false.b2Avg = companyAvgPrcObj_.false.b2Avg;


        companyAvgPrcObj.true.b2AvgKor = companyAvgPrcObj.true.b2Avg ? 
            exports.formatMoney(companyAvgPrcObj.true.b1Avg, MONEY_FORMAT_TYPE.LITTLE) + 
            '/' +
            exports.formatMoney(companyAvgPrcObj.true.b2Avg, MONEY_FORMAT_TYPE.LITTLE) : '현재 실거래가 없음';

        companyAvgPrcObj.false.b2AvgKor = companyAvgPrcObj.false.b2Avg ? 
            exports.formatMoney(companyAvgPrcObj.false.b1Avg, MONEY_FORMAT_TYPE.LITTLE) + 
            '/' +
            exports.formatMoney(companyAvgPrcObj.false.b2Avg, MONEY_FORMAT_TYPE.LITTLE) : '현재 실거래가 없음';

        if(comPrcMax < companyAvgPrcObj.true.b1Avg){
            comPrcMax = companyAvgPrcObj.true.b1Avg;
        }
        if(comPrcMax < companyAvgPrcObj.false.b1Avg){
            comPrcMax = companyAvgPrcObj.false.b1Avg;
        }

        comPrcMax += (comPrcMax * 0.4);
        companyAvgPrcObj.pricePer =  Math.floor((price / comPrcMax) * 100) + '%'
        companyAvgPrcObj.truePer = companyAvgPrcObj.true.b1Avg ? Math.floor((companyAvgPrcObj.true.b1Avg / comPrcMax) * 100) + '%' : '2%';
        companyAvgPrcObj.falsePer = companyAvgPrcObj.false.b1Avg ? Math.floor((companyAvgPrcObj.false.b1Avg / comPrcMax) * 100) + '%' : '2%';
    }

    return companyAvgPrcObj;
};

exports.getReport9 = async function(userPrc, a1RealList, b1RealList, hoAvgPrc) {
    let b1MoreInfo = {
        realList: {
            A1: {
                price: null,
                tradeYearMonth: null,
            },
            B1: {
                price: null,
                tradeYearMonth: null,
            },
            bePrice: null,
        },
        hoAvgPrc: {
            dealPriceAVG: null,
            leasePriceAVG: null,
            rentDepositPriceAVG: null,
        },
        scoreInfo: [],
        score: 0,
    };


    if(!hoAvgPrc.dealPriceAVG){
        b1MoreInfo.hoAvgPrc.dealPriceAVG = '현재 시세 없음';
    }else if(hoAvgPrc.dealPriceAVG == userPrc){
    }else if(hoAvgPrc.dealPriceAVG < userPrc){
        b1MoreInfo.hoAvgPrc.dealPriceAVG = exports.formatMoney(hoAvgPrc.dealPriceAVG, MONEY_FORMAT_TYPE.TAX);
        b1MoreInfo.scoreInfo.push({rank:1, info:'매매가 시세 평균 보다 높은 금액입니다.'});
        b1MoreInfo.score += 5;
    }else if(hoAvgPrc.dealPriceAVG > userPrc){
        b1MoreInfo.hoAvgPrc.dealPriceAVG = exports.formatMoney(hoAvgPrc.dealPriceAVG, MONEY_FORMAT_TYPE.TAX);
    }

    if(!hoAvgPrc.leasePriceAVG){
        b1MoreInfo.hoAvgPrc.leasePriceAVG = '현재 시세 없음';
    }else if(hoAvgPrc.leasePriceAVG == userPrc){
    }else if(hoAvgPrc.leasePriceAVG < userPrc){
        b1MoreInfo.hoAvgPrc.leasePriceAVG = exports.formatMoney(hoAvgPrc.leasePriceAVG, MONEY_FORMAT_TYPE.TAX);
        b1MoreInfo.scoreInfo.push({rank:1, info:'전세가 시세 평균 보다 높은 금액입니다.'});
        b1MoreInfo.score += 5;
    }else if(hoAvgPrc.leasePriceAVG > userPrc){
        b1MoreInfo.hoAvgPrc.leasePriceAVG = exports.formatMoney(hoAvgPrc.leasePriceAVG, MONEY_FORMAT_TYPE.TAX);
    }

    if(!hoAvgPrc.rentDepositPriceAVG){
        b1MoreInfo.hoAvgPrc.rentDepositPriceAVG = '현재 시세 없음';
    }else if(hoAvgPrc.rentDepositPriceAVG == userPrc){
    }else if(hoAvgPrc.rentDepositPriceAVG < userPrc){
        b1MoreInfo.hoAvgPrc.rentDepositPriceAVG = exports.formatMoney(hoAvgPrc.rentDepositPriceAVG, MONEY_FORMAT_TYPE.TAX);
        b1MoreInfo.scoreInfo.push({rank:1, info:'월세가 시세 평균 보다 높은 금액입니다.'});
        b1MoreInfo.score += 5;
    }else if(hoAvgPrc.rentDepositPriceAVG > userPrc){
        b1MoreInfo.hoAvgPrc.rentDepositPriceAVG = exports.formatMoney(hoAvgPrc.rentDepositPriceAVG, MONEY_FORMAT_TYPE.TAX);
    }




    if(a1RealList.length){
        b1MoreInfo.realList.A1.price = a1RealList[0].dealPrice;
        b1MoreInfo.realList.A1.tradeYearMonth = a1RealList[0].tradeYearMonth;
    }

    if(b1RealList.length){
        b1MoreInfo.realList.B1.price = b1RealList[0].leasePrice;
        b1MoreInfo.realList.B1.tradeYearMonth = b1RealList[0].tradeYearMonth;
    }

    if(b1MoreInfo.realList.A1.price){
        b1MoreInfo.realList.bePrice = exports.formatMoney(Math.floor(b1MoreInfo.realList.A1.price*0.8), MONEY_FORMAT_TYPE.TAX);

        if(b1MoreInfo.realList.A1.price*0.8 < userPrc){
            b1MoreInfo.scoreInfo.push({rank:1, info:'적정 전세 금액이 아니에요.'});
            b1MoreInfo.score += 5;
        }
    }

    return b1MoreInfo;
};


exports.getAddrLink = async function(addr) {
    let form = new FormData();
    form.append('confmKey', process.env.ADDR_LINK);
    form.append('resultType','json');
    form.append('currentPage',1);
    form.append('countPerPage',10);
    form.append('keyword',addr);

    const re = await axios.post('https://business.juso.go.kr/addrlink/addrLinkApi.do', form);

    let itemList = [];
    try{
        itemList = re.data.results.juso;
        for(let i=0;i<itemList.length;i++){
            const mtYn = itemList[i].mtYn == '0' ? '1' : '2';
            itemList[i].pnu = itemList[i].admCd + mtYn + itemList[i].lnbrMnnm.padStart(4,'0') + itemList[i].lnbrSlno.padStart(4,'0');
        }
    }catch(e){

    }

    return itemList;
};

exports.getAddrDetail = async function(tg) {
    let form = new FormData();
    form.append('confmKey', process.env.ADDR_DETAIL_LINK);
    form.append('resultType','json');
    form.append('admCd',tg.admCd);
    form.append('rnMgtSn',tg.rnMgtSn);
    form.append('udrtYn','0');
    form.append('buldMnnm',tg.buldMnnm);
    form.append('buldSlno',tg.buldSlno);

    const dongList_ = await axios.post('https://business.juso.go.kr/addrlink/addrDetailApi.do', form);
    const dongList = dongList_.data.results.juso;

    let hoList = [];
    for(let i=0;i<dongList.length;i++){
        form = new FormData();
        form.append('confmKey', process.env.ADDR_DETAIL_LINK);
        form.append('resultType','json');
        form.append('admCd',tg.admCd);
        form.append('rnMgtSn',tg.rnMgtSn);
        form.append('udrtYn','0');
        form.append('buldMnnm',tg.buldMnnm);
        form.append('buldSlno',tg.buldSlno);
        form.append('searchType','floorho');   //동층호 검색유형(dong, floorho)
        form.append('dongNm',dongList[i].dongNm);   //동 (층호 검색 시 입력)
        
        const ho = await axios.post('https://business.juso.go.kr/addrlink/addrDetailApi.do', form);

        hoList = hoList.concat(ho.data.results.juso);
    }

    return hoList;
};


exports.getAddrDetail1 = async function(tg) {
    let form = new FormData();
    form.append('confmKey', process.env.ADDR_DETAIL_LINK);
    form.append('resultType','json');
    form.append('admCd',tg.admCd);
    form.append('rnMgtSn',tg.rnMgtSn);
    form.append('udrtYn','0');
    form.append('buldMnnm',tg.buldMnnm);
    form.append('buldSlno',tg.buldSlno);

    const dongList_ = await axios.post('https://business.juso.go.kr/addrlink/addrDetailApi.do', form);

    if(dongList_?.data?.results?.common?.errorCode != '0'){
        return false;
    }

    const dongList = dongList_.data.results.juso;


    return dongList;
};

exports.getAddrDetail2 = async function(tg) {
    let hoList = [];

    form = new FormData();
    form.append('confmKey', process.env.ADDR_DETAIL_LINK);
    form.append('resultType','json');
    form.append('admCd',tg.admCd);
    form.append('rnMgtSn',tg.rnMgtSn);
    form.append('udrtYn','0');
    form.append('buldMnnm',tg.buldMnnm);
    form.append('buldSlno',tg.buldSlno);
    form.append('searchType','floorho');   //동층호 검색유형(dong, floorho)
    form.append('dongNm',tg.dongNm);   //동 (층호 검색 시 입력)
    
    const ho = await axios.post('https://business.juso.go.kr/addrlink/addrDetailApi.do', form);

    hoList = hoList.concat(ho.data.results.juso);

    return hoList;
};


exports.regGetItems = function(tg, mode){
    const isInfo = {
        등기목적:null,
        접수:{
            일시:'',
            호:'',
        },
        등기원인:{
            일시:'',
            원인:'',
        },
        설정자:'',
        비고:'-',
        기타사항:null,
        삭제여부:false,
        설명:null,
        갑을: mode,
        감점설명: null,
        점수:0,
    };
    
    if(tg.등기목적.includes('&')){
        isInfo.삭제여부 = true;
    }else{
        isInfo.점수 = 5;
    }
    
    tg.등기목적 = tg.등기목적.replace(/&/g, '');
    tg.접수 = tg.접수.replace(/&/g, '');
    tg.등기원인 = tg.등기원인.replace(/&/g, '');
    tg.권리자_및_기타사항 = tg.권리자_및_기타사항.replace(/&/g, '');

    isInfo.등기목적 = tg.등기목적 ? tg.등기목적.split('\n')[1] : '';
    isInfo.접수.일시 = tg.접수 ? tg.접수.split('\n')[1] : '';
    isInfo.접수.호 = tg.접수 ? tg.접수.split('\n')[2] : '';
    isInfo.등기원인.일시 = tg.등기원인 ? tg.등기원인.split('\n')[1] : '';
    
    let _등기원인 = tg.등기원인 ? tg.등기원인.split('\n') : '';
    if(_등기원인){
        _등기원인.splice(0,2);
        isInfo.등기원인.원인 = _등기원인.join(' ');
    }
    
    if(isInfo.등기목적 == '근저당권설정'){
        isInfo.기타사항 = {
                채무자:'',
                근저당권자:'',
                채권최고액:0,
            };
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('채무자')){
                isInfo.기타사항.채무자 = isItem[x].replace('채무자','').trim();
            }
            else if(isItem[x].includes('채권최고액')){
                const prc = isItem[x].substring(isItem[x].indexOf('금')+1,isItem[x].indexOf('원'))
                isInfo.기타사항.채권최고액 = Number(prc.replace(/,/gi, ''))/10000;
            }
            else if(isItem[x].includes('근저당권자')){
                isInfo.기타사항.근저당권자 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = '근저당권이 설정되었어요. 매매 계약 하시기 전, 근저당권 말소 조건으로 계약하시기를 추천드립니다.';
        isInfo.설정자 = isInfo.기타사항.근저당권자;

        return isInfo;
    }
    else if(isInfo.등기목적 == '소유권이전'){
        isInfo.기타사항 = {
            소유자:'',
            거래가액:0,
        };
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('소유자')){
                isInfo.기타사항.소유자 = isItem[x].split('  ')[1];
            }
            else if(isItem[x].includes('거래가액')){
                const prc = isItem[x].substring(isItem[x].indexOf('금')+1,isItem[x].indexOf('원'))
                isInfo.기타사항.거래가액 = Number(prc.replace(/,/gi, ''))/10000;
            }
        }

        isInfo.설명 = `현 소유자는 ${isInfo.기타사항.소유자}으로, ${isInfo.등기원인.일시}로 소유권이 이전되었어요.`;
        isInfo.설정자 = isInfo.기타사항.소유자;
        // isInfo.점수 = 0;

        return isInfo;
    }
    else if(isInfo.등기목적 == '소유권보존'){
        isInfo.기타사항 = {
            소유자:'',
        };
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('소유자')){
                isInfo.기타사항.소유자 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = `현 소유자는 ${isInfo.기타사항.소유자}으로, ${isInfo.등기원인.일시}로 소유권이 보존되었어요.`;
        isInfo.설정자 = isInfo.기타사항.소유자;
        // isInfo.점수 = 0;

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권설정'){
        isInfo.설명 = `전세권이 설정되어 있습니다. 해당 등기의 말소 또는 승계여부를 확인하세요.`;
        isInfo.비고 = '-';
        isInfo.감점설명 = '전세권이 설정되어 있습니다.';

        return isInfo;
    }

    else if(isInfo.등기목적 == '가압류경정'){
        isInfo.설명 = `가압류경정등기가 설정되어 있습니다. 실체관계 사이의 불일치가 발생하여 경정된 등기로 법원이 장래 강제집행을 할 목적으로 재산을 임시로 확보한 상태이므로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.비고 = '-';
        isInfo.감점설명 = '가압류경정이 설정되어 있습니다.';

        return isInfo;
    }

    else if(isInfo.등기목적 == '가압류변경'){
        isInfo.설명 = `가압류변경등기가 설정되어 있습니다. 실체관계 사이의 불일치가 발생하여 변경된 등기로 법원이 장래 강제집행을 할 목적으로 재산을 임시로 확보한 상태이므로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가압류변경이 설정되어 있습니다.';

        return isInfo;
    }

    else if(isInfo.등기목적 == '가압류'){
        isInfo.설명 = `가압류등기가 설정되어 있습니다. 법원이 장래 강제집행을 할 목적으로 재산을 임시로 확보한 상태이므로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가압류가 설정되어 있습니다.';

        return isInfo;
    }
    
    else if(isInfo.등기목적 == '가처분경정'){
        isInfo.설명 = `가처분경정등기가 설정되어 있습니다. 다른 사람에게 처분하지 못하도록 가처분이 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가처분경정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '가처분변경'){
        isInfo.설명 = `가처분변경등기가 설정되어 있습니다. 다른 사람에게 처분하지 못하도록 가처분이 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가처분변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '가처분'){
        isInfo.설명 = `가처분등기가 설정되어 있습니다. 다른 사람에게 처분하지 못하도록 가처분이 설정되어 있습니다. 해당 등기의 말소조건으로  계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가처분이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '강제경매개시결정'){
        isInfo.설명 = `강제경매개시결정등기가 설정되어 있습니다. 채권자가 경매를 진행시켜 법원이 경매개시결정을 한 상태이므로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '강제경매개시결정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '가등기'){
        isInfo.설명 = `가등기가 설정되어 있습니다. 본등기시 가등기 순위에 의하여 등기 순위가 변동될 수 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '경매개시결정등기'){
        isInfo.설명 = `경매개시결정등기가 설정되어 있습니다. 채권자가 경매를 진행시켜 법원이 경매개시결정을 한 상태이므로 주의하세요. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '경매개시결정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '소유권일부이전'){
        isInfo.설명 = `소유권일부이전등기가 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '소유권일부이전이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '금지사항등기'){
        isInfo.설명 = `금지사항등기가 설정되어 있습니다. 등기부등본을 통해 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '금지사항등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '소유권이전청구권가등기'){
        isInfo.설명 = `소유권이전청구권가등기가설정되어 있습니다. 소유권이전등기를 하기 위하여 순위를 보전하기 하기 위한 등기로 계약 시 순위를 확인하세요. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '소유권이전청구권가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '승역지지역권'){
        isInfo.설명 = ` 승역지지역권등기가 설정되어 있습니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '승역지지역권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '신탁'){
        isInfo.기타사항 = {
            신탁원부:'',
        };
        isInfo.접수 = null;
        isInfo.등기원인 = null;
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('신탁원부')){
                isInfo.기타사항.신탁원부 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = `신탁등기가 설정되어 있습니다.  신탁원부를 발급하여 계약 내용을 확인하세요. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '신탁등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '신탁가등기'){
        isInfo.설명 = `신탁등기가 설정되어 있습니다.  신탁원부를 발급하여 계약 내용을 확인하세요. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '신탁가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '압류'){
        isInfo.기타사항 = {
            권리자:'',
        };
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('권리자')){
                isInfo.기타사항.권리자 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = `압류등기가 설정되어 있습니다. 국세 등의 체납으로 인해 체납자의 부동산을 체납처분하려는 압류에 대한 등기로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.설정자 = isInfo.기타사항.권리자;
        isInfo.감점설명 = '압류가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '요역지지역권'){
        isInfo.설명 = `요역지지역권등기가 설정되어 있습니다. 일정한 목적을 위하여 타인의 토지를 이용하는 물권입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '요역지지역권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '임의경매개시결정'){
        isInfo.기타사항 = {
            채권자:'',
        };
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('채권자')){
                isInfo.기타사항.채권자 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = `임의경매개시결정등기가 설정되어 있습니다. 저당권과 같은 담보권 실행을 위해 법원이 경매개시결정을 촉탁하는 등기로 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '임의경매개시결정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '저당권설정'){
        isInfo.설명 = `저당권이 설정되어 있습니다. 매매 계약 하시기 전, 저당권 말소 조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '저당권설정이 되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '저당권부질권'){
        isInfo.설명 = `저당권부질권이 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '저당권부질권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권부질권'){
        isInfo.설명 = `근저당권부질권이 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권부질권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권부채권가압류'){
        isInfo.설명 = `전세권부채권가압류등기가 설정되어 있습니다. 저당권의 목적물인 전세권에 갈음하여 존속하는 것으로 보아 전세금반환채권을 압류하고 채권자가 변제에 충당할 수 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '전세권부채권가압류가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권가압류'){
        isInfo.설명 = `전세권가압류등기가 설정되어 있습니다. 전세권이 존속하는 동안 전세권 자체를 가압류하여 채권압류 및 추심명령을 할 수 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '전세권가압류가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권저당권설정'){
        isInfo.설명 = ` 전세권저당권등기가 설정되어 있습니다. 전세권을 저당권의 목적으로 한 등기입니다. 저당권자의 동의 없이 전세권을 소멸하지 못합니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '전세권저당권설정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권전전세'){
        isInfo.설명 = ` 전세권전전세등기가 설정되어 있습니다. 전세권자의 전세권을 기초로 하여 그 전세권을 목적으로 하는 전세권이 다시 설정되었습니다. 해당 등기의 말소 또는 승계여부를 확인하세요.`;
        isInfo.감점설명 = '전세권전전세이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '주택임차권'){
        isInfo.설명 = `주택임차권등기가 설정되어 있습니다. 집주인이 보증금을 돌려주지 않아 임차권등기명령이 설정되어 있습니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '주택임차권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '전세권변경'){
        isInfo.설명 = `전세권변경등기가 설정되어 있습니다. 실체관계 사이의 불일치가 후발적으로 생겨나 변경되었습니다. 해당 등기의 말소 도는 승계여부를 확인하세요.`;
        return isInfo;
    }
    else if(isInfo.등기목적 == '구분지상권설정'){
        isInfo.설명 = `구분지상권등기가 설정되어 있습니다. 타인 토지의 일정한 범위를 정하여 구분층을 사용하는 등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '구분지상권설정이 되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '구분지상권변경'){
        isInfo.설명 = `구분지상권변경등기가 설정되어 있습니다. 타인 토지의 일정한 범위를 정하여 구분층을 사용하는 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '구분지상권변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권이전담보가등기'){
        isInfo.설명 = `지상권이전담보가등기가 설정되어 있습니다. 채권담보를 목적으로 동시에 채무자의 채무불이행이 있는 경우에 발생하게 될 장래의 지상권이전청구권을 보전하기 위한 가등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지상권이전담보가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권이전청구권가등기'){
        isInfo.설명 = `지상권이전청구권가등기가 설정되어 있습니다. 지상권이전등기할 요건을 완비하지 못할 경우, 완비될 때에 행하여질 지상권이전등기를 위하여 순위를 보전하기 위한 등기입니다. 본 계약시 순위가 변동될 수 있으니 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지상권이전청구권가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권이전'){
        isInfo.설명 = `지상권이전등기가 설정되어 있습니다. 지상권등기상의 권리를 제3자에게 이전하는 등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지상권이전이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권변경청구권가등기'){
        isInfo.설명 = `지상권변경청구권가등기가 설정되어 있습니다.  지상권변경등기할 요건을 완비하지 못할 경우, 완비될 때에 행하여질 지상권이전등기를 위하여 순위를 보전하기 위한 등기입니다. 본 계약시 순위가 변동될 수 있으니 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지상권변경청구권가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권변경'){
        isInfo.설명 = `지상권변경등기가 설정되어 있습니다. 타인의 토지에 건물, 수목을 소유하기 위해 토지를 사용하는 물권으로 토지의 전면적인 지배권인 소유권을 제한하여 지배하는 등기입니다. 토지등기부등본을 같이 확인하세요.`;
        isInfo.감점설명 = '지상권변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지상권설정'){
        isInfo.설명 = `지상권설정등기가 설정되어 있습니다.  타인의 토지에 건물, 수목을 소유하기 위해 토지를 사용하는 물권으로 토지의 전면적인 지배권인 소유권을 제한하여 지배하는 등기입니다. 토지등기부등본을 같이 확인하세요.`;
        isInfo.감점설명 = '지상권설정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지역권변경'){
        isInfo.설명 = `지역권변경등기가 설정되어 있습니다. 승역지에 등기한 지역권 등기와 실체관계 사이의 불일치가 후발적으로 생겨나 변경된 내용의 등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지역권변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '지역권설정'){
        isInfo.설명 = `지역권등기가 설정되어 있습니다. 일정한 목적을 위하여 타인의 토지를 이용하는 물권입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '지역권설정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '채권담보권'){
        isInfo.설명 = `채권담보권이 설정되어 있습니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '채권담보권이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권이전'){
        isInfo.설명 = `근저당권이전등기가 설정되어 있습니다. 근저당권등기상의 권리를 제3자에게 이전하는 등기입니다. 해당 등기의 말소 또는 승계여부를 확인하세요.`;
        isInfo.감점설명 = '근저당권이전이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권이전청구권가등기'){
        isInfo.설명 = `근저당권이전청구권가등기가 설정되어 있습니다. 장래에 요건이 행하여질 근저당권이전등기를 위하여 순위를 보전하는 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권이전청구권가등기가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권가등기경정'){
        isInfo.설명 = `근저당권가등기경정등기가 설정되어 있습니다. 실체관계 사이 불일치가 원시적인 착오 또는 유루로 인해 시정된 등기입니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권가등기경정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권가등기변경'){
        isInfo.설명 = `근저당권가등기변경등기가 설정되어 있습니다. 실체관계 사이 불일치가 후발적으로 발생하여 변경된 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권가등기변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권경정'){
        isInfo.설명 = `근저당권경정등기가 설정되어 있습니다. 실체관계 사이 불일치가 원시적인 착오 유루로 인해 시정된 등기입니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권경정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권공동담보경정'){
        isInfo.설명 = `근저당권공동담보경정이 설정되어 있습니다. 실체관계 사이 불일치가 원시적인 착오 유루로 인해 시정된 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권공동담보경정이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권공동담보변경'){
        isInfo.설명 = `근저당권공동담보변경이 설정되어 있습니다. 실체관계 사이 불일치가 후발적으로 발생하여 변경된 등기입니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권공동담보변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권공동담보일부소멸'){
        isInfo.설명 = `근저당권공동담보일부소멸등기가 설정되어 있습니다. 채무의 담보로서 제공한 공동담보중 일부가 소멸되었습니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권공동담보일부소멸이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권담보추가'){
        isInfo.설명 = `근저당권담보추가등기가 설정되어 있습니다. 근저당권에 대해 동일채권을 담보하기위해 기존 근저당권에 다른 물건을 추가하여 등기가 설정되었습니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권담보추가가 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권담보회복'){
        isInfo.설명 = `근저당권담보회복등기가 설정되어 있습니다. 말소된 공동담보가 회복시킨 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권담보회복이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권회복'){
        isInfo.설명 = `근저당권회복등기가 설정되어 있습니다. 실체관계에 부합하는 근저당권등기가 부적법하게 소멸되어 이를 회복시킨 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권회복이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권일부이전'){
        isInfo.설명 = `근저당권일부이전등기가 설정되어 있습니다. 근저당권등기상의 권리의 일부를 제3자에게 이전한 등기입니다. 해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권일부이전이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '근저당권변경'){
        isInfo.설명 = ` 근저당권변경등기가 설정되어 있습니다. 실체관계 사이 불일치가 후발적으로 발생하여 변경된 등기입니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '근저당권변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '저당권변경'){
        isInfo.설명 = `저당권변경등기가 설정되어 있습니다. 실체관계 사이 불일치가 후발적으로 발생하여 변경된 등기입니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '저당권변경이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '공유자전원지분전부'){
        isInfo.기타사항 = {
            소유자:'',
        };
        isInfo.접수 = null;
        const isItem = tg.권리자_및_기타사항.split('\n');
        for(let x=0;x<isItem.length;x++){
            if(isItem[x].includes('소유자')){
                isInfo.기타사항.소유자 = isItem[x].split('  ')[1];
            }
        }

        isInfo.설명 = `공유자전원지분전부이전이 설정되어 있습니다.  해당 등기의 말소조건으로 계약하시기를 추천드립니다.`;
        isInfo.감점설명 = '공유자전원지분전부이전이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '환매특약'){
        isInfo.설명 = `환매특약등기가 설정되어 있습니다. 매도인이 매도한 물건을 대가를 지불하고 다시 매수하는 등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '환매특약이 설정되어 있습니다.';

        return isInfo;
    }
    else if(isInfo.등기목적 == '환매등기'){
        isInfo.설명 = `환매등기가 설정되어 있습니다. 매도인이 매도한 물건을 대가를 지불하고 다시 매수하는 등기입니다. 자세한 내용을 확인하세요.`;
        isInfo.감점설명 = '환매등기이 설정되어 있습니다.';
        
        return isInfo;
    }
    else{
        // console.log('너는누구냐 --- : ' + tg.등기목적);

        return false;
    }
}


exports.getHyphenPriceList = async function(addr, jibun, area, tradeType, price, itemType) {
    // console.log(area);
    // tradeType = 'A1';

    let param = {
        step: '01',
        srhThingSecd: null,
        sidoNm: addr.siNm,
        signguNm: addr.sggNm,
        emdNm: addr.emdNm,
        pageIndex: 1,
        rnMgtSn: null,
        buldMnnm: null,
    };

    // if(itemType == 'APT'){
    //     param.srhThingSecd = 'A';
    // }else if(itemType == 'ART'){
    //     param.srhThingSecd = 'B';
    // }else if(itemType == 'OPST'){
    //     param.srhThingSecd = 'C';
    // }

    let resultObj = {
        isDate: dayjs().format('YYYY.MM'),
        info: null,
        dateChart: [],
        dealChart: [],
        rentChart: [],
        score: 0,
        scoreInfo: [],
        itemList: [],
    };

    let curPage = 1;
    let totPage = 1;
    let tgItem = null;
    param.srhThingSecd = 'A';
    do{
        const re = await axios.post('https://api.hyphen.im/in0078000517', param, {
            headers: {
                'Content-Type': 'application/json', 
                'user-id': process.env.HYPHEN_USER_ID, 
                'Hkey': process.env.HYPHEN_HKEY, 
            },
        });

        if(re.data && re.data.common.errYn == 'Y' && !re.data.data.list?.length){
            break;
        }

        for(let i=0;i<re.data.data.list.length;i++){
            if(re.data.data.list[i].oldAddr.includes(jibun)){
                tgItem = re.data.data.list[i];
                break;
            }
        }
        
        curPage = re.data.data.curPage;
        totPage = re.data.data.totPage;
        param.pageIndex++;
    }while(curPage < totPage);

    param.pageIndex = 1;
    if(!tgItem){
        param.srhThingSecd = 'B';
        do{
            const re = await axios.post('https://api.hyphen.im/in0078000517', param, {
                headers: {
                    'Content-Type': 'application/json', 
                    'user-id': process.env.HYPHEN_USER_ID, 
                    'Hkey': process.env.HYPHEN_HKEY, 
                },
            });

            if(re.data && re.data.common.errYn == 'Y' && !re.data.data.list?.length){
                break;
            }

            for(let i=0;i<re.data.data.list.length;i++){
                if(re.data.data.list[i].oldAddr.includes(jibun)){
                    tgItem = re.data.data.list[i];
                    break;
                }
            }
            
            curPage = re.data.data.curPage;
            totPage = re.data.data.totPage;
            param.pageIndex++;
        }while(curPage < totPage);
    }

    param.pageIndex = 1;
    if(!tgItem){
        param.srhThingSecd = 'C';
        do{
            const re = await axios.post('https://api.hyphen.im/in0078000517', param, {
                headers: {
                    'Content-Type': 'application/json', 
                    'user-id': process.env.HYPHEN_USER_ID, 
                    'Hkey': process.env.HYPHEN_HKEY, 
                },
            });
    
            if(re.data && re.data.common.errYn == 'Y' && !re.data.data.list?.length){
                break;
            }

            for(let i=0;i<re.data.data.list.length;i++){
                if(re.data.data.list[i].oldAddr.includes(jibun)){
                    tgItem = re.data.data.list[i];
                    break;
                }
            }
            
            curPage = re.data.data.curPage;
            totPage = re.data.data.totPage;
            param.pageIndex++;
        }while(curPage < totPage);
    }

    if(!tgItem){
        return resultObj;
    }

    param.step = '02';
    param.pageIndex = 1;
    param.rnMgtSn = tgItem.rnMgtSn; 
    param.buldMnnm = tgItem.buldMnnm;


    const re2 = await axios.post('https://api.hyphen.im/in0078000517', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });

    if(re2.data && re2.data.common.errYn == 'Y'){
        return resultObj;
    }

    const dealList = re2.data.data.dealList;
    const rentList = re2.data.data.rentList;

    if(!dealList?.length && !rentList?.length){
        return resultObj;
    }

    // contractDt  20230926
    let dealList2 = [];
    let rentList2 = [];
    let mthList = [];

    for(let i=0;i<dealList.length;i++){
        // if(dealList[i].exclusiveSpace == area && !dealList[i].cancelYn && isBetween(dealList[i].contractDt))
        if(dealList[i].exclusiveSpace == area && isBetween(dealList[i].contractDt)){
            dealList2.push({
                contractDt: dealList[i].contractDt,
                trAmt: Number(dealList[i].trAmt.replace(/[^0-9]/g, "")),
            });
        }
    }

    for(let i=0;i<rentList.length;i++){
        if(rentList[i].exclusiveSpace == area  && isBetween(rentList[i].contractDt)){
            if(rentList[i].mthRentAmt == '0' || !rentList[i].mthRentAmt){
                rentList2.push({
                    contractDt: rentList[i].contractDt,
                    dpstAmt: Number(rentList[i].dpstAmt.replace(/[^0-9]/g, "")),
                });
            }else{
                mthList.push({
                    contractDt: rentList[i].contractDt,
                    dpstAmt: Number(rentList[i].dpstAmt.replace(/[^0-9]/g, "")),
                    mthRentAmt: Number(rentList[i].mthRentAmt.replace(/[^0-9]/g, "")),
                });
            }
        }
    }

    

    let maxAvg = 0;
    let minAvg = 0;
    let norAvg = 0;
    let dpstAvg = 0;
    let mthAvg = 0;

    if(tradeType == 'A1'){
        let norPrice = 0;
        let norCnt = 0;
        for(let i=0;i<dealList2.length;i++){
            norCnt++;
            norPrice += Number(dealList2[i].trAmt);
        }
        norAvg =  (norPrice == 0 || dealList2.length == 0) ? 0 : Math.floor(norPrice/dealList2.length);

        let maxPrice = 0;
        let maxCnt = 0;
        let minPrice = 0;
        let minCnt = 0;
        for(let i=0;i<dealList2.length;i++){
            if(Number(dealList2[i].trAmt) >= norAvg){
                maxCnt++;
                maxPrice += Number(dealList2[i].trAmt);
            }else if(Number(dealList2[i].trAmt) <= norAvg){
                minCnt++;
                minPrice += Number(dealList2[i].trAmt);
            }
        }
        
        maxAvg = (maxPrice == 0 || maxCnt == 0) ? 0 : Math.floor(maxPrice/maxCnt);
        minAvg = (minPrice == 0 || maxCnt == 0) ? 0 : Math.floor(minPrice/minCnt);

        if(minAvg && minAvg < price.dealPrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 하위 평균 보다 높은 금액입니다.'});
        }

        if(norAvg && norAvg < price.dealPrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 일반 평균 보다 높은 금액입니다.'});
        }

        if(maxAvg && maxAvg < price.dealPrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 상위 평균 보다 높은 금액입니다.'});
        }
    }else if(tradeType == 'B1'){
        let norPrice = 0;
        let norCnt = 0;
        for(let i=0;i<rentList2.length;i++){
            norCnt++;
            norPrice += Number(rentList2[i].dpstAmt);
        }
        norAvg =  (norPrice == 0 || rentList2.length == 0) ? 0 : Math.floor(norPrice/rentList2.length);

        let maxPrice = 0;
        let maxCnt = 0;
        let minPrice = 0;
        let minCnt = 0;
        for(let i=0;i<rentList2.length;i++){
            if(Number(rentList2[i].dpstAmt) >= norAvg){
                maxCnt++;
                maxPrice += Number(rentList2[i].dpstAmt);
            }else if(Number(rentList2[i].dpstAmt) <= norAvg){
                minCnt++;
                minPrice += Number(rentList2[i].dpstAmt);
            }
        }
        maxAvg = (maxPrice == 0 || maxCnt == 0) ? 0 : Math.floor(maxPrice/maxCnt);
        minAvg = (minPrice == 0 || maxCnt == 0) ? 0 : Math.floor(minPrice/minCnt);

        if(minAvg && minAvg < price.leasePrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 하위 평균 보다 높은 금액입니다.'});
        }

        if(norAvg && norAvg < price.leasePrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 일반 평균 보다 높은 금액입니다.'});
        }

        if(maxAvg && maxAvg < price.leasePrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 상위 평균 보다 높은 금액입니다.'});
        }
    }else{
        let dpstPrice = 0;
        let mthPrice = 0;
        for(let i=0;i<mthList.length;i++){
            dpstPrice += Number(mthList[i].dpstAmt);
            mthPrice += Number(mthList[i].mthRentAmt);
        }

        dpstAvg = (dpstPrice == 0 || mthList.length) ? 0 : Math.floor(dpstPrice/mthList.length);
        mthAvg = (mthPrice == 0 || mthList.length) ? 0 : Math.floor(mthPrice/mthList.length);

        if(dpstAvg && dpstAvg < price.leasePrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 월세 보증금 보다 높은 금액입니다.'});
        }

        if(mthAvg && mthAvg < price.rentPrice){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'시세 월세 보다 높은 금액입니다.'});
        }
    }


    //////////////////////////////////////////////////////////////////////////////
    ///////////////////// 차트 데이터 
    //////////////////////////////////////////////////////////////////////////////

    let tempDateChart = [];
    let tempDealChart = [];
    let tempRentChart = [];
    
    for(let i=0;i<dealList2.length;i++){
        tempDateChart.push(
            dayjs(dealList2[i].contractDt).format('YYYYMM')
        );
    }

    for(let i=0;i<rentList2.length;i++){
        tempDateChart.push(
            dayjs(rentList2[i].contractDt).format('YYYYMM')
        );
    }

    const tempDateChart2_ = tempDateChart.filter((element, index) => {
        return tempDateChart.indexOf(element) === index;
    });
    const tempDateChart2 = tempDateChart2_.sort();


    let tempChartList = {
        dealList: [],
        rentList: [],
    };
    
    for(let i=0;i<tempDateChart2.length;i++){
        tempChartList.dealList.push({
            contractDt: tempDateChart2[i],
            price: null,
        });

        tempChartList.rentList.push({
            contractDt: tempDateChart2[i],
            price: null,
        });
    }


    for(let i=0;i<tempChartList.dealList.length;i++){
        for(let x=0;x<dealList2.length;x++){
            if(tempChartList.dealList[i].contractDt == dayjs(dealList2[x].contractDt).format('YYYYMM')){
                tempChartList.dealList[i].price = Number(dealList2[x].trAmt);
            }
        }
    }

    for(let i=0;i<tempChartList.rentList.length;i++){
        for(let x=0;x<rentList2.length;x++){
            if(tempChartList.rentList[i].contractDt == dayjs(rentList2[x].contractDt).format('YYYYMM')){
                tempChartList.rentList[i].price = Number(rentList2[x].dpstAmt);
            }
        }
    }

    for(let i=0;i<tempDateChart2.length;i++){
        resultObj.dateChart.push(dayjs(tempDateChart2[i]).format('YY.MM'));
    }

    for(let i=0;i<tempChartList.dealList.length;i++){
        resultObj.dealChart.push(
            tempChartList.dealList[i].price
        );
    }
    for(let i=0;i<tempChartList.rentList.length;i++){
        resultObj.rentChart.push(
            tempChartList.rentList[i].price
        );
    }

    resultObj.info = {
        norAvg : norAvg,
        norAvgKor : exports.formatMoney(norAvg, MONEY_FORMAT_TYPE.TAX),
        maxAvg : maxAvg,
        maxAvgKor : exports.formatMoney(maxAvg, MONEY_FORMAT_TYPE.TAX),
        minAvg : minAvg,
        minAvgKor : exports.formatMoney(minAvg, MONEY_FORMAT_TYPE.TAX),
        dpstAvg : dpstAvg,
        dpstAvgKor : exports.formatMoney(dpstAvg, MONEY_FORMAT_TYPE.TAX),
        mthAvg : mthAvg,
        mthAvgKor : exports.formatMoney(mthAvg, MONEY_FORMAT_TYPE.TAX),
    };

    if(tradeType == 'A1'){
        for(let i=0;i<dealList.length;i++){
            if(dealList[i].exclusiveSpace == area && isBetween(dealList[i].contractDt)){
                resultObj.itemList.push({
                    tradeYearMonth: exports.dateFormat(dealList[i].contractDt, "YYYY-MM-DD"),
                    realEstateTypeCode: itemType,
                    dealPrice: Number(dealList[i].trAmt.replace(/[^0-9]/g, "")),
                    floor: dealList[i].floor,
                });
            }
        }
    }else if(tradeType == 'B1'){
        for(let i=0;i<rentList.length;i++){
            if(rentList[i].exclusiveSpace == area && isBetween(rentList[i].contractDt)){
                if(rentList[i].mthRentAmt == '0' || !rentList[i].mthRentAmt){
                    resultObj.itemList.push({
                        tradeYearMonth: exports.dateFormat(rentList[i].contractDt, "YYYY-MM-DD"),
                        realEstateTypeCode: itemType,
                        leasePrice: Number(rentList[i].dpstAmt.replace(/[^0-9]/g, "")),
                        floor: rentList[i].floor,
                    });
                }
            }

        }
    }else{
        for(let i=0;i<rentList.length;i++){
            if(rentList[i].exclusiveSpace == area && isBetween(rentList[i].contractDt)){
                if(rentList[i].mthRentAmt != '0' && rentList[i].mthRentAmt){
                    resultObj.itemList.push({
                        tradeYearMonth: exports.dateFormat(rentList[i].contractDt, "YYYY-MM-DD"),
                        realEstateTypeCode: itemType,
                        leasePrice: Number(rentList[i].dpstAmt.replace(/[^0-9]/g, "")),
                        rentPrice: Number(rentList[i].mthRentAmt.replace(/[^0-9]/g, "")),
                        floor: rentList[i].floor,
                    });
                }
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////


    return resultObj;
};



exports.getUniqNo = async function(report) {
    let param = {
        kindcls: '집합건물',
        admin_regn1: report.siNm,
        admin_regn2: report.sggNm,
        roadNm: report.rn,
        rdnblNmbr: report.buldSlno != '0' ? (report.buldMnnm + '-' + report.buldSlno) : report.buldMnnm,
        buld_no_buld: report.dongNm,  //동
        buld_no_room: report.hoNm,  //호
    };

    const re = await axios.post('https://api.hyphen.im/in0004000167', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });

    try{
        const uniqNo = re.data.data.list[0].부동산고유번호;
        return uniqNo;
    }catch(e){
        return false;
    }
};

exports.getRegistered = async function(report) {
    let regObj = {
        owner: null,
        realOwnerInfo: null,
        collateralST: 'X',    //근저당여부
        collateralSTName: null,    //채무자 이름
        collateralSTInfo: '해당 매물은 근저당이 설정되어 있지 않아요.',

        collateralPrc: null,    //채권최고액
        collateralPrcNum: 0,
        collateralPrcInfo: '해당 매물은 채권최고액이 없어요.',
        
        realPrc: null, //순자산

        jeonseSt: 'X',   //전세권 여부
        jeonseStInfo: '해당 매물은 전세권이 설정되어 있지 않아요.',

        nameSt: 'O',
        nameStInfo: '현 소유자와 채무자가 일치해요.',

        b1MoreInfo:{
            collateral: null, //근저당권
            apryu: null, //압류
            gaapryu: null, //가압류
            gacheobun: null, //가처분
            jutaegimchagwon: null, //주택임차권
            wibangeonchukmul: null, //위반건축물
            sintaksa: null, //신탁사

            apryuCnt: null, //압류, 가압류 카운팅
            imchaCnt: null, //임차권 카운팅
            oldApryuCnt: null, //압류, 가압류 카운팅
            oldImchaCnt: null, //임차권 카운팅
            deg: '180deg',
            info: null,

            score: 0,
            scoreInfo: [],
        },

        regCount: 0,    //등기 수

        score: 0,

        myRegList: [],
        allRegList: [],
        scoreInfo: [],
    };
    const price = report.dealPrice ? report.dealPrice : report.leasePrice;
    let regData = [];

    const uniqNo = await exports.getUniqNo(report)
    if(!uniqNo){
        return false;
    }

    let param = {
        userId: 'k2689r4m',
        userPw: '#K2689r4m',
        searchDiv: 'uniqNo',
        uniqNo: uniqNo,
        summary: 'Y',  //동
        cmortCheck: 'Y',  //호
        tradeCheck: 'Y',  //호
        pdfHex: 'Y',
    };

    console.log(param);


    const re = await axios.post('https://api.hyphen.im/in0004000163', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });

    const reData = re.data.data.outList;
    const pdfHex = re.data.data.pdfHexString;
   

    if(!reData){
        return false;
    }

    const fileName = report.id + '_reg.pdf';
    await hexToFile(report.id, pdfHex, fileName);
   
    // owner 소유자 리스트 케이스 확인필요, 소유자가 2명 이상일때 확인 필요..
    if(reData.소유지분현황_갑구.length){
        regObj.owner = reData.소유지분현황_갑구[0].등기명의인.split(' ')[0];
    }
    
    
    for(let i=0;i<reData.소유권_이외의_권리에_관한_사항_을구.length;i++){
        const tg = reData.소유권_이외의_권리에_관한_사항_을구[i];

        const regData_ = exports.regGetItems(tg, '을');
        if(regData_){
            regData.push(regData_);
        }
    }

    for(let i=0;i<reData.소유권에_관한_사항_갑구.length;i++){
        const tg = reData.소유권에_관한_사항_갑구[i];

        const regData_ = exports.regGetItems(tg, '갑');
        if(regData_){
            regData.push(regData_);
        }
    }

    let 소유권이전St = false;

    for(let i=0;i<regData.length;i++){
        if(regData[i].등기목적 == '소유권이전'){
            소유권이전St = true;
            break;
        }
    }


    for(let i=0;i<regData.length;i++){
        if(regData[i].삭제여부){
            continue;
        }

        if(regData[i].등기목적 == '소유권이전'){
            regObj.realOwnerInfo = regData[i];
        }

        if(regData[i].등기목적 == '소유권보존' && !소유권이전St){
            regObj.myRegList.push(regData[i]);
        }else{
            regObj.myRegList.push(regData[i]);
        }

        if(regData[i].등기목적 == '근저당권설정'){
            regObj.collateralST = 'O';
            regObj.collateralSTInfo = '해당 매물은 근저당이 설정되어 있어요.';

            if(!regObj.collateralSTName){
                regObj.collateralSTName = regData[i].기타사항.채무자;
            }else if(!regObj.collateralSTName.includes(regData[i].기타사항.채무자)){
                regObj.collateralSTName += ',' + regData[i].기타사항.채무자;
            }

            regObj.collateralPrc += regData[i].기타사항.채권최고액;
            regObj.collateralPrcInfo = '해당 매물은 채권최고액이 있어요.';
        }
        else if(regData[i].등기목적 == '전세권설정'){
            regObj.jeonseSt = 'O';
            regObj.jeonseStInfo = '해당 매물은 전세권이 설정되어 있어요.';
        }


        if(regData[i].감점설명){
            regObj.scoreInfo.push({rank:1, info:regData[i].감점설명});
        }


        regObj.score += regData[i].점수;
        regObj.regCount++;
    }


    if(report.tradeType == 'B1'){
        let oDate = null;
        if(regObj.realOwnerInfo){
            oDate = new Date((new Date(regObj.realOwnerInfo.접수.일시.replace(/년/g, ".").replace(/월/g, ".").replace(/일/g, ""))).getTime() + TIME_ZONE);
        }
        for(let i=0;i<regData.length;i++){
            if(oDate){
                if(regData[i].등기목적 == '압류' || regData[i].등기목적 == '가압류'){
                    const isDate = new Date((new Date(regData[i].등기원인.일시.replace(/년/g, ".").replace(/월/g, ".").replace(/일/g, ""))).getTime() + TIME_ZONE);
                    if(oDate.getTime() <= isDate.getTime()){
                        if(regData[i].삭제여부){
                            regObj.b1MoreInfo.oldApryuCnt++;
                        }else{
                            regObj.b1MoreInfo.apryuCnt++;
                        }
                    }
                }else if(regData[i].등기목적 == '주택임차권'){
                    const isDate = new Date((new Date(regData[i].등기원인.일시.replace(/년/g, ".").replace(/월/g, ".").replace(/일/g, ""))).getTime() + TIME_ZONE);
                    if(oDate.getTime() <= isDate.getTime()){
                        if(regData[i].삭제여부){
                            regObj.b1MoreInfo.oldImchaCnt++;
                        }else{
                            regObj.b1MoreInfo.imchaCnt++;
                        }
                    }
                }
            }

            if(regData[i].등기목적 == '근저당권설정' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.collateral = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'근저당권이 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
            else if(regData[i].등기목적 == '압류' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.apryu = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'압류가 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
            else if(regData[i].등기목적 == '가압류' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.gaapryu = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'가압류가 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
            else if(regData[i].등기목적 == '가처분' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.gacheobun = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'가처분이 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
            else if(regData[i].등기목적 == '주택임차권' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.jutaegimchagwon = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'주택임차권이 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
            else if(regData[i].등기목적 == '신탁' && regData[i].삭제여부 == false){
                regObj.b1MoreInfo.sintaksa = regData[i];
                regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'신탁사 소유로 설정되어 있습니다.'});
                regObj.b1MoreInfo.score += 5;
            }
        }

        if(regObj.b1MoreInfo.apryuCnt || regObj.b1MoreInfo.oldApryuCnt){
            regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'압류, 가압류 이력이 있습니다.'});
            regObj.b1MoreInfo.score += 5;
        }
        if(regObj.b1MoreInfo.oldImchaCnt || regObj.b1MoreInfo.oldApryuCnt){
            regObj.b1MoreInfo.scoreInfo.push({rank:1, info:'임차권 등기 명령 이력이 있습니다.'});
            regObj.b1MoreInfo.score += 5;
        }


        if(!regObj.b1MoreInfo.apryuCnt && !regObj.b1MoreInfo.oldApryuCnt && !regObj.b1MoreInfo.imchaCnt && !regObj.b1MoreInfo.oldImchaCnt){
            regObj.b1MoreInfo.info = '현재 및 과거 이력이 존재하지 않습니다.';
            regObj.b1MoreInfo.deg = '180deg';
        }
        else if(!regObj.b1MoreInfo.apryuCnt && !regObj.b1MoreInfo.imchaCnt && (regObj.b1MoreInfo.oldImchaCnt || regObj.b1MoreInfo.oldApryuCnt)){
            const oldCnt = regObj.b1MoreInfo.oldImchaCnt+regObj.b1MoreInfo.oldApryuCnt;
            regObj.b1MoreInfo.info = `과거에 말소된 (압류, 가압류, 임차권 등기 명령) 이력 '${oldCnt}회'가 있습니다. 거래 시, 참고하세요`;

            if(oldCnt == 1){
                regObj.b1MoreInfo.deg = '130deg';    
            }
            else{
                regObj.b1MoreInfo.deg = '50deg';    
            }
        }
        else if((regObj.b1MoreInfo.apryuCnt || regObj.b1MoreInfo.imchaCnt) && !regObj.b1MoreInfo.oldImchaCnt && !regObj.b1MoreInfo.oldApryuCnt){
            regObj.b1MoreInfo.info = `현재 (압류, 가압류, 임차권 등기 명령) 이력이 '${regObj.b1MoreInfo.apryuCnt+regObj.b1MoreInfo.imchaCnt}회'가 있습니다. 거래 위험이 있습니다.`;
            regObj.b1MoreInfo.deg = '0deg';  
        }
        else if((regObj.b1MoreInfo.apryuCnt || regObj.b1MoreInfo.imchaCnt) && (regObj.b1MoreInfo.oldImchaCnt || regObj.b1MoreInfo.oldApryuCnt)){
            regObj.b1MoreInfo.info = `현재 및 과거 (압류, 가압류, 임차권 등기 명령) 이력이 '${regObj.b1MoreInfo.apryuCnt+regObj.b1MoreInfo.imchaCnt+regObj.b1MoreInfo.oldImchaCnt+regObj.b1MoreInfo.oldApryuCnt}회'가 있습니다. 거래 위험이 있습니다.`;
            regObj.b1MoreInfo.deg = '0deg';  
        }
    }

    regObj.realPrc = exports.formatMoney(price - regObj.collateralPrc, MONEY_FORMAT_TYPE.TAX);
    regObj.collateralPrcNum = regObj.collateralPrc;
    regObj.collateralPrc = regObj.collateralPrc ? exports.formatMoney(regObj.collateralPrc, MONEY_FORMAT_TYPE.TAX) : 0;
    regObj.allRegList = regData;
    

    return regObj;
};

exports.getRealtyPrice = async function(jibun, siNm, dongNm, hoNm, price, price2, regData) {
    let param = {
        addr: jibun,
        dongNm: null,
        hoNm: null,
    };

    let resultObj = {
        siga: 0,
        score: 0,
        scoreInfo: [],

        st1: '적합',
        st2: '적합',
        st3: '적합',
        st4: '적합',
        st5: '적합',
    };

    const re1 = await axios.post('https://api.hyphen.im/in0118000761', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });
    if(!re1.data){
        return resultObj;
    }
    const dongNmList = re1.data.data.dongNmList;
    for(let i=0;i<dongNmList.length;i++){
        if(dongNmList[i].replace(/[^0-9]/g, "") == dongNm){
            param.dongNm = dongNmList[i];
        }
    }


    const re2 = await axios.post('https://api.hyphen.im/in0118000761', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });
    if(!re2.data){
        return resultObj;
    }
    const hoNmList = re2.data.data.hoNmList;
    for(let i=0;i<hoNmList.length;i++){
        if(hoNmList[i].replace(/[^0-9]/g, "") == hoNm){
            param.hoNm = hoNmList[i];
        }
    }


    const re = await axios.post('https://api.hyphen.im/in0118000761', param, {
        headers: {
            'Content-Type': 'application/json', 
            'user-id': process.env.HYPHEN_USER_ID, 
            'Hkey': process.env.HYPHEN_HKEY, 
        },
    });
    if(!re.data || re.data.common.errYn == 'Y'){
        return resultObj;
    }

    resultObj.siga = Math.floor(Number(re.data.data.siga)  / 10000);

    if(price+price2 > resultObj.siga * 0.9){
        resultObj.score += 5;
        resultObj.scoreInfo.push({rank:1, info:'내 전세보증금이 적정전세금액을 초과하는 금액입니다.'});
        resultObj.st1 = '부적합';
    }

    if(price2 > (resultObj.siga * 0.9)*0.6){
        resultObj.score += 5;
        resultObj.scoreInfo.push({rank:1, info:'선순위채권이 주택가액의 60% 이내를 초과하였습니다.'});
        resultObj.st2 = '부적합';
    }

    if(siNm == '서울특별시' || siNm == '인천광역시' || siNm == '경기도' ){
        if(price > 70000){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'전세보증금이 보증조건 범위를 초과하였습니다.'});
            resultObj.st3 = '부적합';
        }
    }else{
        if(price > 50000){
            resultObj.score += 5;
            resultObj.scoreInfo.push({rank:1, info:'전세보증금이 보증조건 범위를 초과하였습니다.'});
            resultObj.st3 = '부적합';
        }
    }


    //regData 에서 경매신청, 가등기 필터 추가 필요.
    if(regData.apryu || regData.gaapryu || regData.gacheobun){
        resultObj.score += 5;
        resultObj.scoreInfo.push({rank:1, info:'권리침해하는 요소가 존재합니다.'});
        resultObj.st4 = '부적합';
    }

    //  건축물대장 api 필요 ㅎㅎ
    // if(위반건축물){
    //     resultObj.score += 5;
    //     resultObj.scoreInfo.push({rank:1, info:'건축물대장상 위반건축물에 해당합니다.'});
    //     resultObj.st5 = '부적합';
    // }

    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////


    return resultObj;
};




exports.groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
            carry[group] = [];
        }

        carry[group].push(el);
        return carry;
    }, {});
},
exports.MONEY_FORMAT_TYPE = MONEY_FORMAT_TYPE;
exports.formatMoney = function(e, t, a){
    return c(e, t, !0, a);
};

exports.getBrExposPubuseAreaInfo = async function(adrInfo) {
    let params = {
        ServiceKey: process.env.BUILD_KEY,
        sigunguCd: adrInfo.admCd.substr(0,5),
        bjdongCd: adrInfo.admCd.substr(5,5),
        bun: adrInfo.lnbrMnnm.padStart(4,'0'),
        ji: adrInfo.lnbrSlno.padStart(4,'0'),
        dongNm: adrInfo.dongNm.replace(/[^0-9]/g, ""),
        hoNm: adrInfo.hoNm.replace(/[^0-9]/g, "")
    }

    // console.log(adrInfo.rnMgtSn);
    console.log(params);
    
    let itemDongNm = null;
    

    let itemDongMax = null;
    let itemDongPage = 1;

    do{
        try{
            const re = await axios.get('http://apis.data.go.kr/1613000/BldRgstService_v2/getBrExposPubuseAreaInfo'+
                '?ServiceKey='+ params.ServiceKey +
                '&sigunguCd='+ params.sigunguCd +
                '&bjdongCd='+ params.bjdongCd +
                '&bun='+ params.bun +
                '&ji='+ params.ji +
                '&dongNm='+
                '&_type=json'+
                '&pageNo='+ itemDongPage +
                '&numOfRows=100'
            );
        
            itemDongPage++;
            const itemList = re.data.response.body.items.item;
            itemDongMax = itemList.length;

            for(let i=0;i<itemList.length;i++){
                itemList[i].dongNm = itemList[i].dongNm + '';

                if(itemList[i].dongNm.replace(/[^0-9]/g, "").trim() == params.dongNm){
                    console.log(itemList[i].dongNm);
                    if(params.dongNm == ''){
                        itemDongNm = '';    
                    }else{
                        itemDongNm = itemList[i].dongNm;
                    }
                    break;
                }
            }
        }catch(e){
            // console.log('-----------------');
            // console.log(e);
            // console.log('-----------------');
            break;
        }
    }while(itemDongMax === 100 && itemDongNm === null);

    if(itemDongNm === null){
        const re = await axios.get('http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo'+
            '?ServiceKey='+ params.ServiceKey +
            '&sigunguCd='+ params.sigunguCd +
            '&bjdongCd='+ params.bjdongCd +
            '&bun='+ params.bun +
            '&ji='+ params.ji +
            '&_type=json'
        );
        
        try{
            re.data.response.body.items.item.area = re.data.response.body.items.item.totArea;

            return {
                st: true,
                item: re.data.response.body.items.item,
            }
        }catch(e){
            return {
                st: false,
                item: null,
            }
        }
    }


    let item = null;
    let itemHoMax = null;
    let itemHoPage = 1;
    do{
        try{
            const re = await axios.get('http://apis.data.go.kr/1613000/BldRgstService_v2/getBrExposPubuseAreaInfo'+
                '?ServiceKey='+ params.ServiceKey +
                '&sigunguCd='+ params.sigunguCd +
                '&bjdongCd='+ params.bjdongCd +
                '&bun='+ params.bun +
                '&ji='+ params.ji +
                '&dongNm='+ itemDongNm +
                '&_type=json'+
                '&pageNo='+ itemHoPage +
                '&numOfRows=100'
            );

            itemHoPage++;
            const itemList = re.data.response.body.items.item;
            itemHoMax = itemList.length;
            
            for(let i=0;i<itemList.length;i++){
                itemList[i].hoNm = itemList[i].hoNm + '';

                if(itemList[i].hoNm.replace(/[^0-9]/g, "") == params.hoNm && itemList[i].exposPubuseGbCd == 1){
                    console.log(itemList[i].hoNm);
                    // console.log(itemList[i]);
                    // itemList[i].area = Math.trunc(itemList[i].area*100)/100;

                    item = itemList[i];
                    break;
                }
            }
        }catch(e){
            console.log('-----------------');
            console.log(e);
            console.log('-----------------');
            break;
        }
    }while(itemHoMax === 100 && item === null);


    if(item === null){
        return {
            st: false,
            item: null,
        }
    }else{
        return {
            st: true,
            item: item,
        }
    }

};

exports.DBCall = async function(sp, params){
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

exports.DBOriginCall = async function(sp, params){
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

exports.DBOneCall = async function(sp, params){
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

exports.DBPageCall = async function(sp, params){
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


exports.m2ToPy = function(val){
    return (val * 0.3025).toFixed(2);
}

exports.isEmpty = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    	return null;
  	}else{
    	return value;
  	}
}

exports.isEmpty2 = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return 0;
    }else{
        return value;
    }
}

exports.flrGbCd = {
    10 : '지하',
    20 : '',
    21 : '복층(하층)',
    22 : '복층(상층)',
    30 : '옥탑',
    40 : '각층'
}

exports.sellStatus ={
    ready: '준비',
    done: '매물',
    hold: '보류',
    sell: '매각',
}

exports.chkStatus ={
    A: 'A',
    B: 'B',
    C: 'C',
    NULL: '',
    null: '',
    '': '',
}

exports.interior_type ={
    need: '필요',
    good: '양호',
    demo: '철거완료',
}

exports.rent_free ={
    none: '협의',
    confer: '0개월',
}

exports.addr ={
    '강남구전체':['11680%'],
    '송파구':['11710%'],

    '신사/청담':['11680107%','11680104%'],
    '삼성/대치':['11680105%','11680106%'],
    '논현/역삼':['11680108%','11680101%'],
    '도곡/개포':['11680118%','11680103%'],
    '성수동':['11200114%','11200115%'],
    '서초동':['11650108%'],

    '도봉구':['11320%'],
    '노원구':['11350%'],
    '강북구':['11305%'],
    '성북구':['11290%'],
    '중랑구':['11260%'],
    '동대문구':['11230%'],
    '광진구':['11215%'],
    '은평구':['11380%'],
    '종로구':['11110%'],
    '서대문구':['11410%'],
    '중구':['11140%'],
    '마포구':['11440%'],
    '용산구':['11170%'],
    '강동구':['11740%'],
    '동작구':['11590%'],
    '관악구':['11620%'],
    '금천구':['11545%'],
    '영등포구':['11560%'],
    '구로구':['11530%'],
    '양천구':['11470%'],
    '강서구':['11500%'],
}

exports.cidList ={
    '신축':[174],
    '24시간 개방':[178],
    '야외 테라스':[182],
    '단독사옥(통임대)':[175],
    '높은 층고':[179],
    '인테리어':[186],
    '역세권':[176],
    '엘리베이터 有':[180],
    '자주식주차가능':[183],
    '대로변':[177],
    '전기차 충전소':[181],
    '외부 화장실':[184],
    'PM추천': [187],
    '시세보다 저렴한':[185],
}

exports.dateFormat = (val, format) => {
    return dayjs(val).format(format);
};

exports.phoneMask = (str) => {
    if (!str || !str.length) {
        return '';
    }

    return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
};


exports.payPC = async (req, res, payInfo, reUrl) => {
    const signKey = process.env.INICIS_SIGN_KEY;

    /////////////////////////////////////////////////////////////////////////
    /////////       요청 무결성 검사
    /////////////////////////////////////////////////////////////////////////
    const reLog = await exports.DBOneCall(`CALL SP_A_PAY_LOG_GET(?)`,[payInfo.orderNumber]);

    if(!reLog){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }

    const log_ = reLog.oid.split('_');
    const logObj = {
        id:log_[0],
        gid:log_[1],
        mid:log_[2],
        price:log_[3],
    };

    const goodObj = await exports.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[logObj.gid]);

    if(logObj.id != reLog.id || logObj.gid != reLog.gid || logObj.mid != reLog.mid || logObj.price != reLog.price || goodObj.price != reLog.price){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }
    /////////////////////////////////////////////////////////////////////////





    const timestamp = Date.now();
    const signature = crypto.SHA256(`authToken=${payInfo.authToken.replace('\r\n','')}&timestamp=${timestamp}`).toString();
    const verification = crypto.SHA256(`authToken=${payInfo.authToken.replace('\r\n','')}&signKey=${signKey}&timestamp=${timestamp}`).toString();

    try{
        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_REQ(?)`,[logObj.id]);
        const reData = await axios({
            url:payInfo.authUrl,
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            params:{
                mid:payInfo.mid,
                authToken:payInfo.authToken.replace('\r\n',''),
                signature:signature,
                verification:verification,
                timestamp:timestamp,
                format:'JSON',
            }
        });

        if(reData.data.resultCode != "0000"){
            await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_FAIL(?)`,[logObj.id]);
            return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${reData.data.resultMsg}`);
        }
        

        if(reData.data.payMethod == 'VBank'){
            await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_BANK_REQ(?)`,[logObj.id]);
            let userInfo = await exports.DBOneCall(`CALL SP_U_MYPAGE_INFO_GET(?)`, [logObj.mid]);

            await exports.sendSMS([
                {
                  to: userInfo.phone,
                  from: '0226775319',
                  text: `가상계좌 ${reData.data.vactBankName} : ${reData.data.VACT_Num} : ${reData.data.TotPrice} 원`
                }
            ]);

            return res.redirect(reUrl);
        }

        

        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_SUCSS(?)`,[logObj.id]);
        await exports.DBCall(`CALL SP_U_GOOD_LIST_ADD(?,?,?,?,?)`,[
            logObj.mid,
            logObj.gid,
            goodObj.cnt,
            goodObj.dateS,
            goodObj.dateE,
        ]);

        
        return res.redirect(reUrl);
    }catch(e){
        console.log(e);
        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_FAIL(?)`,[logObj.id]);
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }


};

exports.payMobile = async (req, res, payInfo, reUrl) => {
    const signKey = process.env.INICIS_SIGN_KEY;

    /////////////////////////////////////////////////////////////////////////
    /////////       요청 무결성 검사
    /////////////////////////////////////////////////////////////////////////
    const reLog = await exports.DBOneCall(`CALL SP_A_PAY_LOG_GET(?)`,[payInfo.P_NOTI]);

    if(!reLog){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }

    const log_ = reLog.oid.split('_');
    const logObj = {
        id:log_[0],
        gid:log_[1],
        mid:log_[2],
        price:log_[3],
    };

    const goodObj = await exports.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[logObj.gid]);

    if(logObj.id != reLog.id || logObj.gid != reLog.gid || logObj.mid != reLog.mid || logObj.price != reLog.price || goodObj.price != reLog.price){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }
    /////////////////////////////////////////////////////////////////////////



    try{
        const reData = await axios({
            url:payInfo.P_REQ_URL,
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            params:{
                P_MID:process.env.INICIS_MID,
                P_TID:payInfo.P_TID,
            }
        });
        const urlParams = new URLSearchParams(reData.data);
        console.log(urlParams);
        
        if(urlParams.get('P_STATUS') != "00"){
            await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_FAIL(?)`,[logObj.id]);
            return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${reData.data.P_RMESG1}`);
        }

        

        if(urlParams.get('P_TYPE') == 'VBANK'){
            await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_BANK_REQ(?)`,[logObj.id]);
            let userInfo = await exports.DBOneCall(`CALL SP_U_MYPAGE_INFO_GET(?)`, [logObj.mid]);

            await exports.sendSMS([
                {
                  to: userInfo.phone,
                  from: '0226775319',
                  text: `가상계좌 ${urlParams.get('P_FN_NM')} : ${urlParams.get('P_VACT_NUM')} : ${urlParams.get('P_CSHR_AMT')} 원`
                }
            ]);
            
            return res.redirect(reUrl);
        }


        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_SUCSS(?)`,[logObj.id]);
        await exports.DBCall(`CALL SP_U_GOOD_LIST_ADD(?,?,?,?,?)`,[
            logObj.mid,
            logObj.gid,
            goodObj.cnt,
            goodObj.dateS,
            goodObj.dateE,
        ]);
        
        return res.redirect(reUrl);
    }catch(e){
        console.log(e);
        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_FAIL(?)`,[logObj.id]);
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'비정상적인 접근입니다.'}`);
    }
};


exports.payPcNoti = async (res, payInfo) => {
    console.log(payInfo);

    const reLog = await exports.DBOneCall(`CALL SP_A_PAY_LOG_GET(?)`,[payInfo.no_oid]);

    if(!reLog){
        return false;
    }

    const log_ = reLog.oid.split('_');
    const logObj = {
        id:log_[0],
        gid:log_[1],
        mid:log_[2],
        price:log_[3],
    };

    const goodObj = await exports.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[logObj.gid]);


    if(payInfo.type_msg != "0200"){
        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_BANK_FAIL(?)`,[logObj.id]);
    }

    await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_SUCSS(?)`,[logObj.id]);
    await exports.DBCall(`CALL SP_U_GOOD_LIST_ADD(?,?,?,?,?)`,[
        logObj.mid,
        logObj.gid,
        goodObj.cnt,
        goodObj.dateS,
        goodObj.dateE,
    ]);

    return res.send('OK');
};

exports.payMobileNoti = async (res, payInfo) => {
    console.log(payInfo);

    const reLog = await exports.DBOneCall(`CALL SP_A_PAY_LOG_GET(?)`,[payInfo.P_OID]);

    if(!reLog){
        return false;
    }

    const log_ = reLog.oid.split('_');
    const logObj = {
        id:log_[0],
        gid:log_[1],
        mid:log_[2],
        price:log_[3],
    };

    const goodObj = await exports.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[logObj.gid]);


    if(payInfo.P_STATUS != "02"){
        await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_BANK_FAIL(?)`,[logObj.id]);
    }

    await exports.DBCall(`CALL SP_U_PAY_LOG_REQ_SUCSS(?)`,[logObj.id]);
    await exports.DBCall(`CALL SP_U_GOOD_LIST_ADD(?,?,?,?,?)`,[
        logObj.mid,
        logObj.gid,
        goodObj.cnt,
        goodObj.dateS,
        goodObj.dateE,
    ]);

    return res.send('OK');
};

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/files')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'_'+v4())
    },
});

let upload3 = multer({
    storage: storage3,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});

exports.fileUpload = upload3.array('files');