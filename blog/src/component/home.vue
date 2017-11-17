<template lang="html">
  <div class="home">
    <mu-row>
      <mu-col width="100 " tablet="100" desktop="100" id="One">
         <mu-row>
           <mu-col width="100 " tablet="100" desktop="100" id="left">
            <div class="text">
               <h1 id="hello" class="fadeIn">你好</h1>
               <h2>Welcome</h2>
            </div>
           </mu-col>
         </mu-row>
      </mu-col>
      <div v-show="loading">
        <loading></loading>
      </div>
    </mu-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{

    }
  },
  methods:{
    getImg(){
      this.$http.get('https://api.imjad.cn/hitokoto/')
       .then(function(res){
          console.log(res.data);
        }).catch(function(err){
          console.log(err);
        })
    },
    height(){
      var winH=document.documentElement.clientHeight;
      var One=document.getElementById("One");
      var left=document.getElementById("left");
      try {
        One.style.height=(winH)+'px';
        left.style.height=(winH)+'px';
      }
      catch(err){
      }
    }
  },
   mounted(){
     this.getImg();
     this.height();
     setInterval(()=>{
       this.height()
     },500);



   },
   computed:mapGetters([
      'loading'
    ])

}
</script>

<style scoped>
#One{
  height:100%;
  background: #FD5D4D;
  background: url('../assets/bg.jpg');
  overflow: hidden;
  position: relative;
  background-size: cover;
  text-align: center;
}
#left{
   background: rgba(0,0,0,.54);
   color:#fff;
   padding:10px;
}
#left .text{
  position: absolute;
  top:45%;
  left: 50%;
  text-align: center;
}
#left .text h1{
  margin: 0;
  padding: 0;
  line-height: 1;
  font-size: 3.25em;
}
.text::after{
  content:'';
  color:red;
  width: 200px;
  border: 1px solid #fff;
  position: absolute;
  transition: all 1s;
  opacity: 0;

}
.text:hover::after{
  transform: translateX(-95px);
  opacity: 1;
}
</style>
