<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading ">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          :class="{active: brand.id === filterData.selectedBrand}"
          @click="changeBrand(brand.id)"
          v-for="brand in filterData.brands"
          :key="brand.id"
          href="javascript:;"
        >
          {{ brand.name }}
        </a>
      </div>
    </div>
    <div
      v-for="item in filterData.saleProperties"
      :key="item.id"
      class="item"
    >
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
        :class="{active: p.id === item.selectedProp }"
        @click="changeProp(item,p.id)"
        v-for="p in item.properties"
        :key="p.id"
        href="javascript:;"
        >
          {{ p.name }}
        </a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    const filterLoading = ref(false)
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoading.value = true
        // 发送请求数据
        findSubCategoryFilter(route.params.id).then(data => {
          // 品牌全部
          data.result.selectedBrand = null
          data.result.brands.unshift({ id: null, name: '全部' })
          // 销售属性全部
          data.result.saleProperties.forEach(item => {
            item.selectedProp = null
            item.properties.unshift({ id: null, name: '全部' })
          })
          // 设置修改的数据
          filterData.value = data.result
          filterLoading.value = false
        })
      }
    }, { immediate: true })

    // 获取筛选参数的函数
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }

    // 记录选择品牌
    const changeBrand = (brandId) => {
      console.log(filterData.value.brands)
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 记录选择销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }

    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>
<style lang="less" scoped >
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
    .xtx-skeleton {
      padding: 10px 0;
    }
  }
</style>