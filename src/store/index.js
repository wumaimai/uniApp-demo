import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import user from './modules/user'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {user},
  getters,
  state: {},
  strict: debug,
}) 
