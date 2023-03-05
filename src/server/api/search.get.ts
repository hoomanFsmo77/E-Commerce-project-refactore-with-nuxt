import {getCookie, getQuery, H3Event} from "h3";
import {filterProducts} from "~/utils/Helper";

// @ts-ignore
export default defineEventHandler(async (ev:H3Event)=>{
    const query=await getQuery(ev)
    const {apiBase,productList,cookieName}=useRuntimeConfig()
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
        return createError({
            statusCode:501,
            statusMessage:'unauthorized token!'
        })
    }else if(!query.name){
        return createError({
            statusCode:402,
            statusMessage:'missing query name!'
        })
    } else{
        try {
            const data=  await $fetch<{productListData:any}>(apiBase + productList)
            return  filterProducts(data.productListData,query.name as string)
        }catch (err) {
            return err
        }
    }

})