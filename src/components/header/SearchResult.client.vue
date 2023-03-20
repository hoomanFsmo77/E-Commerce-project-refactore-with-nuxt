<template>
  <div v-fade:99999="searchText.length>0 && isFire"  class="search-result-container">
    <div  class="search-result">
      <LoaderSkeletor v-if="!searchFlag"/>
      <div v-else>
        <div class="p-1.5 !pb-1">
          <span class="text-0.9  block">Products</span>

          <!--      <<<<<<<<< render the search result here >>>>>>>>>>>>>>>-->
          <!--          <<<<<<<<< start >>>>>>>>-->
          <template v-if="searchResult.product.length>0">
            <div class="search-result-item  " v-for="item in searchResult.product">
              <nuxt-img

                  :srcset="item.coverSrcset"
                  :src="item.coverSrc" height="110"  class="responsive-image rounded-8" alt="" />
              <span class="mt-0.5 block font-600">$45.00</span>

              <NuxtLink :to="$link(item.link,item.id,item.category)" class="font-600 btn-stretch btn-link">{{item.title}}</NuxtLink>
            </div>
          </template>
          <template v-else>
            <p class="font-600 text-0.9">
              No Search Result Found!
            </p>
          </template>
          <!--          <<<<<<<<< end >>>>>>>>-->
        </div>
        <div class="divider"></div>
        <div class="p-1.5 !pt-1">
          <span class="text-0.9 mb-0.5 block">Collections</span>
          <ul class="ul-col">
            <!--        <<<<<<<<<< render the result of search category here >>>>>>>>>-->
            <!--        <<<<<<<< start >>>>>>>>-->
            <template v-if="searchResult.collection.length>0">
              <li v-for="item in searchResult.collection">
                <NuxtLink class="btn-link font-600" :to="item.link">
                  {{item.text}}
                </NuxtLink>
              </li>
            </template>
            <template v-else>
              <li class="font-600 text-0.9">
                No Search Result Found!
              </li>
            </template>

            <!--        <<<<<<<<< end >>>>>>>-->
          </ul>
        </div>
        <div class="flex sticky bottom-0 bg-light justify-center mt-1 shadow-[0_0_40px_rgba(0,0,0,0.2)] p-1">
          <NuxtLink class="btn btn-dark-fill w-full text-center" :to="{name:'search',query:{name:searchText}}">
            Search for "{{searchText}}"
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSearchStore} from "~/composables/useStore";
const {$link}=useNuxtApp()
let props=defineProps<{
  searchText:string,
  isFire:boolean
}>();
const {searchResult,searchFlag}=useSearchStore()
</script>

<style scoped>

</style>