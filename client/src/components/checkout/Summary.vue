<template>
    <div class="p-0.7 w-full ">
      <h4 class="text-center font-400 mb-2">
        <font-awesome-icon class="!text-1.6 text-green-600 mr-0.5" icon="fa-regular fa-circle-check" />
        Thanks for your shopping!
      </h4>
      <p class="text-center font-400 mb-1">
        Here is a summary of your shipping. You should show this page when your products delivered.
      </p>
      <p class="text-center font-400">
        <strong>Note:</strong> This project is just in client side so has no backend, therefore all of your given information won't be released or used in any kind of crime.
      </p>
      <div class="flex justify-between items-center mt-3 ">
        <button @click="backToHome"  class="btn btn-dark-fill">
          Back to home
        </button>
        <button @click="downloadPdf" class="btn btn-dark-fill">
          Download summary
        </button>
      </div>
    </div>

</template>

<script setup lang="ts">
import {useCheckoutSummaryModal} from "~/composables/useCheckoutSummary";

const {downloadPdf,backToHome}=useCheckoutSummaryModal()
</script>

<style scoped>

</style>