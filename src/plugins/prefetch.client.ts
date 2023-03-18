import {Collection} from "~/store/collection";
import {Products} from "~/store/Products";
import {Checkout} from "~/store/checkout";

export default defineNuxtPlugin(nuxtApp=>{
    const collectionStore=Collection()
    const productStore=Products()
    const checkoutStore=Checkout()
    collectionStore.triggerFetchCollectionList()
    productStore.triggerFetchPopularProductData()
    checkoutStore.setUserStoredInformation()
})