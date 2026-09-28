var express = require('express');
var router = express.Router();
const redisClient = require('../util/redis.util');
const db = require('../database/connect/config');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const seon = require('../seon');
const dayjs = require('dayjs');


var isEmpty = function(value){
  	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    	return null;
  	}else{
    	return value;
  	}
};

var isEmpty2 = function(value){
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
	// console.log(req.decoded);
	const userId = req.decoded.userId;
	
	
	const n = await redisClient.v4.exists(userId);
	console.log(n);
	if(n) await redisClient.v4.del(userId);

	return res.status(200).json({
	    status: 200,
	});
});

router.get('/map', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql, 
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
			isEmpty(req.query.bName), 
			isEmpty(req.query.oName), 
			isEmpty(req.query.useList),
			isEmpty(req.query.lp_S), 
			isEmpty(req.query.lp_E),
			isEmpty(req.query.er_S),
			isEmpty(req.query.er_E), 
			isEmpty(req.query.sub), 
			isEmpty(req.query.dis), 
			isEmpty(req.query.floor_S), 
			isEmpty(req.query.floor_E), 
			isEmpty(req.query.stList), 
			isEmpty(req.query.bId), 
			isEmpty(req.query.preOName), 
			isEmpty(req.query.sellPrice_S), 
			isEmpty(req.query.sellPrice_E), 
			isEmpty(req.query.sizeP_S), 
			isEmpty(req.query.sizeP_E), 
			isEmpty(req.query.roadWide_S), 
			isEmpty(req.query.roadWide_E), 
			isEmpty(req.query.roadConer), 
			isEmpty(req.query.roadDual), 
			isEmpty(req.query.roadName), 
			isEmpty(req.query.memUid), 
			isEmpty(req.query.regDate_S), 
			isEmpty(req.query.regDate_E), 
			isEmpty(req.query.phone), 
			isEmpty(req.query.cateList), 
			isEmpty(req.query.sellDate_S), 
			isEmpty(req.query.sellDate_E), 
			isEmpty(req.query.remodelDate_S), 
			isEmpty(req.query.remodelDate_E), 
			isEmpty(req.query.buildDate_S), 
			isEmpty(req.query.buildDate_E), 
			isEmpty(req.query.landSizePy), 
			isEmpty(req.query.totalSizePy),
			isEmpty(req.query.teamId),
			isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_MAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql, 
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2/dong', async function(req, res){
	let	sql =  `CALL SP_R_SEARCH_MAP_DONG(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2/gu', async function(req, res){
	let sql =  `CALL SP_R_SEARCH_MAP_GU(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2/sido', async function(req, res){
	let sql =  `CALL SP_R_SEARCH_MAP_SIDO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/mapPage2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_MAP_PAGE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/dong', async function(req, res){
	let	sql =  `CALL SP_SEARCH_MAP_DONG(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S), 
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E), 
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.sellPrice_S), 
		isEmpty(req.query.sellPrice_E), 
		isEmpty(req.query.sizeP_S), 
		isEmpty(req.query.sizeP_E), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.landSizePy), 
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/gu', async function(req, res){
	let sql =  `CALL SP_SEARCH_MAP_GU(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
	req.query.lat_min,
	req.query.lat_max,
	req.query.lng_min,
	req.query.lng_max,
	req.query.mode,
	isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S), 
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E), 
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.sellPrice_S), 
		isEmpty(req.query.sellPrice_E), 
		isEmpty(req.query.sizeP_S), 
		isEmpty(req.query.sizeP_E), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.landSizePy), 
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
	isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/sido', async function(req, res){
	let sql =  `CALL SP_SEARCH_MAP_SIDO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
	req.query.lat_min,
	req.query.lat_max,
	req.query.lng_min,
	req.query.lng_max,
	req.query.mode,
	isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S), 
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E), 
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.sellPrice_S), 
		isEmpty(req.query.sellPrice_E), 
		isEmpty(req.query.sizeP_S), 
		isEmpty(req.query.sizeP_E), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.landSizePy), 
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
	isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/mapPage', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP_PAGE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S), 
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E), 
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.sellPrice_S), 
		isEmpty(req.query.sellPrice_E), 
		isEmpty(req.query.sizeP_S), 
		isEmpty(req.query.sizeP_E), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.landSizePy), 
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/biz', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP_BIZ(?,?,?,?)`;
	const reData = await seon.DBCall(sql,[req.query.lat_min,req.query.lat_max,req.query.lng_min,req.query.lng_max]);
	return res.send(reData);
});

router.get('/map/getItem', async function(req, res){
	const sql =  `CALL SP_SEARCH_ITEM(?)`;
	const sql3 =  `CALL SP_ITEM_IMG(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.bid]);
	const imgs = await seon.DBCall(sql3,[req.query.bid]);
	reData.img = null;

	for(let i=0;i<imgs.length;i++){
		if(imgs[i].type_num == 0){
			reData.img = imgs[i].id
			break;
		}
	}

	if(!reData.img){
		reData.img = 1;
	}

	return res.send(reData);
});

router.get('/map/getItem2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_ITEM(?)`;
	const sql3 =  `CALL SP_R_ITEM_IMG(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.bid]);
	const imgs = await seon.DBCall(sql3,[req.query.bid]);
	reData.img = null;

	for(let i=0;i<imgs.length;i++){
		if(imgs[i].type_num == 0){
			reData.img = imgs[i].id
			break;
		}
	}

	if(!reData.img){
		reData.img = 1;
	}

	return res.send(reData);
});

router.get('/map/bdCate', async function(req, res){
	const sql =  `CALL SP_BD_CATE()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/map/useArea', async function(req, res){
	const sql =  `CALL SP_USE_AREA()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/map/team', async function(req, res){
	const sql =  `CALL SP_TEAM()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/detail/item', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디 

	let sql1 = '';
	let sql2 = '';
	let sql3 = '';

	if(req.query.isRent == 'true'){
		sql1 =  `CALL SP_R_DETAIL_ITEM(?)`;
		sql2 =  `CALL SP_R_UPDATE_COUNT(?,?)`;
		sql3 =  `CALL SP_R_ITEM_IMG(?)`;
	}else{
		sql1 =  `CALL SP_DETAIL_ITEM(?)`;
		sql2 =  `CALL SP_UPDATE_COUNT(?,?)`;
		sql3 =  `CALL SP_ITEM_IMG(?)`;
	}

	const reData = await seon.DBOneCall(sql1,[req.query.bid]);

	if(!reData){
		return res.send(false);
	}

	await seon.DBOneCall(sql2,[userId, req.query.bid]);

	const imgs = await seon.DBCall(sql3,[req.query.bid]);

	reData.imgList = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];

	for(let i=0;i<imgs.length;i++){
		reData.imgList[imgs[i].type_num] = imgs[i].id;
	}

	return res.send(reData);
});

