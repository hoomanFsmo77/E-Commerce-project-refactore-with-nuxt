import {getCookie, setCookie} from "h3";
import {makeRandomHash,generateRandomNumber} from '~/utils/Helper'


export default defineEventHandler(async ev=>{
    const cookies=getCookie(ev,'secure_session_id')
    if(cookies){
        const checkout_token: { id:string,hash:string }=JSON.parse(getCookie(ev,'checkout_token') ?? '')
        return  `/${checkout_token.id}/checkout/information/${checkout_token.hash}`
    }else{
        let hash=makeRandomHash(20)
        let id=generateRandomNumber()
        let randomHashUrl=makeRandomHash(15)
        setCookie(ev,'x_secure_session_id',makeRandomHash(10),{
            path:'/', secure:true, httpOnly:true, maxAge:60*60
        })
        setCookie(ev,'x_checkout_token',JSON.stringify({id:id,hash:randomHashUrl}),{
            path:'/', secure:true, httpOnly:true, maxAge:60*60
        })
        setCookie(ev,'x_tracked_start_session',randomHashUrl,{
            path:'/', secure:true, httpOnly:true, maxAge:60*60
        })
        return `/${id}/checkout/information/${randomHashUrl}`
    }
})