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


module.exports = router;

