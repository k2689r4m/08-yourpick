var express = require('express');
var router = express.Router();
const redisClient = require('../util/redis.util');
const db = require('../database/connect/config');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const seon = require('../seon');
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const fs = require("fs");

dayjs.extend(isBetween);

const isEmpty = function(value){
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	  return null;
	}else{
	  return value;
	}
};

const isEmpty2 = function(value){
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	return 0;
  }else{
	return value;
  }
};


const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logout', async (req, res) =>{
	const userId = req.decoded.userId;

	const n = await redisClient.v4.exists(userId);

	if(n) await redisClient.v4.del(userId);

	return res.status(200).json({
	    status: 200,
	});
});


router.get('/biz/mypage/info', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_U_MYPAGE_INFO_GET(?)`, [userId]);

	const fEmail = reData.email.split('@');
	reData.email = fEmail[0];
	reData.emailCom = fEmail[1];

	const fPhone = reData.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`).split('-');
	reData.phone1 = fPhone[0];
	reData.phone2 = fPhone[1];
	reData.phone3 = fPhone[2];

	return res.send(reData);
});

router.get('/user/image', async function(req, res){
    const userId = req.decoded.userId;
	try{
        let userInfo = await seon.DBOneCall(`CALL SP_U_USER_IMG_ID_GET(?)`, [userId]);

        if(!userInfo?.userImgId){
            return res.send(null);
        }

		const reData = await seon.DBOneCall(`CALL SP_U_USER_IMG_GET(?)`,[
			userInfo.userImgId
		]);

		const filename = reData.path + '/' + reData.name;
		const reBuffer = fs.readFileSync(filename);

		res.writeHead(200, { "Context-Type": reData.type });
		res.write(reBuffer);  
		res.end();  
	}catch(e){
		console.log(e);
		return res.send('');
	}
});

router.get('/reg/file', async function(req, res){
    const userId = req.decoded.userId;
	try{
        let regFile = await seon.DBOneCall(`CALL SP_U_REPORT_REG_FILE_GET(?)`, [req.query.rid]);

		return res.download(regFile.path + regFile.name, 'test.pdf');

        // if(!userInfo.userImgId){
        //     return res.send(null);
        // }

		// const reData = await seon.DBOneCall(`CALL SP_U_USER_IMG_GET(?)`,[
		// 	userInfo.userImgId
		// ]);

		// const filename = reData.path + '/' + reData.name;
		// const reBuffer = fs.readFileSync(filename);

		// res.writeHead(200, { "Context-Type": reData.type });
		// res.write(reBuffer);  
		// res.end();  
	}catch(e){
		console.log(e);
		return res.send(false);
	}
});

router.get('/build/file', async function(req, res){
    const userId = req.decoded.userId;
	try{
        let buildFile = await seon.DBOneCall(`CALL SP_U_REPORT_BUILD_FILE_GET(?)`, [req.query.rid]);

		return res.download(buildFile.path + buildFile.name, 'test.pdf');
	}catch(e){
		console.log(e);
		return res.send(false);
	}
});


router.get('/grade', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBOneCall(`CALL SP_A_USER_GRADE_GET(?)`,[userId]);

	return res.send(reData);
});

router.get('/mypage/info', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_U_MYPAGE_INFO_GET(?)`, [userId]);

	const fEmail = reData.email.split('@');
	reData.email = fEmail[0];
	reData.emailCom = fEmail[1];

	const fPhone = reData.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`).split('-');
	reData.phone1 = fPhone[0];
	reData.phone2 = fPhone[1];
	reData.phone3 = fPhone[2];

	return res.send(reData);
});

router.post('/mypage/info/update', seon.fileUpload, async (req, res) =>{
	const userId = req.decoded.userId;
    const path = 'uploads/files';

    let imgId = null;
    if(req.files && req.files.length){
        imgId = await seon.DBOneCall(`CALL SP_U_USER_FILE_ADD(?,?,?,?)`,[
            req.files[0].mimetype,
            req.files[0].size,
            req.files[0].filename,
            path
          ]);
    }

	if(imgId){
		await seon.DBCall(`CALL SP_U_MYPAGE_INFO_IMG_UPDATE(?,?,?,?,?,?)`, [
			userId, 
			req.body.name,
			req.body.birthday,
			req.body.phone1 + req.body.phone2 + req.body.phone3,
			req.body.email + '@' + req.body.emailCom,
			imgId ? imgId.id : null,
		]);
	}else{
		await seon.DBCall(`CALL SP_U_MYPAGE_INFO_UPDATE(?,?,?,?,?)`, [
			userId, 
			req.body.name,
			req.body.birthday,
			req.body.phone1 + req.body.phone2 + req.body.phone3,
			req.body.email + '@' + req.body.emailCom,
		]);

	}
	return res.send(true);
});

