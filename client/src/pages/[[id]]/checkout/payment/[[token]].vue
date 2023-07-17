<template>
  <nav>
    <CheckoutBreadCrumb
        :pages="[
                {name:'Cart',link:{name:'cart'},active:true},
                {name:'Information',link:informationPageLink,active:true},
                {name:'Shipping',link:shippingPageLink,active:true},
                {name:'Payment',active:false},
            ]"
    />
  </nav>
  <main class="mt-1.5">
    <div v-if="userInformationContact && userInformationShippingStore" class="p-0.7 border-[1px] border-gray-200 rounded-6">
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
      <div class="divider !my-0.7"></div>
      <div class="flex justify-between items-center">
        <p class="flex flex-col lg:block">
          <span class="text-gray-500 mb-0.5 lg:mb-0 font-400">Method</span>
          <span class="text-dark font-400 lg:ml-3">{{userInformationShippingStore.name}} · ${{userInformationShippingStore.price.toFixed(2)}}</span>
        </p>
        <NuxtLink :to="shippingPageLink" class="text-gray-700 text-0.8 font-400">change</NuxtLink>
      </div>
    </div>
    <div class=" mb-1.5">
      <h5 class="!font-500 mt-2.5">Payment</h5>
      <p class="text-gray-600 font-400">All transactions are secure and encrypted. </p>
    </div>
    <div class="payment-card">
      <div class="payment-card-header">
        <p class="font-400">Credit card </p>
        <div class="flex items-center">
          <nuxt-img provider="cloudinary" src="v1678041108/brentos/visa_yqrcps.svg" width="30" alt=""/>
          <nuxt-img provider="cloudinary" src="v1678041112/brentos/master_ar5mpd.svg" class="mx-1" width="30" alt=""/>
          <nuxt-img provider="cloudinary" src="v1678041109/brentos/express_e3lizg.svg"  width="30" alt=""/>
        </div>
      </div>
      <div class="payment-card-body">
        <row class="!py-0">
          <column col="12">
            <FormTooltip
                mask="0000-0000-0000-0000"
                @accept="setValue($event,'cardNumber')"  icon="fa-solid fa-lock"
                placeholder="Card number"
                toolTip="All transactions are secure and encrypted."
            />

          </column>
        </row>
        <row class="!py-0">
          <column col="12">
            <input
                @input="setValue($event.target.value,'cardName')"
                v-model="userCartInfo.cardName.value"
                type="text" placeholder="Name on card"
                class="input-light  input-sm !font-400 !rounded-6 placeholder:!font-400 !border-gray-400 w-full"
            >
          </column>
        </row>
        <row>
          <column col="12" md="6" class="md:pr-0.5">
            <input @complete="setValue($event.detail.value,'expireDay')"  v-imask="{mask:'00 / 0000'}"  type="text" placeholder="Expiration day (MM / YY)" class="input-light  input-sm !rounded-6 placeholder:!font-400 !font-400 !border-gray-400 w-full">
          </column>
          <column col="12" md="6">
            <FormTooltip   @accept="setValue($event,'securityCode')"  mask="0000"  icon="fa-solid fa-circle-question" placeholder="Security code" toolTip="3-digit security code on the back of your card"/>
          </column>
        </row>


      </div>
    </div>
    <div class=" my-1.5">
      <h5 class="!font-500 mt-2.5">Billing address</h5>
      <p class="text-gray-600 font-400">Select the address that matches your card or payment method.  </p>
    </div>


    <div class="payment-card">
      <div class="payment-card-header">
        <div class="flex items-center">
          <input  @click="helperInfo.wantChangeMethod=false" checked id="same" name="method" type="radio" class="radio">
          <label for="same" class="!font-400 !text-0.9 ml-0.5 cursor-pointer">Same as shipping address  </label>
        </div>

      </div>
      <div class="payment-card-header">
        <div class="flex items-center">
          <input @click="helperInfo.wantChangeMethod=true" id="different" name="method" type="radio" class="radio">
          <label for="different" class="!font-400 !text-0.9 ml-0.5 cursor-pointer">Use a different billing address   </label>
        </div>

      </div>
      <div class="payment-card-body" v-show="helperInfo.wantChangeMethod">
        <FormKit  @submit="finishPaymentWithChangingAddress" type="form" ref="formElement" :actions="false"  >
          <FormKit
              class="!my-1"
              @change="selectState($event)"
              wrapper-class="select-wrap"
              label-class="select-label  absolute"
              type="select"
              label="Country/Region"
              input-class="w-full select"
              name="country"
              :value="'Afghanistan'"
              v-if="countryFlag"
              :options="countryData.map(item=>item.name)"
          >
            <template #selectIcon="context">
              <div  class="absolute right-[3%] pl-[10px] border-l-[1px] border-gray-500 bottom-[26%]">
                <font-awesome-icon class="text-gray-500 " icon="fa-solid fa-caret-down" />
              </div>
            </template>
        </FormKit>
          <row class="!p-0 !mt-0.8 !my-0.5">
            <column class="sm:pr-1" col="12" sm="6">
              <FormKit
                  :floating-label="true"
                  label="Firstname"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="firstname"
                  type="text"
                  :delay="300"
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
          <row class="!p-0 !my-0.5">
            <column col="12" >
              <FormKit
                  :floating-label="true"
                  label="Address"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="address"
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
          <row class="!p-0 !my-0.5">
            <column col="12" >
              <FormKit
                  :floating-label="true"
                  label="Apartment, suite, etc. (optional)"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="addressType"
                  type="text"
                  :delay="300"
                  wrapper-class="my-0.5"
                  input-class="input-float"
                  validation-visibility="live"
              />
            </column>
          </row>
          <row class="!p-0 !my-0.5">
            <column  class="sm:pr-0.5"  col="12" sm="4" >
              <FormKit
                  :floating-label="true"
                  label="City"
                  label-class="!font-300 !text-0.9 !text-dark"
                  name="city"
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
      </div>
    </div>
    <div class=" my-1.5">
      <h5 class="!font-500 mt-2.5">Remember me</h5>
    </div>
    <div class="payment-card">
      <div class="payment-card-header">
        <div class="flex items-center">
          <input  @click="helperInfo.wantRemember=!helperInfo.wantRemember"  id="remember" name="remember" type="checkbox" class="checkbox">
          <label for="remember" class="!font-400 !text-0.9 ml-0.5 cursor-pointer">
            Save my information for a faster checkout   </label>
        </div>
      </div>
      <div v-show="helperInfo.wantRemember" class="payment-card-body">
        <row class="!py-0">
          <column col="12" md="6">
            <FormPhoneNumber v-model="phoneNumber" label="Mobile phone number"/>
          </column>
        </row>
        <p class="font-400 text-gray-600 ">Next time you check out here or on other stores powered by Shopify, you’ll receive a code by text message to securely purchase with Shop Pay. </p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-1.5">
      <NuxtLink :to="shippingPageLink">
        <font-awesome-icon   class="!text-[0.7rem] font-400" size="l" icon="fa-solid fa-chevron-left" />
        <span class="text-0.9 ml-0.5 font-400">Return to shipping</span>
      </NuxtLink>
      <button v-if="helperInfo.wantChangeMethod" type="button" @click="changeShippingAddress" class="btn btn-dark-fill">
        Pay now
      </button>
      <button v-else type="button" @click="finishPaymentWithoutChangeAddress" class="btn btn-dark-fill">
        Pay now
      </button>
    </div>

  </main>
  <Modal row-class="!p-0 !m-0" class="sm:w-[400px] w-[100vw] m-auto sm:h-[350px] rounded-6 h-[100vh]"  :is-active="isOpenModal" :preloader="true">
    <CheckoutSummary v-if="isOpenModal"/>
  </Modal>
</template>
<script lang="ts" setup>
definePageMeta({layout:'checkout',middleware:'checkout'});
const {informationPageLink,calculateShippingAddress}=useCheckoutLinks();
const {shippingPageLink,finishPaymentWithoutChangeAddress,userCartInfo,setValue,helperInfo,changeShippingAddress,finishPaymentWithChangingAddress,formElement,phoneNumber,isOpenModal}=usePayment();
const {userInformationContact,userInformationShippingStore}=useCheckoutStore();
const {countryData,countryFlag,stateData,selectState}=useCountry();
</script>

<style  >
@tailwind components;
[data-invalid] .formkit-inner input{
  @apply !border-red-600;
}
.formkit-messages{
  @apply text-red-600 font-400 text-0.9 mb-0.5;
}
</style>