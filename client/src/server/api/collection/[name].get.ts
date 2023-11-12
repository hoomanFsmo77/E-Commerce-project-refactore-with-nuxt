import {Product_Item} from "~/utils/Types";


export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    const category=await ev.context.params.name
    try {
        const productList=  await $fetch<{data:Product_Item[],error:boolean}>(apiUrl + '/products/list',{
            query:{
                category:category
            }
        })
        if(productList.data.length>0 && !productList.error){
            return productList.data
        }else{
            return createError({
                statusCode:501,
                statusMessage:'parameter name is not matching any product list!'
            })
        }
    }catch (err) {
        return err
    }

})