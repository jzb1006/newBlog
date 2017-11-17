<template lang="html">
  <div id="articel">
    <div v-show="loading">
        <loading></loading>
    </div>
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="70" class="left">
       <article class="article" v-for="item in article">
         <header>
           <h1>{{item.title}}</h1>
         </header>
         <p class="author">
            <span>{{item.author}}</span>
            <span>发表于：{{item.post_time}}</span>
            <span>阅读：(10000)</span>
            <span>评论：(100)</span>
            <span v-cloak>标签：({{classList[item.classify_ID-1]["class"]}})</span>
          </p>

         <div class="content">
           <p>
             <mavon-editor :subfield="false"  style="background:#fff;" :default_open="preview" :toolbars="toolbars" :editable="false"  v-model="content =  article[0].content"/>
           </p>
         </div>

         <!-- <div class="message">
           <p class="title">
             评论
           </p>
          <div class="comment">
            <mu-text-field class="mail" hintText="Email" type="number" icon="mail"/><br/>
            <mu-text-field class="text" hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" icon="message"/><br/>
            <mu-raised-button class="btn" label="提交"  primary/>
          </div>
         </div>

         <div class="message">
           <p class="title">
             网友最新评论
           </p>
           <mu-card-header title="jzb1006" subTitle="文章不错">
            <mu-avatar src="http://www.muse-ui.org/images/uicon.jpg" slot="avatar"/>
            <p class="time">2017年8月29日15:53:26</p>
          </mu-card-header>

         </div> -->

          <div id="back">
            <mu-icon-button icon="arrow_back" tooltip="返回"  tooltipPosition="top-center" touch touch class="back" onclick="window.history.go(-1)"/>
          </div>
       </article>
      </mu-col>

      <mu-col width="100" tablet="50" desktop="30" class="right">
        <aside class="classd">
          <h3>近期文章</h3>
          <div class="" v-for="item in articles">
            <router-link :to="{ path: '/detail', query:{ id: item.ID }}" v-model="arcId = $route.query.id">
              <mu-list>
                <mu-list-item :title="item.title" >
                <mu-icon slot="right" value="book"/>
                </mu-list-item>
              </mu-list>
            </router-link>
          </div>
        </aside>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getArcClass,getAct,getArcOne} from '../libs/common'
export default {
  data() {
    return {
      article:[],
      content:'',
      preview:'preview',
      toolbars:{
        //  preview: true, // 预览
         navigation: true, // 导航目录
         readmodel: true, // 沉浸式阅读
      },
      classList:[],
      articles:[],
      arcId:''
    }
  },
  methods:{
    
  },
  created(){
    this.arcId= this.$route.query.id;
    getArcClass.getArcClass(this)
    getArcOne.getArcOne(this.arcId,this)
    getAct.getAct(this);
  },
  watch:{
    arcId:function(val){
      getArcOne.getArcOne(val,this)
    }
  },
  computed:mapGetters([
      'loading'
    ])
}
</script>

<style lang="css" scoped>
body{
  background: #fff
}
.left,.right{
  padding:10px;

}
.right{
  text-align: center;
}
.demo-chip{
  margin-bottom: 10px;
  text-align: center;
  margin-left: 20px;
}
.classd{
  border: 1px solid #FD5D4D;
  min-height: 300px;
  margin-top: 10px;
}
.classd h3{
    background: #FD5D4D;
    color: #fff;
    padding: 11px 0;
    margin: 0 0 5px 0;
}
.article{
  padding: 8px;
}
.article header h1{
  color: block;
  margin: 0;
  text-align: center;
  margin-bottom: 30px;
}
.article .author{
  font-size: 14px;
  color: #9e9e9e;
  margin: 10px 0;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #FD5D4D;
  padding-bottom: 30px;
}
.article .content{
     color: #9E9EAA;
     font-size: 16px;
}
.article footer{
  text-align: right;
  margin: 5px 0;
}
.back{
     background: rgba(8, 8, 8, 0.31);
     color: #fff;
     width: 40px;
     height: 40px;
     padding: 0;
     left: 20px;
     bottom: 20px;
     position: absolute;
}
.comment{
  width:100%;
  margin:10px 0;
}
.comment .mail,.comment .text{
  width:80%;
  color:#F44336;
}
.comment .btn{
  display: block;
  margin: 0 auto;
}
.comment .text{
  height: 100px;
}
.msg .name,.msg .email,.msg .longText{
  width:30%;
}
.send{
      margin: 40px 0;
}
.demo-float-button{
  background-color: #f44336;
}
.message{
  border-bottom: 1px solid #ddd;
  overflow: auto;
}
.message .title{
    color: #F44336;
    font-size: 16px;
    border-bottom: 1px solid #F44336;
    font-weight: bold;
}
.message .time{
  color: #aaa;
  font-size: 12px;
}
.message .mu-card-header-title .mu-card-title {
    font-size: 15px;
    color: rgb(244, 67, 54);
}
#articel{
  max-width: 1980px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