router.post('/mypage/info/quit', async (req, res) =>{
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_U_MYPAGE_INFO_QUIT(?,?,?)`, [
		userId, 
		req.body.reason,
		req.body.moreMemo
	]);

	return res.send(true);
});


router.post('/mypage/inqu/add', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBOneCall(`CALL SP_U_MYPAGE_INFO_PWD_CHECK(?,?)`, [userId, req.body.pw]);
	
	if(!reData){
		return res.status(500).json({
			status: 500,
			message: "비밀번호가 일치하지 않습니다."
		});
	}

	await seon.DBOriginCall(`CALL SP_U_MYPAGE_INQU_ADD(?,?,?)`, [
		userId, 
		req.body.title,
		req.body.memo
	]);

	return res.send(true);
});



router.get('/mypage/inqu', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_U_MYPAGE_INQU_GET(?,?)`, [
		userId, 
		req.query.pg,
	]);

	return res.send(reData);
});

router.get('/mypage/inqu/item', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBOneCall(`CALL SP_U_MYPAGE_INQU_ITEM_GET(?,?)`, [
		userId, 
		req.query.id,
	]);

	return res.send(reData);
});


router.get('/mypage/report', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_U_REPORT_BEFORE_GET_PAGE(?,?)`, [
		userId, 
		req.query.pg,
	]);

	return res.send(reData);
});

router.get('/mypage/good/list', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_U_MYPAGE_GOOD_LIST_GET_PAGE(?,?)`, [
		userId, 
		req.query.pg,
	]);

	return res.send(reData);
});
router.get('/mypage/good/use', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_U_MYPAGE_GOOD_USE_GET_PAGE(?,?)`, [
		userId, 
		req.query.pg,
	]);

	return res.send(reData);
});
router.get('/mypage/pay', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_U_MYPAGE_PAY_GET_PAGE(?,?)`, [
		userId, 
		req.query.pg,
	]);

	return res.send(reData);
});
router.post('/mypage/pay/del', async (req, res) =>{
	const userId = req.decoded.userId;
	
	for(let i=0;i<req.body.idList.length;i++){
		await seon.DBCall(`CALL SP_U_MYPAGE_PAY_DEL_UPDATE(?)`, [
			req.body.idList[i],
		]);
	}

	return res.send(true);
});


