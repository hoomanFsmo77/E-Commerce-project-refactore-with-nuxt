import {getQuery, H3Event} from "h3";


// @ts-ignore
export default defineEventHandler(async (ev:H3Event)=>{
    const query=await getQuery(ev)
    const {apiUrl}=useRuntimeConfig()
    if(!query.name){
        return createError({
            statusCode:402,
            statusMessage:'missing query name!'
        })
    } else{
        try {
            const searchData=  await $fetch<{data:{products:any[],collections:any[]}}>(apiUrl + '/products/search',{
                query:{
                    name:query.name
                }
            });
            return  searchData.data
        }catch (err) {
            return err
        }
    }

})