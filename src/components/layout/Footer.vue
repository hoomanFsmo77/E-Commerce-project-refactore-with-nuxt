<template>
  <footer id="footer" class="mt-2 border-t-[1px] border-gray-200">
    <container class="py-2.5">
      <row class="flex-wrap">
        <column class="sm:pr-2 footer-border " col="12" sm="6" md="3">
          <h6 class="font-700 mb-1">We love wildlife</h6>
          <nuxt-img
              :src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=480'"
              srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=840 840w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-wires-sponsor-badge.png?v=1663836028&width=1080 1080w"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) calc((100vw - 100px / 4), 290px"
              src=""
              alt=""
          />
        </column>
        <column class="sm:px-1 footer-border" col="12" sm="6" md="3">
          <h6 class="font-700 mb-1">Acknowledgement of Country</h6>
          <p class="leading-1.7 ">We acknowledge the Traditional Custodians of country throughout Australia and their connections to land, sea and community. We pay our respect to their elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples.</p>

        </column>
        <column class="sm:px-2 footer-border" col="12" sm="6" md="3">
          <h6 class="font-700 mb-1">Quick links</h6>
          <ul class="ul-col">
            <li><NuxtLink  class="underline-link" :to="{name:'Pages-our_story'}">our story</NuxtLink>
            </li>
            <li><NuxtLink  class="underline-link" :to="{name:'Pages-contact_brentos'}">contact us</NuxtLink>
            </li>
            <li><NuxtLink  class="underline-link" :to="{name:'Policy-name',params:{name:'refund-policy'}}">refund policy</NuxtLink>
            </li>
            <li><NuxtLink  class="underline-link" :to="{name:'Policy-name',params:{name:'terms-of-service'}}">terms of service</NuxtLink>
            </li>
            <li><NuxtLink  class="underline-link" :to="{name:'Policy-name',params:{name:'privacy-policy'}}">privacy policy</NuxtLink>
            </li>
          </ul>

        </column>
        <column class="sm:pl-2 footer-border" col="12" sm="6" md="3">
          <h6 class="font-700 mb-1">Visit us at our Popup or Markets</h6>
          <h6 class="font-700 ">Markets @ Manly Corso</h6>
          <span class="font-600 block my-0.2">
            Saturday and Sunday
          </span>
          <span  class="font-600 block">
            <em>
            (weather permitting)
          </em>
          </span>
          <a href="https://www.instagram.com/artofbrentos">
            <font-awesome-icon class=" mt-1" size="xl" icon="fa-brands fa-instagram" />
          </a>

        </column>
      </row>
    </container>
    <div class="divider"></div>
    <container>
      <row>
        <column col="12" sm="6" >
          <p class="font-600 !text-1">
            Copyright © 2023
            <NuxtLink class="underline-link !text-1" :to="{name:'index'}">
              Brentos
            </NuxtLink>
          </p>
        </column>
        <column col="12" sm="6" >
          <p class="font-600 !text-1 sm:text-right">
            Designed and Developed by Hooman Mousavi
          </p>
        </column>
      </row>
    </container>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>