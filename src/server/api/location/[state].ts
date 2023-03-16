

export default defineEventHandler(async ev=>{
    const params=await ev.context.params.state
    try {
        const data=await $fetch<any[]>(`https://battuta.medunes.net/api/region/${params}/all/?key=24127935f74f6b5008c8884c2d9ae031`)
        return data
    }catch (err) {
        return err
    }

})