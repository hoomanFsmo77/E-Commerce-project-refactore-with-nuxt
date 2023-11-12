import {Product_Item} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    const productName=await ev.context.params.name
    try {
        const productDetail=  await $fetch<{data:Product_Item[],error:boolean}>(apiUrl + '/products/detail',{
            query:{
                product:productName
            }
        })
        if(productDetail.data && !productDetail.error){
            return productDetail.data
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