router.post('/report/add', async (req, res) =>{
	const userId = req.decoded.userId;

	if(!req.body.admCd || !req.body.tradeType){
	  return res.send({st:false,msg:'잘못된 접근'});
	}

	const uData = await seon.getBrExposPubuseAreaInfo(req.body);

	if(!uData.st){
	  return res.send({st:false,msg:'매칭되는 매물이 없습니다.1'});
	}
	
	let adrLoad = '';
	if(req.body.buldSlno == '0'){
	  adrLoad = req.body.rn + ' ' + req.body.buldMnnm;
	}else{
	  adrLoad = req.body.rn + ' ' + req.body.buldMnnm + '-' + req.body.buldSlno;
	}
  
	let itemType = null;
	let itemTypeNm = null;

	//아파트		APT		02001
	//오피스텔		OPST	14202
	//다가구		DDDGG	02xxx
	//주택			JT		01xxx

	if(uData.item.mainPurpsCd == '02001'){
		itemType = 'APT';
		itemTypeNm = '아파트';
	}else if(uData.item.mainPurpsCd == '14202'){
		itemType = 'OPST';
		itemTypeNm = '오피스텔';
	}else if(uData.item.mainPurpsCd[1] == 2){
		itemType = 'DDDGG';
		itemTypeNm = '연립다세대';
	}else if(uData.item.mainPurpsCd[1] == 1){
		itemType = 'JT';
		itemTypeNm = '단독주택';
	}

	const userReport = await seon.DBOneCall(`CALL SP_U_REPORT_USE_GET(?,?)`,[req.body.gId, userId]);

	console.log('--------------');
	console.log(userReport);
	console.log('--------------');

	if(!userReport){
		return res.send({st:false,msg:'유효하지 않은 이용권입니다.'});
	}
	if(userReport.mid != userId){
		return res.send({st:false,msg:'유효하지 않은 이용권입니다.'});
	}
	if(!dayjs(dayjs()).isBetween(userReport.dateS, userReport.dateE, null, '[]')){
		return res.send({st:false,msg:'유효기간이 만료된 이용권입니다.'});
	}


   
	let pyData = null;
	if(itemType == 'APT' || itemType == 'OPST'){
        
        console.log(req.body.pnu, itemType, uData.item.area);

		pyData = await seon.DBOneCall(`CALL SP_U_REPORT_BEFORE_PY_CHECK(?,?,?)`,[
			req.body.pnu,
			itemType,
			uData.item.area
		]);

        


		if(!pyData){
			return res.send({st:false,msg:'매칭되는 매물이 없습니다..'});
		}
	}else{
		pyData = await seon.DBOneCall(`CALL SP_U_REPORT_BEFORE_PY_CHECK2(?,?)`,[
			req.body.pnu,
			uData.item.area
		]);

		if(!pyData){
			return res.send({st:false,msg:'매칭되는 매물이 없습니다..'});
		}

		pyData.realEstateTypeName = itemTypeNm;
		pyData.realEstateTypeCode = itemType;
		pyData.pyeongNo = 1;
		pyData.pyeongName = Math.floor(pyData.supplySpace);
		pyData.supplyAreaDouble = pyData.supplySpace;
		pyData.exclusiveArea = pyData.exclusiveSpace;
	}
	


	//사용자 리포트 정보 우선 저장
	const insertBeforeData = await seon.DBOneCall(`CALL SP_U_REPORT_BEFORE_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		userId,
		pyData.cortarNo,
		pyData.articleNo ? pyData.articleNo : null,
		pyData.complexNo ? pyData.complexNo : null,
		req.body.bdNm && pyData.complexName ? req.body.bdNm : pyData.complexName,
		pyData.useApproveYmd,
		req.body.siNm,
		req.body.sggNm,
		req.body.emdNm,
		req.body.liNm,
		req.body.lnbrMnnm,
		req.body.lnbrSlno,
		req.body.rn,
		req.body.buldMnnm,
		req.body.buldSlno,
		req.body.dongNm.replace(/[^0-9]/g, ""),
		req.body.hoNm.replace(/[^0-9]/g, ""),
		req.body.floorNm,
		pyData.realEstateTypeName,
		pyData.realEstateTypeCode,
		pyData.pyeongNo,
		pyData.pyeongName,
		pyData.supplyAreaDouble,
		pyData.exclusiveArea,
		req.body.tradeType,
		req.body.dealPrice,
		req.body.leasePrice,
		req.body.rentPrice,
		uData.item.mainPurpsCdNm,
	]);
	
	if(!insertBeforeData){
		return res.send({st:false,msg:'SP_U_REPORT_BEFORE_ADD 에러'});
	}


	const reBeData = await seon.DBOneCall(`CALL SP_U_REPORT_BEFORE_GET(?)`,[insertBeforeData.id]);

	
	// 차트
	const chartData = await seon.getHyphenPriceList(
		{
			siNm: req.body.siNm,
			sggNm: req.body.sggNm,
			emdNm: req.body.emdNm, 
		}, 
		req.body.lnbrSlno == '0' ? req.body.lnbrMnnm : req.body.lnbrMnnm+'-'+req.body.lnbrSlno,
		uData.item.area, reBeData.tradeType, 
		{
			dealPrice: reBeData.dealPrice,
			leasePrice: reBeData.leasePrice,
			rentPrice: reBeData.rentPrice,
		},
		itemType
	);


	let realPrcList = null;
	let hoPrc = null;
	let hoAvgPrcList = null;
	if(itemType == 'APT' || itemType == 'OPST'){
		//실거래 통계
		realPrcList = await seon.DBCall(`CALL SP_U_RESULT_REPORT_REAL_PRC(?,?,?,?)`,[
			reBeData.cortarNo,
			reBeData.complexNo,
			reBeData.pyeongNo,
			reBeData.tradeType
		]);

		//해당 아파트 호가
		hoPrc = await seon.DBOneCall(`CALL SP_U_RESULT_REPORT_HO_PRC(?,?,?,?)`,[
			reBeData.cortarNo,
			reBeData.complexNo,
			reBeData.pyeongNo,
			reBeData.realEstateTypeCode
		]);

		//주변 호가
		hoAvgPrcList = await seon.DBOneCall(`CALL SP_U_RESULT_REPORT_AVG_HO_PRC(?,?,?,?)`,[
			reBeData.complexNo,
			reBeData.cortarNo,
			reBeData.realEstateTypeCode,
			reBeData.supplyAreaDouble
		]);
	}else{
		realPrcList = chartData.itemList;

		const reHo = await seon.DBOriginCall(`CALL SP_U_RESULT_REPORT_HO_A_PRC(?,?)`,[
			req.body.pnu,
			uData.item.area
		]);
		hoPrc = Object.assign({}, reHo[0][0], reHo[1][0], reHo[2][0]);

		const reAHo = await seon.DBOriginCall(`CALL SP_U_RESULT_REPORT_AVG_HO_A_PRC(?,?)`,[
			reBeData.cortarNo,
			uData.item.area
		]);
		hoAvgPrcList = Object.assign({}, reAHo[0][0], reAHo[1][0], reAHo[2][0], reAHo[3][0], reAHo[4][0], reAHo[5][0]);

	}
	
	
	// return res.send({st:false,msg:'------------'});
	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	

	//4 해당 아파트 최근 2년간 실거래가 통계
	const report4 = seon.getReport4(reBeData.tradeType, realPrcList);
	
	//5 해당 아파트 가격 분석
	const report5 = seon.getReport5(
		reBeData.tradeType, 
		report4.avgObj,
		{
		dealPrice: reBeData.dealPrice,
		leasePrice: reBeData.leasePrice,
		rentPrice: reBeData.rentPrice,
		},
		reBeData.realEstateTypeName,
		hoPrc
	);
	
	//6 주변 지역 아파트 가격분석
	const report6 = seon.getReport6(
		reBeData.tradeType, 
		{
		dealPrice: reBeData.dealPrice,
		dealPricePerSpace: Math.floor(reBeData.dealPrice/(reBeData.supplyAreaDouble/3.3058)),
		leasePrice: reBeData.leasePrice,
		leasePricePerSpace: Math.floor(reBeData.leasePrice/(reBeData.supplyAreaDouble/3.3058)),
		rentPrice: reBeData.rentPrice,
		},
		reBeData.realEstateTypeName,
		reBeData.emdNm,
		hoAvgPrcList
	);
	
	//7 주변 사용승인 기준 호가
	const report7 = await seon.getReport7(
		reBeData.cortarNo,
		reBeData.realEstateTypeCode,
		reBeData.supplyAreaDouble,
		itemType
	);
	
	//8 건설사 기준
	const report8 = await seon.getReport8(
		reBeData.tradeType, 
		{
		dealPrice: reBeData.dealPrice,
		leasePrice: reBeData.leasePrice,
		},
		reBeData.cortarNo,
		reBeData.realEstateTypeCode,
		reBeData.supplyAreaDouble,
		itemType
	);
	
	//9 부동산등기
	const regData = await seon.getRegistered(reBeData);
	if(!regData){
		return res.send({st:false, msg:'부동산등기번호 조회 오류'});
	}

	//표제부 발급
	await seon.DBCall(`CALL SP_SC_BUILD_ADD(?,?,?)`,[
		insertBeforeData.id,
		req.body.pnu,
		req.body.dongNm,
	]);
	
	
	let b1Score = 100;
	let prScore = 100;
	let rtScore = 100;
	let totalScore = 100;
	let scoreInfo = [];
	
	//10 전세 점수 
	let report9 = null;
	let realData = null;
	if(reBeData.tradeType == 'B1'){
		let a1RealPrcList = null;
		let hoAvgPrc_ = null;

		if(itemType == 'APT' || itemType == 'OPST'){
			a1RealPrcList = await seon.DBCall(`CALL SP_U_RESULT_REPORT_REAL_PRC(?,?,?,?)`,[
				reBeData.cortarNo,
				reBeData.complexNo,
				reBeData.pyeongNo,
				'A1'
			]);

			hoAvgPrc_ = await seon.DBOneCall(`CALL SP_U_RESULT_REPORT_AVG_HO_PRC2(?,?)`,[
				reBeData.realEstateTypeCode,
				reBeData.supplyAreaDouble
			]);
		}else{
			const reHo = await seon.DBOriginCall(`CALL SP_U_RESULT_REPORT_HO_A_PRC(?,?)`,[
				req.body.pnu,
				uData.item.area
			]);
			a1RealPrcList = reHo[0][0];

			const reAHo = await seon.DBOriginCall(`CALL SP_U_RESULT_REPORT_AVG_HO_A_PRC2(?)`,[
				uData.item.area
			]);
			hoAvgPrc_ = Object.assign({}, reAHo[0][0], reAHo[1][0], reAHo[2][0], reAHo[3][0], reAHo[4][0], reAHo[5][0]);
		}
		
	
		report9 = await seon.getReport9(
			reBeData.leasePrice,
			a1RealPrcList,
			realPrcList,
			hoAvgPrc_
		);

		if(report9){
			b1Score -= report9.score;
			b1Score -= regData.b1MoreInfo.score;
			scoreInfo = scoreInfo.concat(report9.scoreInfo);
			scoreInfo = scoreInfo.concat(regData.b1MoreInfo.scoreInfo);
		}

		realData = await seon.getRealtyPrice(
		req.body.jibunAddr, 
		req.body.siNm,
		req.body.dongNm.replace(/[^0-9]/g, ""), 
		req.body.hoNm.replace(/[^0-9]/g, ""),
		reBeData.leasePrice,
		regData.collateralPrcNum,
		regData.b1MoreInfo
		);

		b1Score -= realData.score;
		scoreInfo = scoreInfo.concat(realData.scoreInfo);
	}

	prScore -= chartData.score;
	prScore -= report5.score;
	prScore -= report6.score;
	rtScore -= regData.score;
	if(reBeData.tradeType == 'B1'){
		totalScore = Math.floor((prScore + rtScore + b1Score) / 3);
	}else{
		totalScore = Math.floor((prScore + rtScore) / 2);
	}
	scoreInfo = scoreInfo.concat(chartData.scoreInfo);
	scoreInfo = scoreInfo.concat(report5.scoreInfo);
	scoreInfo = scoreInfo.concat(report6.scoreInfo);
	scoreInfo = scoreInfo.concat(regData.scoreInfo);
	
	// console.log(regData);
	
	seon.DBCall(`CALL SP_U_REPORT_BEFORE_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		insertBeforeData.id,
		JSON.stringify(chartData),
		JSON.stringify(report4),
		JSON.stringify(report5),
		JSON.stringify(report6),
		JSON.stringify(report7),
		JSON.stringify(report8),
		report9 ? JSON.stringify(report9) : null,
		realData ? JSON.stringify(realData) : null,
		JSON.stringify(scoreInfo),
		JSON.stringify(regData),
		prScore,
		rtScore,
		b1Score,
		totalScore,
	]);
	

	if(userReport.cnt == 1){
		//해당리포트 삭제
		await seon.DBCall(`CALL SP_U_REPORT_USE_DEL(?)`,[userReport.id]);
	}else{
		//해당리포트 cnt 차감
		await seon.DBCall(`CALL SP_U_REPORT_USE_CNT(?)`,[userReport.id]);
	}

	//리포트 사용기록 
	await seon.DBCall(`CALL SP_U_REPORT_USE_ADD(?,?,?,?,?,?,?,?)`,[
		userId,
		insertBeforeData.id,
		req.body.gId,
		userReport.type,
		userReport.name,
		userReport.info,
		userReport.grade,
		null,
	]);










   

	return res.send({st:true,msg:null});
});

