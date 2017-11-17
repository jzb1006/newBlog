<template lang="html">
    <div>
      <div v-show="loading">
        <loading></loading>
      </div>
  <mu-row gutter>
    <mu-col width="100" tablet="100" desktop="100" id="top">
        <mu-appbar title="BLOG 1.0 后台" titleClass="title">
            <mu-flat-button label="首页" slot="right" icon="home" to="/home"/>
            <mu-flat-button label="退出" slot="right" icon="exit_to_app" @click="outLogin" />
           <mu-flat-button  label="name" slot="right" class="" labelPosition="before" icon="account_circle" secondary/>
        </mu-appbar>
    </mu-col>
  </mu-row>

   <mu-row gutter>
    <mu-col width="15" tablet="15" desktop="15" class="left-menu" id="left" style="min-height:950px">
         <mu-menu>
            <mu-menu-item title="文章" leftIcon="remove_red_eye" class="menu-item"/>
            <mu-menu-item title="留言" leftIcon="person_add"  class="menu-item"/>
            <mu-menu-item title="设置" leftIcon="link"  class="menu-item"/>
         </mu-menu>
    </mu-col>
    <mu-col width="85" tablet="85" desktop="85" class="right-menu">
       <mu-row>
         <mu-col width="100" tablet="100" desktop="100" class="right-menu-item one">
            <h2>
             文章列表
            </h2>

            <div class="add">
                 <mu-raised-button label="添加文章" class="demo-raised-button" icon="add" primary slot="right" @click="articleAddShow"/>
            </div>
         </mu-col>
       </mu-row>


       <!-- 文章列表 -->

       <mu-row class="arctcel" id="arctcel" v-for="(item,index) in articles">
           <mu-col width="100" tablet="100" desktop="80" class="arctcel-item-title">
             <header>
                  <p ref="nowId" v-show="false">{{item.ID}}</p>
                  <h1>{{item.title}}</h1>
              </header>
              <div class="content">
                  <p>
                  {{item.intro}}
                  </p>
              </div>
           </mu-col>
           <mu-col width="100" tablet="100" desktop="20" class="arctcel-item-btn">
             <mu-raised-button label="删除"  labelPosition="before"  icon="delete" @click="open(index)"   secondary/>
             <mu-raised-button label="修改"  @click="modefyOpen(index)" secondary/>
           </mu-col>
       </mu-row>
       <!-- 文章列表 -->


       <!-- 弹出框 -->
        <!-- 文章修改删除 -->
        <mu-dialog :open="dialog" title="删除？" @close="close">
            确认删除文章吗？
            <mu-flat-button slot="actions" @click="close" primary label="取消"/>
            <mu-flat-button slot="actions" @click="deleteArticle(arcId)" primary label="确定"/>
        </mu-dialog>
       <!-- 修改 -->
        <mu-dialog :open="modefys" title="文章修改" @close="modefyClose">
            <modifyArticle :arcId="arcId" :classList="classList"  @modifyArcPopup='modifyArcPopup'></modifyArticle>
        </mu-dialog>
        <!-- 文章修改删除 -->


        <!-- 文章添加 -->
        <mu-dialog :open="articleAdd" title="添加文章"  scrollable>
            <addArticle @addArcPopup='addArcPopup' :classList="classList"></addArticle>
        </mu-dialog>
        <!-- 文章添加 -->


        <!-- 提示 -->
        <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="delPopup">
          删除成功
        </mu-popup>
         
         <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="addPopup">
          添加成功
        </mu-popup>
        
         <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="modifyPopup">
          修改成功
        </mu-popup>

        <!-- 提示 -->
     <!-- 弹出框 -->



     <!-- 分页 -->
     <div class="pages">
       <mu-pagination :total="total" :pageSize="pageSize" :current="current" @pageChange="handleClick" slot="right"></mu-pagination>
     </div>
      <!-- 分页 -->

    </mu-col>
  </mu-row>

    </div>

</template>

