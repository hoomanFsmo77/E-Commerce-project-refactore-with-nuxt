import {Collection_Item} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    try {
        const collectionData=  await $fetch<{data:Collection_Item[]}>(apiUrl + '/collection')
        return collectionData.data
    }catch (err) {
        return err
    }
})