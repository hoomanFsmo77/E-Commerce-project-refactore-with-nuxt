import {Product_Item} from "~/utils/Types";


export default defineEventHandler(async ev=>{
    const {apiBase,productList}=useRuntimeConfig()
    const params=await ev.context.params.name
    try {
        const data=  await $fetch<{productListData:any[]}>(apiBase + productList)
        const target:Product_Item[]=data.productListData[params]
        if(target){
            return target.map(item=>{return {...item,category:params}})
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