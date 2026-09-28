var express = require('express');
var router = express.Router();
const redisClient = require('../util/redis.util');
const db = require('../database/connect/config');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const seon = require('../seon');
const dayjs = require('dayjs');
const fs = require("fs");

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

router.get('/myinfo', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_PER_MY_GET(?)`, [userId]);

	return res.send(reData);
});


router.get('/admin', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_PER_GET(?,?)`, [req.query.pg, req.query.size]);
	
	return res.send(reData);
});

router.post('/admin/idck', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_PER_IDCHECK(?)`, [req.body.mem_id]);
	console.log(reData);
	if(reData){
		return res.send(false);
	}else{
		return res.send(true);	
	}
});

router.post('/admin/add', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_PER_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
		req.body.mem_id,
		req.body.mem_name,
		req.body.password,
		req.body.dashboard,
		req.body.user,
		req.body.statistics,
		req.body.report,
		req.body.contents,
		req.body.ticket,
		req.body.inquiry,
		req.body.pay,
		req.body.sales,
		req.body.permission,
		req.body.CS,
	]);
	
	return res.send(true);
});

router.get('/admin/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_PER_MY_GET(?)`, [req.query.id]);
	
	return res.send(reData);
});

router.post('/admin/edit', async (req, res) => {
	const userId = req.decoded.userId;

	if(req.body.pwMode){
		let reData = await seon.DBCall(`CALL SP_A_PER_UPDATE2(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
			req.body.id,
			req.body.password,
			req.body.dashboard,
			req.body.user,
			req.body.statistics,
			req.body.report,
			req.body.contents,
			req.body.ticket,
			req.body.inquiry,
			req.body.pay,
			req.body.sales,
			req.body.permission,
			req.body.CS,
		]);
	}else{
		let reData = await seon.DBCall(`CALL SP_A_PER_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?)`, [
			req.body.id,
			req.body.dashboard,
			req.body.user,
			req.body.statistics,
			req.body.report,
			req.body.contents,
			req.body.ticket,
			req.body.inquiry,
			req.body.pay,
			req.body.sales,
			req.body.permission,
			req.body.CS,
		]);
	}
	
	
	return res.send(true);
});

router.post('/admin/del', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_PER_DELETE(?)`, [req.body.id]);
	
	return res.send(true);	
});





router.get('/user', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_USER_GET(?,?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,

		req.query.mode,
		isEmpty(req.query.keyword),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/user/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_USER_ITEM_GET(?)`, [
		req.query.id,
	]);

	return res.send(reData);
});
router.post('/user/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_ITEM_UPDATE(?,?,?,?,?)`, [
		req.body.id,
		req.body.password,
		req.body.phone,
		req.body.birthday,
		req.body.agreeSt
	]);

	return res.send(true);
});
router.post('/user/item/del', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_ITEM_DELETE(?)`, [
		req.body.id
	]);

	return res.send(true);
});


router.get('/user/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_ALL_GET(?,?,?,?)`, [
		req.query.mode,
		isEmpty(req.query.keyword),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	for(let i=0;i<reData.length;i++){
		reData[i].가입일 = seon.dateFormat(reData[i].가입일, 'YYYY-MM-DD');
		reData[i].가입경로 = seon.SOCIAL_TYPE[reData[i].가입경로];
		reData[i].연락처 = seon.phoneMask(reData[i].연락처);
	}

	return res.send(reData);
});

router.get('/user/biz', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_USER_BIZ_GET(?,?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,

		req.query.mode,
		isEmpty(req.query.keyword),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/user/biz/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_USER_BIZ_ITEM_GET(?)`, [
		req.query.id,
	]);

	return res.send(reData);
});
router.post('/user/biz/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_BIZ_ITEM_UPDATE(?,?,?,?,?)`, [
		req.body.id,
		req.body.password,
		req.body.phone,
		req.body.birthday,
		req.body.agreeSt
	]);

	return res.send(true);
});
router.post('/user/biz/item/del', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_BIZ_ITEM_DELETE(?)`, [
		req.body.id
	]);

	return res.send(true);
});

router.get('/user/biz/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_USER_BIZ_ALL_GET(?,?,?,?)`, [
		req.query.mode,
		isEmpty(req.query.keyword),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	for(let i=0;i<reData.length;i++){
		reData[i].가입일 = seon.dateFormat(reData[i].가입일, 'YYYY-MM-DD');
		reData[i].가입경로 = seon.SOCIAL_TYPE[reData[i].가입경로];
		reData[i].연락처 = seon.phoneMask(reData[i].연락처);
	}

	return res.send(reData);
});


