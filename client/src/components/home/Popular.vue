<template>
  <section id="popular">
    <container>
      <row>
        <column col="12">
          <h4 class="text-left font-600 mb-1 md:pl-1 pl-0">Popular Now</h4>
          <div v-if="popularProductFetchFlag" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.3">
            <ProductCard class="mb-1" v-for="item in popularProducts" :price="item.price" :title="item.title"
                         :link="{name:item.type==='Art'?`Products-Art-name`:`Product-Item-name`,params:{name:item.link}}" :discount="item.discount" :cover-src="item.coverSrc"
                         :overlay-src="item.overlaySrc"
                         :is-period="item.isPeriod" :id="item._id"
                         :is-sold-out="item.isSoldOut" :category="item.category"/>
          </div>
          <div v-if="!popularProductFetchFlag" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.3">
            <Skeletor v-for="i in 4" class="rounded-8" width="100%" :shimmer="true" height="400"/>
          </div>

        </column>
      </row>
    </container>
  </section>
</template>

<script setup lang="ts">
import {useProductStore} from "~/composables/useStore";
const {popularProductFetchFlag,popularProducts}=useProductStore()
</script>

