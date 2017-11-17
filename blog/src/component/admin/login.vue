<template lang="html">
  <div>
     <div v-show="loading">
        <loading></loading>
      </div>
    <mu-row gutter class="login">
       <mu-col width="100" tablet="100" desktop="100" class="logBg">
         <h1>欢迎登陆</h1>
         <mu-col width="100" class="logMSG">
             <mu-text-field hintText="账号" type="text" name="user"  v-model="user" icon="account_circle"/><br/>
             <mu-text-field hintText="密码" type="password" name="pass"  v-model="pass" icon="lock"/><br/>
             <mu-raised-button label="login" class="login-raised-button" type="submit" primary @click="login()"/>
         </mu-col>
       </mu-col>
     </mu-row>
  </div>
</template>

<script>
const logOk = 1;
const logErr = 0;
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      user:'',
      pass:''
    }
  },
  methods:{
    height(){
      var _this=this
      var H=$(window).height();
      $('.login').css({
        height:H
      });
      $('.logBg').css({
        marginTop:H/4+'px'
      })
    },
    login(){
      var user=this.user;
      var pass=this.pass;
      if(user=='' || pass==''){
        alert("请输入完整的信息");
        return false;
      }else{
        this.$http.post('/login',{
          user:user,
          pass:pass
        }).then((res)=>{
          console.log(res.data);
          if(res.data.type == logOk){
            this.$router.push({path:'/admin'});
          }else if(res.data.type == logErr){
            alert("密码错误")
            this.$router.push({path:'/Login'});
          }else{
            alert("服务器停止工作啦，5分钟后再来啦！")
            this.$router.push({path:'/Login'});
          }
        }).catch((err)=>{
          console.log(err)
        })
      }

    }
  },
  mounted(){

      setInterval(()=>{
        this.height();
      },500);
      this.height()
  },
  computed:mapGetters([
      'loading'
    ])
}
</script>

<style scoped>
.login{
  text-align: center;
  background:url('../../assets/login.jpg');
  background-size: cover;
}
.login h1{
  color:#fff;
  margin:0 0 30px 0;
}
.logMSG .mu-text-field.has-icon {
    text-align: left;
    width: 50%;

}
.logBg{
  background: rgba(247, 255, 249, 0.44);
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  border-radius: 10px;
}
.login-raised-button{
  margin-top: 30px;
}
@media only screen and (max-width: 500px){
  .logMSG .mu-text-field.has-icon {
      text-align: left;
      width: 100%;
  }
  .logMSG{
    padding: 0 10px;
  }
}
</style>
