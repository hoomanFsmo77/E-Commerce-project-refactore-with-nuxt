import {getCookie} from "h3";
import {Product_Item} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const {apiBase,productDetail,cookieName}=useRuntimeConfig()
    const params=await ev.context.params.id
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
        return createError({
            statusCode:501,
            statusMessage:'unauthorized token!'
        })
    }else{
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
    }

})