//임대차내역
router.get('/detail/item/rent', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_RENT(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

router.get('/detail/item/rent2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_RENT(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

//건축물대장
router.get('/detail/item/floor', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_FLOOR(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

router.get('/detail/item/floor2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_FLOOR(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});


router.get('/detail/item/clientlog', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_CLIENTLOG(?)`;
  
	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/clientlog2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_CLIENTLOG(?)`;
  
	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/clienttype', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_CLIENT_TYPE()`;
  
	const reData = await seon.DBCall(sql);
	return res.send(reData);
});

router.get('/detail/item/mgrlog', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_MGRLOG(?)`;
  
	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/mgrlog2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_MGRLOG(?)`;
  
	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});


router.get('/total', async function(req, res){
	const sql =  `CALL SP_TOTAL_SEARCH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S), 
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E), 
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.sellPrice_S), 
		isEmpty(req.query.sellPrice_E), 
		isEmpty(req.query.sizeP_S), 
		isEmpty(req.query.sizeP_E), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 
		isEmpty(req.query.landSizePy), 
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/total2', async function(req, res){
	const sql =  `CALL SP_R_TOTAL_SEARCH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName), 
		isEmpty(req.query.oName), 
		isEmpty(req.query.useList),
		isEmpty(req.query.sub), 
		isEmpty(req.query.dis), 
		isEmpty(req.query.floor_S), 
		isEmpty(req.query.floor_E), 
		isEmpty(req.query.stList), 
		isEmpty(req.query.bId), 
		isEmpty(req.query.preOName), 
		isEmpty(req.query.roadWide_S), 
		isEmpty(req.query.roadWide_E), 
		isEmpty(req.query.roadConer), 
		isEmpty(req.query.roadDual), 
		isEmpty(req.query.roadName), 
		isEmpty(req.query.memUid), 
		isEmpty(req.query.regDate_S), 
		isEmpty(req.query.regDate_E), 
		isEmpty(req.query.phone), 
		isEmpty(req.query.cateList), 
		isEmpty(req.query.sellDate_S), 
		isEmpty(req.query.sellDate_E), 
		isEmpty(req.query.remodelDate_S), 
		isEmpty(req.query.remodelDate_E), 
		isEmpty(req.query.buildDate_S), 
		isEmpty(req.query.buildDate_E), 

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});


router.get('/detail/countList', async function(req, res){
	const sql =  `CALL SP_GET_COUNT(?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId]);

	return res.send(reData);
});

router.post('/detail/countList', async function(req, res) {
    const sql =  `CALL SP_DELETE_COUNT(?)`;

	const reData = await seon.DBCall(sql,[req.body.viewId]);

	return res.send(true);
});

router.post('/mgr/log/del', async function(req, res) {
    const sql =  `CALL SP_DETAIL_ITEM_MGRLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/mgr/log/del2', async function(req, res) {
    const sql =  `CALL SP_R_DETAIL_ITEM_MGRLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/client/log/del', async function(req, res) {
    const sql =  `CALL SP_DETAIL_ITEM_CLIENTLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/client/log/del2', async function(req, res) {
    const sql =  `CALL SP_R_DETAIL_ITEM_CLIENTLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.get('/mem', async function(req, res){
	const sql =  `CALL SP_MEM_INFO(?,?,?,?)`;
	const reData = await seon.DBPageCall(sql,[
		req.query.page,
		isEmpty(req.query.st),
		isEmpty(req.query.uName),
		isEmpty(req.query.mobile)
	]);

	return res.send(reData);
});

router.get('/mem/item', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.mid]);
	return res.send(reData);
});

router.post('/mem/item', 
	check("mem_type", "직원구분을 지정 해주세요.").not().isEmpty(),
	check("ip_free", "IP제한을 지정 해주세요.").not().isEmpty(), 
	check("mem_name", "이름을 지정 해주세요.").not().isEmpty(), 
	check("mem_rank_uid", "직책을 지정 해주세요.").not().isEmpty(), 
	check("license_flag", "자격증을 지정 해주세요.").not().isEmpty(), 
	check("sub_broker_flag", "중개보조원등록을 지정 해주세요.").not().isEmpty(), 
	check("auto_buyer_assign", "매수고객자동할당을 지정 해주세요.").not().isEmpty(), 
	check("hire_type", "채용구분을 지정 해주세요.").not().isEmpty(), 
	check("hire_status", "재직상태을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    const sql =  `CALL SP_MEM_ITEM_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	let encPW = null;

	if(req.body.pwMode){
		console.log(req.body.pw);
		encPW = crypto.createHash('sha256').update(req.body.pw).digest('hex');
	}
	

	const reData = await seon.DBCall(sql,
		[
		userId,
		req.body.mem_type,
		req.body.ip_free,
		req.body.mem_name,
		req.body.mem_rank_uid,

		isEmpty(req.body.mem_mobile),
		isEmpty(req.body.mem_phone),
		isEmpty(req.body.team_uid),
		isEmpty(req.body.team_cate_uid),
		req.body.license_flag,

		req.body.sub_broker_flag,
		req.body.auto_buyer_assign,
		isEmpty(req.body.expert_part),
		isEmpty(req.body.mem_no),
		req.body.hire_type,
		req.body.hire_status,

		isEmpty(req.body.work_sdate),
		isEmpty(req.body.work_edate),
		isEmpty(req.body.mem_email),
		isEmpty(req.body.pay_bank_code),
		isEmpty(req.body.pay_bank_no),

		isEmpty(req.body.pay_bank_owner),
		isEmpty(req.body.memo),
		req.body.mid,

		req.body.pwMode,
		encPW
	]);

	return res.send(true);
});

router.post('/mem/item/add', 
	check("mem_type", "직원구분을 지정 해주세요.").not().isEmpty(),
	check("ip_free", "IP제한을 지정 해주세요.").not().isEmpty(), 
	check("mem_name", "이름을 지정 해주세요.").not().isEmpty(), 
	check("mem_rank_uid", "직책을 지정 해주세요.").not().isEmpty(), 
	check("mem_id", "아이디를 지정 해주세요.").not().isEmpty(),
	check("pw", "비밀번호를 지정 해주세요.").not().isEmpty(),
	check("license_flag", "자격증을 지정 해주세요.").not().isEmpty(), 
	check("sub_broker_flag", "중개보조원등록을 지정 해주세요.").not().isEmpty(), 
	check("auto_buyer_assign", "매수고객자동할당을 지정 해주세요.").not().isEmpty(), 
	check("hire_type", "채용구분을 지정 해주세요.").not().isEmpty(), 
	check("hire_status", "재직상태을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    const sql =  `CALL SP_MEM_ITEM_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const encPW = crypto.createHash('sha256').update(req.body.pw).digest('hex');

	const reData = await seon.DBCall(sql,
		[
		userId,
		req.body.mem_type,
		req.body.ip_free,
		req.body.mem_name,
		req.body.mem_rank_uid,

		isEmpty(req.body.mem_mobile),
		isEmpty(req.body.mem_phone),
		isEmpty(req.body.team_uid),
		isEmpty(req.body.team_cate_uid),
		req.body.license_flag,

		req.body.sub_broker_flag,
		req.body.auto_buyer_assign,
		isEmpty(req.body.expert_part),
		isEmpty(req.body.mem_no),
		req.body.hire_type,
		req.body.hire_status,

		isEmpty(req.body.work_sdate),
		isEmpty(req.body.work_edate),
		isEmpty(req.body.mem_email),
		isEmpty(req.body.pay_bank_code),
		isEmpty(req.body.pay_bank_no),

		isEmpty(req.body.pay_bank_owner),
		isEmpty(req.body.memo),
		req.body.mid,

		encPW,
		req.body.mem_id
	]);

	return res.send(true);
});

router.post('/mem/item/delete', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.mid,
	]);

	return res.send(true);
});

router.get('/mem/item/check', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM_CHECK(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.mid
	]);

	if(reData.length){
		return res.send(true);
	}
	else{
		return res.send(false);
	}
});

router.get('/user/info', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_USER_GET(?)`;

	let reData = await seon.DBOneCall(sql,[userId]);
	const client_view = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);
	const rent_client_view = await seon.DBOneCall(`CALL SP_R_CLIENT_VIEW_CHECK()`);
	reData.client_view = client_view.cfg_val1;
	reData.rent_client_view = rent_client_view.cfg_val1;

	return res.send(reData);
});


router.get('/mem/level', async function(req, res){
	const sql =  `CALL SP_MEM_LEVEL()`;

	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/mem/code', async function(req, res){
	const sql =  `CALL SP_MEM_CODE(?)`;

	const reData = await seon.DBCall(sql,[req.query.part]);

	return res.send(reData);
});

router.post('/mem/code/add', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_ADD(?,?,?,?,?,?)`;

	const userId = req.decoded.userId;
	
	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		req.body.name,
		req.body.cnt,
		req.body.part,
		isEmpty(req.body.teamId)
	]);

	return res.send(true);
});

router.post('/mem/code/flag', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_FLAG_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.st,
		req.body.uid
	]);

	return res.send(true);
});