router.get('/st/access', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_ACCESS_GET(?,?)`, [
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/st/access/month', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_ACCESS_MONTH_GET()`);

	return res.send(reData);
});
router.get('/st/access/week', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_ACCESS_WEEK_GET()`);

	return res.send(reData);
});


router.get('/st/join', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_JOIN_GET(?,?)`, [
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/st/join/month', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_JOIN_MONTH_GET()`);

	return res.send(reData);
});
router.get('/st/join/week', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_JOIN_WEEK_GET()`);

	return res.send(reData);
});

router.get('/st/report', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_REPORT_GET(?,?)`, [
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/st/report/month', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_REPORT_MONTH_GET()`);

	return res.send(reData);
});
router.get('/st/report/week', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_REPORT_WEEK_GET()`);

	return res.send(reData);
});

router.get('/st/inq', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_INQ_GET(?,?)`,[
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});

router.get('/st/inq/today', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_ST_INQ_TODAY_GET()`);
	console.log(reData);

	return res.send(reData);
});

router.get('/inqu', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_INQU_GET(?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.keyword),
		isEmpty(req.query.state)
	]);
	
	return res.send(reData);
});

router.get('/inqu/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_INQU_ALL_GET(?,?)`, [
		isEmpty(req.query.keyword),
		isEmpty(req.query.state)
	]);

	return res.send(reData);
});

router.get('/inqu/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_INQU_ITEM_GET(?)`, [
		req.query.id
	]);
	
	return res.send(reData);
});
router.post('/inqu/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_INQU_ITEM_UPDATE(?,?,?,?,?)`, [
		req.body.id,
		userId,
		req.body.aTitle,
		req.body.aMemo,
		req.body.aST
	]);
	
	return res.send(reData);
});



router.get('/inqu/biz', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_INQU_BIZ_GET(?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.keyword),
		isEmpty(req.query.state)
	]);
	
	return res.send(reData);
});
router.get('/inqu/biz/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_INQU_BIZ_ALL_GET(?,?)`, [
		isEmpty(req.query.keyword),
		isEmpty(req.query.state)
	]);

	return res.send(reData);
});
router.get('/inqu/biz/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_INQU_BIZ_ITEM_GET(?)`, [
		req.query.id
	]);
	
	return res.send(reData);
});
router.post('/inqu/biz/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_INQU_BIZ_ITEM_UPDATE(?,?,?,?,?)`, [
		req.body.id,
		userId,
		req.body.aTitle,
		req.body.aMemo,
		req.body.aST
	]);
	
	return res.send(reData);
});

router.get('/biz', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_BIZ_GET(?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		req.query.mode,
		isEmpty(req.query.keyword),
		req.query.state,
	]);

	return res.send(reData);
});
router.get('/biz/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_BIZ_ITEM_GET(?)`, [
		req.query.id
	]);

	reData.bizSrc = '/admin/biz/image?id=' + reData.bizRegId;
	reData.broSrc = '/admin/biz/image?id=' + reData.broRegId;

	return res.send(reData);
});
router.post('/biz/delete', async (req, res) => {
	const userId = req.decoded.userId;

	for(let i=0;i<req.body.idList.length;i++){
		await seon.DBCall(`CALL SP_A_BIZ_DELETE(?)`, [
			req.body.idList[i]
		]);
	}
	return res.send(true);
});

router.post('/biz/update', async (req, res) => {
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_A_BIZ_UPDATE(?,?,?)`, [
		req.body.id,
		req.body.state,
		req.body.memo,
	]);

	return res.send(true);
});

router.get('/biz/image', async function(req, res){
	try{
		const reData = await seon.DBOneCall(`CALL SP_A_BIZ_IMG_GET(?)`,[
			req.query.id
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

router.get('/report', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_REPORT_GET(?,?,?,?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.keyword),
		isEmpty(req.query.adr),
		isEmpty(req.query.tradeType),
		isEmpty(req.query.buildingType),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});

router.get('/report/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_REPORT_ALL_GET(?,?,?,?,?,?)`,[
		isEmpty(req.query.keyword),
		isEmpty(req.query.adr),
		isEmpty(req.query.tradeType),
		isEmpty(req.query.buildingType),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});

router.get('/report/st', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_REPORT_ST_GET()`);

	return res.send(reData);
});




router.get('/report/fail', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_REPORT_FAIL_GET(?,?,?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.adr),
		isEmpty(req.query.tradeType),
		isEmpty(req.query.buildingType),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});
router.get('/report/fail/all', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_REPORT_FAIL_ALL_GET(?,?,?,?,?)`,[
		isEmpty(req.query.adr),
		isEmpty(req.query.tradeType),
		isEmpty(req.query.buildingType),
		isEmpty(req.query.date_s),
		isEmpty(req.query.date_e),
	]);

	return res.send(reData);
});



