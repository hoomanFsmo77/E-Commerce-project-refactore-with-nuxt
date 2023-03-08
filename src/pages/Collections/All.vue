<template>
  <section id="collection-list" class="my-2">
    <container class="relative ">
      <LoaderPage :show="!fetchFlag"/>
      <BreadCrumb :pages="[{name:'Home',link:{name:'index'}},{name:'Collections'}]"/>
      <h1 class="font-600 text-left mb-1">Collections</h1>
      <div v-if="fetchFlag" class="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-1.3">
        <CollectionCart v-for="(item,index) in allCollectionList" :key="index" :text="item.text" :src="item.src" :link="item.link" :srcset="item.srcset"/>
      </div>
    </container>
  </section>
</template>

<script setup lang="ts">
const {fetchFlag,allCollectionList,collectionStore}=useCollectionStore()
onMounted(()=>collectionStore.triggerFetchCollectionList())
</script>