router.post('/mem/code/order', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_ORDER_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.uid_1,
		req.body.uid_2
	]);

	return res.send(true);
});

router.post('/mem/code/info', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_INFO_UPDATE(?,?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.name,
		req.body.cnt,
		req.body.uid
	]);

	return res.send(true);
});

router.post('/mem/code/del', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.uid
	]);

	return res.send(true);
});

router.get('/mem/log', async function(req, res){
	const sql =  `CALL SP_MEM_LOG(?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page
	]);

	return res.send(reData);
});

router.get('/mem/avg1', async function(req, res){
	const sql =  `CALL SP_MEM_AVG1(?)`;
	const reData = await seon.DBCall(sql,[isEmpty(req.query.mode)]);

	return res.send(reData);
});

router.get('/mem/avg2', async function(req, res){
	const sql =  `CALL SP_MEM_AVG2()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/mem/avg3', async function(req, res){
	const sql =  `CALL SP_MEM_AVG3()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/setting', async function(req, res){
	const sql =  `CALL SP_SETTING(?)`;
	
	const reData = await seon.DBCall(sql,[req.query.part]);

	return res.send(reData);
});

router.post('/setting/add', async function(req, res){
	const sql =  `CALL SP_SETTING_ADD(?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		isEmpty(req.body.var1),
		isEmpty(req.body.var2),
		req.body.part
	]);

	return res.send(true);
});

router.get('/setting/client', async function(req, res){
	const sql =  `CALL SP_SETTING_CLIENT()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/client/add', async function(req, res){
	const sql =  `CALL SP_SETTING_CLIENT_ADD(?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		isEmpty(req.body.var1)
	]);

	return res.send(true);
});

router.get('/setting/etc', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/setting/etc/mem', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC_MEM()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/etc/update', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val),
		req.body.uid,
	]);

	return res.send(true);
});

router.get('/setting/ip/set', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_SETTING()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/ip/set/update', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_SETTING_UPDATE(?,?,?,?,?,?)`;
	
	const reData = await seon.DBCall(sql,[
		req.body.uid1,
		req.body.val1,
		req.body.uid2,
		req.body.val2,
		req.body.val3,
		req.body.val4
	]);

	return res.send(true);
});

router.get('/setting/ip', async function(req, res){
	const sql =  `CALL SP_SETTING_IP()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/ip/add', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_ADD(?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		req.body.val1,
		req.body.val2
	]);

	return res.send(true);
});

router.post('/setting/update', async function(req, res){
	const sql =  `CALL SP_SETTING_UPDATE(?,?,?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val1),
		isEmpty(req.body.val2),
		req.body.id,
		req.body.st
	]);

	return res.send(true);
});

router.post('/setting/update2', async function(req, res){
	const sql =  `CALL SP_SETTING_UPDATE2(?,?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val1),
		isEmpty(req.body.val2),
		req.body.id
	]);

	return res.send(true);
});

router.post('/setting/delete', async function(req, res){
	const sql =  `CALL SP_SETTING_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.id
	]);

	return res.send(true);
});

router.post('/setting/idx', async function(req, res){
	const sql =  `CALL SP_SETTING_IDX(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.id,
		req.body.idx
	]);

	return res.send(true);
});

router.get('/oper/work/log', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_WORK_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
	
		return res.send(reData);
	}
	else if(2 == mode){
		const sql =  `CALL SP_R_OPER_WORK_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
	
		return res.send(reData);
	}

	return res.send(false);
});

router.get('/oper/owner/log', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_OWNER_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
		return res.send(reData);
	}else if(2 == mode){
		const sql =  `CALL SP_R_OPER_OWNER_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
		return res.send(reData);
	}

	return res.send(false);
});

router.post('/oper/owner/log/add', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_OPER_OWNER_LOG_ADD(?,?,?)`;

	await seon.DBCall(sql,[
		userId,
		req.body.bid,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/oper/owner/log/add2', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_R_OPER_OWNER_LOG_ADD(?,?,?)`;

	await seon.DBCall(sql,[
		userId,
		req.body.bid,
		req.body.memo
	]);

	return res.send(true);
});

router.get('/oper/done', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_DONE(?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.memId)
		]);
		return res.send(reData);
	}else if(2 == mode){
		const sql =  `CALL SP_R_OPER_DONE(?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.memId)
		]);
		return res.send(reData);
	}

	return res.send(false);
});

router.get('/user/admin', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);

	if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
		const sql =  `CALL SP_USER_ADMIN(?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId)
		]);
	
		return res.send(reData);
	}
	else{
		const sql =  `CALL SP_USER_ADMIN_MY(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			userId
		]);
	
		return res.send(reData);
	}
});

router.get('/user/admin2', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_R_CLIENT_VIEW_CHECK()`);

	if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
		const sql =  `CALL SP_R_USER_ADMIN(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea)
		]);
	
		return res.send(reData);
	}else{
		const sql =  `CALL SP_R_USER_ADMIN_MY(?,?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea),
			userId
		]);
	
		return res.send(reData);
	}
});

router.post('/user/admin/add', 
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(), 
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	const sql =  `CALL SP_USER_ADMIN_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findMoneyS,
		req.body.findMoneyE,
		req.body.havingMoney,
		req.body.findArea
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/add2', 
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(), 
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	const sql =  `CALL SP_R_USER_ADMIN_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	
	const rent_area_py = Number((req.body.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((req.body.net_area_m2 * 0.3025).toFixed(2));
	const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
	const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findArea,

		req.body.deposit,
		req.body.monthly_rent,
		req.body.main_fee,
		req.body.rent_area_m2,
		rent_area_py,
		req.body.net_area_m2,
		net_area_py,
		isEmpty(req.body.end_date),
		req.body.monthly_fixed,
		req_area_m2,
		req.body.req_area_py,
		isEmpty(req.body.addr),

		isEmpty(req.body.company),
		isEmpty(req.body.officeSt),
		isEmpty(req.body.likePick),
		isEmpty(req.body.conditions),
		isEmpty(req.body.inDate),
		isEmpty(req.body.sector),
		isEmpty(req.body.interior),
		isEmpty(req.body.route),

		req_area_m2_E,
		req.body.req_area_py_E,
		req.body.monthly_rent_E
	]);

	



	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/delete', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.cid
	]);

	return res.send(true);
});

router.post('/user/admin/delete2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.cid
	]);

	return res.send(true);
});

router.get('/user/admin/detail', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_DETAIL(?)`;

	const reData = await seon.DBOneCall(sql,[
		req.query.cid
	]);

	return res.send(reData);
});

router.get('/user/admin/detail2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_DETAIL(?)`;

	const reData = await seon.DBOneCall(sql,[
		req.query.cid
	]);

	return res.send(reData);
});

router.get('/user/admin/detail/count', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBPageCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.get('/user/admin/detail/count2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBPageCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.post('/user/admin/detail/brief/add', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.cid,req.body.bid]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/add', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.cid,req.body.bid]);

	return res.send(true);
});


router.post('/user/admin/detail/brief/addList', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const bidList = req.body.bidList;
	const cidList = req.body.brifList;

	for (let i = 0; i < bidList.length; i++) {
		for (let j = 0; j < cidList.length; j++) {
			await seon.DBCall(sql,[userId,cidList[j],bidList[i]]);
		}
	}

	return res.send(true);
});

router.post('/user/admin/detail/brief2/addList', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const bidList = req.body.bidList;
	const cidList = req.body.brifList;

	for (let i = 0; i < bidList.length; i++) {
		for (let j = 0; j < cidList.length; j++) {
			await seon.DBCall(sql,[userId,cidList[j],bidList[i]]);
		}
	}

	return res.send(true);
});

router.get('/user/admin/detail/brief', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/brief2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.post('/user/admin/detail/brief/done', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_DONE(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.lid,req.body.price]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/done', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_DONE(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.lid,req.body.price]);

	return res.send(true);
});

