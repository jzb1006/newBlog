const express=require('express');
const common=require('../libs/commont');
const db=require('../db');
const mysql=require('mysql');
var pool=mysql.createPool(db.mysqls);

const logOk=1;
const logErr=0;

module.exports=function(){
  var router=express.Router();

   router.get('/',(req,res)=>{
     console.log("登录");
     if(req.session['admin_id']){
       console.log("登录");
       res.status(200).send(true).end();
     }else{
       res.status(200).send(false).end();
     }
     res.end();
   });

   router.get('/outLogin',(req,res)=>{
     if(req.session['admin_id']){
       req.session.admin_id=null;
       res.status(200).send({success:true})
     }else{
       res.status(200).send({error:false})
     }
   })

   router.post('/',(req,res)=>{
     var username=req.body.user;
     var pass=common.md5(req.body.pass+common.MD5_SUFFIX);
     pool.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
       if(err){
         console.log(err);
         res.status(500).send("数据库出现错误").end();
       }else{
         if(data.length==0){
           res.status(200).send("用户名不存在").end();
         }else{
           if(data[0].password==pass){
             req.session['admin_id']=data[0].ID;
             res.status(200).send({type:logOk}).end();
           }else{
             res.status(200).send({type:logErr}).end();
           }
         }
       }
     })
   })

   return router;
}
