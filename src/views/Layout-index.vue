<template>
  <div>
    <!-- 顶部通栏 -->
    <AppTopnav />
    <!-- /顶部通栏 -->

    <!-- 吸顶头部 -->
    <AppHeaderSticky />
    <!-- /吸顶头部 -->

    <!-- 头部组件 -->
    <AppHeader />
    <!-- /头部组件 -->

    <!-- 内容容器 -->
    <div class="app-body">
      <!-- 二级路由 -->
      <router-view />
    </div>
    <!-- /内容容器 -->

    <!-- 底部组件 -->
    <AppFooter />
    <!-- /底部组件 -->
  </div>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
import { useStore } from 'vuex'

export default {
  name: 'LayoutIndex',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 获取分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body{
  min-height: 600px;
}
</style>