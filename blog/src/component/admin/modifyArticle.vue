<template>
  <div>
    <div class="article">
      <div v-show="loading">
        <loading></loading>
      </div>
      <div class="title" >
          <mu-text-field label="ID" :fullWidth="true" v-model="actId" v-show="false" labelFloat/><br/>
          <mu-text-field label="标题" :fullWidth="true" v-model="actTitle"  labelFloat/><br/>
          <mu-text-field label="描述" :fullWidth="true" v-model="description" labelFloat/><br/>
          <mu-text-field label="作者" :fullWidth="true" v-model="author" labelFloat/><br/>
          <mu-select-field v-model="classed"  :labelFocusClass="['label-foucs']" label="选择文章类型" :fullWidth="true">
              <mu-menu-item v-for="(text,index) in classList" :key="index+1"  :value="index+1" :title="text.class" />
          </mu-select-field>
      </div>

      <div class="editor">
        <mavon-editor @imgAdd="imgAdd" @imgDel="imgDel" style="height:200px"  v-model="content"/>
      </div>

      <div class="button">
        <!-- <mu-raised-button slot="actions"  primary @click="uplodeimg($event)" label="上传图片"/> -->
        <mu-raised-button slot="actions"  primary label="取消" @click="modefyClose"/>
        <mu-raised-button slot="actions" primary  label="确定" @click="comform"/>
      </div>


  </div>
</div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data (){
          return {
            actId:'',
            actTitle:'',
            description:'',
            author:'',
            classed:1,
            content:'',
            // classList:{},
            img_file: {}
          }
        },
        props:{
          classList:Array,
          arcId:String
        },
        methods:{
         modefyClose(){
          this.$store.dispatch('MODEFY_CLOSE');
          },
          comform(){
            var actId=this.actId;
            var actTitle=this.actTitle;
            var description=this.description;
            var author=this.author;
            var classed=this.classed;
            var content=this.content;
            if(actTitle == ''){
              alert("标题不能为空");
              return false;
            }else if (description=='') {
              alert("描述不能为空");
              return false;
            }else if(author==''){
              alert("作者不能为空")
              return false;
            }else if(classed==''){
              alert("分类不能为空");
              return false;
            }else if(content==''){
              alert("内容不能为空");
              return false;
            }else{
              this.$http.post('/act?act=modify&id='+actId,{
                actTitle:actTitle,
                description:description,
                author:author,
                classed:classed,
                content:content
              }).then((res)=>{
                if(res.data.msg=="success"){
                  this.$emit('modifyArcPopup');
                  this.$store.dispatch('MODEFY_CLOSE');
                }else{
                  alert("修改失败，未知错误,请从新修改");
                }

              }).catch((err)=>{
                  console.log(err);
              })
            }
           },
          imgAdd(pos,$file){
            this.img_file[pos]=$file;
          },
          imgDel(pos){
            delete this.img_file[pos];
          },
          uplodeimg($e){
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            console.log(this.img_file)
          },
          getArc(arcId){
            var _this=this;
            this.$http.get('/act?act=getOne&id='+arcId).then((res)=>{
              if(res.data.data==''){
                console.log(res.data.msg);
              }else{
                if(res.data.msg=='success'){
                  _this.actId=res.data.data[0].ID;
                  _this.actTitle=res.data.data[0].title;
                  _this.description=res.data.data[0].intro;
                  _this.author=res.data.data[0].author;
                  _this.classed=parseInt(res.data.data[0].classify_ID);
                  _this.content=res.data.data[0].content;
                }
              }
            }).catch((err)=>{
              console.log(err)
            })
         
          }
        },
        created(){
          this.$nextTick(function () {
            this.getArc(this.arcId)
          })
        },
      computed:mapGetters([
        'loading'
      ])
    }
</script>

<style scoped>
 .button{
    text-align: center;
 }
 .editor{
   margin:50px auto;
 }
</style>