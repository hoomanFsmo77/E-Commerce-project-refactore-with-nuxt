import {Product_Item} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    try {
        const popularList=  await $fetch<{data:Product_Item[]}>(apiUrl + '/products/popular')
        return popularList.data
    }catch (err) {
        return err
    }
})