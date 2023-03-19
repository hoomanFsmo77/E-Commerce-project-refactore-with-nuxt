

export default defineEventHandler(async ev=>{
    try {
        const data=await $fetch<any[]>('https://restcountries.com/v3.1/all')
        return data
    }catch (err) {
        return err
    }
})