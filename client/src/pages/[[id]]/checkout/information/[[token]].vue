<template>
  <nav>
    <CheckoutBreadCrumb
        :pages=" [
                {name:'Cart',link:{name:'cart'},active:true},
                {name:'Information',active:true},
                {name:'Shopping',active:false},
                {name:'Payment',active:false},
            ]"

    />
  </nav>
  <main>
    <h5 class="!font-500  mb-0.5">Contact Information</h5>
    <FormKit  @submit="goShipping" type="form" ref="formElement" :actions="false"  >
      <FormKit
          :floating-label="true"
          label="Email or mobile phone number"
          label-class="!font-300 !text-0.9 !text-dark"
          name="contactInfo"
          type="text"
          :value="userInformationContact?.contactInfo ?? ''"
          help-class="!font-300 !text-0.9 !text-dark"
          :delay="300"
          help="Hint: xxxx@gmail.com or  xxx-xxx-xxxx"
          validation="required|contactRule"
          :validation-rules="{contactRule}"
          wrapper-class="my-0.5"
          input-class="input-float"
          validation-visibility="live"
          validation-messages="Enter an email or mobile phone number"

      />
      <template v-if="!isContactNumber">
        <FormKit
            type="checkbox"
            input-class="checkbox"
            label="Email me with news and offers"
            label-class="text-0.9 ml-0.5 text-gray-700 !font-400"
            inner-class="flex items-center"
            wrapper-class="flex items-center"
            name="news"
            :value="userInformationContact?.news ?? false"
        />
      </template>
      <template v-else>
        <p class="text-0.8 text-gray-600 font-400 mt-0.5">
          You may receive text messages related to order confirmation and shipping updates. Reply STOP to unsubscribe. Reply HELP for help. Message frequency varies. Msg & data rates may apply. View our
          <button type="button" @click="openModal('privacy-policy')" class="!text-dark">Privacy policy</button> and
          <button type="button"  @click="openModal('terms-of-service')" class="!text-dark">Terms of service.</button>
        </p>
      </template>

      <h5 class="!font-500 mt-2.5 mb-1.5">Shipping address </h5>
      <FormKit
          @change="selectState($event)"
          wrapper-class="select-wrap"
          label-class="select-label  absolute"
          type="select"
          label="Country/Region"
          input-class="w-full select"
          name="country"
          :value="userInformationContact?.country ?? 'Afghanistan'"
          v-if="countryFlag"
          :options="countryData.map(item=>item.name)"
      >
        <template #selectIcon="context">
          <div  class="absolute right-[3%] pl-[10px] border-l-[1px] border-gray-500 bottom-[26%]">
            <font-awesome-icon class="text-gray-500 " icon="fa-solid fa-caret-down" />
          </div>
        </template>
      </FormKit>
      <row class="!p-0 !m-0">
        <column class="sm:pr-1" col="12" sm="6">
          <FormKit
              :floating-label="true"
              label="Firstname"
              label-class="!font-300 !text-0.9 !text-dark"
              name="firstname"
              type="text"
              :delay="300"
              :value="userInformationContact?.firstname ?? ''"
              validation="required"
              wrapper-class="my-0.5"
              input-class="input-float"
              validation-visibility="live"
              validation-messages="Enter a firstname"
          />
        </column>
        <column col="12" sm="6">
          <FormKit
              :floating-label="true"
              label="Lastname"
              label-class="!font-300 !text-0.9 !text-dark"
              name="lastname"
              :value="userInformationContact?.lastname ?? ''"
              type="text"
              :delay="300"
              validation="required"
              wrapper-class="my-0.5"
              input-class="input-float"
              validation-visibility="live"
              validation-messages="Enter a lastname"
          />

        </column>
      </row>
      <row class="!p-0 !m-0">
            <column col="12" >
              <FormKit
                  :floating-label="true"
                  label="Address"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="address"
                  :value="userInformationContact?.address ?? ''"
                  type="text"
                  :delay="300"
                  validation="required"
                  wrapper-class="my-0.5"
                  input-class="input-float"
                  validation-visibility="live"
                  validation-messages="Enter a address"
              />
            </column>
      </row>
      <row class="!p-0 !m-0">
            <column col="12" >
              <FormKit
                  :floating-label="true"
                  label="Apartment, suite, etc. (optional)"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="addressType"
                  :value="userInformationContact?.addressType ?? ''"
                  type="text"
                  :delay="300"
                  wrapper-class="my-0.5"
                  input-class="input-float"
                  validation-visibility="live"
              />
            </column>
      </row>
      <row class="!p-0 !m-0">
         <column  class="sm:pr-0.5"  col="12" sm="4" >
           <FormKit
               :floating-label="true"
               label="City"
               label-class="!font-300 !text-0.9 !text-dark"
               name="city"
               :value="userInformationContact?.city ?? ''"
               type="text"
               :delay="300"
               validation="required"
               wrapper-class="my-0.5"
               input-class="input-float"
               validation-visibility="live"
               validation-messages="Enter a city"
           />

         </column>
         <column class="sm:pr-0.5" col="12" sm="4" >
           <FormKit
               wrapper-class="select-wrap"
               label-class="select-label  absolute"
               type="select"
               label="State"
               :value="userInformationContact?.state ?? 'lowa'"
               input-class="w-full select"
               validation="required"
               name="state"
               validation-messages="Select a state"
               v-if="countryFlag"
               :options="stateData.map(item=>item.region)"
           >
             <template #selectIcon="context">
               <div  class="absolute right-[3%] pl-[10px] border-l-[1px] border-gray-500 bottom-[26%]">
                 <font-awesome-icon class="text-gray-500 " icon="fa-solid fa-caret-down" />
               </div>
             </template>
           </FormKit>

         </column>
         <column  col="12" sm="4" >
           <FormKit
               :floating-label="true"
               label="Zip code"
               label-class="!font-300 !text-0.9 !text-dark"
               name="zip"
               :value="userInformationContact?.zip ?? ''"
               type="text"
               :delay="300"
               validation="required"
               wrapper-class="my-0.5"
               input-class="input-float"
               validation-visibility="live"
               validation-messages="Enter a zip"
           />

         </column>
      </row>
    </FormKit>
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
</template>

<script setup lang="ts" >
import {useCheckoutStore} from "~/composables/useStore";
import {useCheckout} from "~/composables/useCheckout";
import {useInformation} from "~/composables/useCheckout";
import {useCountry} from "~/composables/useCountry";

definePageMeta({layout:'checkout',middleware:'checkout'})
const {userInformationContact}=useCheckoutStore();
const {closeModal,openModal,fetchFlag,policyData,modalTarget,isOpenModal}=useCheckout();
const {goShipping,isAlertActive,closeAlertModal,formElement,submitHandler,contactRule,isContactNumber}=useInformation();
const {countryData,countryFlag,stateData,selectState}=useCountry()
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