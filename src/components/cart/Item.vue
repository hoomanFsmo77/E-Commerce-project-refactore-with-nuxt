<template>
  <template v-if="windowWidth>768">
    <td class="w-[60%]">
      <div class="flex  table-content-left items-center">
        <router-link class="w-6 h-6 overflow-hidden block rounded-6" :to="productLink">
          <img
              class="object-cover w-full h-full hover:scale-[1.1] transition-all"
              v-lazy="src"
              :srcset="srcset"
              src=""
              alt=""
          >
        </router-link>
        <div class="ml-1.5">
          <p class="font-600 mb-0.2">
            ${{priceDetail.price}}
          </p>
          <p class=" mb-0.2">
            <router-link class="btn-link font-700" :to="productLink">
              {{title}}
            </router-link>
          </p>
          <p class="text-gray-500 mb-0.2" v-if="priceDetail.family">
            Choose Your Family Members: {{priceDetail.family}}
          </p>
          <p class="text-gray-500 mb-0.2" v-if="priceDetail.size">
            Size: {{priceDetail.size}}
          </p>
          <p class="text-gray-500 mb-0.2" v-if="priceDetail.frame">
            Frame: {{priceDetail.frame}}
          </p>
          <p class="text-gray-500 mb-0.2" v-if="discount">
            Discount: {{discount}}
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
          <p class="font-700 !text-1 mr-0.5">${{discount.toFixed(2)}}</p>
          <br>
          <p class="font-700 !text-1 line-through">${{productPrice}}</p>
        </template>
        <template v-else>
          <p class="font-700 !text-1">${{productPrice}}</p>
        </template>
      </div>
    </td>
  </template>
  <template v-else>
    <div class="flex  mb-1.5 items-center">
      <router-link class="w-6 h-6 overflow-hidden block rounded-6" :to="productLink">
        <img
            class="object-cover w-full h-full hover:scale-[1.1] transition-all"
            v-lazy="src"
            :srcset="srcset"
            src=""
            alt=""
        >
      </router-link>
      <div class="ml-1.5">
        <p class="font-600 mb-0.2 !text-0.8">
          ${{priceDetail.price}}
        </p>
        <p class=" mb-0.2 !text-0.8">
          <router-link class="btn-link font-700" :to="productLink">
            {{title}}
          </router-link>
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
</template>

<script setup lang="ts">
import {Link,Cart_Item} from "~/utils/Types";
const props=defineProps<{
  src:string
  srcset:string
  title:string
  param:string
  productId:string
  category:string
  quantity:number
  priceDetail:Cart_Item['priceDetail']
  discount:string
  link:Link|string
  available:number
}>()
const {productLink,increment,decrement,productQuantity,removeProduct,productPrice}=useCartItem(props)
const windowWidth:number=process.client ? window.innerWidth : 0
</script>

<style scoped>

</style>