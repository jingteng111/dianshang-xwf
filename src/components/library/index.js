import defaultImg from '@/assets/images/200.png'

// 导入library文件夹下的所有组件
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展
    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
    // 定义指令
    defineDirective(app)
  }
}

const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建对象，来观察当前指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进入可视区，停止观察
          observe.unobserve(el)
          // 处理图片加载失败
          el.onerror = () => {
            // 加载失败，设置默认图
            el.src = defaultImg
          }
          // 把指令的值设置给el的src属性
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}