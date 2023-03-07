<template>
    <section id="story" class="bg-dark my-2 sm:h-[90vh] sm:overflow-hidden">
      <container-full>
        <row class="!p-0 !m-0">
          <column class="order-3 sm:order-2" col="12" sm="6">
            <div class="p-3 ">
              <h6 class="text-light">
                Nice to meet you.
              </h6>
              <h1 class="font-700 sm:text-3 text-light !pl-0">
                Australian artist Brentos
              </h1>
              <p class="sm:text-1 leading-1.6 text-light">
                Brentos is a visual artist and author based in Sydney Australia. Inspired by the Australian bush and long, salty summers, Brentos' work hums with a signature pastel colour palette and cheeky wildlife characters with an aim to shine a spotlight on how awesome Australia's wildlife is. He runs the Brentos art brand and line of merch with his partner Tash and studio dog Wally.
              </p>
              <NuxtLink class="btn btn-dark-outline capitalize inline-block mt-2 !px-2" :to="{name:'Pages-our_story'}">
                  our story
              </NuxtLink>
            </div>
          </column>
          <column class="!p-0 !m-0 order-2 sm:order-3" col="12" sm="6">
            <nuxt-img
                :src="'//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=480'"
                class="object-cover w-full h-full" alt=""
                 srcset="//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=240 240w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=360 360w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=420 420w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=480 480w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=640 640w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=840 840w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=1080 1080w,//cdn.shopify.com/s/files/1/0272/9548/1943/files/brentos-coopers-painting.jpg?v=1663897698&amp;width=1280 1280w"   sizes="632px" />
          </column>
        </row>
      </container-full>
    </section>
</template>

<script>
export default {
  name: "Stroy"
}
</script>

<style scoped>

</style>