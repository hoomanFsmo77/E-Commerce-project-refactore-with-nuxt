
interface Props {
    itemInWarp:number
    source:any[]
}
interface Emit {
    (e:'update',val:any[]):void
    (e:'period',val:{start:number,end:number}):void
}

export const corePagination= (props:Props,emit:Emit)=>{
    const pages=useState<number>('paginationTotalPage',()=>Math.ceil(props.source.length / props.itemInWarp))
    const target=useState<any[]>('paginationTotalList',()=>props.source)
    const currentPage=ref<number>(1)

    const updateSource = (currentPage:number) => {
        let start=(currentPage*props.itemInWarp)-props.itemInWarp
        let end=currentPage*props.itemInWarp> props.source.length ? props.source.length : currentPage*props.itemInWarp;
        let currentPageItem=[...target.value].slice(start,end)
        emit('update',currentPageItem)
        emit('period',{start,end})
    }

    onMounted(()=>{
        updateSource(currentPage.value)
    })
    const paginating = (index:number) => {
      currentPage.value=index
        updateSource(currentPage.value)
    }
    const next = () => {
      currentPage.value++
        if(currentPage.value>pages.value){
            currentPage.value=1
        }
        updateSource(currentPage.value)
    }
    const prev = () => {
      currentPage.value--
        if(currentPage.value<1){
            currentPage.value=pages.value
        }
        updateSource(currentPage.value)
    }



    return{
        pages,paginating,currentPage,next,prev
    }
}



export const usePaginating=()=>{
    const list=ref<any[]>([])
    const updatePage = (e:any[]) => {
        list.value=e
    }
    return {
        updatePage,list
    }
}