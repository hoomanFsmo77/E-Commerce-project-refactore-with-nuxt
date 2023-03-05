import {getCookie} from "h3";


export default defineEventHandler(async ev=>{
    const {apiBase,recentWork,cookieName}=useRuntimeConfig()
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
        return createError({
            statusCode:501,
            statusMessage:'unauthorized token!'
        })
    }else{
        try {
            const data=  await $fetch<{recentWork:any}>(apiBase + recentWork)
            return  data.recentWork
        }catch (err) {
            return err
        }
    }
})