<template>
  <section id="shop" class="my-4">
    <container>
      <row>
        <column col="12" >
          <h4 class="text-left font-600 mb-1 md:pl-1 pl-0">Shop Brentos</h4>
          <template v-if="fetchFlag">
            <Carousel  ref="carousel" :breakpoints="breakpoints" :settings="settings" :wrap-around="true">
              <Slide v-for="(item,index) in randomCollection" :key="index">
                <CollectionCart
                    :srcset="item.srcset"
                    :src="item.src"
                    :link="item.link"
                    :text="item.text"
                    class="mx-1"
                />
              </Slide>
              <template #addons>
                <div class="flex gap-1 justify-center items-center my-2">
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-left" @click="prev" />
                  <Pagination />
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-right" @click="next" />
                </div>

              </template>
            </Carousel>
          </template>
          <template v-else>

            <Carousel  ref="carousel" :breakpoints="breakpoints" :settings="settings" :wrap-around="true">
              <Slide v-for="i in 3" :key="i">
                <Skeletor class="rounded-4 mr-1" width="100%" :shimmer="true" height="400"/>
              </Slide>
              <template #addons>
                <div class="flex gap-1 justify-center items-center my-2">
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-left" @click="prev" />
                  <Pagination />
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-right" @click="next" />
                </div>

              </template>
            </Carousel>
          </template>
        </column>
      </row>
    </container>
  </section>
</template>

<script setup lang="ts">
import {useCollectionStore} from "~/composables/useStore";
import {useCarousel} from "~/composables/useCarousel";
import { Carousel, Slide, Pagination } from 'vue3-carousel'
const {randomCollection,fetchFlag}=useCollectionStore()
const {breakpoints,prev,next,carousel,settings}=useCarousel()
</script>

<style lang="scss">
.carousel__pagination{
  margin: 0 !important;
}
.carousel__pagination-button::after{
  width: 9px!important;
  height: 9px!important;
  border-radius: 50%!important;
  transition: all 300ms linear;
}
.carousel__pagination-button--active::after{
  width: 30px!important;
  border-radius: 7px!important;

}
.carousel__viewport{
  padding-bottom: 10px!important;
}
</style>