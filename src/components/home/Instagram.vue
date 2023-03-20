<template>
  <section class="my-3" id="instagram-feed">
    <container>
      <row class="!mb-1">
        <column col="12">
          <h3 class="text-center font-600">Brentos on Instagram</h3>
        </column>
      </row>
      <row class="!p-0 !m-0 flex-wrap" v-if="fetchFlag">
        <column v-for="(item,index) in instagramFeedData" col="12" sm="6" md="4">
          <CardInstafeed
              :src="item.src"
              :content="item.content"
              :date="item.date"
              :link="item.link"
              :index="index"
              @changePost="changePost($event)"
          />
        </column>
      </row>
      <row class="!p-0 !m-0 flex-wrap" v-else>
        <column class="pr-1 mb-1" col="12" sm="6" md="4" v-for="i in 3">
          <Skeletor  class="rounded-4 mr-1" width="100%" :shimmer="true" height="400"/>
        </column>
      </row>
<!--      <<<<<<<<<<<<<<<< modal start >>>>>>>>>>>>>>>-->
      <Modal v-if="fetchFlag" row-class="!p-0 !m-0 h-full" class="w-full h-[100vh] !p-0" @closeModal="closeModal($event)" :is-active="isOpen" :preloader="true">
        <column col="12" lg="7" class="!m-0 !p-0 relative">
          <nuxt-img provider="cloudinary" :src="instagramFeedData[postIndex].src ?? null" class="object-cover h-full md:absolute top-0 left-0 w-full" alt="" />
        </column>
        <column col="12" class="p-1.5" lg="5">
          <div class="flex justify-between items-center">
            <div class="flex gap-1 items-center">
              <a target="_blank" href="https://www.instagram.com/artofbrentos">
                <div class="icon-wrapper">
                  <font-awesome-icon class="text-light" size="xl" icon="fa-brands fa-instagram" />
                </div>
              </a>
              <a target="_blank" href="https://www.instagram.com/artofbrentos">
                <span class="font-700 capitalize">artofbrentos</span>
                <span class="font-600 text-gray-600 block text-0.7">@artofbrentos</span>
              </a>
            </div>
            <div class="cursor-pointer">
              <font-awesome-icon size="lg" class="text-gray-700 " @click="closeModal(false)" icon="fa-solid fa-x" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between items-center ">
            <div @click="prev" class="p-0.5 cursor-pointer hover:bg-gray-200 transition-all">
              <font-awesome-icon  class="text-gray-500" size="l" icon="fa-solid fa-chevron-left" />
            </div>
            <div @click="next" class="p-0.5 cursor-pointer hover:bg-gray-200 transition-all">
              <font-awesome-icon  class="text-gray-500" size="l" icon="fa-solid fa-chevron-right" />
            </div>
          </div>
          <div>
            <p class="mt-1 mb-3 !leading-1.7 text-0.8 text-gray-600">
              {{instagramFeedData[postIndex].content ?? null}}
            </p>
          </div>
          <div class="divider !mb-0"></div>
          <div>
            <span class="uppercase !text-0.7 text-gray-600">{{instagramFeedData[postIndex].date ?? null}} •</span>
            <a class="!text-0.7 text-dark font-600 ml-0.5" :href="instagramFeedData[postIndex].link ?? null">
              View on instagram
            </a>

          </div>
        </column>
      </Modal>
<!--      <<<<<<<<<<<<<<<< modal end >>>>>>>>>>>>>>>-->

    </container>
  </section>
</template>

<script setup lang="ts">
import {useInstagramFeed} from "~/composables/useInstagramFeed";
const {closeModal,isOpen,prev,next,changePost,postIndex,instagramFeedData,fetchFlag}=useInstagramFeed()
</script>

<style scoped>

</style>