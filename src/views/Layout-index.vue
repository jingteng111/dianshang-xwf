<template>
  <!-- 顶部通栏 -->
  <nav>顶部通栏</nav>
  <!-- /顶部通栏 -->

  <!-- 头部组件 -->
  <header>头部组件</header>
  <!-- /头部组件 -->

  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view />
  </div>
  <!-- /内容容器 -->

  <!-- 底部组件 -->
  <footer>底部组件</footer>
  <!-- /底部组件 -->
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>

</style>