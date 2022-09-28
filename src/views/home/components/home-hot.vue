<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <div ref="target" style="position: relative;height: 426px">
        <!-- 面板内容 -->
        <Transition name="fade" >
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link to="/">
                <img :src="item.picture" alt="">
                <p class="name">{{item.title}}</p>
                <p class="desc">{{item.alt}}</p>
              </router-link>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
      <!-- /面板内容 -->
    </HomePanel>
  </div>
</template>

<script>
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'

export default {
  name: 'HomeHot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const { result, target } = useLazyData(findHot)
    return { goods: result, target }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>