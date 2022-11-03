export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    alladdress: JSON.parse(uni.getStorageSync('cart') || '{}'),
    // 登录成功之后的 token 字符串
    token: uni.getStorageSync('token') || '',
    // 用户的基本信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
     // 重定向的 object 对象 { openType, from }
      redirectInfo: null
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
    // 更新用户的基本信息
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
      this.commit('m_address/saveUserInfoToStorage')
    },
    // 将 userinfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    // 更新 token 字符串
      updateToken(state, token) {
        state.token = token
        // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
        this.commit('m_address/saveTokenToStorage')
        console.log(state.token)
      },
    
      // 将 token 字符串持久化存储到本地
      saveTokenToStorage(state) {
        uni.setStorageSync('token', state.token)
      },
      // 更新重定向的信息对象
        updateRedirectInfo(state, info) {
          state.redirectInfo = info
        }
  },

  // 数据包装器
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.alladdress.provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.alladdress.provinceName + state.alladdress.cityName + state.alladdress.countyName + state.alladdress
        .detailInfo
    }
  },
}
