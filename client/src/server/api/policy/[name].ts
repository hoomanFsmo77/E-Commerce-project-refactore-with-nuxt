
export default defineEventHandler(async ev=>{
    const {apiBase,policyData}=useRuntimeConfig()
    const params=await ev.context.params.name
    try {
        const data=  await $fetch<{policyData:any[]}>(apiBase + policyData)
        const target=data.policyData[params]
        if(target){
            return target
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