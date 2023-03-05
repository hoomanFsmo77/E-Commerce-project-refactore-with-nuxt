import {makeRandomHash} from "~/utils/Helper";
export  default defineNuxtPlugin(async ()=>{
    const token=useState<string>('x_token_x',()=>makeRandomHash(30))
    try {
        const data=await $fetch('/api/auth',{
            method:'POST',
            headers:{
                'Authentication':token.value
            }
        })
        token.value=data
    }catch (err) {
        console.log('app crashed')
    }
})