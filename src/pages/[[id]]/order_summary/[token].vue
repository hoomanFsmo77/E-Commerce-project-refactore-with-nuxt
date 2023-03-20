<template>
  <div id="pdfTemplate" class="p-2">
    <row class="items-center">
      <column col="12" md="5" class="flex justify-center md:justify-start mb-1 md:mb-0">
        <img width="110" src="https://cdn.shopify.com/s/files/1/0272/9548/1943/files/brentoslogo.png?v=1663235427" alt="">
      </column>
      <column col="12" md="7">
        <h3 class="md:text-left text-center">Order summary</h3>
      </column>
    </row>
    <row>
      <column col="12" md="8" class="p-0.5">
        <div class="border-[1px] border-gray-400 px-0.5 mb-1.5 md:mb-0">
          <row>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Seller:</span>
              <span class="font-400 ml-0.5">Brentos Co.</span>
            </column>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Co. id:</span>
              <span class="font-400 ml-0.5">69876f4674</span>
            </column>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Co. address:</span>
              <span class="font-400 ml-0.5">Lorem ipsum dolor sit.</span>
            </column>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Buyer:</span>
              <span class="font-400 ml-0.5">{{allInformation?.contact?.firstname}} {{allInformation?.contact?.lastname}}</span>
            </column>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Buyer address:</span>
              <span class="font-400 ml-0.5">{{calculateShippingAddress}}</span>
            </column>
            <column col="6" md="4" class="mb-0.7">
              <span class="font-600">Order id:</span>
              <span class="font-400 ml-0.5">{{$route.params.id}}</span>
            </column>
          </row>
        </div>
      </column>
      <column col="12" md="4" class="p-0.5">
        <div class="border-[1px] border-gray-400 px-0.5 mb-1.5 md:mb-0">
          <row>
            <column col="12"  class="mb-0.7">
              <span class="font-600">Date:</span>
              <span class="font-400 ml-0.5">{{new Date().getDate()}}/{{new Date().getMonth()+1}}/{{new Date().getFullYear()}}</span>
            </column>
            <column col="12"  class="mb-0.7">
              <span class="font-600">Tracking Number:</span>
              <span class="font-400 ml-0.5">16046458531</span>
            </column>
            <column col="12"  class="mb-0.7">
              <span class="font-600">Contact info:</span>
              <span class="font-400 ml-0.5">{{allInformation?.contact?.contactInfo}}</span>
            </column>
          </row>
        </div>
      </column>
    </row>
    <row>
      <column col="12" class="p-0.5 overflow-x-auto" >
        <div class="border-[1px] border-gray-400  mb-1.5 md:mb-0 w-0 min-w-[1200px] overflow-x-auto">
          <div class="border-b-[1px] px-0.5 border-gray-400 mb-1">
            <row >
              <column col="3">
                <p class="font-600">Number</p>
              </column>
              <column col="3">
                <p class="font-600 ">Title</p>
              </column>
              <column col="3">
                <p class="font-600 text-center">Quantity</p>
              </column>
              <column col="3">
                <p class="font-600 text-center">price</p>
              </column>
            </row>
          </div>
          <row class="!mb-1 px-0.5" v-for="(item,index) in cartList">
            <column col="3">
              <p class="font-600">{{index+1}}</p>
            </column>
            <column col="3">
              <p class="font-400 ">{{item.title}}</p>
            </column>
            <column col="3">
              <p class="font-400 text-center">{{item.quantity}}</p>
            </column>
            <column col="3">
              <p class="font-400 text-center">${{item.priceDetail.price}}</p>
            </column>
          </row>
        </div>
      </column>
    </row>
    <row>
      <column col="12">
        <div class="flex items-center">
          <h5 class="mr-1.5">Total price:</h5>
          <h2>${{totalPrice}}</h2>
        </div>
      </column>
    </row>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({layout:false,middleware:'checkout'})
const {allInformation}=useCheckoutStore()
const {cartList,totalPrice}=useCartStore()
const {calculateShippingAddress}=useCheckoutLinks()
useCheckoutSummary()

</script>

<style scoped>

</style>