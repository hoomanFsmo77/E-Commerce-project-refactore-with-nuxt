import {Cart} from "~/store/cart";
import {Search} from "~/store/search";

export const useSearchStore=()=>{
    const searchStore=Search()
    const searchFlag=computed(()=>searchStore.getNavbarSearchFlag)
    const searchResult=computed(()=>searchStore.getNavbarSearchResult)

    return {searchStore,searchFlag,searchResult}
}

export const useCartStore=()=>{
    const cartStore=Cart()
    const cartLength=computed(()=>cartStore.cartLength)
    const totalPrice=computed(()=>cartStore.getTotalPrice)

    return{
        cartStore,
        cartLength,
        totalPrice
    }
}