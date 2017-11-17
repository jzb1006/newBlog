import Vue from 'vue'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;

 let getArcClass={
    getArcClass(_this){
        _this.$http.get('/act?act=class').then((res)=>{
            if(res==''){
            console.log("database none");
            }else{
            console.log(res.data);
            _this.classList=res.data
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
 }

let getAct={
    getAct(_this){
        _this.$http.get('/act?act=get').then((res)=>{
          if(res.data==''){
            console.log("请求内容为空");
          }else{
            _this.total=parseInt(res.data.count[0].count);
            _this.articles=res.data.result;
          }
        }).catch((err)=>{
          console.log("请求超时")
          console.log(err);
        })
      }
}


 let getArcOne={
  getArcOne(arcId,_this){
    _this.$http.get('/act?act=getOne&id='+arcId).then((res)=>{
      if(res.data.data==''){
        console.log(res.data.msg);
      }else{
        if(res.data.msg=='success'){
          _this.article=res.data.data;
        }
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
 }

 export {
    getArcClass,
    getAct,
    getArcOne
 }