router.post('/cs/news/add', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CS_NEWS_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.title,
		req.body.url,
		req.body.ref,
		req.body.mode,
		req.body.refDate,
	]);
	
	return res.send(reData);
});
router.post('/cs/news/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CS_NEWS_UPDATE(?,?,?,?,?,?)`,[
		req.body.id,
		req.body.title,
		req.body.url,
		req.body.ref,
		req.body.mode,
		req.body.refDate,
	]);
	
	return res.send(reData);
});
router.post('/cs/news/del', async (req, res) => {
	const idList = req.body.idList;

	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_A_CS_NEWS_DEL(?)`,[
			idList[i]
		]);
	}

	return res.send(true);
});
router.get('/cs/news', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_CS_NEWS_GET(?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.mode),
		isEmpty(req.query.title),
		isEmpty(req.query.sort),
	]);

	return res.send(reData);
});
router.get('/cs/news/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_CS_NEWS_ITEM_GET(?)`, [
		req.query.id
	]);

	return res.send(reData);
});


router.get('/cs/noti', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_CS_NOTICE_GET(?,?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.mode),	//biz, normal
		isEmpty(req.query.keyType),
		isEmpty(req.query.keyword), //null, title, author 
		isEmpty(req.query.sort),	//new, view
	]);

	return res.send(reData);
});
router.get('/cs/noti/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_CS_NOTICE_ITEM_GET(?)`, [
		req.query.id
	]);

	return res.send(reData);
});
router.post('/cs/noti/add', async (req, res) => {
	const userId = req.decoded.userId;

	let notice_obj = await seon.DBOneCall(`CALL SP_A_CS_NOTICE_ADD(?,?,?,?)`,[
		userId,
		req.body.title,
		req.body.content,
		req.body.mode,
	]);

	if(!notice_obj){
		return res.send(false);
	}

	const nid = notice_obj.id;

	let sql = '';
	if(req.body.mode == 'normal'){
		sql = 'CALL SP_A_USER_ID_GET()';
	}else{
		sql = 'CALL SP_A_USER_BIZ_ID_GET()';
	}

	const idObj = await seon.DBCall(sql);

	for(let i=0;i<idObj.length;i++){
		await seon.DBCall(`CALL SP_A_INFORM_ADD(?,?,?)`,[
			idObj[i].id,
			0,
			nid,
		]);
	}

	return res.send(true);
});
router.post('/cs/noti/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CS_NOTICE_UPDATE(?,?,?,?)`,[
		req.body.id,
		req.body.title,
		req.body.content,
		req.body.mode,
	]);
	
	return res.send(reData);
});
router.post('/cs/noti/del', async (req, res) => {
	const idList = req.body.idList;

	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_A_CS_NOTICE_DEL(?)`,[
			idList[i]
		]);
	}

	return res.send(true);
});

router.get('/cs/term/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_CS_TERM_GET()`);

	return res.send(reData);
});
router.post('/cs/term/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CS_TERM_UPDATE(?)`,[
		req.body.content
	]);

	return res.send(reData);
});
router.get('/cs/policy/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_CS_POLICY_GET()`);

	return res.send(reData);
});
router.post('/cs/policy/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CS_POLICY_UPDATE(?)`,[
		req.body.content
	]);

	return res.send(reData);
});

