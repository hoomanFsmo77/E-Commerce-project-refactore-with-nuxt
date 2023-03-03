import {Instagram_Feed} from "~/utils/Types";

export default ()=>{
    const isOpen=useState<boolean>('isOpen',()=>false)
    const postIndex=useState<number>('postIndex',()=>0)
    let fetchFlag=useState<boolean>('fetchFlag',()=>false)
    let instaFeedData=useState<Instagram_Feed[]>('instaFeedData',()=>[])


    onMounted(async ()=>{
        fetchFlag.value=false
        try {
            const data=await $fetch<Instagram_Feed[]>('/api/instagram')
            instaFeedData.value=data
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
        if(postIndex.value>instaFeedData.value.length-1){
            postIndex.value=0
        }
    }

    const prev = () => {
        postIndex.value--
        if(postIndex.value<0){
            postIndex.value=instaFeedData.value.length-1
        }
    }

    return{
        isOpen,closeModal,next,prev,changePost,postIndex,fetchFlag,instaFeedData
    }
}