<template>
  <td class="w-[60%]">
    <div class="flex  table-content-left items-center">
      <NuxtLink class="w-6 h-6 overflow-hidden block rounded-6" :to="`/${type==='Item' ? 'Product' : 'Products'}/${type}/${link}`">
        <img
            class="object-cover w-full h-full hover:scale-[1.1] transition-all"
            v-lazy="src"
            src=""
            alt=""
        >
      </NuxtLink>
      <div class="ml-1.5">
        <p class="font-600 mb-0.2">
          ${{priceDetail.price}}
        </p>
        <p class=" mb-0.2">
          <NuxtLink class="btn-link font-700" :to="`/${type==='Item' ? 'Product' : 'Products'}/${type}/${link}`">
            {{title}}
          </NuxtLink>
        </p>
        <p class="text-gray-500 mb-0.2" v-if="priceDetail.family">
          Choose Your Family Members: {{priceDetail.family_d}}
        </p>
        <p class="text-gray-500 mb-0.2" v-if="priceDetail.size">
          Size: {{priceDetail.size_d}}
        </p>
        <p class="text-gray-500 mb-0.2" v-if="priceDetail.frame">
          Frame: {{priceDetail.frame_d}}
        </p>
        <p class="text-gray-500 mb-0.2" v-if="discount">
          Discount: -{{discountPercent(priceDetail.price,discount)}}%
        </p>
      </div>
    </div>
  </td>
  <td class="table-content-center text-center">
    <div class="">
      <button @click="decrement" class="btn btn-dark-outline !pt-[1px] !pb-[0px] !px-[7px]">
        <font-awesome-icon size="sm" icon="fa-solid fa-minus" />
      </button>
      <span class=" px-0.5 mx-0.5">
              {{productQuantity}}
      </span>
      <button @click="increment" class="btn btn-dark-outline !pt-[1px] !pb-[0px] !px-[7px]">
        <font-awesome-icon size="sm" icon="fa-solid fa-plus" />
      </button>
      <br>
      <button @click="removeProduct" class="ml-0.5 text-0.8 text-gray-500 underline hover:text-dark transition-all">
        Remove
      </button>
    </div>
  </td>
  <td class="table-content-right text-right">
    <div>
      <template v-if="discount">
        <p class="font-700 !text-1 mr-0.5">${{Number(discount * quantity).toFixed(2) }}</p>
        <br>
        <p class="font-700 !text-1 line-through">${{priceDetail.price.toFixed(2)}}</p>
      </template>
      <template v-else>
        <p class="font-700 !text-1">${{productPrice}}</p>
      </template>
    </div>
  </td>
</template>

<script setup lang="ts">
import {useCartItem} from "~/composables/useCart";
import {Cart_Item, Link} from "~/utils/Types";
const props=defineProps<{
  src:string
  title:string
  category:string
  quantity:number
  priceDetail:Cart_Item['priceDetail']
  discount:number|null
  link:string
  available:number,
  type:string
}>();
const {productLink,increment,decrement,productQuantity,removeProduct,productPrice}=useCartItem(props)

const discountPercent = (price:number,discount:number) => discount && Math.ceil((1-(discount /price))*100)
</script>

<style scoped>

</style>