router.post('/user/admin/detail/brief/delete', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_DELETE(?)`;

	const reData = await seon.DBCall(sql,[req.body.lid]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/delete', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_DELETE(?)`;

	const reData = await seon.DBCall(sql,[req.body.lid]);

	return res.send(true);
});

router.get('/user/admin/detail/counsel', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/counsel2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNSEL(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/counsel/type', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL_TYPE()`;

	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/user/admin/detail/counsel/add', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL_ADD(?,?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.cid,
		req.body.subId,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/user/admin/detail/counsel2/add', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNSEL_ADD(?,?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.cid,
		req.body.subId,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/user/admin/detail/counsel/update', 
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(), 
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	const sql =  `CALL SP_USER_ADMIN_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findMoneyS,
		req.body.findMoneyE,
		req.body.havingMoney,
		req.body.findArea,
		req.body.cid
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/detail/counsel2/update', 
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(), 
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(), 
	async function(req, res){
		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	const sql =  `CALL SP_R_USER_ADMIN_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;


	const rent_area_py = Number((req.body.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((req.body.net_area_m2 * 0.3025).toFixed(2));
	const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
	const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findArea,

		req.body.deposit,
		req.body.monthly_rent,
		req.body.main_fee,
		req.body.rent_area_m2,
		rent_area_py,
		req.body.net_area_m2,
		net_area_py,
		isEmpty(req.body.end_date),
		req.body.monthly_fixed,
		req_area_m2,
		req.body.req_area_py,
		isEmpty(req.body.addr),

		isEmpty(req.body.company),
		isEmpty(req.body.officeSt),
		isEmpty(req.body.likePick),
		isEmpty(req.body.conditions),
		isEmpty(req.body.inDate),
		isEmpty(req.body.sector),
		isEmpty(req.body.interior),
		isEmpty(req.body.route),

		req.body.cid,

		req_area_m2_E,
		req.body.req_area_py_E,
		req.body.monthly_rent_E
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.get('/user/admin/detail/building', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BUILDING(?,?,?)`;

	const reData = await seon.DBPageCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});

router.get('/user/admin/detail/building2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BUILDING(?,?,?)`;

	const reData = await seon.DBPageCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});



router.get('/working', async function(req, res){
	const sql =  `CALL SP_WORKING(?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page, 
		isEmpty(req.query.st), 
		isEmpty(req.query.bName), 
		isEmpty(req.query.addr), 
		isEmpty(req.query.mid)
	]);

	return res.send(reData);
});

router.get('/working2', async function(req, res){
	const sql =  `CALL SP_R_WORKING(?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page, 
		isEmpty(req.query.st), 
		isEmpty(req.query.bName), 
		isEmpty(req.query.addr), 
		isEmpty(req.query.mid)
	]);

	return res.send(reData);
});



router.post('/create/building', 
	check("name", "물건명을 입력해주세요.").not().isEmpty(), 
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
		
	const userId = req.decoded.userId;
	
	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	if(!pnu){
		return res.send({st: false, item: null});
	}


	if(req.body.isRent){
		if(req.body.mode){
			const reCheck = await seon.DBCall(`CALL SP_R_BUILDING_CHECK(?)`,pnu);
	
			if(reCheck.length){
				return res.send({st: false, item: reCheck});
			}
		}

		let building_uid = null;
	
		const reData = await seon.DBOneCall(`CALL SP_R_BUILDING_CREATE(?,?,?,?,?,?,?,?,?)`,[
			userId,
			req.body.zonecode,
			isEmpty(req.body.road_addr),
			req.body.jibun_addr,
			req.body.lat,
			req.body.lng,
			req.body.name,
			pnu,
			pnu[10]
		]);
	
		building_uid = reData.building_uid;
	
		const st = await seon.APIRentBuildingUpdate(userId, building_uid);
	
		if(!st){
			return res.send({st: false, item: null});
		}
	}else{
		if(req.body.mode){
			const reCheck = await seon.DBCall(`CALL SP_BUILDING_CHECK(?)`,pnu);
	
			if(reCheck.length){
				return res.send({st: false, item: reCheck});
			}
			
		}
	
		let building_uid = null;
	
		const reData = await seon.DBOneCall(`CALL SP_BUILDING_CREATE(?,?,?,?,?,?,?,?,?)`,[
			userId,
			req.body.zonecode,
			isEmpty(req.body.road_addr),
			req.body.jibun_addr,
			req.body.lat,
			req.body.lng,
			req.body.name,
			pnu,
			pnu[10]
		]);
	
		building_uid = reData.building_uid;
	
		const st = await seon.APIBuildingUpdate(userId, building_uid);
	
		if(!st){
			return res.send({st: false, item: null});
		}
	}



	building_uid = p_building_uid,
	building_mem_uid = p_building_mem_uid,
	working_mem_uid = p_working_mem_uid,
	client_uid = p_client_uid,
	open_flag = p_open_flag,
	sell_date = p_sell_date,
	sell_status_date = p_sell_status_date,
	chk_status = p_chk_status,
	road_addr_link = p_road_addr_link,
	jibun_addr_link = p_jibun_addr_link,
	road_name = p_road_name,
	ins_price = p_ins_price,
	sell_price = p_sell_price,
	sell_price_py_price = p_sell_price_py_price,
	building_price = p_building_price,
	building_price_py_price = p_building_price_py_price,
	land_price = p_land_price,
	total_income = p_total_income,
	total_income_rate = p_total_income_rate,
	earning_rate = p_earning_rate,
	earning_month_rate = p_earning_month_rate,
	land_size_py_price = p_land_size_py_price,
	substation = p_substation,
	substation_distance = p_substation_distance,
	total_size_py_price = p_total_size_py_price,
	public_land_price_year = p_public_land_price_year,
	std_year_flag = p_std_year_flag,
	roadwide_1 = p_roadwide_1,
	roadwide_2 = p_roadwide_2,
	roadwide_3 = p_roadwide_3,
	roadwide_4 = p_roadwide_4,
	remodel_date = p_remodel_date,
	park_cnt_real = p_park_cnt_real,
	heat_type_uid = p_heat_type_uid,
	road_face_uid = p_road_face_uid,
	memo = p_memo,
	mod_date = p_mod_date,
	mod_time = p_mod_time,
	mod_mem_uid = p_mod_mem_uid,
	ex_sum_rent_deposit = p_ex_sum_rent_deposit,
	ex_sum_rent_money = p_ex_sum_rent_money,
	ex_sum_mgr_fee = p_ex_sum_mgr_fee,
	ex_sum_mgr_fee_out = p_ex_sum_mgr_fee_out,
	ex_total_income_rate = p_ex_total_income_rate,
	chk_road_dual = p_chk_road_dual,
	chk_road_coner = p_chk_road_coner,
	owner_name = p_owner_name,
	owner_home_phone = p_owner_home_phone,
	owner_home_phone_memo = p_owner_home_phone_memo,
	owner_office_phone = p_owner_office_phone,
	owner_office_phone_memo = p_owner_office_phone_memo,
	owner_mobile_1 = p_owner_mobile_1,
	owner_mobile_1_memo = p_owner_mobile_1_memo,
	owner_mobile_2 = p_owner_mobile_2,
	owner_mobile_2_memo = p_owner_mobile_2_memo,
	owner_mobile_3 = p_owner_mobile_3,
	owner_mobile_3_memo = p_owner_mobile_3_memo,
	owner_mobile_4 = p_owner_mobile_4,
	owner_mobile_4_memo = p_owner_mobile_4_memo,
	owner_mobile_5 = p_owner_mobile_5,
	owner_mobile_5_memo = p_owner_mobile_5_memo,
	pre_owner_name = p_pre_owner_name,
	pre_owner_home_phone = p_pre_owner_home_phone,
	pre_owner_home_phone_memo = p_pre_owner_home_phone_memo,
	pre_owner_office_phone = p_pre_owner_office_phone,
	pre_owner_office_phone_memo = p_pre_owner_office_phone_memo,
	pre_owner_mobile_1 = p_pre_owner_mobile_1,
	pre_owner_mobile_1_memo = p_pre_owner_mobile_1_memo,
	pre_owner_mobile_2 = p_pre_owner_mobile_2,
	pre_owner_mobile_2_memo = p_pre_owner_mobile_2_memo,
	pre_owner_mobile_3 = p_pre_owner_mobile_3,
	pre_owner_mobile_3_memo = p_pre_owner_mobile_3_memo,
	pre_owner_mobile_4 = p_pre_owner_mobile_4,
	pre_owner_mobile_4_memo = p_pre_owner_mobile_4_memo,
	pre_owner_mobile_5 = p_pre_owner_mobile_5,
	pre_owner_mobile_5_memo = p_pre_owner_mobile_5_memo,
	owner_memo = p_owner_memo,
	link_land_cnt = p_link_land_cnt,
	pnu_code_flag = p_pnu_code_flag



	return res.send({st: true, item: null});
});

router.get('/detail/item/edit/land', async function(req, res){
	const sql =  `CALL SP_DETAIL_LAND(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	return res.send(reData);
});

router.get('/detail/item/edit/land2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_LAND(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	return res.send(reData);
});

router.post('/detail/item/floor/edit', async function(req, res){
	const userId = req.decoded.userId;

	const floorList = req.body.floorList;
	const floorGroup = req.body.floorGroup;

	for(let i=0;i<floorList.length;i++){
		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_EDIT(?,?,?)`,[
			floorList[i].chk_pa,
			floorList[i].chk_except,
			floorList[i].building_floor_uid
		]);
	}

	// const reFloor = await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR(?)`,[req.body.bid]);

	await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_DELETE(?)`,[req.body.bid]);
	// SP_DETAIL_ITEM_FLOOR_EDIT2

	for(let i=0;i<floorGroup.length;i++){
		const flrNoNm = floorGroup[i].flrNoNm;
		const rent_py = floorGroup[i].rent_py;
		const rent_m2 = rent_py * PY_M2_EX;


		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_EDIT2(?,?,?,?,?)`,[
			userId,
			req.body.bid,
			flrNoNm,
			rent_py,
			rent_m2
		]);
	}

	return res.send(false);
});

