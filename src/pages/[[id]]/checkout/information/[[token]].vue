<template>
  <NuxtLayout name="checkout">
    <nav>
      <CheckoutBreadCrumb
          :pages="[
                {name:'Cart',link:{name:'cart'},active:true},
                {name:'Information',active:true},
                {name:'Shopping',active:false},
                {name:'Payment',active:false},
            ]"

      />
    </nav>
    <main>
      <h5 class="!font-500  mb-0.5">Contact Information</h5>
      <FormKit @submit="goShipping" type="form" ref="formElement" :actions="false"  >
        <FormKit type="group">
          <FormKit
              :floating-label="true"
              label="Email or mobile phone number"
              label-class="!font-300 !text-0.9 !text-dark"
              name="email"
              type="email"
              :delay="1000"
              validation="required|length:5|email"
              wrapper-class="my-0.5"
              input-class="input-float"
              validation-visibility="live"
              validation-messages="Enter an email or mobile phone number"
              v-model="contactInfo"
          />
        </FormKit>
        <template v-if="!isNaN(contactInfo)">
          <FormKit
              type="checkbox"
              input-class="checkbox"
              label="Email me with news and offers"
              label-class="text-0.9 ml-0.5 text-gray-700 !font-400"
              inner-class="flex items-center"
              wrapper-class="flex items-center"
              name="news"
              :value="false"
              :validation="false"
          />
        </template>
        <template v-else>
          <p class="text-0.8 text-gray-600 font-400 mt-0.5">
            You may receive text messages related to order confirmation and shipping updates. Reply STOP to unsubscribe. Reply HELP for help. Message frequency varies. Msg & data rates may apply. View our
            <button type="button" @click="openModal('privacy-policy')" class="!text-dark">Privacy policy</button> and
            <button type="button"  @click="openModal('terms-of-service')" class="!text-dark">Terms of service.</button>
          </p>
        </template>

      </FormKit>





      <!--    <FormFloat :error-flag="validation(contactInfo.length>0,'contactInfo')" error-message="Enter an email or mobile phone number" v-model="contactInfo" placeholder="Email or mobile phone number"/>-->


      <!--    <h5 class="!font-500 mt-2.5 mb-1.5">Shipping address </h5>-->
      <!--    <FormSelect  :error-flag="validation(country.code.length>0,'country')" error-message="Select a country" class="!my-1" label="Country/Region" :flag="countryFlag" v-model="country" :option="countryData" />-->
      <!--    <row class="!p-0 !m-0">-->
      <!--      <column class="sm:pr-1" col="12" sm="6">-->
      <!--        <FormFloat error-message="Enter a firstname" :error-flag="validation(firstname.length>0,'firstname')"  v-model="firstname" placeholder="First name"/>-->
      <!--      </column>-->
      <!--      <column col="12" sm="6">-->
      <!--        <FormFloat error-message="Enter a lastname" :error-flag="validation(lastname.length>0,'lastname')" v-model="lastname" placeholder="Last name"/>-->
      <!--      </column>-->
      <!--    </row>-->
      <!--    <row class="!p-0 !m-0">-->
      <!--      <column col="12" >-->
      <!--        <FormFloat error-message="Enter a address" :error-flag="validation(address.length>0,'address')" v-model="address" placeholder="Address"/>-->
      <!--      </column>-->
      <!--    </row>-->
      <!--    <row class="!p-0 !m-0">-->
      <!--      <column col="12" >-->
      <!--        <FormFloat  v-model="addressType" placeholder="Apartment, suite, etc. (optional)"/>-->
      <!--      </column>-->
      <!--    </row>-->
      <!--    <row class="!p-0 !m-0">-->
      <!--      <column  class="sm:pr-0.5"  col="12" sm="4" >-->
      <!--        <FormFloat error-message="Enter a city" :error-flag="validation(city.length>0,'city')" v-model="city" placeholder="City"/>-->
      <!--      </column>-->
      <!--      <column class="sm:pr-0.5" col="12" sm="4" >-->
      <!--        <FormSelect error-message="Select a state" :error-flag="validation(state.code.length>0,'state')" :state="true" :flag="stateFlag" select-class="!pt-1.1" label="State" v-model="state" :option="stateData"/>-->
      <!--      </column>-->
      <!--      <column  col="12" sm="4" >-->
      <!--        <FormFloat error-message="Enter a zip" :error-flag="validation(zip.length>0,'zip')" v-model="zip" placeholder="Zip code"/>-->
      <!--      </column>-->
      <!--    </row>-->


          <div class="flex justify-between items-center mt-1">
            <NuxtLink :to="{name:'cart'}">
              <font-awesome-icon   class="!text-[0.7rem] font-400" size="l" icon="fa-solid fa-chevron-left" />
              <span class="text-0.9 ml-0.5 font-400">Return to cart</span>
            </NuxtLink>
            <button @click="submitHandler" class="btn btn-dark-fill">
              Continue to shipping
            </button>
          </div>
    </main>
    <Modal row-class="!p-0 !m-0" class="w-full sm:h-[calc(100vh-7rem)] rounded-6 h-[100vh]" @closeModal="closeModal($event)" :is-active="isOpenModal" :preloader="!fetchFlag">
      <CheckoutModal @closeModal="closeModal($event)" v-if="isOpenModal" :title="modalTarget" :data="policyData"/>
    </Modal>
      <Modal row-class="!p-0 !m-0" class="sm:w-[300px] w-[100vw] m-auto sm:h-[250px] rounded-6 h-[100vh]" :is-active="isAlertActive" @closeModal="closeAlertModal($event)" :preloader="true">
        <CheckoutAlert  @closeModal="closeAlertModal($event)"/>
      </Modal>
  </NuxtLayout>

</template>

<script setup lang="ts" >
definePageMeta({layout:false,middleware:'checkout'})

// import {
//   useInformation,
//   useCheckout,
//   useCheckoutCollection,
//   useCheckoutPageValidation
// } from "../../composables/useCheckout.js";

const {closeModal,openModal,fetchFlag,policyData,modalTarget,isOpenModal}=useCheckout()

// const {validation,userInfo,zip,city,addressType,address,lastname,firstname,news,contactInfo,stateData,state,countryFlag,countryData,country,stateFlag,setUserInformation}=useCheckoutCollection()
const {goShipping,isAlertActive,closeAlertModal,contactInfo,formElement,submitHandler}=useInformation()


</script>

<style>
@tailwind components;
[data-invalid] .formkit-inner input{
  @apply !border-red-600;
}
.formkit-messages{
  @apply text-red-600 font-400 text-0.9 mb-0.5;
}

</style>