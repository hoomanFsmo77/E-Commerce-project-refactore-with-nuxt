import {getCookie, setCookie} from "h3";

export default defineEventHandler(async ev=>{
    const {cookieName}=useRuntimeConfig()
    const cookie=getCookie(ev,cookieName)
    if(!cookie){
        const headerToken:any=ev.node.req.headers.authentication
        if(headerToken){
            setCookie(ev,cookieName,headerToken,{
                httpOnly:true,
                secure:true,
                path:'/',
                maxAge:60*60
            })
        }
        return headerToken
    }else{
        return cookie
    }

})