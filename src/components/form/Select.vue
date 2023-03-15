<template>
  <div class=" select-wrap " >
    <label class="select-label  absolute">{{label}}</label>
    <select :class="[selectClass,{'!border-red-500':errorFlag}]" :value="modelValue.code"
            @input="select($event.target.value)"
            class="w-full select" name="country"

            id="country">
      <template v-if="flag">
        <option v-for="item in option" :value="state ? item[prop1] : item[prop2]">{{item[prop1]}}</option>
      </template>
    </select>
    <div  class="absolute right-[3%] pl-[10px] border-l-[1px] border-gray-500 bottom-[26%]">
      <font-awesome-icon class="text-gray-500 " icon="fa-solid fa-caret-down" />

    </div>
  </div>
  <p class="text-red-600 font-400 text-0.9 mb-0.5" v-if="errorFlag">{{errorMessage}}</p>

</template>

<script lang="ts">
import {defineComponent} from "@vue/runtime-core";
export default defineComponent({
  name: "SelectBox",
  props:['modelValue','option','label','selectClass','flag','state','errorMessage','errorFlag'],
  emits:['update:modelValue'],
  data(){
    return{
      prop1:'' as string,
      prop2:'' as string
    }
  },
  methods:{
    select(e:string){
      if(this.state){
        this.$emit('update:modelValue', {code:e})
      }else{
        let target=this.option.filter((item:any)=>item[this.prop2]===e)[0]
        this.$emit('update:modelValue',{code:e,name:target[this.prop1]})
      }

    }
  },
  updated() {
    if(this.option.length>0){
      let props=Object.keys(this.option[0])
      this.prop1=props[0]
      this.prop2=props[1]
    }
  }
})
</script>

<style scoped>

</style>