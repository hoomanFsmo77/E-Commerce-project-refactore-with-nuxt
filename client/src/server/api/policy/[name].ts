
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    const params=await ev.context.params.name
    try {
        const policyData=  await $fetch<{data:any[],error:boolean}>(apiUrl + '/policy/'+ params)
        if(policyData.data.length>0 && !policyData.error){
            return policyData.data
        }else{
            return createError({
                statusCode:500,
                statusMessage:'parameter : id is not matching any policy data!'
            })
        }
    }catch (err) {
        return err
    }


})