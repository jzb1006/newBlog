 <template>
  <div id="app">
    <mu-row>
      <mu-col width="100" tablet="100" desktop="100">
        <Navbar v-show='navShow'></Navbar>
      </mu-col>
      <mu-col width="100" tablet="100" desktop="100">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import Navbar from './component/navbar.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      msg:'asdfa'
    }
  },
  components:{
    Navbar
  },
  methods:{
    getRoute(){
      if(this.$route.path=='/admin' || this.$route.path=='/404' || this.$route.path=='/Login'){
        this.$store.dispatch('NAV_HIDE');
      }else{
        this.$store.dispatch('NAV_SHOW');
      }
    }

 },
 mounted(){
  this.getRoute();
 },
 computed:mapGetters([
   'navShow'
 ]),
 watch:{
    '$route'(to){
      var pathName=to.path;
      if(pathName=='/admin'){
        this.$store.dispatch('NAV_HIDE');
      }else{
        this.$store.dispatch('NAV_SHOW');
      }
    }
   }
 }

</script>

<style>
 body,html{
   /*font-family: "微软雅黑" cursive;*/
   font-family: cursive, "Microsoft YaHei";
 }
 .menu{
   position: fixed;
     bottom: 6px;
     left: 8px;
     z-index: 999999;
     background: #FD5D4D;
     transition: all 1s;
 }
  .slide-enter-active{
    transform-origin: left;
    transition:all .3s;
    opacity: 1;
  }
  .slide-leave-active{
    transform: scale(0,1);
    transition:all .3s;
    opacity: 0;
  }
  .slide-enter{
    transform: scale(0,1);
    transition:all .3s;
    opacity: 1;
  }
</style>
