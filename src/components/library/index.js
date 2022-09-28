import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    // 在app上进行扩展
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
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