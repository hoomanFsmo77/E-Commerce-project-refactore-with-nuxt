
export default defineEventHandler(async ev=>{
    const {apiBase,navbar}=useRuntimeConfig()
    try {
        const data=  await $fetch<{navbarItems:any[]}>(apiBase + navbar)
        return data.navbarItems
    }catch (err) {
        return err
    }

})