
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    try {
        const navbar=  await $fetch<{data:any[]}>(apiUrl + '/menu')
        return navbar.data
    }catch (err) {
        return err
    }

})