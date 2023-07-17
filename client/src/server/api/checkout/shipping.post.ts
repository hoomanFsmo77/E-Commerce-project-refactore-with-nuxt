import {getCookie} from "h3";


export default defineEventHandler(async ev=> {
    const cookies=getCookie(ev,'x_secure_session_id')
    if(cookies){
        const checkout_token: { id:string,hash:string }=JSON.parse(getCookie(ev,'x_checkout_token') ?? '')
        return  `/${checkout_token.id}/checkout/shipping/${checkout_token.hash}?previous_step=contact_information?current_step=shipping_method`
    }else{
        return createError({
            statusCode:404,
            statusMessage:'You are not allowed!'
        })
    }
})