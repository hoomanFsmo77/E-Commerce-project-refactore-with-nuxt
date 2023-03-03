
export default defineEventHandler(async ev=>{
    const {apiBase,productList}=useRuntimeConfig()
    try {
        const data=  await $fetch<{productListData:any}>(apiBase + productList)
        return  data.productListData
    }catch (err) {
        return err
    }
})