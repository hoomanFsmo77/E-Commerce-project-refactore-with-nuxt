<template>
  <teleport to="body">
    <div v-if="!hideDiscount" class="sticky-discount " :class="{'translate-y-[78px]':isDiscountActive}" @click="toggleDiscount">
        <p class="text-1 text-center">Get 10% Off + FREE <br> Sticker</p>
    </div>
  </teleport>
  <Modal  row-class="!p-0 !m-0 h-full" class="sm:w-[450px] !p-0 w-[100vw] m-auto rounded-6 h-[100vh]" :is-active="isDiscountActive" @closeModal="closeDiscountModal($event)" :preloader="true">
    <template v-if="!isSignUp">
      <div class="relative">
        <img
            src="https://d3k81ch9hvuctc.cloudfront.net/company/VMubG5/images/249a75e5-cecd-4a8c-8f80-c9402eaae26d.png"
            alt="">
        <div @click="closeDiscountModal(false)" class="absolute top-0 cursor-pointer right-0 m-1 py-0.5 px-0.8 bg-white rounded-full ">
          <font-awesome-icon size="lg" class=" text-gray-700 "  icon="fa-solid fa-x" />
        </div>
      </div>
      <div class="p-0.5 w-full">
        <h2 class="text-center mb-0.5">Get 10% OFF + a FREE <br> Sticker</h2>
        <p class="font-400 text-center text-1.1">...Subscribe to get 10% off and we'll pack in a free sticker with your first order.
        </p>
        <input v-model="email" type="text" class="input-light w-full mt-1 mb-0.5" placeholder="Email">
        <p class="text-red-600 font-400 text-0.9 mb-1" v-if="!isValid">Please enter a valid email!</p>
        <button @click="submitDiscount" class="btn btn-dark-fill w-full">
          Sign me up
        </button>
      </div>
    </template>
    <template v-else>
      <div class="w-full h-full flex-col relative flex justify-center items-center">
        <h2 class="mb-1">Check your email</h2>
        <p class="text-1 font-400">Your coupon code has been sent to your email.</p>
        <div class="absolute top-0 right-0 m-1" @click="closeDiscountModal(false)">
          <font-awesome-icon  size="lg" class=" text-gray-700 cursor-pointer"  icon="fa-solid fa-x" />
        </div>
      </div>
    </template>

  </Modal>

</template>

<script setup lang="ts">
const isDiscountActive=ref<boolean>(false)
const isSignUp=ref<boolean>(false)
const hideDiscount=ref<boolean>(false)
const isValid=ref<boolean>(false)
const email=ref<string>('')
const emailRegex=/^(\w+)(\@)(\w{4,6})(\.)(\w{2,3})$/g

const toggleDiscount = () => {
  isDiscountActive.value=!isDiscountActive.value
}
const submitDiscount = () => {
  if(emailRegex.test(email.value)){
    isValid.value=true
    isSignUp.value=true
    hideDiscount.value=true
  }else{
    isValid.value=false
  }
}

const closeDiscountModal = (e:boolean) => {
  isDiscountActive.value=e
}
onMounted(()=>{
  setTimeout(()=>{
    isDiscountActive.value=true
  },2000)
})

</script>

<style scoped>

</style>