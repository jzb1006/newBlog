<template lang="html">
  <div id="articel">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="70" class="left">
       <article class="article">
           <header v-for="item in classList">
             <h1 v-if="item['ID']==$route.params.val" v-model="classedItem=item['class']">分类目录{{item['class']}}</h1>
           </header>

          <router-link class="detail" :to="{ path: '/detail', query:{ id: item.ID }}" tag='a' v-for="item in classed">
           <div class="container">
             
             <div class="title">
               <mu-list-item :title="item.title" disabled  class="badge">
                 <mu-badge :content="classedItem" secondary  slot="left"/>
               </mu-list-item>
             </div>
            
            <p class="author">
              <span>{{item.author}}</span>
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
               <span>标签：({{classedItem}})</span>
            </footer>
           </div>
         </router-link>
          <h1 v-show="classed==''" class="arcNull">文章为空</h1>
       </article>
      </mu-col>
       <mu-col width="100" tablet="50" desktop="30" class="right">
        <aside class="classd">
          <h3>分类标签</h3>
          <div class="">
            <mu-chip class="chip" v-for="(val,index) in classList" @click="getArcClassed($route.params.val)">
              <router-link :to="'/class/'+val['ID']" tag="a">
                {{val["class"]}}
              </router-link>
            </mu-chip>
          </div>
        </aside>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  data (){
    return {
      classedItem:'',
      classList:[],
      classed:[],
      classId:''
    }
  },
  methods:{
    getArcClass(){
        this.$http.get('/act?act=class').then((res)=>{
          if(res==''){
            console.log("database none");
          }else{
            this.classList=res.data
          }
        }).catch((err)=>{
            console.log(err)
       })
    },
    getArcClassed(classId){
       this.$http.get('/act?act=classed&id='+classId).then((res)=>{
          if(res==''){
            console.log("database none");
          }else{
            this.classed=res.data
          }
        }).catch((err)=>{
            console.log(err)
       })
    },
    alerrr(){
      console.log("sdfsd")
    }
  },
  mounted(){
    this.getArcClass()
    this.classId=this.$route.params.val;
    this.getArcClassed(this.classId)
  }
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
.badge .mu-item-content{
  padding-right:20px !important;
}
.article header h1{
  color: #FD5D4D;
  margin: 0;
  border-bottom: 2px solid #FD5D4D;
  padding-bottom: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.arcNull{
    text-align: center;
    color: #E0E0E0;
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
  margin-top: 30px;
}
</style>