router.post('/mypage/report/del', async (req, res) =>{
	const userId = req.decoded.userId;
	
	for(let i=0;i<req.body.idList.length;i++){
		await seon.DBCall(`CALL SP_U_REPORT_BEFORE_DELETE(?)`, [
			req.body.idList[i],
		]);
	}

	return res.send(true);
});


router.get('/report/result/realprc', async (req, res) =>{
	const report = await seon.DBOneCall(`CALL SP_U_REPORT_BEFORE_GET(?)`,[req.query.id]);
  
	return res.send(report);
});



router.post('/mypage/pwd/check', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBOneCall(`CALL SP_U_MYPAGE_INFO_PWD_CHECK(?,?)`, [userId, req.body.password]);

	if(reData){
		return res.send(true);
	}else{
		return res.send(false);
	}
});

router.post('/mypage/pwd/change', async (req, res) =>{
	const userId = req.decoded.userId;

	await seon.DBOriginCall(`CALL SP_U_MYPAGE_INFO_PWD_CHAGE(?,?,?)`, [
		userId, 
		req.body.password,
		req.body.passwd
	]);

	return res.send(true);
});




router.post('/alarm', async (req, res) =>{
	const userId = req.decoded.userId;

	const reData = await seon.DBOneCall(`CALL SP_U_APPLY_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
		userId,
		req.body.name,
		req.body.phone1,
		req.body.phone2,
		req.body.phone3,
		req.body.RRN1,
		req.body.RRN2,
		req.body.jibunAddr,
		req.body.detailAddr,
		req.body.applyType,
		req.body.applyJibunAddr,
		req.body.applyDetailAddr,
		req.body.applyService,
	]);

	return res.send(reData);
	
});

router.get('/noti', async (req, res) => {
	const userId = req.decoded.userId;
	let gradeObj = await seon.DBOneCall(`CALL SP_U_USER_GRADE_GET(?)`, [
		userId
	]);

	let type = 'normal';
	if(gradeObj && gradeObj.grade == 0){
		type = 'biz';
	}

	let reData = await seon.DBPageCall(`CALL SP_U_CS_NOTICE_GET(?,?,?)`, [
		req.query.pg,
		req.query.size,
		type,	//biz, normal
	]);

	return res.send(reData);
});
router.get('/news', async (req, res) => {
	const userId = req.decoded.userId;
	let gradeObj = await seon.DBOneCall(`CALL SP_U_USER_GRADE_GET(?)`, [
		userId
	]);

	let type = 'normal';
	if(gradeObj && gradeObj.grade == 0){
		type = 'biz';
	}


	let reData = await seon.DBCall(`CALL SP_U_CS_NEWS_GET(?)`, [
		type
	]);

	return res.send(reData);
});
router.get('/noti/simple', async (req, res) => {
	const userId = req.decoded.userId;
	let gradeObj = await seon.DBOneCall(`CALL SP_U_USER_GRADE_GET(?)`, [
		userId
	]);

	let type = 'normal';
	if(gradeObj && gradeObj.grade == 0){
		type = 'biz';
	}

	let reData = await seon.DBPageCall(`CALL SP_U_CS_NOTICE_SIMPLE_GET(?)`, [
		type,	//biz, normal
	]);

	return res.send(reData);
});
router.get('/news/simple', async (req, res) => {
	const userId = req.decoded.userId;
	let gradeObj = await seon.DBOneCall(`CALL SP_U_USER_GRADE_GET(?)`, [
		userId
	]);

	let type = 'normal';
	if(gradeObj && gradeObj.grade == 0){
		type = 'biz';
	}


	let reData = await seon.DBCall(`CALL SP_U_CS_NEWS_SIMPLE_GET(?)`, [
		type
	]);

	return res.send(reData);
});
router.get('/report/simple', async (req, res) => {
	const userId = req.decoded.userId;
	
	let reData = await seon.DBCall(`CALL SP_U_REPORT_BEFORE_SIMPLE_GET(?)`, [
		1
	]);

	return res.send(reData);
});

router.get('/goods', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBOriginCall(`CALL SP_U_GOOD_GET(?)`,[userId]);

	if(!reData){
		return res.send(false);
	}

	return res.send({
		normalGood : reData[0].length ? reData[0][0] : null,
		freeGood : reData[1].length ? reData[1][0] : null,
		bizGood : reData[2].length ? reData[2][0] : null,
	});
});
router.get('/goods/normal', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBOneCall(`CALL SP_U_GOOD_NORMAR_GET()`);

	return res.send(reData);
});
router.get('/goods/item', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[req.query.gid]);

	return res.send(reData);
});
router.get('/goods/biz', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBCall(`CALL SP_U_GOOD_BIZ_GET()`,[req.query.gid]);

	return res.send(reData);
});

router.get('/paySave', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBOneCall(`CALL SP_U_PAY_SAVE_GET(?)`,[userId]);

	if(!reData){
		return res.send(false);
	}

	const receiptInfo = {
		tax: {
			businessNum1: reData.businessNum1,
			businessNum2: reData.businessNum2,
			businessNum3: reData.businessNum3,
			medOfficeNm: reData.medOfficeNm,
			rprsvNm: reData.rprsvNm,
			manager: reData.manager,
			email: reData.email,
			tel1: reData.tel1,
			tel2: reData.tel2,
			tel3: reData.tel3,
			typeBiz: reData.typeBiz,
			itemsBiz: reData.itemsBiz,
			address: reData.address,
			detailAddress: reData.detailAddress,
		},
		receipt: {
			normal: {
				card: {
					cardNum1: reData.cardNum1,
					cardNum2: reData.cardNum2,
					cardNum3: reData.cardNum3,
					cardNum4: reData.cardNum4,
				},
				phone: {
					tel1: reData.tel1,
					tel2: reData.tel2,
					tel3: reData.tel3,
				},
			},
			bus: {
				businessNum1: reData.businessNum1,
				businessNum2: reData.businessNum1,
				businessNum3: reData.businessNum1,
			},
		},
	};
	const selected = {
		payType: reData.payType,
		isRType: reData.receiptType,
		isRUsage: reData.receiptType == 'receipt' ? reData.usage : 'normal',
		isRlssued: reData.usage == 'normal' ? reData.lssuedInfo : 'card', 
	};

	return res.send({receiptInfo:receiptInfo, selected:selected});
});
router.post('/paySave', async (req, res) => {
	const userId = req.decoded.userId;
	const receiptInfo = req.body.receiptInfo;

	if(req.body.saveST){
		await seon.DBCall(`CALL SP_U_PAY_SAVE_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			userId,
			receiptInfo.payType,
			isEmpty(receiptInfo.receiptType),
			isEmpty(receiptInfo.businessNum1),
			isEmpty(receiptInfo.businessNum2),
			isEmpty(receiptInfo.businessNum3),
			isEmpty(receiptInfo.medOfficeNm),
			isEmpty(receiptInfo.rprsvNm),
			isEmpty(receiptInfo.manager),
			isEmpty(receiptInfo.email),
			isEmpty(receiptInfo.tel1),
			isEmpty(receiptInfo.tel2),
			isEmpty(receiptInfo.tel3),
			isEmpty(receiptInfo.typeBiz),
			isEmpty(receiptInfo.itemsBiz),
			isEmpty(receiptInfo.address),
			isEmpty(receiptInfo.detailAddress),
			receiptInfo.receiptType == 'receipt' ? isEmpty(receiptInfo.usage) : null ,
			isEmpty(receiptInfo.cardNum1),
			isEmpty(receiptInfo.cardNum2),
			isEmpty(receiptInfo.cardNum3),
			isEmpty(receiptInfo.cardNum4),
			receiptInfo.usage == 'normal' ? isEmpty(receiptInfo.lssuedInfo) : null,
		]);
	}

	return res.send(true);
});

