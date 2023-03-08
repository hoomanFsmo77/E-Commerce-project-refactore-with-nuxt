import {Collection} from "~/store/collection";
import {Products} from "~/store/Products";

export default defineNuxtPlugin(nuxtApp=>{
    const collectionStore=Collection()
    const productStore=Products()
    collectionStore.triggerFetchCollectionList()
    productStore.triggerFetchPopularProductData()
})