router.post('/detail/item/floor/edit2', async function(req, res){
	const userId = req.decoded.userId;

	const floorList = req.body.floorList;
	const floorGroup = req.body.floorGroup;

	for(let i=0;i<floorList.length;i++){
		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_EDIT(?,?,?)`,[
			floorList[i].chk_pa,
			floorList[i].chk_except,
			floorList[i].building_floor_uid
		]);
	}

	// const reFloor = await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR(?)`,[req.body.bid]);

	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_DELETE(?)`,[req.body.bid]);
	// SP_DETAIL_ITEM_FLOOR_EDIT2

	for(let i=0;i<floorGroup.length;i++){
		const flrNoNm = floorGroup[i].flrNoNm;
		const rent_py = floorGroup[i].rent_py;
		const rent_m2 = rent_py * PY_M2_EX;


		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_EDIT2(?,?,?,?,?)`,[
			userId,
			req.body.bid,
			flrNoNm,
			rent_py,
			rent_m2
		]);
	}

	return res.send(false);
});

router.get('/cate/get', async function(req, res){
	const sql =  `CALL SP_CATE_GET(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	let re = [];
	for(let i=0;i<reData.length;i++){
		re.push(reData[i].cid);
	}


	return res.send(re.map(String));
});

router.get('/cate2/get', async function(req, res){
	const sql =  `CALL SP_R_CATE_GET(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	let re = [];
	for(let i=0;i<reData.length;i++){
		re.push(reData[i].cid);
	}

	return res.send(re.map(String));
});


router.post('/detail/item/save', async function(req, res){
	const userId = req.decoded.userId;
	let newBuilding = req.body.item;
	const building_done_log_flag = req.body.building_done_log_flag;
	const building_hold_log_flag = req.body.building_hold_log_flag;

	const oldBuilding = await seon.DBOneCall(`CALL SP_DETAIL_ITEM(?)`,[newBuilding.building_uid]);
	let today = dayjs();  

	if(oldBuilding.ex_sum_mgr_fee_out == 0){
		oldBuilding.ex_sum_mgr_fee_out = 0;
	}

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}

	const doneLog = await seon.DBCall(`CALL SP_CHECK_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
	
	//진행상태 로그
	if(isEmpty(newBuilding.sell_status) != isEmpty(oldBuilding.sell_status)){
		await seon.AddMgrLog(req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'sell_status', 
			seon.sellStatus[oldBuilding.sell_status] + '→' + seon.sellStatus[newBuilding.sell_status]
		);
		
		if(newBuilding.sell_status == "done"){
			if(building_done_log_flag){
				if(!doneLog.length){
					await seon.DBCall(`CALL SP_ADD_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
				}
			}

			await seon.DBCall(`CALL SP_RESET_WORKING(?)`,[newBuilding.building_uid]);
		}

		if(oldBuilding.sell_status == "ready" && newBuilding.sell_status == "hold"){

		}
		
		if(oldBuilding.sell_status == "done" && newBuilding.sell_status == "hold"){
		}
	}

	//상태 로그
	if(isEmpty(newBuilding.chk_status) != isEmpty(oldBuilding.chk_status)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'chk_status', 
			seon.chkStatus[oldBuilding.chk_status] + '→' + seon.chkStatus[newBuilding.chk_status]
		);
	}

	//물건명 로그
	if(isEmpty(newBuilding.building_name) != isEmpty(oldBuilding.building_name)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_name', 
			oldBuilding.building_name + '→' + newBuilding.building_name
		);
	}

	//담당자 로그
	if(isEmpty(newBuilding.building_mem_uid) != isEmpty(oldBuilding.building_mem_uid)) {
		const newMem = await seon.DBOneCall(`CALL SP_MEM_ITEM(?)`,[newBuilding.building_mem_uid]);
		
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_mem_uid', 
			oldBuilding.building_mem_name + '→' + newMem.mem_name
		);
	}

	//입금가 로그
	if(isEmpty(newBuilding.ins_price) != isEmpty(oldBuilding.ins_price)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'ins_price', 
			oldBuilding.ins_price + '→' + newBuilding.ins_price
		);
	}

	//매매 금액
	if(isEmpty(newBuilding.sell_price) != isEmpty(oldBuilding.sell_price)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'sell_price', 
			oldBuilding.sell_price + '→' + newBuilding.sell_price
		);
	}

	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;
	if (isEmpty(oldBuilding.building_price) != isEmpty(building_price)) { 
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_price', 
			oldBuilding.building_price + '→' + building_price
		);
	}

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }
	
	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }

	//보증금
	if(isEmpty(newBuilding.ex_sum_rent_deposit) != isEmpty(oldBuilding.ex_sum_rent_deposit)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'ex_sum_rent_deposit', 
			oldBuilding.ex_sum_rent_deposit + '→' + newBuilding.ex_sum_rent_deposit
		);
	}

	//월임대료
	if(isEmpty(newBuilding.ex_sum_rent_money) != isEmpty(oldBuilding.ex_sum_rent_money)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'ex_sum_rent_money', 
			oldBuilding.ex_sum_rent_money + '→' + newBuilding.ex_sum_rent_money
		);
	}

	//관리비
	if(isEmpty(newBuilding.ex_sum_mgr_fee) != isEmpty(oldBuilding.ex_sum_mgr_fee)) { 
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'ex_sum_mgr_fee', 
			oldBuilding.ex_sum_mgr_fee + '→' + newBuilding.ex_sum_mgr_fee
		);
	}

	//관리비지출
	if(isEmpty(newBuilding.ex_sum_mgr_fee_out) != isEmpty(oldBuilding.ex_sum_mgr_fee_out)) { 
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'ex_sum_mgr_fee_out', 
			oldBuilding.ex_sum_mgr_fee_out + '→' + newBuilding.ex_sum_mgr_fee_out
		);
	}

	//소유자정보 - 성명	
	if(isEmpty(newBuilding.owner_name) != isEmpty(oldBuilding.owner_name)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_name + '→' + newBuilding.owner_name
		);
	}

	//소유자정보 - 자택전화	
	if(isEmpty(newBuilding.owner_home_phone) != isEmpty(oldBuilding.owner_home_phone)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_home_phone + '→' + newBuilding.owner_home_phone
		);
	}

	//소유자정보 - 회사전화
	if(isEmpty(newBuilding.owner_office_phone) != isEmpty(oldBuilding.owner_office_phone)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_office_phone +'/'+oldBuilding.owner_office_phone_memo+ '→' + newBuilding.owner_office_phone + '/' +newBuilding.owner_office_phone_memo
		);
	}

	//소유자정보 - 휴대폰 / 메모(1 ~ 5)
	if(isEmpty(newBuilding.owner_mobile_1) != isEmpty(oldBuilding.owner_mobile_1)) {
		await seon.AddMgrLog(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_mobile_1 +'/'+oldBuilding.owner_mobile_1_memo+ '→' + newBuilding.owner_mobile_1 + '/' +newBuilding.owner_mobile_1_memo
		);
	}


	await seon.DBCall(`CALL SP_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo)
	]);
	
	await seon.DBCall(`CALL SP_CATE_DELETE(?)`,[newBuilding.building_uid]);

	for(let i=0;i<req.body.cate.length;i++){
		await seon.DBCall(`CALL SP_CATE_ADD(?,?)`,[newBuilding.building_uid, req.body.cate[i]]);
	}

	//매물으로 변경되면 
	if(newBuilding.sell_status == 'done'){
		await seon.DBCall(`CALL SP_DETAIL_ITEM_DONE_DATE(?)`,[newBuilding.building_uid]);
	}
	


	// 기존 물건 종류 삭제 
	// $query  = " DELETE FROM building_cate WHERE building_uid = '".$_POST['building_uid']."' ";

	// 신규 물건 종류 추가
	// foreach($_POST['bd_cate_uid'] as $key => $val) {
	// 	$query  = " INSERT INTO building_cate SET "
	// 			. " building_uid    = '".$_POST['building_uid']."', "
	// 			. " bd_cate_uid     = '".$val."' "
	// 			;
	// 	$AT_db->query($query);
	// }

	//임대차내역 저장
	let rentList = req.body.rent;
	for(let i=0;i<rentList.length;i++){
		rentList[i].rent_size_m2 = rentList[i].rent_size_p * PY_M2_EX;

		if(rentList[i].building_rent_uid){
			if(rentList[i].rent_floor.length){
				await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					rentList[i].building_rent_uid,
					newBuilding.building_uid,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);
			}else{
				await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_DELETE_UP(?)`,[
					rentList[i].building_rent_uid
				]);

				rentList.splice(i, 1);
			}
		}
		else{
			if(rentList[i].rent_floor.length){
				const rentId = await seon.DBOneCall(`CALL SP_DETAIL_ITEM_RENT_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					newBuilding.building_uid,
					userId,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);

				rentList[i].building_rent_uid = rentId.id;
			}
		}
	}


	for(let i=0;i<rentList.length;i++){
		if(rentList[i].rent_floor.length){
			await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_INDEX(?,?)`,[
				rentList[i].building_rent_uid,
				i+1
			]);
		}
	}

	//상태가 매각으로 변경되는 경우 처리

	return res.send(true);
});

