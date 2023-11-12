<template>
  <container class="relative">
    <row>
      <column col="12">
        <BreadCrumb
            :pages="[{name:'Home',link:{name:'index'}},{name:'Collections',link:{name:'Collections-All'}},{name:$route.params?.name?.split('-').join(' ') ?? ''}]"/>
        <h1 class="font-600 text-left mb-1">{{ $route.params?.name?.split('-').join(' ') ?? '' }}</h1>
      </column>
    </row>
    <LoaderPage class="!static !items-center !h-[300px]" :show="!fetchFlag && !errorFlag"/>
    <template v-if="fetchFlag && productListData">
      <template v-if="24 < productListData.length">
        <row>
          <column col="12">
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5">
              <ProductCard class="mb-1"
                           v-for="item in list"
                           :type="item.type"
                           :category="item.category"
                           :price="item.price"
                           :title="item.title"
                           :link="item.link"
                           :discount="item.discount"
                           :cover-src="item.coverSrc"
                           :cover-srcset="item.coverSrcset"
                           :overlay-src="item.overlaySrc"
                           :overlay-srcset="item.overlaySrcset"
                           :is-period="item.isPeriod"
                           :id="item.id"
                           :is-sold-out="item.isSoldOut"/>
            </div>
          </column>
        </row>
        <row>
          <column col="12">
            <Pagination @update="updatePage($event)" :source="productListData" :item-in-warp="4"/>
          </column>
        </row>
      </template>
      <template v-else>
        <row>
          <column col="12">
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5">
              <ProductCard class="mb-1" v-for="item in productListData" :price="item.price" :title="item.title"
                           :category="item.category"
                           :link="item.link"
                           :type="item.type"
                           :discount="item.discount"
                           :cover-src="item.coverSrc"
                           :cover-srcset="item.coverSrcset"
                           :overlay-src="item.overlaySrc"
                           :overlay-srcset="item.overlaySrcset"
                           :is-period="item.isPeriod" :id="item.id"
                           :is-sold-out="item.isSoldOut"/>
            </div>
          </column>
        </row>

      </template>
    </template>
    <template v-if="errorFlag">
      <span class="font-500 my-1">There are currently no products in this collection. </span>
    </template>
  </container>
</template>

<script setup lang="ts">
import {usePaginating} from "~/composables/usePagination";
import {useProductStore} from "~/composables/useStore";
const {updatePage, list} = usePaginating()
const {productStore,productListData, fetchFlag, errorFlag}=useProductStore()
const route=useRoute()
onMounted(()=>{
  productStore.triggerFetchProductList(route.params.name as string)
})
useHead({
  title:`${(route.params.name as string).split('-').join(' ')} – Brentos`
})
</script>
