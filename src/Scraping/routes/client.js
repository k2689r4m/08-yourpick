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

router.get('/less/map/cheap', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_CHEAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	return res.send(reSearch);
});

router.get('/less/map/new', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_NEW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	return res.send(reSearch);
});

router.get('/less/map/station', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_STATION(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	return res.send(reSearch);
});

router.get('/less/map/detail', async function(req, res){
	const reData = await seon.DBOneCall(`CALL SP_W_R_USER_LESS_DETAIL(?)`,[req.query.bid]); 

	return res.send(reData);
});


router.post('/like/add', async function(req, res){
	const userId = req.decoded.userId;

	for(let i=0;i<req.body.ckList.length;i++){
		const bid = req.body.ckList[i];
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_DELETE(?,?)`,[userId, bid]); 
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_ADD(?,?)`,[userId, bid]); 
	}

	return res.send(true);
});

router.post('/like/del', async function(req, res){
	const userId = req.decoded.userId;

	for(let i=0;i<req.body.ckList.length;i++){
		const bid = req.body.ckList[i];
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_DELETE(?,?)`,[userId, bid]); 
	}

	return res.send(true);
});

router.get('/like/s', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_GET_S(?)`,[userId]); 

	return res.send(reData);
});


router.post('/tour/add', async function(req, res){
	const userId = req.decoded.userId;

	const {bidList, dateList, any, pickup} = req.body;
	
	for(let i=0;i<bidList.length;i++){
		for(let ii=0;ii<dateList.length;ii++){
			await seon.DBCall(`CALL SP_W_R_USER_TOUR_DEL(?,?,?)`,[
				userId, 
				bidList[i],
				dateList[ii].date
			]);

			await seon.DBCall(`CALL SP_W_R_USER_TOUR_ADD(?,?,?,?,?)`,[
				userId, 
				bidList[i],
				dateList[ii].date,
				any,
				pickup
			]); 
		}
	}

	return res.send(true);
});

router.post('/tour/cancel', async function(req, res){
	const {idList, stCancel} = req.body;
	
	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_W_R_USER_TOUR_CANCEL(?,?)`,[
			idList[i],
			stCancel
		]); 
	}

	return res.send(true);
});

router.post('/tour/edite', async function(req, res){
	const {idList, stEdite } = req.body;
	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_W_R_USER_TOUR_EDITE(?,?)`,[
			idList[i], 
			stEdite
		]); 
	}

	return res.send(true);
});



router.get('/tour/get', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_W_R_USER_TOUR_GET(?)`,[userId]); 

	return res.send(reData);
});


router.get('/userInfo', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBOneCall(`CALL SP_W_R_USER_GET(?)`,[userId]); 

	return res.send(reData);
});

router.post('/user/update', async function(req, res){
	const userId = req.decoded.userId;
	
	// const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
	// 	req.body.mobile
	// ]);
  
	// console.log(reData);

	// if(!reData){
	// 	return res.send(true);
	// }else{
	// 	return res.status(400).json({ errors: "이미 등록된 휴대폰 번호입니다." });
	// }
  
  
  
	const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
	const req_area_py = req.body.req_area_py;
	const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));
	const req_area_py_E = req.body.req_area_py_E;



	const re = await seon.DBOriginCall(`CALL SP_W_R_USER_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		req.body.client_uid,  
		isEmpty(req.body.company),
		isEmpty(req.body.conditions),   
		isEmpty2(req.body.deposit),   
		isEmpty(req.body.email),   
		isEmpty(req.body.find_area.toString()),   
		isEmpty(req.body.inDate),   
		isEmpty(req.body.interior),   
		isEmpty(req.body.likePick.toString()),   
		isEmpty(req.body.mobile),   
		isEmpty2(req.body.monthly_fixed),   
		isEmpty(req.body.name),   
		isEmpty(req.body.officeSt),   
		isEmpty2(req_area_m2),   
		isEmpty2(req_area_py),   
		isEmpty2(req_area_m2_E),   
		isEmpty2(req_area_py_E),   
		isEmpty(req.body.sector)
	]);

	return res.send(true);
});

router.post('/user/update/phone', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
		req.body.phone
	]);
  
	console.log(reData);

	if(!reData){
		return res.send(true);
	}else{
		return res.status(400).json({ errors: "이미 등록된 휴대폰 번호입니다." });
	}
  
});

module.exports = router;

