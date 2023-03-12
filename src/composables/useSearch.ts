import {useSearchStore} from "~/composables/useStore";

export const useSearch= ()=>{
    const {searchLen,searchStore}=useSearchStore()
    const route=useRoute()
    const searchText=ref<string>('')
    const paginationBoundry=reactive({
        start:0 as number,
        end:searchLen.value as number
    })


    watch(
        ()=>route.query.name,
        ()=>{
            if(route.name==='search'){
                searchStore.triggerMainSearch(route.query.name as string)
            }
        },
        {
            immediate:true
        }
    )

    searchStore.$subscribe(
        (mutation, state)=>{
            if(state.mainSearchFlag){
                paginationBoundry.end=state.mainSearchResult.length
            }
    })

    const triggerSearch = () => {
        return navigateTo({
            name:'search',
            query:{
                name:searchText.value
            }
        })
    }
    const updatePaginationPeriod = (e:{start:number,end:number}) => {
        paginationBoundry.start=e.start
        paginationBoundry.end=e.end
    }


    return{
        triggerSearch,searchText,updatePaginationPeriod,paginationBoundry
    }
}