import {Collection} from "~/store/collection";
import {Products} from "~/store/Products";

export default defineNuxtPlugin(nuxtApp=>{
    const visitedProduct:string|null=localStorage.getItem('visitedProduct')
    const productIdState=useState<string>('productIdState',()=>JSON.parse(visitedProduct ?? '').id)
    const productCategoryState=useState<string>('productCategoryState',()=>JSON.parse
    (visitedProduct ?? '').category)
    const collectionStore=Collection()
    const productStore=Products()
    collectionStore.triggerFetchCollectionList()
    productStore.triggerFetchPopularProductData()
})