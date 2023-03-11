<template>
  <section class="py-2" id="contact-us">
    <container>
      <row>
        <column col="12">
          <h1 class="font-700 text-center mb-1">Contact us</h1>
          <p class="text-center text-1">
            Send us a message using the form below, or email us directly at <a class="underline-link"
                                                                               href="mailto:hoomanmousavi77@gmail.com">hoomanmousavi77@gmail.com</a>
          </p>
        </column>
      </row>
      <row class="!mt-4">
        <column class="mb-2 md:mb-0" col="12" md="6">
          <div class="md:pr-1.5">
            <form @submit.prevent>
              <h4 class="font-700 mb-1">Drop us a line</h4>
              <input type="text" id="name" class="input-light w-full !rounded-6" placeholder="Name">
              <input type="text" id="email" class="input-light w-full my-1 !rounded-6" placeholder="Email">
              <textarea class="input-light w-full !rounded-6" placeholder="Message" name="" id="" cols="30"
                        rows="10"></textarea>
              <button type="submit" class="btn !btn-dark-fill mt-1 !btn-lg">
                submit
              </button>
            </form>
          </div>
        </column>
        <column class="mb-2 md:mb-0" col="12" md="3">
          <div class="md:pr-1.5">
            <h4 class="font-700 mb-1">Find us at the markets</h4>
            <div class="p-1 pb-2 border-[1px] border-gray-300 rounded-6">
              <p class="">
                Tash will be at Manly markets every Saturday and Sunday (weekend permitting). Come down and say hello!
              </p>
            </div>
          </div>
        </column>
        <column class="mb-2 md:mb-0" col="12" md="3">
          <div>
            <h4 class="font-700 mb-1">Follow us</h4>
            <div class="px-1 pt-1 pb-2.5 border-[1px] border-gray-300 rounded-6">
              <p>
                <a href="" class="underline-link !font-700 text-1">Instagram</a>
              </p>
              <p class="mt-1">
                <a href="" class="underline-link !font-700 text-1 ">Facebook</a>
              </p>
            </div>
          </div>
        </column>
      </row>
    </container>
  </section>
</template>

<script>
export default {
  name: "contact-brentos"
}
</script>

<style scoped>

</style>