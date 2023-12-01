import {makeRandomHash} from "~/utils/Helper";
import {useCartStore} from "~/composables/useStore";
export  default defineNuxtPlugin(async ()=>{
    const {cartStore}=useCartStore()
    const token=useState<string>('x_token_x',()=>makeRandomHash(30))
    try {
        const data=await $fetch('/api/auth',{
            method:'POST',
            headers:{
                'Authentication':token.value
            }
        })
        token.value=data
        cartStore.fetchCartData()
    }catch (err) {
        console.log('app crashed')
    }
})