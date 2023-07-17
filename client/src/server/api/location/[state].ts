

export default defineEventHandler(async ev=>{
    const params=await ev.context.params.state
    try {
        const data=await $fetch<any[]>(`https://battuta.medunes.net/api/region/${params}/all/?key=3b469a237e20c3b4e17a41ce08e097d3`)
        return data
    }catch (err) {
        return err
    }

})