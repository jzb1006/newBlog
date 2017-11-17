<template lang="html">
  <div class="navbar">
    <mu-icon-button icon="menu" id="menu" @click="open('left')" :class="{color:iscolor}"/>
    <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close('left')">
      <ul class="nav">
        <li class="animated fadeInLeft"><h1><router-link to="/home">Home</router-link></h1></li>
        <li  class="animated fadeInLeft"><h1><router-link to="/article">Article</router-link></h1></li>
        <li  class="animated fadeInLeft"><h1><router-link to="/about">About</router-link></h1></li>
      </ul>
       <mu-icon-button icon="close" class="close"  @click="close('left')"/>
     </mu-popup>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
     leftPopup: false,
     iscolor:false
    }
  },
  methods:{
    open (position) {
        this[position + 'Popup'] = true
      },
      close (position) {
        this[position + 'Popup'] = false
      },
      changeColor(path){
           if(path=='/article'){
             this.iscolor=true
           }else{
             this.iscolor=false
           }
        }
  },
  mounted(){
    var path=this.$route.path;
    this.changeColor(path);
  },
  watch: {
  $route(to){
    var path=to.path;
    this.changeColor(path);
    }
  },
  computed:mapGetters([
    'colorChange'
  ])
}
</script>

<style lang="css">
    .nav{
      padding:0;
      margin:0;
      background: #fff;
      position: fixed;
      bottom:0px;
      height:100%;
      width: 100%;
      text-align: center;
      padding-top: 100%;
    }
    .nav li{
      list-style: none;
     }
     .nav a{
       color:#FD5D4D;
     }
     #menu{
       position: fixed;
       top:10px;
       left:10px;
       z-index: 999999;
       color:block;
     }
     .close{
       position: fixed;
       top:10px;
       left:10px;
     }
     .demo-popup-left {
        display: flex;
        width: 50%;
        max-width: 256px;
        height: 100%;
        align-items: center;
      }
</style>
