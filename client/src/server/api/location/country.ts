

export default defineEventHandler(async ev=>{
    const {countryApi}=useRuntimeConfig()
    try {
        const data=await $fetch<any[]>(countryApi as string)
        return data
    }catch (err) {
        return err
    }

})