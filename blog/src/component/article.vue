<template lang="html">
  <div id="articel">
    <div v-show="loading">
      <loading></loading>
    </div>
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="70" class="left">
       <article class="article" v-for="(item,index) in articles" >
         <router-link class="detail" :to="{ path: '/detail', query:{ id: item.ID }}"  tag='a'>
           <header>
             <h1>{{item.title}}</h1>
           </header>
           <p class="author">
            <span>作者：{{item.author}}</span>
            <span>发表于：{{item.post_time}}</span>
           </p>
           <div class="content">
             <p>
               {{item.intro}}
             </p>
           </div>
           <footer>
             <span>阅读：(10000)</span>
             <span>评论：(100)</span>
             <span v-cloak>标签：({{classList[item.classify_ID-1]["class"]}})</span>
           </footer>
         </router-link>
       </article>


      </mu-col>
      <mu-col width="100" tablet="50" desktop="30" class="right">
        <aside class="classd">
          <h3>分类标签</h3>
          <div class="">
            <mu-chip class="chip" v-for="(val,index) in classList">
              <router-link :to="'/class/'+val['ID']" tag="a">
                {{val["class"]}}
              </router-link>
            </mu-chip>
          </div>
        </aside>
      </mu-col>
    </mu-row>

     <!-- 分页 -->
     <div class="pages">
       <mu-pagination :total="total" :pageSize="pageSize" :current="current" @pageChange="handleClick" slot="right"></mu-pagination>
     </div>
      <!-- 分页 -->

      
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import {getArcClass,getAct} from '../libs/common'
export default {
  data (){
    return {
      total:5,
      current: 1,
      pageSize:5,
      articles:[],
      current_arcID:1,
      classList:[]
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
        }
  },
  created(){
       getArcClass.getArcClass(this);
       getAct.getAct(this);
   },
   computed:mapGetters([
      'loading'
    ]),
}
</script>

<style lang="css" scoped>
body{
  background: #fff;
}
.left,.right{
  padding:10px;

}
.right{
  text-align: center;
}
.chip{
  margin-bottom: 10px;
  text-align: center;
  margin-left: 20px;
  color:#fff;
}
.chip a{
  color: #000;
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
  border-bottom: 1px dashed rgba(253, 93, 77, 0.49);
}
.article a{
  color:#000;
}
.article header h1{
  color: #FD5D4D;
  margin: 0;
}
.article .author{
  font-size: 14px;
  color: #9e9e9e;
  margin: 4px 0;
}
.article .content{
     color: #9E9EAA;
     font-size: 12px;
}
.article footer{
  text-align: right;
    margin: 5px 0;
}
#articel{
  max-width: 1980px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
