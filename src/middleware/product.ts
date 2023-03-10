import {storeData} from "~/utils/Helper";

export default defineNuxtRouteMiddleware((to,from)=>{
    const productIdState=useState<string>('productIdState')
    const productCategoryState=useState<string>('productCategoryState')
    if(process.client){
        window.scrollTo(0,0)
        storeData('visitedProduct',{
            id:productIdState.value,
            category:productCategoryState.value
        })
    }
})