import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000 // 设置超时时间
})

// 请求拦截器，处理token的头部携带
instance.interceptors.request.use(config => {
  // 拦截业务逻辑,如果本地有token就在头部携带
  // 获取用户信息对象
  const { profile } = store.state.user
  // 判断是否有token
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
// res => res.data 取出data数据，调用接口时直接拿到后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    store.commit('user/setUser', {})
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
    // 当前路由地址
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
const request = (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 如果是get请求  需要使用params来传递submitData
    // 如果不是get请求  需要使用data来传递submitData
    // [] 设置一个动态的key
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request