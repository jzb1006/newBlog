const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const multerObj=multer({dest: './static/upload'});
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
var server=express(); //实例化express
server.listen(8090);  //创建端口


server.use(bodyParser.urlencoded(
  {
    extended:false
  }
));
server.use(bodyParser.json());
server.use(multerObj.any());


server.use(cookieParser());
(function(){
  var keys=[];
  for(var i=0;i<100000;i++){
    keys[i]='j_'+Math.random();
  }
  server.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:20*60*10000  //20分钟
  }));
})();

server.use('/login',require('./route/login')());
server.use('/act',require('./route/article')());
