import {getCookie,readBody} from "h3";


export default defineEventHandler(async ev=>{
    const body=await readBody(ev)
    const checkout_token: { id:string,hash:string }=JSON.parse(getCookie(ev,'x_checkout_token') ?? '');
    if(body.id===String(checkout_token.id) && body.token===checkout_token.hash){
        return 'successful'
    }else{
        return createError({
            message:'Page not valid!',
            statusCode:500
        })
    }
})