router.post('/detail/item/save2', async function(req, res){
	const userId = req.decoded.userId;
	let newBuilding = req.body.item;
	const building_done_log_flag = req.body.building_done_log_flag;
	const building_hold_log_flag = req.body.building_hold_log_flag;

	const oldBuilding = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM(?)`,[newBuilding.building_uid]);
	let today = dayjs();  

	if(oldBuilding.ex_sum_mgr_fee_out == 0){
		oldBuilding.ex_sum_mgr_fee_out = 0;
	}

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}

	const doneLog = await seon.DBCall(`CALL SP_R_CHECK_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
	
	//진행상태 로그
	if(isEmpty(newBuilding.sell_status) != isEmpty(oldBuilding.sell_status)){
		await seon.AddMgrLog2(req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'sell_status', 
			seon.sellStatus[oldBuilding.sell_status] + '→' + seon.sellStatus[newBuilding.sell_status]
		);
		
		if(newBuilding.sell_status == "done"){
			if(building_done_log_flag){
				if(!doneLog.length){
					await seon.DBCall(`CALL SP_R_ADD_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
				}
			}

			await seon.DBCall(`CALL SP_R_RESET_WORKING(?)`,[newBuilding.building_uid]);
		}

		if(oldBuilding.sell_status == "ready" && newBuilding.sell_status == "hold"){

		}
		
		if(oldBuilding.sell_status == "done" && newBuilding.sell_status == "hold"){
		}
	}

	//상태 로그
	if(isEmpty(newBuilding.chk_status) != isEmpty(oldBuilding.chk_status)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'chk_status', 
			seon.chkStatus[oldBuilding.chk_status] + '→' + seon.chkStatus[newBuilding.chk_status]
		);
	}

	//물건명 로그
	if(isEmpty(newBuilding.building_name) != isEmpty(oldBuilding.building_name)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_name', 
			oldBuilding.building_name + '→' + newBuilding.building_name
		);
	}

	//담당자 로그
	if(isEmpty(newBuilding.building_mem_uid) != isEmpty(oldBuilding.building_mem_uid)) {
		const newMem = await seon.DBOneCall(`CALL SP_MEM_ITEM(?)`,[newBuilding.building_mem_uid]);
		
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_mem_uid', 
			oldBuilding.building_mem_name + '→' + newMem.mem_name
		);
	}

	//임대 보증금
	if(isEmpty2(newBuilding.deposit) != isEmpty2(oldBuilding.deposit)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'deposit', 
			oldBuilding.deposit + '→' + newBuilding.deposit
		);
	}

	//임대 전용면적
	if(isEmpty2(newBuilding.net_area_m2) != isEmpty2(oldBuilding.net_area_m2)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'net_area', 
			oldBuilding.net_area_m2 + '→' + newBuilding.net_area_m2
		);
	}

	//임대 월임대료
	if(isEmpty2(newBuilding.monthly_rent) != isEmpty2(oldBuilding.monthly_rent)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'monthly_rent', 
			oldBuilding.monthly_rent + '→' + newBuilding.monthly_rent
		);
	}

	//임대 관리비
	if(isEmpty2(newBuilding.main_fee) != isEmpty2(oldBuilding.main_fee)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'main_fee', 
			oldBuilding.main_fee + '→' + newBuilding.main_fee
		);
	}

	//임대 층정보
	if(isEmpty(newBuilding.floor_info) != isEmpty(oldBuilding.floor_info)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'floor_info', 
			oldBuilding.floor_info + '→' + newBuilding.floor_info
		);
	}
	
	//임대 무료주차대수
	if(isEmpty2(newBuilding.free_parking) != isEmpty2(oldBuilding.free_parking)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'free_parking', 
			oldBuilding.free_parking + '→' + newBuilding.free_parking
		);
	}
	
	//임대 유로주차대수
	if(isEmpty2(newBuilding.fee_paring) != isEmpty2(oldBuilding.fee_paring)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'fee_paring', 
			oldBuilding.fee_paring + '→' + newBuilding.fee_paring
		);
	}

	//임대 입주현황
	if(isEmpty(newBuilding.in_status) != isEmpty(oldBuilding.in_status)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'in_status', 
			oldBuilding.in_status + '→' + newBuilding.in_status
		);
	}

	//임대 화장실유형
	if(isEmpty(newBuilding.bathroom_type) != isEmpty(oldBuilding.bathroom_type)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'bathroom_type', 
			oldBuilding.bathroom_type + '→' + newBuilding.bathroom_type
		);
	}

	//임대 임대면적
	if(isEmpty2(newBuilding.rent_area) != isEmpty2(oldBuilding.rent_area)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'rent_area', 
			oldBuilding.rent_area + '→' + newBuilding.rent_area
		);
	}

	//임대 인테리어
	if(isEmpty(newBuilding.interior_type) != isEmpty(oldBuilding.interior_type)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'interior_type', 
			seon.interior_type[oldBuilding.interior_type] + '→' + seon.interior_type[newBuilding.interior_type]
		);
	}

	//임대 렌트프리
	if(isEmpty(newBuilding.rent_free) != isEmpty(oldBuilding.rent_free)) {
		let oldLog = "";
		let newLog = "";

		if(oldBuilding.rent_free == 'selet'){
			oldLog = oldBuilding.rent_free_month + '개월';
		}else{
			oldLog = seon.rent_free[oldBuilding.rent_free];
		}

		if(newBuilding.rent_free == 'selet'){
			newLog = newBuilding.rent_free_month + '개월';
		}else{
			newLog = seon.rent_free[newBuilding.rent_free];
		}

		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'rent_free', 
			oldLog + '→' + newLog
		);
	}
	
	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;
	if (isEmpty(oldBuilding.building_price) != isEmpty(building_price)) { 
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'building_price', 
			oldBuilding.building_price + '→' + building_price
		);
	}

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }
	
	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }


	//소유자정보 - 성명	
	if(isEmpty(newBuilding.owner_name) != isEmpty(oldBuilding.owner_name)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_name + '→' + newBuilding.owner_name
		);
	}

	//소유자정보 - 자택전화	
	if(isEmpty(newBuilding.owner_home_phone) != isEmpty(oldBuilding.owner_home_phone)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_home_phone + '→' + newBuilding.owner_home_phone
		);
	}

	//소유자정보 - 회사전화
	if(isEmpty(newBuilding.owner_office_phone) != isEmpty(oldBuilding.owner_office_phone)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_office_phone +'/'+oldBuilding.owner_office_phone_memo+ '→' + newBuilding.owner_office_phone + '/' +newBuilding.owner_office_phone_memo
		);
	}

	//소유자정보 - 휴대폰 / 메모(1 ~ 5)
	if(isEmpty(newBuilding.owner_mobile_1) != isEmpty(oldBuilding.owner_mobile_1)) {
		await seon.AddMgrLog2(
			req, 
			userId, 
			newBuilding.building_uid, 
			null, 
			'building', 
			'chg_info', 
			'owner_info', 
			oldBuilding.owner_mobile_1 +'/'+oldBuilding.owner_mobile_1_memo+ '→' + newBuilding.owner_mobile_1 + '/' +newBuilding.owner_mobile_1_memo
		);
	}

	const rent_area_py = Number((newBuilding.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((newBuilding.net_area_m2 * 0.3025).toFixed(2));

	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo),

		isEmpty2(newBuilding.deposit),
		isEmpty2(newBuilding.net_area_m2),
		isEmpty2(newBuilding.monthly_rent),
		isEmpty2(newBuilding.ex_rate),
		isEmpty2(newBuilding.main_fee),
		isEmpty2(newBuilding.monthly_fixed),
		isEmpty(newBuilding.floor_info),
		isEmpty2(newBuilding.free_parking),
		isEmpty2(newBuilding.fee_paring),
		isEmpty(newBuilding.in_status),
		isEmpty(newBuilding.bathroom_type),
		isEmpty2(newBuilding.rent_area_m2),
		isEmpty2(newBuilding.rent_py_price),
		isEmpty(newBuilding.interior_type),
		isEmpty(newBuilding.rent_free),
		isEmpty2(newBuilding.rent_free_month),
		rent_area_py,
		net_area_py,
	]);
	
	await seon.DBCall(`CALL SP_R_CATE_DELETE(?)`,[newBuilding.building_uid]);

	for(let i=0;i<req.body.cate.length;i++){
		await seon.DBCall(`CALL SP_R_CATE_ADD(?,?)`,[newBuilding.building_uid, req.body.cate[i]]);
	}

	//매물으로 변경되면 
	if(newBuilding.sell_status == 'done'){
		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_DONE_DATE(?)`,[newBuilding.building_uid]);
	}
	


	// 기존 물건 종류 삭제 
	// $query  = " DELETE FROM building_cate WHERE building_uid = '".$_POST['building_uid']."' ";

	// 신규 물건 종류 추가
	// foreach($_POST['bd_cate_uid'] as $key => $val) {
	// 	$query  = " INSERT INTO building_cate SET "
	// 			. " building_uid    = '".$_POST['building_uid']."', "
	// 			. " bd_cate_uid     = '".$val."' "
	// 			;
	// 	$AT_db->query($query);
	// }

	//임대차내역 저장
	let rentList = req.body.rent;
	for(let i=0;i<rentList.length;i++){
		rentList[i].rent_size_m2 = rentList[i].rent_size_p * PY_M2_EX;

		if(rentList[i].building_rent_uid){
			if(rentList[i].rent_floor.length){
				await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					rentList[i].building_rent_uid,
					newBuilding.building_uid,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);
			}else{
				await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_DELETE_UP(?)`,[
					rentList[i].building_rent_uid
				]);

				rentList.splice(i, 1);
			}
		}
		else{
			if(rentList[i].rent_floor.length){
				const rentId = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM_RENT_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					newBuilding.building_uid,
					userId,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);

				rentList[i].building_rent_uid = rentId.id;
			}
		}
	}


	for(let i=0;i<rentList.length;i++){
		if(rentList[i].rent_floor.length){
			await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_INDEX(?,?)`,[
				rentList[i].building_rent_uid,
				i+1
			]);
		}
	}

	//상태가 매각으로 변경되는 경우 처리

	return res.send(true);
});


router.post('/detail/item/reload', async function(req, res){
	const userId = req.decoded.userId;

	const st = await seon.APIBuildingUpdate(userId, req.body.bid);
	return res.send(false);
});

router.post('/detail/item/reload2', async function(req, res){
	const userId = req.decoded.userId;

	const st = await seon.APIRentBuildingUpdate(userId, req.body.bid);
	return res.send(false);
});

router.post('/client/log/add', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	await seon.DBCall(`CALL SP_CLIENT_LOG_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.bid,
		'building',
		'counsel',
		req.body.type,
		req.body.keyword
	]);

	return res.send(true);
});

router.post('/client/log/add2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	await seon.DBCall(`CALL SP_R_CLIENT_LOG_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.bid,
		'building',
		'counsel',
		req.body.type,
		req.body.keyword
	]);

	return res.send(true);
});

