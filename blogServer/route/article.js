const express = require('express');
const db = require('../db');
const mysql = require('mysql');
const sd = require('silly-datetime');
var pool = mysql.createPool(db.mysqls);


module.exports = function () {
  var router = express.Router();
  router.get('/',(req,res) => {
    console.log(req.query.act)
    switch(req.query.act){
      case 'class':
          pool.query(`SELECT * FROM essayclassify_table`,(err,data) => {
            if(err){
              console.log(err);
              res.status(500).send("dababase error").end();
            }else{
              if(data.length==0){
                res.status(200).send("no this artClass").end();
              }else{
                res.status(200).send(data).end();
              }
            }
          });
          break;

       case 'classed':
          var classId=req.query.id;
          if(classId =='' || classId==undefined){
            res.status(404).send("您查找的文章分类不存在").end();
          }
          pool.query(`SELECT * FROM blog_table WHERE classify_ID=${classId}`,(err,data) => {
            if(err){
              console.log(err);
              res.status(500).send("dababase error").end();
            }else{
              if(data.length==0){
                res.status(200).send(data='').end();
              }else{
                res.status(200).send(data).end();
              }
            }
          });
          break;

       case 'get':
         console.log("请求文章");
        //  var curren_page=0;
         var num_page=5;
         var page_on=req.query.page;
         if(page_on=='' || page_on==undefined || page_on==0 || page_on < 1 ){
           page_on=1;
          }
         var start_on=(page_on-1)*num_page;
         console.log('请求'+page_on)
         pool.query(`SELECT COUNT(*) AS count FROM blog_table;SELECT * FROM blog_table LIMIT ${start_on},${num_page}`,(err,data)=>{
           if(err){
             console.log(err);
             res.status(500).send("database error").end();
           }else{
             if(data.length==0){
               res.status(200).send(data=='').end();
             }else{
               res.status(200).send({
                 count:data[0],
                 result:data[1]
               }).end();
             }
           }
         });
         break;

      case 'getOne':
        console.log("请求单篇文章");
        var actId=req.query.id;
        if(actId =='' || actId==undefined){
          res.status(404).send("您查找的文章不存在").end();
        }
        pool.query(`SELECT * FROM blog_table WHERE ID=${actId}`,(err,data)=>{
          if(err){
            console.log("文章查询失败"+err);
          }else{
            if(data.length==0){
              res.status(200).send({datas:'',msg:'The article was not found'}).end()
            }else{
              res.status(200).send({msg:'success',data}).end();
            }
          }
        })
        break;

      case 'del':
        var actId=req.query.id;
        console.log(actId);
        pool.query(`DELETE FROM blog_table WHERE ID=${actId}`,(err,data)=>{
          if(err){
            console.log(err);
            res.status(500).send("database error").end();
          }else{
            if(data.length==0){
              res.status(200).send("no this article").end();
            }else{
              res.status(200).send({msg:'success'}).end();
            }
          }
        })
        break;
    }
  })
  

  router.post('/',(req,res)=>{
    console.log(req.query.act);
    switch(req.query.act){
      case 'add':
        console.log("添加文章");
        console.log(req.body);
        var actTitle=req.body.actTitle;
        var description=req.body.description;
        var author=req.body.author;
        var classed=req.body.classed;
        var content=req.body.content;
        var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
        pool.query(`INSERT INTO blog_table VALUES(NULL,'${actTitle}','${description}','${content}','${author}','${time}',NULL,NULL,'${classed}',NULL)`,(err,data)=>{
          if(err){
            console.log(err);
            res.status(500).send({msg:"database error"}).end();
          }else{
            if(data.length==0){
              res.status(500).send({msg:"no de content"}).end();
            }else{
              res.status(200).send({msg:'success'}).end();
            }
          }
        })
        break;

      case 'modify':
        console.log("修改文章");
        var actId=req.query.id;
        var actTitle=req.body.actTitle;
        var description=req.body.description;
        var author=req.body.author;
        var classed=req.body.classed;
        var content=req.body.content;
        var lase_time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        pool.query(`UPDATE  blog_table SET title='${actTitle}', intro='${description}' ,content='${content}', author='${author}', classify_ID='${classed}' ,last_modify_time='${lase_time}' WHERE ID='${actId}'`,(err,data)=>{
          if(err){
            console.log(err);
            res.status(500).send({msg:"database error"}).end();
          }else{
            if(data.length==0){
              res.status(500).send({msg:"no de content"}).end();
            }else{
              res.status(200).send({msg:'success'}).end();
            }
          }
        })
        break;

       case 'addImg':
        console.log("添加图片")
        console.log(req.body);
    }
  })
  return router;
}
