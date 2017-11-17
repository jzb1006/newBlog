<template lang="html">
  <div class="article">
      <div v-show="loading">
        <loading></loading>
      </div>
      <div class="title">
          <mu-text-field label="标题" :fullWidth="true" v-model="actTitle" labelFloat/><br/>
          <mu-text-field label="描述" :fullWidth="true" v-model="description" labelFloat/><br/>
          <mu-text-field label="作者" :fullWidth="true" v-model="author" labelFloat/><br/>
          <mu-select-field v-model="classed"  :labelFocusClass="['label-foucs']" label="选择文章类型" :fullWidth="true">
              <mu-menu-item v-for="(text,index) in classList" :key="index+1"  :value="index+1" :title="text.class" />
          </mu-select-field>
      </div>

      <div class="editor">
        <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" style="height: 500px"  v-model="content"/>
      </div>

      <div class="button">
        <mu-raised-button slot="actions"  primary @click="uplodeimg" label="上传图片"/>
        <mu-raised-button slot="actions"  primary label="取消" @click="articleClose"/>
        <mu-raised-button slot="actions" primary  label="确定" @click="conform"/>
      </div>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data (){
    return {
      actTitle:'',
      description:'',
      author:'',
      classed:'',
      content:'',
      // classList:{},
      img_file: {}
    }
  },
  mounted (){
      // this.getArcClass();
  },
  props:{
    classList:Array
  },
  methods:{
    conform(){
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
        this.$http.post('/act?act=add',{
           actTitle:actTitle,
           description:description,
           author:author,
           classed:classed,
           content:content
        }).then((res)=>{
          if(res.data.msg=="success"){
             this.$emit('addArcPopup');
             this.$store.dispatch('DIALOG_CLOSE');
          }else{
            alert("提交失败，未知错误,请从新提交");
          }

        }).catch((err)=>{
            console.log(err);
        })

      }
    },
    $imgAdd(pos, $file){
      this.img_file[pos] = $file;
    },
    $imgDel(pos){
        delete this.img_file[pos];
    },
    uplodeimg($e){
      console.log(this.img_file)
      var formdata = new FormData();
      var _imglst = [];
      for (var _img in this.img_file) {
          formdata.append(_img, this.img_file[_img]);
           _imglst.push([_img, this.img_file[_img]]);
      }
      this.$http({
        method:'post',
        url:'/act?act=addImg',
        data:this.img_file,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      console.log(formdata)
      console.log(_imglst)
    },
    articleClose(){
     this.$store.dispatch('DIALOG_CLOSE');
    }
  },
  computed:mapGetters([
      'loading'
    ])
}
</script>

<style lang="css" scope>
 .button{
    text-align: center;
 }
 .editor{
   margin:50px auto;
 }
</style>
