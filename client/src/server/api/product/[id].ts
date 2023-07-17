import {Product_Item} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const {apiBase,productDetail}=useRuntimeConfig()
    const params=await ev.context.params.id
    try {
        const data=  await $fetch<{productDetailData:Product_Item[]}>(apiBase + productDetail)
        const target=data.productDetailData[params]
        if(target){
            return target
        }else{
            return createError({
                statusCode:500,
                statusMessage:'parameter : id is not matching any product!'
            })
        }
    }catch (err) {
        return err
    }

})