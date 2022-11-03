export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    alladdress: JSON.parse(uni.getStorageSync('cart') || '{}'),
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.alladdress = address
      this.commit('m_address/saveAddressToStorage') 
    },
    // 1. 定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.alladdress))
    },
  },

  // 数据包装器
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.alladdress.provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.alladdress.provinceName + state.alladdress.cityName + state.alladdress.countyName + state.alladdress.detailInfo
    }
  },
}
