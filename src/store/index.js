import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate' // vuex持久化

// 三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category
  },
  // 配置vuex持久化插件
  plugins: [createPersistedstate({
    // 本地存储名字
    key: 'dianshang-xwf',
    // 指定需要存储的模块
    paths: ['user', 'cart']
  })]
})