router.get('/content', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBPageCall(`CALL SP_A_CONTENT_GET(?,?,?,?,?)`, [
		req.query.pg,
		req.query.size,
		isEmpty(req.query.mode),	//guide, knowledge, news 
		isEmpty(req.query.keyword),
		isEmpty(req.query.sort), 
	]);

	return res.send(reData);
});
router.get('/content/item', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBOneCall(`CALL SP_A_CONTENT_ITEM_GET(?)`, [
		req.query.id
	]);

	return res.send(reData);
});
router.post('/content/add', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CONTENT_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.mode,
		req.body.isVisible,
		req.body.urlNewWindow,
		isEmpty(req.body.url),
		req.body.content,
	]);

	return res.send(reData);
});
router.post('/content/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CONTENT_UPDATE(?,?,?,?,?,?)`,[
		req.body.id,
		req.body.mode,
		req.body.isVisible,
		req.body.urlNewWindow,
		isEmpty(req.body.url),
		req.body.content,
	]);

	return res.send(reData);
});
router.get('/content/sort', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CONTENT_VIEW_SORT_GET()`);

	return res.send(reData);
});
router.post('/content/sort/update', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CONTENT_VIEW_SORT_UPDATE(?,?,?,?)`,[
		req.body.s1,
		req.body.s2,
		req.body.s3,
		req.body.s4,
	]);

	return res.send(reData);
});
router.get('/content/main', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_CONTENT_DASHBOARD_GET()`);

	return res.send(reData);
});
router.get('/pay/good', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_PAY_GOOD_GET()`);

	return res.send(reData);
});
router.post('/pay/good', async (req, res) => {
	const userId = req.decoded.userId;
	const itemList = req.body.itemList;
	
	for(let i=0;i<itemList.length;i++){
		await seon.DBCall(`CALL SP_A_PAY_GOOD_UPDATE(?,?,?,?,?,?,?,?,?,?,?)`,[
			itemList[i].id,
			itemList[i].name,
			itemList[i].info,
			itemList[i].full_price,
			itemList[i].sale_price,
			itemList[i].price,
			itemList[i].sale_rate,
			itemList[i].cnt,
			itemList[i].use_date_month,
			itemList[i].st,
			itemList[i].grade,
		]);
	}

	return res.send(true);
});
router.get('/pay/good/use', async (req, res) => {
	const userId = req.decoded.userId;

	let reData = await seon.DBCall(`CALL SP_A_PAY_GOOD_LOG_GET(?,?)`,[
        req.query.dateS,
        req.query.dateE,
    ]);

	return res.send(reData);
});
router.get('/pay/good/use/chart', async (req, res) => {
	const userId = req.decoded.userId;

    let reData = await seon.DBCall(`CALL SP_A_PAY_GOOD_LOG_CHART_GET()`);

    let dateList = [];
    let mode1List = [];
    let mode2List = [];
    
    for(let i=0;i<reData.length;i++){
        dateList.push(reData[i].date);
        mode1List.push(reData[i].mode1);
        mode2List.push(reData[i].mode2);
    }

	return res.send({
        chart:{
            dateList: dateList,
            mode1List: mode1List,
            mode2List: mode2List,
        }
    });
});
router.post('/ticket', async (req, res) => {
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_A_PAY_GOOD_USE_ADD(?,?)`,[
		req.body.info,
		req.body.cnt,
	]);

	return res.send(true);
});
router.get('/ticket/get', async (req, res) => {
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(`CALL SP_A_PAY_GOOD_USE_GET()`);

	return res.send(reData);
});
router.get('/ticket/use/get', async (req, res) => {
	const userId = req.decoded.userId;

	const reData = await seon.DBPageCall(`CALL SP_A_TICKET_USE_GET(?,?,?)`,[
        req.query.pg,
		req.query.size,
        isEmpty(req.query.keyword)
    ]);

	return res.send(reData);
});
router.post('/ticket/pay', async (req, res) => {
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(`CALL SP_A_PAY_GOOD_ADD(?,?,?,?,?,?)`,[
		req.body.name,
		req.body.info,
		req.body.cnt,
		req.body.grade,
		req.body.dateS,
		req.body.dateE,
	]);
	
	return res.send(true);
});
router.get('/ticket/member', async (req, res) => {
	const userId = req.decoded.userId;
	const grade = req.query.grade == 2 ? null : req.query.grade;

	const reData = await seon.DBCall(`CALL SP_A_PAY_MEMBER_GET(?)`,[
		grade
	]);

	return res.send(reData);
});
router.post('/ticket/use', async (req, res) => {
	const userId = req.decoded.userId;
	const idList = req.body.idList;
	const item = req.body.item;

	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_A_PAY_GOOD_USE_PUSH(?,?,?,?,?)`,[
			idList[i],
			item.id,
			item.cnt,
			item.dateS,
			item.dateE,
		]);
	}

	return res.send(true);
});
//login
router.get('/test123', async (req, res) => {
	const id = req.query.id;
	const pw = req.query.pw;

	if(id == 'seon' && pw == "123"){
		return res.send(true);
	}else{
		return res.send(false);
	}
});


module.exports = router;