<script>
const LoginOk=1;
const LoginErr=0;
import addArticle from './addArticle.vue'
import modifyArticle from './modifyArticle.vue'
import {mapGetters} from 'vuex'
import {getArcClass,getAct} from '../../libs/common'
export default {
    data(){
        return{
        total:5,
        current: 1,
        pageSize:5,
        dialog: false,
        classed: '',
        classList:{},
        actTitle:'',
        content:'#你好',
        articles:[],
        arccleID:'',  //当前文章循环的次数
        nowId:'',  //文章的实际ID
        delPopup: false,
        addPopup: false,
        modifyPopup:false,
        nowArticle:[],
        arcId:''
        }
    },
    methods:{
        handleClick (newIndex) {
          this.$http.get('/act?act=get&page='+newIndex).then((res)=>{
            if(res.data==''){
              console.log("请求内容为空");
            }else{
              this.articles=res.data.result;
            }
          }).catch((err)=>{
            console.log("请求超时")
            console.log(err);
          })
        },
        open (nowClick) {
          this.arcId=this.$refs.nowId[nowClick].innerHTML;
          this.dialog = true
        },
        close () {
          this.dialog = false
        },
        modefyOpen (nowClick) {
          var _this=this;
          this.arccleID=nowClick;
          this.arcId=this.$refs.nowId[this.arccleID].innerHTML;
          console.log(this.arcId);
          this.$store.dispatch('MODEFY_OPEN');
        },
        modefyClose () {
          this.$store.dispatch('MODEFY_CLOSE');
        },
        articleAddShow () {
          this.$store.dispatch('DIALOG_OPEN');
        },
        articleClose () {
          Event.$on('dialog',function(data){
            this.articleAdd = data
          }).bind(this)

        },
        outLogin () {
          this.$http.get('/login/outLogin')
          .then((res)=>{
            if(res.data.success=LoginOk){
               this.$router.push({path:'/Login'})
            }
          })
        },
        conform () {
          console.log(this.classed);
          console.log(this.actTitle)
        },
        addArcPopup(){
          this.addPopup=true
        },
        modifyArcPopup(){
          this.modifyPopup=true
        },
        deleteArticle(arcId){
        // var arcId=_this.$refs.nowId[_this.arccleID].innerHTML;
        this.$http.get('/act?act=del&id='+arcId).then((res)=>{
          if(res.data==''){
            console.log("删除失败")
          }else{
            if(res.data.msg=="success"){
              this.delPopup= true
              this.dialog = false
             
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    computed:mapGetters([
      'articleAdd',
      'modefys',
      'loading'
    ]),
    mounted(){
      getAct.getAct(this);
      getArcClass.getArcClass(this);
    },
    components:{
      'addArticle':addArticle,
      'modifyArticle':modifyArticle
    },
    watch:{
      delPopup:function(val){
        if(val){
          getAct.getAct(this)
          setTimeout(()=> {
            this.delPopup= false
          }, 500);
        } 
      },
      addPopup:function(val){
        getAct.getAct(this)
        if(val){
          setTimeout(()=> {
            this.addPopup=false
          }, 500);
        }
      },
       modifyPopup:function(val){
        getAct.getAct(this)
        if(val){
          setTimeout(()=> {
            this.modifyPopup=false
          }, 500);
        }
      },
      articles:function(val){
         if(val==''){
           console.log("不相等");
          //  this.getAct()
         }
      }
    }
}
</script>

<style>
.title{
    /* text-align: center; */
}
#left{
    transition:all 0.5s;
    min-height: 93vh;
}
.left-menu{
    overflow: hidden;
    padding: 0 0 0 5px;

}
.menu-item{
  box-sizing: border-box;
  transition: all .2s;
}
.menu-item .mu-menu-item-wrapper{
    color:#fff !important;
}
.menu-item:hover{
    border-left:5px solid #7E57C2;
}
.left-menu{
    background: #1D2127;
}
.right-menu{

    padding:10px;

}
.right-menu-item{
    color: #000;
    padding: 5px;
}
.right-menu-item h2{

        margin: 0;
        display: inline;
}
 .right-menu .one{
   background: #fff;
   margin-right: 5px;
   border-bottom: 3px solid #7E57C2;
}
.arctcel{
    margin-top: 10px;
    background: #F3F3F3;
    padding: 0 19px;
    align-items:center;
    display: -webkit-flex;
}
.arctcel-item-btn{
    text-align: center;
}
.pages{
  text-align: center;
  padding-left: 27vw;
  margin-top: 50px;
}
.add{
  display: inline;
  float: right;
}

.mu-dialog{
  min-width:90%;
}
.popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
</style>
