

export default defineNuxtRouteMiddleware(async (to,from)=>{
    const token=useState<string>('x_token_x')

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
    }catch (err) {
        abortNavigation({
            statusCode:404,
            statusMessage:'Page does not exist!'
        })
    }


})