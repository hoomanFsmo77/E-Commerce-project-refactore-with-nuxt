import {Product_Item} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiBase,popularProduct}=useRuntimeConfig()
    try {
        const data=  await $fetch<{popularProducts:Product_Item[]}>(apiBase + popularProduct)
        return data.popularProducts
    }catch (err) {
        return err
    }
})