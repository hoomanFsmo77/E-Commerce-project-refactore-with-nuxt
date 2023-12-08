import {useCheckoutStore} from "~/composables/useStore";
import {useCartStore} from "~/composables/useStore";

export default defineNuxtRouteMiddleware(async (to,from)=>{
    if(process.server)return
    if(process.client){
        const token=useState<string>('x_token_x')
        const {checkoutStore}=useCheckoutStore()
        const {cartStore}=useCartStore()
        try {
            const checkValidation=await $fetch('/api/checkout/auth',{
                method:'POST',
                body:JSON.stringify({
                    id:to.params.id,
                    token:to.params.token
                }),
                headers:{
                    'content-type':'application/json',
                    'Authentication':token.value
                }
            })
            console.log(checkValidation)
        }catch (err) {
            checkoutStore.resetCheckout()
            if(to.name==='id-order_summary-token' && from.name==='id-order_summary-token'){
                cartStore.resetCart()
            }
            abortNavigation({
                statusCode:404,
                statusMessage:'Page does not exist!'
            })
        }
    }



})