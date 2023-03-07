import {useCartStore, useSearchStore} from "~/composables/useStore";


let timeout:any=null;
let delay=1500;
export const useDesktopHeader=()=>{
    const {searchStore}=useSearchStore()
    const searchBoxFlag=useState<boolean>('searchBoxFlag',()=>false)
    const searchText=useState<string>('searchText',()=> '')

    const showResult=(e:boolean)=>{
        searchBoxFlag.value=e
    }
    const closeResult = (e:boolean) => {
        searchBoxFlag.value=e
    }
    const initSearch = () => {
        searchStore.$patch({
            navbarSearchFlag:false
        })

        if(timeout){
            clearTimeout(timeout)
        }
        timeout=setTimeout(()=>{
            searchAction()
        },delay)
    }
    
    const searchAction = () => {
        if(searchText.value.length>0){
            searchStore.triggerNavbarSearch(searchText.value)
        }
    }


    return {searchBoxFlag,showResult,searchText,closeResult,initSearch}
}


export  const useMobileHeader=()=>{
    const navbarOpenFlag=useState<boolean>('navbarOpenFlag',()=>false)
    const closeMenu = (e:boolean) => {
        navbarOpenFlag.value=e
    }

    return{navbarOpenFlag,closeMenu}
}