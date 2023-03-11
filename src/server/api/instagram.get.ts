import {Instagram_Feed} from "~/utils/Types";
export default defineEventHandler(async ev=>{
    const {apiBase,instagramFeed}=useRuntimeConfig()
    try {
        const data=  await $fetch<{instagramFeedList:Instagram_Feed[]}>(apiBase + instagramFeed)
        return  data.instagramFeedList
    }catch (err) {
        return err
    }

})
