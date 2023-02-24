import {useCartStore, useSearchStore} from "~/composables/useStore";


let timeout:any=null;
let delay=1500;
export const useDesktopHeader=()=>{
    const {searchStore}=useSearchStore()
    const {cartLength, totalPrice}=useCartStore()
    const isOn=useState<boolean>('isOn',()=>false)
    const searchText=useState<string>('searchText',()=> '')

    const showResult=(e:boolean)=>{
        isOn.value=e
    }
    const closeResult = (e:boolean) => {
        isOn.value=e
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


    return {isOn,showResult,searchText,cartLength,totalPrice,closeResult,initSearch}
}


export  const useMobileHeader=()=>{
    const isOpen=useState<boolean>('isOpen',()=>false)
    const closeMenu = (e:boolean) => {
      isOpen.value=e
    }

    return{isOpen,closeMenu}
}