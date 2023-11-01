import {Instagram_Feed} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    try {
        const instagramFeed=  await $fetch<{data:Instagram_Feed[]}>(apiUrl + '/instagram')
        return  instagramFeed.data
    }catch (err) {
        return err
    }

})
