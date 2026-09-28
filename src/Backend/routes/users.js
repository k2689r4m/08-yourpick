var express = require('express');
var router = express.Router();
const axios = require('axios');
const crypto = require('crypto-js');
const refresh = require("../middleware/refresh");
const redisClient = require('../util/redis.util');
const jwt = require('../util/jwt.util');
const db = require('../database/connect/config');
const requestIp = require('request-ip');
const { v4 } = require('uuid');
const seon = require('../seon');
const fs = require("fs");
const imgToPDF = require('image-to-pdf')
const AppleAuth = require('apple-auth');
const applConfig = fs.readFileSync("./appleConfig.json");
const appleAuth = new AppleAuth(applConfig, './key/AuthKey_HB4TX87Q27.p8');
const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);
const jwt_ = require('jsonwebtoken');

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

router.post('/access', async (req, res) =>{
  const userIp = requestIp.getClientIp(req);

  await seon.DBCall(`CALL SP_U_ACCESS_LOG(?)`,[userIp]);

  return res.send(true);
});

/* GET users listing. */
router.get('/refresh', refresh, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async (req, res) =>{
  let info = {type: false, message: ''};
  let {userId, password} = req.body

  if(!(userId && password)){
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }

  const reData = await seon.DBOneCall(`CALL SP_LOGIN(?,?)`,[
    userId,
    password
  ]);

  if(reData && reData.id){
    const userIp = requestIp.getClientIp(req);
    await seon.DBCall(`CALL SP_LOGIN_LOG_ADD(?,?)`,[reData.id, userIp]);

    const accessToken = jwt.sign(reData.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reData.id+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.status(200).json({
        status: 200,
        info: info,
        token: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
  }
  else{
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
  
});
router.post('/biz/login', async (req, res) =>{
  let info = {type: false, message: ''};
  let {userId, password} = req.body

  if(!(userId && password)){
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }

  const reData = await seon.DBOneCall(`CALL SP_LOGIN(?,?)`,[
    userId,
    password
  ]);

  if(reData && reData.id){
    if(reData.state != 'done'){
      return res.status(400).json({
        status: 400,
        message: "승인되지 않은 계정입니다."
      });
    }


    const userIp = requestIp.getClientIp(req);
    await seon.DBCall(`CALL SP_LOGIN_LOG_ADD(?,?)`,[reData.id, userIp]);

    const accessToken = jwt.sign(reData.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reData.id+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.status(200).json({
        status: 200,
        info: info,
        token: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
  }
  else{
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
  
});

router.post('/admin/login', async (req, res) =>{
  let info = {type: false, message: ''};
  let {userId, password} = req.body

  if(!(userId && password)){
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }

  const reData = await seon.DBOneCall(`CALL SP_A_LOGIN(?,?)`,[
    userId,
    password
  ]);

  if(reData && reData.id){
    const accessToken = jwt.sign(reData.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reData.id+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.status(200).json({
        status: 200,
        info: info,
        token: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
  }
  else{
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
  
});

router.get('/login/naver', async (req, res) =>{
  const code = req.query.code;
  const state = req.query.state;
  
  const client_id = process.env.NAVER_CLIENT_ID;
  const client_secret = process.env.NAVER_CLIENT_SECRET;
  
  const api_url = 'https://nid.naver.com/oauth2.0/token';

  const re = await axios.get(api_url,{
    params: {
      'grant_type': 'authorization_code',
      'client_id': client_id,
      'client_secret': client_secret,
      'redirect_uri': process.env.VUE_APP_HOST,
      'code':code,
      'state':state
    },
    headers: {
      'X-Naver-Client-Id':client_id, 
      'X-Naver-Client-Secret': client_secret
    }
  });

  if(re.status == 200 && 'error' in re.data){
    return res.redirect(process.env.VUE_APP_HOST);
  }




  const reData = await axios.get('https://openapi.naver.com/v1/nid/me',{
    headers: {
      'Authorization':"Bearer " + re.data.access_token, 
    }
  });

  if(reData.status != 200 && reData.resultcode != '00'){
    return res.redirect(process.env.VUE_APP_HOST);
  }
  const userInfo = reData.data.response;


  let info = {type: false, message: ''};
  const reUser = await seon.DBOneCall(`CALL SP_LOGIN_NAVER(?)`,[
    userInfo.id
  ]);

  if(reUser && reUser.id){
    const accessToken = jwt.sign(reUser.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reUser.id+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.redirect(`${process.env.VUE_APP_HOST}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }else{
    // const reCheck = await seon.DBOneCall(`CALL SP_U_USER_CHECK(?)`,[userInfo.email]);  

    // if(reCheck){
    //   return res.redirect(process.env.VUE_APP_HOST+ '?error=이미 가입한 계정이 있습니다.');
    // }

    // const reId = await seon.DBOneCall(`CALL SP_U_USER_ADD_NAVER(?,?,?,?,?,?,?,?)`,[
    //   userInfo.name, 
    //   userInfo.birthyear + '-' + userInfo.birthday,
    //   userInfo.mobile,
    //   userInfo.email,
    //   '!@#$'+userInfo.id,
    //   0,
    //   'naver',
    //   userInfo.id,
    // ]);

    // const accessToken = jwt.sign(reId.id+'');
    // const refreshToken = jwt.refresh();

    // redisClient.set(reId.id+'', refreshToken);

    // info.message = 'success';
    // res.setHeader('Content-Type','application/json; charset=utf-8');
    // res.setHeader('Authorization', 'Bearer ' + accessToken);
    // res.setHeader('Refresh', 'Bearer ' + refreshToken);
    // return res.redirect(`${process.env.VUE_APP_HOST}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    return res.redirect(`${process.env.VUE_APP_HOST}/join/agree?naverId=${userInfo.id}`);
  }
  
});

router.get('/login/kakao', async (req, res) =>{
  const client_id = process.env.KAKAO_CLIENT_ID;
  const client_secret = process.env.KAKAO_CLIENT_SECRET;
  const api_url = 'https://kauth.kakao.com/oauth/token';
  console.log("12312312321123123");

  try{
    const re = await axios.get(api_url,{
      params: {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'redirect_uri': process.env.SERVER_HOST + '/user/login/kakao',
        'code': req.query.code,
        'client_secret': client_secret,
      },
      headers: {
        'Content-type':'application/x-www-form-urlencoded;charset=utf-8', 
      }
    });


    if(re.status == 200 && 'error' in re.data){
      return res.redirect(process.env.VUE_APP_HOST);
    }

    // console.log(re.data);
    
    const reData = await axios.get('https://kapi.kakao.com/v2/user/me',{
      params: {
        'property_keys':  ["kakao_account.email", "kakao_account.birthyear", "kakao_account.birthday"],
      },
      headers: {
        'Authorization':"Bearer " + re.data.access_token, 
        'Content-type':'application/x-www-form-urlencoded;charset=utf-8', 
      }
    });

    if(reData.status != 200 ){
      return res.redirect(process.env.VUE_APP_HOST);
    }

    const reCheck = await seon.DBOneCall(`CALL SP_U_USER_APPLE_CHECK(?)`,[reData.data.id]);  
    if(reCheck){
      const accessToken = jwt.sign(reCheck.id+'');
      const refreshToken = jwt.refresh();
  
      redisClient.set(reCheck.id+'', refreshToken);
  
      res.setHeader('Content-Type','application/json; charset=utf-8');
      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.setHeader('Refresh', 'Bearer ' + refreshToken);

      return res.redirect(`${process.env.VUE_APP_HOST}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }else{
      return res.redirect(`${process.env.VUE_APP_HOST}/join/agree?kakaoId=${reData.data.id}`);
    }
  }catch(e){
    return res.redirect(process.env.VUE_APP_HOST);
  }


  return res.status(200).json({
    status: 200,
  });
});

router.post('/login/apple', async (req, res) =>{
  let { code } = req.body;

  if (!code) { 
    return res.status(200).json({
      status: 400,
    });
  } 
  const response  = await appleAuth.accessToken(code);
  const idToken = jwt_.decode(response.id_token);

  const reCheck = await seon.DBOneCall(`CALL SP_U_USER_APPLE_CHECK(?)`,[idToken.sub]);  
  if(reCheck){

    const accessToken = jwt.sign(reCheck.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reCheck.id+'', refreshToken);

    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.redirect(`${process.env.VUE_APP_HOST}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }else{
    return res.redirect(`${process.env.VUE_APP_HOST}/join/agree?appleId=${idToken.sub}`);
  }
})

router.get('/test', async (req, res) =>{
	console.log("asdasdasdasd");

	return res.status(200).json({
	    status: 200,
	});
});


router.get('/adr', async (req, res) =>{
  let reData = null;


  if(req.query.step == 1){
    reData = await seon.DBCall(`CALL SP_SC_GET_ADR_1()`);
  }else if(req.query.step == 2){
    reData = await seon.DBCall(`CALL SP_SC_GET_ADR_2(?)`,[req.query.id]);
  }else if(req.query.step == 3){
    reData = await seon.DBCall(`CALL SP_SC_GET_ADR_3(?)`,[req.query.id]);
  }
  
  return res.send(reData);
});

router.get('/report/address/select', async (req, res) =>{
  const reData = await seon.DBPageCall(`CALL SP_U_REPORT_ADDRESS_GET(?,?,?)`,[req.query.jibunAddress,req.query.jibun, req.query.page]);
  return res.send(reData);
});



router.get('/addr/link', async (req, res) =>{
  const addr = await seon.getAddrLink(req.query.addr);
  // const addrDeatil = await seon.getAddrDetail(addr.juso);
  
  return res.send(addr);
});

router.get('/addr/linkDetail', async (req, res) =>{
  const param = {
    admCd: req.query.admCd,
    rnMgtSn: req.query.rnMgtSn,
    buldMnnm: req.query.buldMnnm,
    buldSlno: req.query.buldSlno,
  }

  const addrDeatil = await seon.getAddrDetail1(param);

  return res.send(addrDeatil);
});

router.get('/addr/linkDetail2', async (req, res) =>{
  const param = {
    admCd: req.query.admCd,
    rnMgtSn: req.query.rnMgtSn,
    buldMnnm: req.query.buldMnnm,
    buldSlno: req.query.buldSlno,
    dongNm: req.query.dongNm,
  }

  const addrDeatil = await seon.getAddrDetail2(param);

  return res.send(addrDeatil);
});


router.post('/re/passwd', async (req, res) =>{
    try{
        const rePasswd = (v4()).split('-')[0];
        const reUser = await seon.DBOneCall(`CALL SP_U_USER_CHECK(?)`,[req.body.email]);  
    
        if(!reUser){
            return res.status(500).json({
              status: 500,
              message: "등록되지 않은 이메일입니다."
            });
        }
    
        await seon.DBCall(`CALL SP_U_PWD_CHAGE(?,?)`,[reUser.id, rePasswd]);  
        
        await seon.sendSMS([
            {
              to: reUser.phone,
              from: '0226775319',
              text: '임시비밀번호 : ' + rePasswd
            }
        ]);

        return res.send(true);
    }catch(e){        
        console.log(e);
        return res.status(500).json({
            status: 500,
            message: "잠시 후 다시 시도해 주세요."
        });
    }
});

router.post('/join/cert', async (req, res) =>{
  try{
    const phoneList = await seon.DBCall(`CALL SP_U_USER_PHONE_CHECK(?)`,[req.body.phone]);

    if(phoneList.length){
      return res.status(200).json({
        status: 1,
        message: "이미존재함"
      });
    }
  
    let otpNum = '';
  
    for(let i=0;i<6;i++){
      const num = Math.floor(Math.random()*9);
      otpNum += num;
    }

    if(req.body.phone == '01099990000'){
      otpNum = '999000';
    }
  
    await seon.DBOriginCall(`CALL SP_OTP_ADD(?,?)`,[req.body.phone, otpNum]);  
  
    const re = await seon.sendSMS([
      {
        to: req.body.phone,
        from: '0226775319',
        text: otpNum
      }
    ]);

    return res.status(200).json({
      status: 0,
      msg: "전송완료"
    });
  }catch(e){
    return res.status(500).json({
      status: 500,
      message: "잠시후 다시 시도 해주세요."
    });
  }


  // return res.status(500).json({
  //   status: 500
  // });
});

router.post('/join/cert/check', async function(req, res){
	const re = await seon.DBOneCall(`CALL SP_OTP_GET(?,?)`,[req.body.phone, req.body.otpNum]);  
  
  if(re){
    return res.send(true);
  }
  else{
    return res.send(false);
  }
});

router.post('/join/create', async function(req, res){
  const re = await seon.DBOneCall(`CALL SP_U_USER_CHECK(?)`,[req.body.email]);  

  if(re){
    return res.status(500).json({
      status: 500,
      message: "이미 등록된 이메일입니다."
    });
  }

  await seon.DBCall(`CALL SP_U_USER_ADD(?,?,?,?,?,?,?,?)`,[
    req.body.name, 
    req.body.birthday,
    req.body.phone,
    req.body.email,
    req.body.socialType ? '!@#$'+req.body.socialCode : req.body.password,
    req.body.agreeSt,
    req.body.socialType,
    req.body.socialCode,
  ]);

  
  return res.send(true);
});

router.post('/real/adr/search', async (req, res) =>{
	let adrLoad = '';
	if(req.body.buldSlno == '0'){
	  adrLoad = req.body.rn + ' ' + req.body.buldMnnm;
	}else{
	  adrLoad = req.body.rn + ' ' + req.body.buldMnnm + '-' + req.body.buldSlno;
	}
  

	const reNo = await seon.DBOneCall(`CALL SP_U_REAL_CHECK(?,?,?)`,[
		seon.SIDO[req.body.siNm],
		req.body.sggNm,
		adrLoad
	]);
  
  
  if(reNo){
    return res.send(reNo);
  }else{
    return res.send(false);
  }

});


router.get('/real', async (req, res) =>{
  console.log(req.query.id);

  const reData = await seon.DBOriginCall(`CALL SP_U_REAL_ADR_GET(?)`,[
		req.query.id
	]);

  const address = reData[0][0].address;
  let area = [];
  let year = [];

  for(let i=0;i<reData[1].length;i++){
    area.push(reData[1][i].exclusiveArea);
  }

  for(let i=0;i<reData[2].length;i++){
    year.push(reData[2][i].year);
  }

  return res.send({
    address: address,
    area: area,
    year: year,
  });

});


router.get('/real/list', async (req, res) =>{
  const reData = await seon.DBCall(`CALL SP_U_REAL_GET(?,?,?,?)`,[
    req.query.id,
    req.query.type,
    req.query.area == '전체' ? null : req.query.area,
    req.query.year,
  ]);

  let chartData = [];
  if(reData.length){
    if(req.query.type == 'A'){
      chartData = await seon.DBCall(`CALL SP_U_REAL_CHART_A1_GET(?,?,?)`,[
        req.query.id,
        req.query.area == '전체' ? null : req.query.area,
        req.query.year,
      ]);  
    }else{
      chartData = await seon.DBCall(`CALL SP_U_REAL_CHART_B1_GET(?,?,?)`,[
        req.query.id,
        req.query.area == '전체' ? null : req.query.area,
        req.query.year,
      ]);  
    }
  }

  let dateList = [];
  let priceList = [];
  for(let i=0;i<chartData.length;i++){
    dateList.push(chartData[i].gDate);
    priceList.push(chartData[i].price);
  }
  
  return res.send({item:reData, chart:{date: dateList, price: priceList}});
});


router.get('/app/dong', async (req, res) =>{
  const reData = await seon.DBCall(`CALL SP_U_APP_DONG_GET(?,?,?)`,[
		req.query.admCd,
    req.query.lnbrMnnm,
    req.query.lnbrSlno
	]);


  let dong = [];

  for(let i=0;i<reData.length;i++){
    dong.push(reData[i].dongNm);
  }

  return res.send(dong);
});


router.get('/app/area', async (req, res) =>{
  const reData = await seon.DBCall(`CALL SP_U_APP_AREA_GET(?,?,?,?)`,[
		req.query.admCd,
    req.query.lnbrMnnm,
    req.query.lnbrSlno,
    req.query.dongNm
	]);

  let area = [];

  for(let i=0;i<reData.length;i++){
    area.push(reData[i].exclusiveArea);
  }

  return res.send(area);
});


router.get('/app/list', async (req, res) =>{
  const reData = await seon.DBCall(`CALL SP_U_APP_ITEM_GET(?,?,?,?,?)`,[
    req.query.admCd,
    req.query.lnbrMnnm,
    req.query.lnbrSlno,
    req.query.dongNm,
    req.query.area == '전체' ? null : req.query.area,
  ]);
  
  return res.send(reData);
});

router.get('/biz', async (req, res) =>{
  let itemList = [];
  let keyword = req.query.keyword;

  try{
    let page = 1;
    while(true){
      const reData = await axios.get('http://api.data.go.kr/openapi/tn_pubr_public_med_office_api',{
        params: {
          'pageNo': page++,
          'numOfRows': 100,
          'type': 'json',
          'ESTBL_REG_NO': keyword,
          'serviceKey': process.env.BUILD_KEY2
        },
      });
  
      const resultCode = reData.data.response.header.resultCode

      if(resultCode == '00'){
        const dataList = reData.data.response.body.items
        itemList.push(... dataList)
      }else{
        break;
      }
    }
  }catch(e){
    console.log(e);
  }

  try{
    let page = 1;
    while(true){
      const reData = await axios.get('http://api.data.go.kr/openapi/tn_pubr_public_med_office_api',{
        params: {
          'pageNo': page++,
          'numOfRows': 100,
          'type': 'json',
          'RPRSV_NM': keyword,
          'serviceKey': process.env.BUILD_KEY2
        },
      });
  
      const resultCode = reData.data.response.header.resultCode

      if(resultCode == '00'){
        const dataList = reData.data.response.body.items
        itemList.push(... dataList)
      }else{
        break;
      }
    }
  }catch(e){
    console.log(e);
  }

  try{
    let page = 1;
    while(true){
      const reData = await axios.get('http://api.data.go.kr/openapi/tn_pubr_public_med_office_api',{
        params: {
          'pageNo': page++,
          'numOfRows': 100,
          'type': 'json',
          'MED_OFFICE_NM': keyword,
          'serviceKey': process.env.BUILD_KEY2
        },
      });
  
      const resultCode = reData.data.response.header.resultCode

      if(resultCode == '00'){
        const dataList = reData.data.response.body.items
        itemList.push(... dataList)
      }else{
        break;
      }
    }
  }catch(e){
    console.log(e);
  }

  return res.send(
    itemList.reduce(function(acc, current) {
      if (acc.findIndex(({ estblRegNo }) => estblRegNo === current.estblRegNo) === -1) {
        acc.push(current);
      }
      return acc;
    }, [])

  );
});


router.post('/biz/create', seon.fileUpload, async function(req, res){
  const path = 'uploads/files';

  try{
    const re = await seon.DBOneCall(`CALL SP_U_USER_CHECK(?)`,[req.body.email]); 
   
    if(re){
      return res.status(500).json({
        status: 500,
        message: "이미 등록된 이메일입니다."
      });
    }

    const biz = await seon.DBOneCall(`CALL SP_U_BIZ_FILE_ADD(?,?,?,?)`,[
      req.files[0].mimetype,
      req.files[0].size,
      req.files[0].filename,
      path
    ]);

    const mid = await seon.DBOneCall(`CALL SP_U_BIZ_FILE_ADD(?,?,?,?)`,[
      req.files[1].mimetype,
      req.files[1].size,
      req.files[1].filename,
      path
    ]);

    await seon.DBCall(`CALL SP_U_BIZ_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
      req.body.email,
      req.body.password,
      req.body.birthday,
      req.body.phone,
      req.body.userType,
      req.body.medOfficeNm,
      req.body.rprsvNm,
      req.body.estblRegNo,
      req.body.address,
      req.body.telno,
      req.body.businessNum,
      biz.id,
      mid.id,
    ]);  

    return res.send(true);

  }catch(e){
    return res.status(500).json({
      status: 500,
      message: "알수 없는 오류"
    });
  }
  
  
});



router.get('/noti', async (req, res) => {
	let reData = await seon.DBPageCall(`CALL SP_U_CS_NOTICE_GET(?,?,?)`, [
		req.query.pg,
		req.query.size,
		'normal',	//biz, normal
	]);

	return res.send(reData);
});
router.get('/news', async (req, res) => {
	let reData = await seon.DBCall(`CALL SP_U_CS_NEWS_GET(?)`, [
		'normal'
	]);

	return res.send(reData);
});
router.get('/term', async (req, res) => {
	let reData = await seon.DBOneCall(`CALL SP_A_CS_TERM_GET()`);

	return res.send(reData);
});
router.get('/policy', async (req, res) => {
	let reData = await seon.DBOneCall(`CALL SP_A_CS_POLICY_GET()`);

	return res.send(reData);
});
router.get('/tip', async (req, res) => {
	let reData = await seon.DBCall(`CALL SP_U_TIP_GET()`);

	return res.send(reData);
});

router.get('/pay/close', async (req, res) => {
    // return res.redirect(process.env.VUE_APP_HOST + '/report/request/pay?mode=1&error="123213213"');
	return res.redirect(process.env.VUE_APP_HOST + '/report/request/pay?mode=1');
});

router.post('/pay/req', async (req, res) => {
    const signKey = process.env.INICIS_SIGN_KEY;
    // return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${'준비중'}`);

    console.log(req.body);

    const payInfo = req.body;
    const reUrl = process.env.VUE_APP_HOST + '/report/request/serviceType';

    if(payInfo.hasOwnProperty('resultMsg')){
      console.log("- PC 결제 -");
      if(payInfo.resultMsg != '성공'){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${payInfo.resultMsg}`);
      }

      await seon.payPC(req, res, payInfo, reUrl);

    }else if(payInfo.hasOwnProperty('P_STATUS')){
      console.log("- MOBILE 결제 -");

      if(payInfo.P_STATUS != '00'){
        return res.redirect(process.env.VUE_APP_HOST + `/report/request/pay?mode=1&error=${payInfo.P_RMESG1}`);
      }


      await seon.payMobile(req, res, payInfo, reUrl);
    }
});


router.get('/pay/vbank', async (req, res) => {
  console.log('--------- GET --------');
  console.log(req.query);
  if(payInfo.hasOwnProperty('type_msg')){
    console.log("- PC 결제 -");
    await seon.payPcNoti(res, req.query);

  }else if(payInfo.hasOwnProperty('P_STATUS')){
    console.log("- MOBILE 결제 -");
    await seon.payMobileNoti(res, req.query);
    
  }

  return res.send(false);
});

router.post('/pay/vbank', async (req, res) => {
  console.log('--------- POST --------');
  console.log(req.body);


  if(req.body.hasOwnProperty('type_msg')){
    console.log("- PC 결제 -");
    await seon.payPcNoti(res, req.body);

  }else if(req.body.hasOwnProperty('P_STATUS')){
    console.log("- MOBILE 결제 -");
    await seon.payMobileNoti(res, req.query);
    
  }else{
    return res.send(false);
  }
});


router.post('/pdfsave', async (req, res) =>{
  try{
    const imgList = req.body.imgList;
    const rid = req.body.rid;

    if(!imgList.length){
      return res.send(false);
    }


    imgToPDF(imgList, [841.89, 595.28]).pipe(fs.createWriteStream(`uploads/pdf/${rid}_build.pdf`));

    await seon.DBCall(`CALL SP_U_REPORT_BUILD_FILE_ADD(?,?,?,?)`,[
      rid,
      'application/pdf',
      `${rid}_build.pdf`,
      'uploads/pdf/'
    ]);

    return res.send(true);
  }catch(e){
    console.log(e);
    return res.send(false);
  }
});


module.exports = router;


