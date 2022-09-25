// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state: () => {
    return {
      // 分类信息列表
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    // 控制当前一级分类下的二级分类显示和隐藏
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const { result } = await findAllCategory()
      // 给每个分类加上控制二级分类的数据
      result.forEach(item => {
        item.open = false
      })
      // 修改分类数据
      commit('setList', result)
    }
  }
}