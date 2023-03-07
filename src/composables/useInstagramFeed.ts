import {Instagram_Feed} from "~/utils/Types";

export const useInstagramFeed =()=>{
    const isOpen=useState<boolean>('instagramFlag',()=>false)
    const postIndex=useState<number>('postIndex',()=>0)
    const fetchFlag=useState<boolean>('instagramFetchFlag',()=>false)
    const instagramFeedData=useState<Instagram_Feed[]>('instagramFeedData',()=>[])


    onMounted(async ()=>{
        const token=useState<string>('x_token_x')
        fetchFlag.value=false
        try {
            const data=await $fetch<Instagram_Feed[]>('/api/instagram',{headers:{'Authentication':token.value}})
            instagramFeedData.value=data
        }catch (err) {
            console.log(err)
        }finally {
            fetchFlag.value=true
        }
    })


    const closeModal = (e:boolean) => {
        isOpen.value=e
    }

    const changePost =(e:{isOpen:boolean,index:number}) => {
        isOpen.value=e.isOpen
        postIndex.value=e.index
    }

    const next = () => {
        postIndex.value++
        if(postIndex.value>instagramFeedData.value.length-1){
            postIndex.value=0
        }
    }

    const prev = () => {
        postIndex.value--
        if(postIndex.value<0){
            postIndex.value=instagramFeedData.value.length-1
        }
    }

    return{
        isOpen,closeModal,next,prev,changePost,postIndex,fetchFlag,instagramFeedData
    }
}