router.get('/log/done', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_CHECK_DONE_LOG(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid,
		userId
	]);

	return res.send(reData);
});

router.get('/log/done2', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_R_CHECK_DONE_LOG(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid,
		userId
	]);

	return res.send(reData);
});


router.post('/up/img', seon.imgUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	let idx = 0;
	for(let i=0;i<20;i++){
		// console.log(i + ' : ' + req.body['info_'+i]);

		if(req.body['info_'+i] == 0){
			const f = req.files[idx];

			await seon.DBCall(`CALL SP_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
		else if(req.body['info_'+i] == 1){
			await seon.FileDel(req.body.bid, i);

			const f = req.files[idx];

			await seon.DBCall(`CALL SP_FILE_IMG_UPDATE(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
	}
	// 0 신규
	// 그냥 추가

	return res.send(true);
});

router.post('/up/img2', seon.imgUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	let idx = 0;
	for(let i=0;i<20;i++){
		// console.log(i + ' : ' + req.body['info_'+i]);

		if(req.body['info_'+i] == 0){
			const f = req.files[idx];

			await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
		else if(req.body['info_'+i] == 1){
			await seon.FileDel2(req.body.bid, i);

			const f = req.files[idx];

			await seon.DBCall(`CALL SP_R_FILE_IMG_UPDATE(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
	}
	// 0 신규
	// 그냥 추가

	return res.send(true);
});

router.post('/up/img/del', async function(req, res){
	const delImgList = req.body.delImgList;

	for(let i=0;i<delImgList.length;i++){
		const bid = delImgList[i].bid;
		const id = delImgList[i].id;
		const idx = delImgList[i].idx;

		await seon.FileDel(bid, idx);
		await seon.DBCall(`CALL SP_FILE_IMG_DEL(?)`,[id]);
	}

	return res.send(true);
});

router.post('/up/img2/del', async function(req, res){
	const delImgList = req.body.delImgList;

	for(let i=0;i<delImgList.length;i++){
		const bid = delImgList[i].bid;
		const id = delImgList[i].id;
		const idx = delImgList[i].idx;

		await seon.FileDel2(bid, idx);
		await seon.DBCall(`CALL SP_R_FILE_IMG_DEL(?)`,[id]);
	}

	return res.send(true);
});

const fs = require("fs");
router.get('/testimg', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	const files = fs.readdirSync("./--");

	const typeNum = {
		'건물외부사진1.jpg' : 6,
		'건물외부사진2.jpg' : 7,
		'건물외부사진3.jpg' : 8,
		'건물외부사진4.jpg' : 9,

		'건물내부사진1.jpg' : 11,
		'건물내부사진2.jpg' : 12,
		'건물내부사진3.jpg' : 12,
		'건물내부사진4.jpg' : 13,
		'건물내부사진5.jpg' : 14,
		'건물내부사진6.jpg' : 15,
		'건물내부사진7.jpg' : 16,
		'건물내부사진8.jpg' : 17,
		'건물내부사진9.jpg' : 18,
		'건물내부사진10.jpg' : 19
	};


	for(let i=0;i<files.length;i++){
		let file = files[i].split('-');
		let fileName = files[i];
		const len = file.length;
		let fileType = file[len-1];
		let floorInfo = file[3];
		let fileJibun = null;

		if(file[2] == 'x'){
			fileJibun = file[0] + ' ' + file[1];
		}else{
			fileJibun = file[0] + ' ' + file[1] + '-' + file[2];
		}

		// console.log(fileJibun, floorInfo, fileType);
		const reData = await seon.DBOneCall(`CALL SP_XXXX_X(?,?)`,[
			'%'+fileJibun+'%',
			floorInfo
		]);


		if(!reData){
			continue;
		}

		if(!typeNum[fileType]){
			continue;
		}

		const newFileName = 'item-' + Date.now();
		fs.copyFileSync('./--/' + fileName,'./uploads/item/' + newFileName);
		await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
			reData.building_uid,
			userId,
			"image/jpg",
			10,
			newFileName,
			'uploads/item',
			typeNum[fileType]
		]);
	

		if(typeNum[fileType] == 6){
			const newFileName = 'item-' + Date.now();
			fs.copyFileSync('./--/' + fileName,'./uploads/item/' + newFileName);
			await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				reData.building_uid,
				userId,
				"image/jpg",
				10,
				newFileName,
				'uploads/item',
				0
			]);
		}
	}


	return res.send("asd");
});


router.post('/create/building111', async function(req, res){
	console.log("BACK ---" + req.body.name);

	const userId = req.decoded.userId;
	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	if(!pnu){
		return res.send({st: false, item: null});
	}

	let building_uid = null;

	const reData = await seon.DBOneCall(`CALL SP_R_BUILDING_CREATE(?,?,?,?,?,?,?,?,?)`,[
		userId,
		req.body.zonecode,
		isEmpty(req.body.road_addr),
		req.body.jibun_addr,
		req.body.lat,
		req.body.lng,
		req.body.name,
		pnu,
		pnu[10]
	]);

	building_uid = reData.building_uid;

	const st = await seon.APIRentBuildingUpdate(userId, building_uid);

	// if(!st){
	// 	return res.send({st: false, item: null});
	// }

	// return res.send({st: true, item: null});


	const newBuilding = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM(?)`,[building_uid]);

	newBuilding.owner_name = req.body.item.owner_name;
	newBuilding.owner_home_phone = req.body.item.owner_home_phone;
	newBuilding.rent_area_py = req.body.item.rent_area_py;
	newBuilding.net_area_py = req.body.item.net_area_py;
	newBuilding.floor_info = req.body.item.floor_info;
	newBuilding.free_parking = req.body.item.free_parking;
	newBuilding.in_status = req.body.item.in_status;
	newBuilding.memo = req.body.item.memo;



	newBuilding.deposit = Number(req.body.item.deposit.replace(',',''));
	newBuilding.monthly_rent = Number(req.body.item.monthly_rent.replace(',',''));

	if(typeof(req.body.item.main_fee) == 'string'){
		req.body.item.main_fee = 0;
	}else{
		newBuilding.main_fee = Number(req.body.item.main_fee.replace(',',''));
	}
	
	newBuilding.monthly_fixed = newBuilding.monthly_rent + newBuilding.main_fee;
	newBuilding.rent_py_price = Number((newBuilding.monthly_rent / newBuilding.rent_area_py).toFixed(2));

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}
	
	
	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }
	
	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }
	
	const rent_area_m2 = Number((newBuilding.rent_area_py * PY_M2_EX).toFixed(2));
	const net_area_m2 = Number((newBuilding.net_area_py * PY_M2_EX).toFixed(2));

	newBuilding.ex_rate = Number((rent_area_m2 / net_area_m2).toFixed(2));

		
	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo),
		isEmpty2(newBuilding.deposit),

		isEmpty2(net_area_m2),

		isEmpty2(newBuilding.monthly_rent),
		isEmpty2(newBuilding.ex_rate),
		isEmpty2(newBuilding.main_fee),
		isEmpty2(newBuilding.monthly_fixed),
		isEmpty(newBuilding.floor_info),
		isEmpty2(newBuilding.free_parking),
		isEmpty2(newBuilding.fee_paring),
		isEmpty(newBuilding.in_status),
		isEmpty(newBuilding.bathroom_type),

		isEmpty2(rent_area_m2),

		isEmpty2(newBuilding.rent_py_price),
		isEmpty(newBuilding.interior_type),
		isEmpty(newBuilding.rent_free),
		isEmpty2(newBuilding.rent_free_month),

		isEmpty2(newBuilding.rent_area_py),
		isEmpty2(newBuilding.net_area_py),
	]);
	

	return res.send(true);
});

