import {getCookie} from "h3";


export default defineEventHandler(async ev=>{
    const cookies=getCookie(ev,'x_secure_session_id')
    if(cookies){
        const checkout_token: { id:string,hash:string }=JSON.parse(getCookie(ev,'x_checkout_token') ?? '')
        return  `/${checkout_token.id}/checkout/information/${checkout_token.hash}`
    }else{
        return createError({
            statusCode:404,
            statusMessage:'You are not allowed!'
        })
    }




})