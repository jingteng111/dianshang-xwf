<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- /面包屑 -->

      <!-- 轮播图 -->
      <XtxCarousel
        :sliders="sliders"
        style="height:500px"
        autoPlay
      />
      <!-- /轮播图 -->

      <!-- 所有二级分类 -->
      <div class="sub-list"
      >
        <h3>{{ topCategory.name }}分类</h3>
        <ul>
          <li
            v-for="sub in topCategory.children"
            :key="sub.id"
          >
            <a href="javascript:;">
              <img :src="sub.picture" >
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- /所有二级分类 -->

      <!-- 分类关联商品 -->
      <div
        v-for="sub in subList"
        :key="sub.id"
        class="ref-goods"
      >
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
      <!-- /分类关联商品 -->
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item'

export default {
  name: 'TopCategory',
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    // 面包屑+所有分类
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      // 当前顶级分类
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      // 找到数据赋值
      if (item) cate = item
      return cate
    })

    // 获取各个子目录下推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    }, { immediate: true })

    return {
      sliders,
      topCategory,
      subList
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scopetod>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>