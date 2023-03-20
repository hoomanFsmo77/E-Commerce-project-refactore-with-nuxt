import {setCookie} from "h3";


export default defineEventHandler(async ev=>{
    setCookie(ev,'x_secure_session_id','',{
        maxAge: new Date(0).getTime(), path:'/', secure:true, httpOnly:true
    })
    setCookie(ev,'x_checkout_token','',{
        maxAge: new Date(0).getTime(), path:'/', secure:true, httpOnly:true
    })
    setCookie(ev,'x_tracked_start_session','',{
        maxAge: new Date(0).getTime(), path:'/', secure:true, httpOnly:true
    })
    return 'ok'

})