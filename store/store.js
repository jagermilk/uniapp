// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleAddress from './address.js'

Vue.use(Vuex)

const store=new Vuex.Store({
  modules:{
    m_cart: moduleCart,
    m_address:moduleAddress
  }
})
export default store