router.post('/create/building222', async function(req, res){
	console.log("BACK ---" + req.body.name);

	const reData = await seon.DBOneCall(`CALL SP_XXXX(?)`,[
		req.body.name
	]);

	if(!reData){
		return res.send(true);
	}

	// console.log(reData.building_uid);
	req.body.item.deposit = Number(req.body.item.deposit.replace(',',''));
	req.body.item.monthly_rent = Number(req.body.item.monthly_rent.replace(',',''));
	req.body.item.rent_area_py = Number(req.body.item.rent_area_py.replace(',',''));
	req.body.item.net_area_py = Number(req.body.item.net_area_py.replace(',',''));

	req.body.item.main_fee = Number(req.body.item.main_fee.replace(',',''));

	const rent_area_m2 = Number((req.body.item.rent_area_py * PY_M2_EX).toFixed(2));
	const net_area_m2 = Number((req.body.item.net_area_py * PY_M2_EX).toFixed(2));

	await seon.DBCall(`CALL SP_XXXX2222(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.building_uid,
		req.body.item.owner_name,
		req.body.item.owner_home_phone,
		req.body.item.rent_area_py,
		rent_area_m2,
		req.body.item.net_area_py,
		net_area_m2,
		isEmpty(req.body.item.floor_info),
		isEmpty2(Number(req.body.item.free_parking)),
		isEmpty2(Number(req.body.item.fee_paring)),
		isEmpty(req.body.item.in_status),
		req.body.item.deposit,
		req.body.item.monthly_rent,
		isEmpty2(req.body.item.main_fee),
		isEmpty(req.body.item.memo)
	]);


	return res.send(true);
});

module.exports = router;

