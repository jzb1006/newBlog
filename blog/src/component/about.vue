<template lang="html">
  <div class="about">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="100" class="top" id="top" @mouseenter.native="addClass" @mouseleave.native="moveClass">
        <h1>一个来自茫茫茫茫大前端的的小菜鸟</h1>
          <h2>但似乎不愿被淘汰</h2>
          <h1>所以一直在努力</h1>
      </mu-col>
    </mu-row>
    <mu-row gutter class="progress">
      <mu-col width="100" tablet="100" desktop="100">
            <figure>
              <img src="../assets/head.jpg" alt="" />
              <ul>
                <li><mu-raised-button label="Blog" class="demo-raised-button" primary/></li>
                <li><mu-raised-button label="Email" class="demo-raised-button" primary/></li>
                <li><mu-raised-button label="Weibo" class="demo-raised-button" primary/></li>
              </ul>
            </figure>
      </mu-col>
      <mu-col width="100" tablet="100" desktop="100" class="leaveMSG">
         <h1>给我留言</h1>
         <div class="msg">
           <mu-text-field label="称呼" labelFloat class="name"/><br/>
           <mu-text-field label="邮件" labelFloat class="email"/><br/>
           <mu-text-field hintText="你的留言" multiLine :rows="3" :rowsMax="6" class="longText"/><br/>
         </div>
         <div class="send">
           <mu-float-button icon="send" class="demo-float-button"/>
         </div>
         <footer>
           <p>
             Designed and developed by zhibin jiang
           </p>
           <p>
             Copyright © 2010-2017 dandyweng.com. All Rights Reserved.
           </p>
         </footer>
      </mu-col>

   </mu-row>

  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
   addClass(){
     var top=document.getElementById("top");
     var firstChild=top.children[0];
     var centerChild=top.children[1];
     var arterChild=top.children[2];
     firstChild.className="firstChild";
     centerChild.className="centerChild";
     arterChild.className="arterChild";
   },
   moveClass(){
     var top=document.getElementById("top");
     var firstChild=top.children[0];
     var centerChild=top.children[1];
     var arterChild=top.children[2];
     firstChild.className="moverClass";
     centerChild.className="moverClass";
     arterChild.className="moverClass";
   }
  }
}
</script>

<style lang="css" scoped>
.top{
  background:#FD5D4D;
  text-align: center;
  color: #fff;
  padding: 10% 0;
  transition: all 1s;
  background:url('../assets/bg1.jpg');
  background-size: cover;
}
.firstChild{
  transform: scale(1.2);
  transition: all 1s;
}
.centerChild{
  transform: scale(0.8);
  transition: all 1s;
  opacity: 0.6;
}
.arterChild{
  transform: scale(1.5);
  transition: all 1s;


}
.moverClass{
  transition: all 1s;
}
.progress{
  text-align: center;
}
.progress figure{
  margin-top: 60px;
}
.progress figure img{
  height:200px;
  width:200px;
}
.progress figure ul{
  text-align: center;
  padding: 0;
}
.progress figure ul li{
   list-style: none;
   display: inline-block;
   font-size: 20px;
   padding: 5px 60px;
  }
  .progress figure ul li a{
    color:#282828;
  }
.demo-paper {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
}
.leaveMSG{
  max-width: 1980px;
  margin: 0 auto;
}
.leaveMSG .send{
  margin-top: 30px;
}
.leaveMSG .mu-text-field.has-label {
    min-height: 100px;
}
.msg .name,.msg .email,.msg .longText{
  width:60%;
}
footer{

  margin: 0 auto;
  margin-top: 100px;
}
footer p{

}
</style>
