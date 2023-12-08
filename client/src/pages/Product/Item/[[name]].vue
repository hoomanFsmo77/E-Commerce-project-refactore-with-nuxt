<template>
  <section  :id="`product-show-id-${$route.params.name}`">
    <container>
      <row v-if="productDetailFlag">
        <column col="12" >
          <BreadCrumb :pages="
            [{name:'Home',link:{name:'index'}},
            {name:'Collections',link:{name:'Collections-All'}},
            {name:productData?.category?.split('-')?.join(' ') ?? '',link:{name:'Collections-name',params:{name:productData?.category ?? ''}}},
            {name:productData?.title?.split('-').join(' ') ?? ''}]"
          />
        </column>
      </row>
      <LoaderPage class="!static !items-center !h-[500px]" :show="!productDetailFlag"/>
      <row v-if="productDetailFlag">
        <column  class="sm:!pr-1"  col="12" sm="6">
          <div class="sticky top-1.5">
            <Carousel  ref="carousel" :settings="settings" :wrap-around="true">
              <Slide v-for="(item,index) in productData.gallery" :key="index">
                <ProductGallery :zoom="item.zoom" :src="item.src" :srcset="item.srcset"/>
              </Slide>
              <template #addons>
                <div class="flex gap-1 justify-center items-center my-1">
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-left" @click="prev" />
                  <Pagination />
                  <font-awesome-icon size="lg" class="cursor-pointer" icon="fa-solid fa-angle-right" @click="next" />
                </div>

              </template>
            </Carousel>
          </div>
        </column>
        <column col="12" sm="6" >
          <div class="sm:pl-1">
            <div>
              <h1 class="font-600 ">{{productData.title}}</h1>
              <template  v-if="productData.discount">
                <div class="flex gap-2">
                  <h3 class="font-600 my-1">${{helperData.whichFrame===0 ? totalPriceWithOutFrame.toFixed(2) :totalPriceWithFrame.toFixed(2)}}</h3>
                  <h3 class="font-600 my-1 line-through text-gray-500">${{productData.price.toFixed(2) }}</h3>
                </div>

              </template>
              <template v-else>
                <h3 class="font-600 my-1">${{helperData.whichFrame===0 ? totalPriceWithOutFrame :totalPriceWithFrame }}</h3>
              </template>
              <p v-html="item.content" class="mb-1 font-500 text-1" v-for="item in productData.description"></p>
            </div>
            <div class="mt-4 " v-if="productData?.option?.sizes">
              <h5 class="font-600 mb-1">Size</h5>
              {{setSelectedSize}}
              <button
                  :class="{'disabled':!item.available,'selected':helperData.sizeIndex===index && item.available}"
                  @click="changeSize(item,index)"
                  v-for="(item,index) in productData.option.sizes"
                  class="btn btn-dark-outline mr-1 "
              >
                {{item.size}}
              </button>
            </div>
            <div class="mb-1">
              <template v-if="productData.discount">
                <div class="flex items-center gap-1">
                  <h1 class="font-600 my-2">${{helperData.whichFrame===0 ? totalPriceWithOutFrame.toFixed(2)  :totalPriceWithFrame.toFixed(2)}}</h1>
                  <div>
                    <span class="line-through ">${{productData.price.toFixed(2) }}</span>
                    <br>
                    <span class="text-gray-500 ">you have saved ${{(productData.price-productData.discount).toFixed(2)}}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <h1 class="font-600 my-2">
                  ${{helperData.whichFrame===0 ? totalPriceWithOutFrame.toFixed(2)  :totalPriceWithFrame.toFixed(2)  }}
                </h1>
              </template>
            </div>
            <div class="divider"></div>
            <div class="flex flex-col sm:flex-row gap-1 items-center">
              <div v-if="!productData.isSoldOut">
                <button @click="decrement" class="btn btn-dark-outline !py-1">
                  <font-awesome-icon size="lg" icon="fa-solid fa-minus" />
                </button>
                <span class="mx-1 px-0.5 text-1.5">
                      {{helperData.quantity}}
                    </span>
                <button @click="increment" class="btn btn-dark-outline !py-1">
                  <font-awesome-icon size="lg" icon="fa-solid fa-plus" />
                </button>
              </div>
              <button :disabled="productData.isSoldOut" :class="{'w-[50%] !bg-gray-400':productData.isSoldOut}" @click="addToCart" class="btn btn-dark-fill px-2 text-1.2 font-700">
                {{productData.isSoldOut ? 'Sold Out': isProductInCart($route.params.name) ? 'remove product' :'Add to cart'}}
              </button>
            </div>
            <div class="mt-4">
              <h5 class="font-600 mb-1">Share</h5>
              <ul class="flex gap-2 item-center">
                <li>
                  <font-awesome-icon size="md" icon="fa-brands fa-facebook-f" />
                  <a  class="btn-link ml-0.5 " :href="productData.link.facebook">
                    Facebook
                  </a>
                </li>
                <li>
                  <font-awesome-icon size="md" icon="fa-brands fa-twitter" />
                  <a  class="btn-link ml-0.5 " :href="productData.link.twitter">
                    Twitter
                  </a>
                </li>
                <li>
                  <font-awesome-icon size="md" icon="fa-brands fa-pinterest" />
                  <a  class="btn-link ml-0.5 " :href="productData.link.pinterest">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </column>
      </row>
      <row class="my-2">
        <column col="12">
          <h4 class="text-left font-600 mb-1 md:pl-1 pl-0">You may also like</h4>
          <template v-if="popularProductFetchFlag">
            <div  class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.3">
              <ProductCard class="mb-1" v-for="item in popularProducts.slice(0,4)"
                           :price="item.price"
                           :title="item.title"
                           :link="item.link"
                           :type="item.type"
                           :discount="item.discount"
                           :cover-src="item.coverSrc"
                           :cover-srcset="item.coverSrcset"
                           :overlay-src="item.overlaySrc"
                           :overlay-srcset="item.overlaySrcset"
                           :is-period="item.isPeriod"
                           :id="item.id"
                           :category="item.category"
                           :is-sold-out="item.isSoldOut"/>
            </div>
          </template>
          <template v-else>
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.3">
              <Skeletor v-for="i in 4" class="rounded-8" width="100%" :shimmer="true" height="400"/>
            </div>
          </template>
        </column>
      </row>

    </container>
  </section>
</template>

<script setup lang="ts">
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import {useCartStore, useProductStore} from "~/composables/useStore";
import {useCarousel} from "~/composables/useCarousel";
import {useProduct} from "~/composables/useProduct";
//////////////////////////////////////
const route=useRoute()
const {isProductInCart,getProductConfig}=useCartStore()
const {next,prev,settings,carousel}=useCarousel()
const {productData,productDetailFlag,popularProducts,popularProductFetchFlag}=useProductStore()
const {addToCart,decrement,increment,changeSize,totalPriceWithFrame,totalPriceWithOutFrame,setSelectedSize,helperData}=useProduct(carousel)
useHead({title:`${(route.params.name as string).split('-').join(' ')}`})
definePageMeta({middleware:'product'})
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