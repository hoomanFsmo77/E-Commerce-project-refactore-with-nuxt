<template>
  <nav>
    <CheckoutBreadCrumb
        :pages="[
                {name:'Cart',link:{name:'cart'},active:true},
                {name:'Information',link:informationPageLink,active:true},
                {name:'Shopping',active:false},
                {name:'Payment',active:false},
            ]"
    />
  </nav>
  <main class="mt-1.5">
    <div v-if="userInformationContact" class="p-0.7 border-[1px] border-gray-200 rounded-6">
      <div class="flex justify-between items-center">
        <p class="flex flex-col lg:block">
          <span class="text-gray-500 font-400 mb-0.5 lg:mb-0">Contact</span>
          <span class="text-dark font-400 lg:ml-3">{{userInformationContact.contactInfo}}</span>
        </p>
        <NuxtLink :to="informationPageLink" class="text-gray-700 text-0.8 font-400">change</NuxtLink>
      </div>
      <div class="divider !my-0.7"></div>
      <div class="flex justify-between items-center">
        <p class="flex flex-col lg:block">
          <span class="text-gray-500 mb-0.5 lg:mb-0 font-400">Ship to</span>
          <span class="text-dark font-400 lg:ml-3">{{calculateShippingAddress}}</span>
        </p>
        <NuxtLink :to="informationPageLink" class="text-gray-700 text-0.8 font-400">change</NuxtLink>
      </div>
    </div>
    <h5  class="font-500 mt-3 mb-2">Shipping method </h5>
    <div class="p-1 border-[1px] border-gray-200 rounded-6 ">
      <div class="flex items-center justify-between mb-0.5" v-for="(item,index) in shippingMethods">
        <div class="flex items-start">
          <input :class="methodIndex===index && 'radio-focus'" @focus="selectedMethod(index)" @change="selectedMethod(index)"  v-model="methodIndex" :id="'item-'+index" :name="item.name"  :value="index" type="radio" class="radio mr-1 " >
          <div>
            <label :for="'item-'+index" class="cursor-pointer">
              <p class="leading-1.1 text-gray-700 font-400">{{item.name}} </p>
              <p class="text-gray-500 font-400 text-0.8">{{item.time}}</p>
            </label>
          </div>
        </div>
        <p class="text-gray-700 font-400">${{item.price}}</p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-1">
      <NuxtLink :to="informationPageLink">
        <font-awesome-icon   class="!text-[0.7rem] font-400" size="l" icon="fa-solid fa-chevron-left" />
        <span class="text-0.9 ml-0.5 font-400">Return to information</span>
      </NuxtLink>
      <button @click="goPayment"   class="btn  btn-dark-fill">
        Continue to payment
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({layout:'checkout',middleware:'checkout'})
const {shippingMethods, methodIndex,selectedMethod,goPayment}=useShipping()
const {userInformationContact}=useCheckoutStore()
const {calculateShippingAddress,informationPageLink}=useCheckoutLinks()
</script>

<style scoped>

</style>