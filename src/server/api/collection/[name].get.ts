import {getCookie} from "h3";
import {Product_Item} from "~/utils/Types";


export default defineEventHandler(async ev=>{
    const {apiBase,productList,cookieName}=useRuntimeConfig()
    const params=await ev.context.params.name
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
        return createError({
            statusCode:501,
            statusMessage:'unauthorized token!'
        })
    }else{
        try {
            const data=  await $fetch<{productListData:Product_Item[]}>(apiBase + productList)
            const target=data.productListData[params]
            if(target){
                return target
            }else{
                return createError({
                    statusCode:501,
                    statusMessage:'parameter name is not matching any product list!'
                })
            }
        }catch (err) {
            return err
        }
    }

})