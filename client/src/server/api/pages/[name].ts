
export default defineEventHandler(async ev=>{
    const params=await ev.context.params.name
    const {apiUrl}=useRuntimeConfig()
    try {
        const pagesData=  await $fetch<{data:any[],error:boolean}>(apiUrl + '/pages',{
            query:{
                page:params
            }
        })
        if(pagesData.data.length>0 && !pagesData.error){
            return pagesData.data
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