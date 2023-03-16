import {getCookie} from "h3";


export default defineEventHandler(async ev=>{
    const url:string|undefined=ev.node.req.url
    const {cookieName}=useRuntimeConfig()
    const headerToken=ev.node.req.headers.authentication
    const cookie=getCookie(ev,cookieName)
    if(
        url==='/api/navbar' ||
        url==='/api/popular' ||
        url?.includes('/api/location') ||
        url==='/api/search' ||
        url==='/api/recent' ||
        url==='/api/instagram' ||
        url==='/api/cart' ||
        url?.includes('/api/checkout') ||
        url?.includes('/api/collection') ||
        url?.includes('/api/product') ||
        url?.includes('/api/pages') ||
        url?.includes('/api/policy')){
        if (typeof cookie==='undefined' || typeof headerToken==='undefined' && cookie!==headerToken){
            return createError({
                statusCode:501,
                statusMessage:'unauthorized token!'
            })
        }
    }

})