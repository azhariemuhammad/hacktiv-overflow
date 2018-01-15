import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  state,
  mutations
})

export default store