router.post('/pay/oidReq', async (req, res) => {
	const userId = req.decoded.userId;
	const receiptInfo = req.body.receiptInfo;

    const reIdObj = await seon.DBOneCall(`CALL SP_U_PAY_LOG_REQ_ADD(?,?,?,?)`,[
        req.body.gid,
        userId,
        req.body.price,
        req.body.payType,
    ]);
    if(!reIdObj){
        return res.send(false);
    }


    const goodObj = await seon.DBOneCall(`CALL SP_U_GOOD_ITEM_GET(?)`,[req.body.gid]);
    if(!goodObj){
        return res.send(false);
    }

    if(req.body.price != goodObj.price){
        return res.send(false);
    }

    const oid = reIdObj.id + '_' + goodObj.gId + '_' + userId + '_' + goodObj.price;
    const reOidObj = await seon.DBCall(`CALL SP_U_PAY_LOG_OID_UPDATE(?,?)`,[
        reIdObj.id,
        oid,
    ]);


	return res.send(oid);
});

router.get('/inform', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBCall(`CALL SP_U_INFORM_GET(?)`,[userId]);

	return res.send(reData);
});

router.post('/inform', async (req, res) => {
	const userId = req.decoded.userId;
	let reData = await seon.DBCall(`CALL SP_U_INFORM_UPDATE(?)`,[req.body.id]);

    if(reData){
        return res.send(true);
    }else{
        return res.send(false);
    }
});



module.exports = router;

