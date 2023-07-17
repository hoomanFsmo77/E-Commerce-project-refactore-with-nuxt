<template>
  <div class="flex  mb-1.5 items-center">
    <NuxtLink class="w-6 h-6 overflow-hidden block rounded-6" :to="productLink">
      <img
          class="object-cover w-full h-full hover:scale-[1.1] transition-all"
          v-lazy="src"
          :srcset="srcset"
          src=""
          alt=""
      >
    </NuxtLink>
    <div class="ml-1.5">
      <p class="font-600 mb-0.2 !text-0.8">
        ${{priceDetail.price}}
      </p>
      <p class=" mb-0.2 !text-0.8">
        <NuxtLink class="btn-link font-700" :to="productLink">
          {{title}}
        </NuxtLink>
      </p>
      <p class="text-gray-500 mb-0.2 !text-0.8"  v-if="priceDetail.family">
        Choose Your Family Members: {{priceDetail.family}}
      </p>
      <p class="text-gray-500 mb-0.2 !text-0.8" v-if="priceDetail.size">
        Size: {{priceDetail.size}}
      </p>
      <p class="text-gray-500 mb-0.2 !text-0.8" v-if="priceDetail.frame">
        Frame: {{priceDetail.frame}}
      </p>
      <p class="text-gray-500 mb-0.2 !text-0.8" v-if="discount">
        Discount: {{discount}}
      </p>
      <div class="mt-0.5">
        <button @click="decrement" class="btn btn-dark-outline !pt-[1px] !pb-[0px] !px-[7px]">
          <font-awesome-icon size="sm" icon="fa-solid fa-minus" />
        </button>
        <span class=" px-0.5 mx-0.5">
              {{productQuantity}}
         </span>
        <button @click="increment" class="btn btn-dark-outline !pt-[1px] !pb-[0px] !px-[7px]">
          <font-awesome-icon size="sm" icon="fa-solid fa-plus" />
        </button>
        <button @click="removeProduct" class="ml-0.5 text-0.8 text-gray-500 underline hover:text-dark transition-all">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Cart_Item, Link} from "~/utils/Types";
import {useCartItem} from "~/composables/useCart";
const props=defineProps<{
  src:string
  srcset:string
  title:string
  param:string
  productId:string
  category:string
  quantity:number
  priceDetail:Cart_Item['priceDetail']
  discount:number
  link:Link|string
  available:number
}>();
const {productLink,increment,decrement,productQuantity,removeProduct,productPrice}=useCartItem(props)
</script>

<style scoped>

</style>