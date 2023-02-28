import {Cart} from "~/store/cart";
import {Search} from "~/store/search";
import {Collection} from "~/store/collection";
import {Products} from "~/store/Products";
import {Product_Item,Collection_Item} from "~/utils/Types";

export const useSearchStore=()=>{
    const searchStore=Search()
    const searchFlag=computed<boolean>(()=>searchStore.getNavbarSearchFlag)
    const searchResult=computed(()=>searchStore.getNavbarSearchResult)

    return {searchStore,searchFlag,searchResult}
}

export const useCartStore=()=>{
    const cartStore=Cart()
    const cartLength=computed<number>(()=>cartStore.cartLength)
    const totalPrice=computed<number|string>(()=>cartStore.getTotalPrice)

    return{
        cartStore,
        cartLength,
        totalPrice
    }
}

export const useCollectionStore=()=>{
    const collectionStore=Collection()
    const randomCollection=computed<Collection_Item[]|null>(()=>collectionStore.getRandomCollection(8))
    const fetchFlag=computed<boolean>(()=>collectionStore.getFetchFlag)

    return {
        collectionStore,randomCollection,fetchFlag
    }

}


export const useProductStore=()=>{
    const productStore=Products()
    const productData=computed<Product_Item|null>(()=>productStore.getProductData)
    const productDetailFlag=computed<boolean>(()=>productStore.getProductDetailDataFlag)
    const popularProducts = computed(() => productStore.getPopularProduct)
    const popularProductFetchFlag = computed(() => productStore.getPopularProductFetchFlag)

    return{
        productStore,
        productData,
        productDetailFlag,popularProducts,popularProductFetchFlag
    }
}