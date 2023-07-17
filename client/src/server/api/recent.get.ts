
export default defineEventHandler(async ev=>{
    const {apiBase,recentWork}=useRuntimeConfig()
    try {
        const data=  await $fetch<{recentWork:any}>(apiBase + recentWork)
        return  data.recentWork
    }catch (err) {
        return err
    }
})