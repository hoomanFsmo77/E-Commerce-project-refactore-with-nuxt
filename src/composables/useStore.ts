import {Cart} from "~/store/cart";
import {Search} from "~/store/search";
import {Collection} from "~/store/collection";
import {Products} from "~/store/Products";
import {Checkout} from "~/store/checkout";
import {Product_Item,Collection_Item} from "~/utils/Types";

export const useSearchStore=()=>{
    const searchStore=Search()
    const searchFlag=computed<boolean>(()=>searchStore.getNavbarSearchFlag)
    const searchResult=computed(()=>searchStore.getNavbarSearchResult)
    const searchLen=computed(()=>searchStore.searchLength)
    const mainSearchResult=computed(()=>searchStore.getMainSearchResult)
    const mainSearchFlag=computed(()=>searchStore.getMainSearchFlag)


    return {searchStore,searchFlag,searchResult,searchLen,mainSearchFlag,mainSearchResult}
}

export const useCartStore=()=>{
    const cartStore=Cart()
    const cartLength=computed<number>(()=>cartStore.cartLength)
    const totalPrice=computed<number|string>(()=>cartStore.getTotalPrice)
    const cartList=computed(()=>cartStore.getCart)

    return{
        cartStore,
        cartLength,
        totalPrice,cartList
    }
}

export const useCollectionStore=()=>{
    const collectionStore=Collection()
    const randomCollection=computed<Collection_Item[]|null>(()=>collectionStore.getRandomCollection(8))
    const fetchFlag=computed<boolean>(()=>collectionStore.getFetchFlag)
    const allCollectionList=computed<Collection_Item[]|null>(()=>collectionStore.getAllList)

    return {
        collectionStore,randomCollection,fetchFlag,allCollectionList
    }

}


export const useProductStore=()=>{
    const productStore=Products()
    const productData=computed<Product_Item|null>(()=>productStore.getProductData)
    const productDetailFlag=computed<boolean>(()=>productStore.getProductDetailDataFlag)
    const popularProducts = computed(() => productStore.getPopularProduct)
    const popularProductFetchFlag = computed(() => productStore.getPopularProductFetchFlag)
    const productListData=computed<Product_Item[]|null>(()=>productStore.getProductList)
    const fetchFlag=computed<boolean>(()=>productStore.getProductListFetchFlag)
    const errorFlag=computed<boolean>(()=>productStore.getProductListErrorFlag)

    return{
        productStore,
        productData,
        productDetailFlag,popularProducts,popularProductFetchFlag,productListData,
        fetchFlag, errorFlag
    }
}

export const useCheckoutStore=()=>{
    const checkoutStore=Checkout()
    const userInformationShippingStore=computed(()=>checkoutStore.getUserInformationShipping)
    const hasShippingStore=computed(()=>checkoutStore.hasShippingMethod)


    return{
        checkoutStore,userInformationShippingStore,hasShippingStore
    }
}