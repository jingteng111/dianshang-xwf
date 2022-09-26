<template>
  <!-- 首页入口（分类+广告） -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- /左侧分类 -->
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- /轮播图 -->
    </div>
    <!-- /首页入口（分类+广告） -->
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style lang="less" scoped>

</style>