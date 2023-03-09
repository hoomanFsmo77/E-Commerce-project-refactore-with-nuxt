<template>
  <section class="relative" :id="`product-show-id-${helperData.productId}`">
    <container >
      <row>
        <column col="12">
          <BreadCrumb :pages="
            [{name:'Home',link:{name:'index'}},
            {name:'Collections',link:{name:'Collections-All'}},
            {name:$route.hash.slice(1).split('-').join(' '),link:{name:'Collections-name',params:{name:$route.hash.slice(1)}}},
            {name:$route.params.name.split('-').join(' ')}]"
          />
        </column>
      </row>
      <LoaderPage class="!static !items-center !h-[500px]" :show="!productDetailFlag"/>
      <row v-if="productDetailFlag">
        <column class="sm:!pr-1"  col="12" sm="6">
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
        <column  col="12" sm="6" >
          <div class="sm:pl-1">
            <div>
              <h1 class="font-600 ">{{productData.title}}</h1>
              <template  v-if="productData.discount">
                <div class="flex gap-2">
                  <h3 class="font-600 my-1">${{productData.discount.toFixed(2)}}</h3>
                  <h3 class="font-600 my-1 line-through text-gray-500">${{helperData.whichFrame===0 ? totalPriceWithOutFrame :totalPriceWithFrame }}</h3>
                </div>

              </template>
              <template v-else>
                <h3 class="font-600 my-1">${{helperData.whichFrame===0 ? totalPriceWithOutFrame :totalPriceWithFrame }}</h3>
              </template>
              <p v-html="item.content" class="mb-1 font-500 text-1" v-for="item in productData.description"></p>
            </div>
            <!--        <<<<<<<<<<<<<<<<<< family part start >>>>>>>>>>>>>>-->
            <div v-if="productData.hasFamily" class="mt-4">
              <h5 class="font-600 mb-1">Choose Your Family Members</h5>
              <button
                  :disabled="!productData.option.family[helperData.familyIndex].available"
                  :class="{'disabled':!productData.option.family[helperData.familyIndex].available,'selected':helperData.familyIndex===index}"
                  @click="changeFamily(item.index,index)"
                  v-for="(item,index) in productData.option.family"
                  class="btn  btn-dark-outline mr-1 mb-1">
                {{item.item}}
              </button>
            </div>
            <!--        <<<<<<<<<<<<<<<<<< family part start >>>>>>>>>>>>>>-->

            <!--            <<<<<<<<<<<<< size part start>>>>>>>>>>>>-->
            <div class="mt-4 " v-if="productData?.option?.sizes">
              <h5 class="font-600 mb-1">Size</h5>
              <button
                  :class="{'disabled':!item.available,'selected':helperData.sizeIndex===index}"
                  @click="changeSize(item,index)" v-for="(item,index) in productData.option.sizes"
                  class="btn btn-dark-outline mr-1 mb-1"
              >
                {{item.size}}
              </button>
            </div>
            <!--            <<<<<<<<<<<<< size part end>>>>>>>>>>>>-->

            <!--            <<<<<<<<<<<<< frame part start>>>>>>>>>>>>-->
            <div class="my-2 " v-if="productData.hasFrame">
              <h5 class="font-600 mb-1">Frame</h5>
              <button
                  :disabled="!productData.option.sizes[helperData.sizeIndex].available"
                  :class="{'disabled':!productData.option.sizes[helperData.sizeIndex].available,'selected':helperData.whichFrame===0}" @click="changeFrame(0)"
                  class="btn  btn-dark-outline mr-1 sm:mb-0 mb-1">
                No frame
              </button>
              <button :disabled="!productData.option.sizes[helperData.sizeIndex].frame.available"
                      :class="{'disabled':!productData.option.sizes[helperData.sizeIndex].frame.available,'selected':helperData.whichFrame===1}"            @click="changeFrame(1)"
                      class="btn btn-dark-outline mr-1 ">
                Recycled Timber Frame
              </button>
            </div>
            <!--            <<<<<<<<<<<<< frame part end>>>>>>>>>>>>-->

            <!--            <<<<<<<<<<<<< price part start>>>>>>>>>>>>-->
            <div class="mb-1">
              <template v-if="productData.discount">
                <div class="flex items-center gap-1">
                  <h1 class="font-600 my-2">${{productData.discount.toFixed(2)}}</h1>
                  <div>
                    <span class="line-through ">${{helperData.whichFrame===0 ? totalPriceWithOutFrame :totalPriceWithFrame }}</span>
                    <br>
                    <span class="text-gray-500 ">you have saved ${{(productData.price-productData.discount).toFixed(2)}}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <h1 class="font-600 my-2">
                  ${{helperData.whichFrame===0 ? totalPriceWithOutFrame :totalPriceWithFrame }}
                </h1>
              </template>
            </div>
            <!--            <<<<<<<<<<<<< price part end>>>>>>>>>>>>-->
            <div class="divider"></div>
            <div class="flex  flex-col sm:flex-row gap-1 items-center">
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
                {{productData.isSoldOut ? 'Sold Out':'Add to cart'}}
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
      <!--      <<<<<<<<< description row >>>>>>>>>-->
      <row class="!my-3 !items-center">
        <column col="12" sm="6">
          <div class="sm:px-2">
            <h1 class="text-center font-700 mb-1">Museum-quality prints </h1>
            <p class="text-center !text-1">
              We make our prints right here in our studio on stunning, ultra-thick, museum-grade, textured cotton paper using the highest quality pigment-based ink.
            </p>
          </div>
        </column>
        <column col="12" sm="6">
          <div>
            <nuxt-img
                src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=480'"
                alt=""
                srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=840 840w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=1080 1080w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=1280 1280w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=1540 1540w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints2.jpg?v=1663739542&width=1860 1860w"
                sizes="592px"
            />
          </div>
        </column>
      </row>
      <row class="!my-3 !items-center">
        <column col="12" sm="6">
          <div>
            <nuxt-img
                src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=480'"
                alt=""
                srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=840 840w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=1080 1080w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=1280 1280w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=1540 1540w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-prints4.jpg?v=1663739487&width=1860 1860w"
                sizes="592px"
            />
          </div>
        </column>
        <column col="12" sm="6">
          <div class="sm:px-2">
            <h1 class="text-center font-700 mb-1">Signed by the artist</h1>
            <p class="text-center !text-1">
              Once we've printed your art, it's then hand-signed, titled, dated and given the signature stamp of authenticity by Brentos.
            </p>
          </div>
        </column>
      </row>
      <row class="!my-3 !items-center">
        <column col="12" sm="6">
          <div class="sm:px-2">
            <h1 class="text-center font-700 mb-1">Frame it in a stunning recycled timber frame. </h1>
            <p class="text-center !text-1">
              Our frames are hand-made in Australia from reclaimed hardwood, each one showing beautiful markings and unique character from it's previous life as a railroad pylon, farm fence or floorboard.
            </p>
          </div>
        </column>
        <column col="12" sm="6">
          <div>
            <nuxt-img
                src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=480'"
                alt=""
                srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=840 840w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=1080 1080w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=1280 1280w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=1540 1540w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-frame1.jpg?v=1663740555&width=1860 1860w"
                sizes="592px"
            />
          </div>
        </column>
      </row>
      <row class="!my-3">
        <column class="!px-1" col="12" sm="6" md="3">
          <div class="flex flex-col gap-2">
            <font-awesome-icon class="text-5 !text-dark" icon="fa-regular fa-thumbs-up" />
            <div>
              <h6 class="font-700 text-center">Proudly Australian Made</h6>
              <p class="text-center my-0.5 text-gray-500">Made right here in our small art studio.</p>
            </div>
          </div>
        </column>
        <column class="!px-1" col="12" sm="6" md="3">
          <div class="flex flex-col gap-2">
            <font-awesome-icon class="text-5 !text-dark" icon="fa fa-tree" />
            <div>
              <h6 class="font-700 text-center">Character-Filled Frames</h6>
              <p class="text-center my-0.5 text-gray-500">Made locally from sustainable recycled timber.</p>
            </div>
          </div>
        </column>
        <column class="!px-1" col="12" sm="6" md="3">
          <div class="flex flex-col gap-2">
            <font-awesome-icon class="text-5 !text-dark" icon="fa fa-hand-holding-dollar" />
            <div>
              <h6 class="font-700 text-center">Supporting Wildlife</h6>
              <p class="text-center my-0.5 text-gray-500">Over $45,000 raised for wildlife conservation.</p>
            </div>
          </div>
        </column>
        <column class="!px-1" col="12" sm="6" md="3">
          <div class="flex flex-col gap-2">
            <font-awesome-icon class="text-5 !text-dark" icon="fa-regular fa-thumbs-up" />
            <div>
              <h6 class="font-700 text-center">Intrinsic quality</h6>
              <p class="text-center my-0.5 text-gray-500">Giclée prints made using the finest papers and inks.</p>
            </div>
          </div>
        </column>
      </row>
    </container>
  </section>
  <section id="support" class="bg-dark sm:h-[70vh] overflow-hidden my-3">
    <container-full>
      <row class="!p-0 !m-0">
        <column col="12" sm="6" class="!p-0 !m-0">
          <nuxt-img
              src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=480'"
              srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/6b.jpg?v=1663388526&width=840 840w"
              sizes="632px"
              class="object-cover h-full w-full"
              alt=""
          />

        </column>
        <column col="12" sm="6" class="!p-0">
          <div class="p-2">
            <h1 class="text-light text-center font-600 mt-1">Thanks for Supporting Local </h1>
            <p class="text-light font-500 leading-1.8 text-center mt-1">
              Hey, I'm Brent. I'm an illustrator from Sydney and I run the Brentos art studio and merch range with my partner Tash. My work is inspired by the Aussie bush and long, salty summers at the beach with a mission to share a gentle message of conservation for our wildlife. By purchasing our art you're supporting local artists and small businesses in Australia. Cheers!
            </p>
            <p class="text-center">💚</p>
          </div>
        </column>
      </row>
    </container-full>

  </section>
  <section id="faq" class="my-3">
    <container>
      <row>
        <column col="12">
          <div class="border-[1px] border-gray-300/80 rounded-8 overflow-hidden">
            <Faq v-for="item in faqData" :title="item.title" :description="item.description"/>
          </div>
        </column>
      </row>
    </container>
  </section>
  <section id="suggestion">
    <container>
      <!--      <<<<<<<< suggestion row >>>>>>>>-->
      <row class="my-2">
        <column col="12">
          <h4 class="text-left font-600 mb-1 md:pl-1 pl-0">You may also like</h4>
          <template v-if="fetchFlag">
            <div  class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.3">
              <ProductCard class="mb-1" v-for="item in popularProducts.slice(0,4)" :price="item.price" :title="item.title" :link="item.link" :discount="item.discount" :cover-src="item.coverSrc" :cover-srcset="item.coverSrcset" :overlay-src="item.overlaySrc" :overlay-srcset="item.overlaySrcset" :is-period="item.isPeriod" :id="item.id" :is-sold-out="item.isSoldOut"/>
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
import {useProductStore} from "~/composables/useStore";
//////////////////////////////////////
let props=defineProps(['name'])
let faqData=[
  {
    title:'What are the shipping costs?',
    description:[
      'We offer free shipping in Australia for orders over $70. For orders under $70, a $10 shipping fee is charged.','For our overseas friends, we charge $30 shipping for most zones and products.'
    ]
  },
  {
    title:'How long does shipping take?',
    description:[
      'When you order one of our art products you\'ll typically receive it within 7 days within Australia and within 3 weeks internationally.'
    ]
  },
  {
    title:'Why should I buy from you?',
    description:[
      "When you buy any of our art products you're supporting local artists, wildlife conservation efforts, sustainable manufacturing and a small, creative Aussie business committed to being Australian made. We use on the finest materials when creating our products and our art prints are hand-signed for authenticity."
    ]
  },
]
const {productData,productDetailFlag,popularProducts,fetchFlag}=useProductStore()
const {next,prev,settings,carousel}=useCarousel()
const {addToCart,decrement,increment,changeSize,totalPriceWithFrame,totalPriceWithOutFrame,setSelectedSize,helperData,changeFrame,changeFamily}=useProduct(carousel)
const route=useRoute()
useHead({
  title:`${(route.params.name as string).split('-').join(' ')}`
})
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