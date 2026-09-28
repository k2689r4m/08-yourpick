var express = require('express');
var router = express.Router();
const db = require('../database/connect/config');
const requestIp = require('request-ip');
const seon = require('../seon');
const fs = require("fs");





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





//chromeOptions.addArguments("--disable-gpu");


router.get('/test', async function(req, res){
   seon.setScrapingST('stop');
  

  return res.send('');
});

router.get('/test2', async function(req, res){
  seon.setScrapingST('start');
 

 return res.send('');
});

module.exports = router;
