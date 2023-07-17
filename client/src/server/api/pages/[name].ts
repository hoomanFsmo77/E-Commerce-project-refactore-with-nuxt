
export default defineEventHandler(async ev=>{
    const params=await ev.context.params.name
    const {apiBase,pagesData}=useRuntimeConfig()
    try {
        const data=  await $fetch<{pagesData:any[]}>(apiBase + pagesData)
        const target=data.pagesData[params]
        if(target){
            return target
        }else{
            return createError({
                statusCode:500,
                statusMessage:'parameter : name is not matching any pages data!'
            })
        }
    }catch (err) {
        return err
    }

})