<template>
  <div>
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
    </div>
    <!-- /首页入口（分类+广告） -->

    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- /新鲜好物 -->

    <!-- 人气推荐 -->
    <HomeHot />
    <!-- /人气推荐 -->

    <!-- 品牌推荐 -->
    <HomeBrand />
    <!-- /品牌推荐 -->

    <!-- 商品区块 -->
    <HomeProduct />
    <!-- /商品区块 -->

    <!-- 最新专题 -->
    <HomeSpecial />
    <!-- /最新专题 -->
  </div>
</template>

<script>
// import { ref } from 'vue'
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped>
</style>