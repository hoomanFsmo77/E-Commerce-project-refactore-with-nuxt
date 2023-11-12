<template>
  <container class="relative">
    <LoaderPage :show="!mainSearchFlag"/>
    <row class="!mb-0 !pb-0">
      <column col="12">
        <BreadCrumb
            :pages="[{name:'Home',link:{name:'index'}},
            {name:`Search results for '${$route?.query?.name ?? ''}'`}]"
        />
        <h1 class="font-600 text-left mb-1">Search Result</h1>
      </column>
    </row>
    <row class="!mt-0 !pt-0">
      <column col="12" sm="10">
        <FormSearch v-model="searchText" class="!z-50"/>
      </column>
      <column col="12" sm="2" class="flex justify-start">
        <button @click="triggerSearch" class="btn btn-dark-fill font-700 sm:ml-1 w-full">
          Search again
        </button>
      </column>
    </row>
    <row v-if="mainSearchFlag">
      <column col="12">
        <span class="font-500  block">{{searchLen}} results found for for "{{$route.query.name}}" </span>
        <span class="font-500  block text-gray-500 mt-0.5">Showing {{paginationBoundry.start+1}} - {{paginationBoundry.end}} of {{searchLen}} results </span>
      </column>
    </row>
    <row v-if="mainSearchFlag">
      <column col="12">
        <h5 class="font-600">Products ({{searchLen}})</h5>
      </column>
    </row>
    <row v-if="mainSearchFlag">
      <template v-if="mainSearchResult.length>0">
        <template v-if="mainSearchResult.length > 10">
          <column col="12">
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5">
              <ProductCard class="mb-1" v-for="item in list" :type="item.type" :price="item.price" :title="item.title" :link="item.link" :discount="item.discount" :cover-src="item.coverSrc" :cover-srcset="item.coverSrcset" :overlay-src="item.overlaySrc" :overlay-srcset="item.overlaySrcset" :is-period="item.isPeriod" :category="item.category" :id="item.id" :is-sold-out="item.isSoldOut"/>
            </div>
          </column>
          <column col="12">
            <Pagination @period="updatePaginationPeriod($event)" @update="updatePage($event)"  :source="mainSearchResult" :item-in-warp="10"/>
          </column>
        </template>
        <template v-else>
          <column col="12">
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5">
              <ProductCard class="mb-1" v-for="item in mainSearchResult" :type="item.type" :price="item.price" :title="item.title" :link="item.link" :discount="item.discount" :cover-src="item.coverSrc" :cover-srcset="item.coverSrcset" :overlay-src="item.overlaySrc" :overlay-srcset="item.overlaySrcset" :is-period="item.isPeriod" :category="item.category" :id="item.id" :is-sold-out="item.isSoldOut"/>
            </div>
          </column>
        </template>
      </template>
      <template v-else>
        <column col="12">
          <h3 class="font-700">No search result found!</h3>
        </column>
      </template>
    </row>
  </container>
</template>

<script setup lang="ts">
import {useSearchStore} from "~/composables/useStore";
import {usePaginating} from "~/composables/usePagination";
import {useSearch} from "~/composables/useSearch";
const {searchLen,mainSearchFlag,mainSearchResult}=useSearchStore()
const {searchText,triggerSearch,updatePaginationPeriod,paginationBoundry}=useSearch()
const {updatePage,list}=usePaginating()
</script>

<style scoped>

</style>