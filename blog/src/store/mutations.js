import {
  CHANGE_COLOR_TRUE,
  CHANGE_COLOR_FALSE,
  NAV_SHOW,
  NAV_HIDE,
  DIALOG_CLOSE,
  DIALOG_OPEN,
  GET_ARTICLE,
  MODEFY_CLOSE,
  MODEFY_OPEN,
  LOADING_HIDE,
  LOADING_SHOW
} from './type'

const state={
  iscolor:false,
  navShow:true,
  dialog:false,
  articles:[],
  modefy:false,
  loading:false
};

const mutations={
  [CHANGE_COLOR_TRUE](state){
  state.iscolor=true;
  },
  [CHANGE_COLOR_FALSE](state){
    state.iscolor=false;
  },
  [NAV_SHOW](state){
    state.navShow=true;
  },
  [NAV_HIDE](state){
    state.navShow=false;
  },
  [DIALOG_CLOSE](state){
    state.dialog=false;
  },
  [DIALOG_OPEN](state){
    state.dialog=true;
  },
  [MODEFY_CLOSE](state){
    state.modefy=false;
  },
  [MODEFY_OPEN](state){
    state.modefy=true;
  },
  [LOADING_HIDE](state){
    state.loading=false
  },
  [LOADING_SHOW](state){
    state.loading=true
  }
}

const getters={
  colorChange(state){
    return state.iscolor;
  },
  navShow(state){
    return state.navShow;
  },
  articleAdd(state){
    return state.dialog;
  },
  articles(state){
    return state.articles;
  },
  modefys(state){
    return state.modefy;
  },
  loading(state){
    return state.loading;
  }
}

export default{
  state,
  mutations,
  getters
}
