<template>
  <section id="cart">
    <container>
      <row>
        <column col="12">
          <BreadCrumb :pages="
            [{name:'Home',link:{name:'index'}},
            {name:'Cart'}]"
          />
          <h1 class="font-600 text-left mb-1 capitalize">Shopping Cart</h1>
        </column>
      </row>
      <row class="my-2">
        <column class="!pr-1.5 mb-2 md:mb-0" col="12" md="8">
          <template v-if="cartLength>0">
            <template v-if="windowWidth>768">
              <table cellspacing='0' cellpadding="0" class="table">
                <thead >
                <tr  >
                  <th   class="text-left">
                    <div class="table-head-left"><p>Product</p></div>
                  </th>
                  <th >
                    <div class="table-head-center"><p>Quantity</p></div>
                  </th>
                  <th class="text-right">
                    <div class="table-head-right"><p>Total</p></div>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cart in cartList">
                  <CartItem
                      :src="cart.src"
                      :srcset="cart.srcset"
                      :title="cart.title"
                      :productId="cart.productId"
                      :category="cart.category"
                      :quantity="cart.quantity"
                      :priceDetail="cart.priceDetail"
                      :discount="cart.discount"
                      :link="cart.link"
                      :available="cart.available"
                  />
                </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <CartItem
                  v-for="cart in cartList"
                  :src="cart.src"
                  :srcset="cart.srcset"
                  :title="cart.title"
                  :productId="cart.productId"
                  :category="cart.category"
                  :quantity="cart.quantity"
                  :priceDetail="cart.priceDetail"
                  :discount="cart.discount"
                  :link="cart.link"
                  :available="cart.available"
              />
            </template>
          </template>
          <template v-else>
            <div class="p-1 border-[1px] border-gray-200 rounded-6">
              <p>Your cart is currently empty. </p>
            </div>
          </template>
        </column>
        <column col="12" md="4">
          <div class="p-1 bg-gray-100 border-[1px] border-gray-300 rounded-6 ">
            <p class="">{{totalPrice>= 70 ? 'You are eligible for free shipping!' : `You are $${70-totalPrice} away from free shipping.`}}</p>
          </div>
          <div class="p-1 border-[1px] border-gray-300 mt-1.5 rounded-6">
            <p>Total</p>
            <h1 class="font-700 mb-1" >${{totalPrice}}</h1>
            <p class="text-gray-500 text-0.8">Tax included. Shipping calculated at checkout.</p>
            <button @click="goToCheckout" class="btn btn-dark-outline block my-1.5 text-center w-full" >
              Check Out
            </button>
          </div>

        </column>
      </row>
    </container>
  </section>
</template>

<script setup lang="ts">
import {useCartStore} from "~/composables/useStore";
const {cartLength,totalPrice,cartList}=useCartStore()
const {goToCheckout}=useCart()
const windowWidth:number=process.client ? window.innerWidth : 0

</script>

<style scoped>

</style>