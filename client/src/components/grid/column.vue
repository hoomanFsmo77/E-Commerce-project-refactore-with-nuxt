<template>
    <div class="col"
         :class="[
             colClasses[Number(col)-1],
             smColClasses[Number(sm)-1],
             mdColClasses[Number(md)-1],
             lgColClasses[Number(lg)-1],
             xlgColClasses[Number(xlg)-1],
             ]"
    >
      <slot/>
    </div>
</template>

<script>
export default {
  props:['col','sm','md','lg','xlg'],
  data(){
    return{
      colClasses:['col-1','col-2','col-3','col-4','col-5','col-6','col-7','col-8','col-9','col-10','col-11','col-12'],
      mdColClasses:['md:col-1','md:col-2','md:col-3','md:col-4','md:col-5','md:col-6','md:col-7','md:col-8','md:col-9','md:col-10','md:col-11','md:col-12'],
      smColClasses:['sm:col-1','sm:col-2','sm:col-3','sm:col-4','sm:col-5','sm:col-6','sm:col-7','sm:col-8','sm:col-9','sm:col-10','sm:col-11','sm:col-12'],
      lgColClasses:['lg:col-1','lg:col-2','lg:col-3','lg:col-4','lg:col-5','lg:col-6','lg:col-7','lg:col-8','lg:col-9','lg:col-10','lg:col-11','lg:col-12'],
      xlgColClasses:['xlg:col-1','xlg:col-2','xlg:col-3','xlg:col-4','xlg:col-5','xlg:col-6','xlg:col-7','xlg:col-8','xlg:col-9','xlg:col-10','xlg:col-11','xlg:col-12'],

    }
  }
}
</script>
