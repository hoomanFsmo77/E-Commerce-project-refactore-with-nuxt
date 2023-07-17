import {Collection_Item} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiBase,collections}=useRuntimeConfig()
    try {
        const data=  await $fetch<{AllCollectionLists:Collection_Item[]}>(apiBase + collections)
        return data.AllCollectionLists
    }catch (err) {
        return err
    }
})