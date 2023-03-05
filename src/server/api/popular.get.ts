import {Product_Item} from "~/utils/Types";
import {getCookie} from "h3";

export default defineEventHandler(async ev=>{
    const {apiBase,popularProduct,cookieName}=useRuntimeConfig()
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
        return createError({
            statusCode:501,
            statusMessage:'unauthorized token!'
        })
    }else{
        try {
            const data=  await $fetch<{popularProducts:Product_Item[]}>(apiBase + popularProduct)
            return data.popularProducts
        }catch (err) {
            return err
        }
    }

})