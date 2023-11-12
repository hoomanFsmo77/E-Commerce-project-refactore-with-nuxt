
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    try {
        const recentWorkData=  await $fetch<{data:any[]}>(apiUrl + '/recent-work')
        return  recentWorkData.data
    }catch (err) {
        return err
    }
})