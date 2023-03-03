import {defineStore} from "pinia";
import {Product_Store,Product_Item} from "~/utils/Types";

export const Products=defineStore('product',{
    state:():Product_Store=>{
        return {
            productListData:[],
            productListFetchFlag:false,
            productListErrorFlag:false,

            popularProduct:[],
            popularFetchFlag:false,

            productDetail:null,
            productDetailFetchFlag:false
        }
    },getters:{
        getProductListFetchFlag(state){
            return state.productListFetchFlag
        } ,
        getProductListErrorFlag(state){
            return state.productListErrorFlag
        } ,
        getProductList(state){
            if(state.productListFetchFlag){
                return state.productListData
            }
        },

        getPopularProductFetchFlag(state){
            return state.popularFetchFlag
        },
        getPopularProduct(state){
            if(state.popularFetchFlag){
                return state.popularProduct
            }
        },
        getProductData(state):Product_Item|null{
            if(state.productDetailFetchFlag){
                return state.productDetail
            }else{
                return  null
            }
        },
        getProductDetailDataFlag(state){
            return state.productDetailFetchFlag
        }
    },
    actions:{
        async fetchProductList(name:string){
            // const {public:{apiBase}}=useRuntimeConfig()
            // this.productListData=[]
            // this.productListFetchFlag=false
            // this.productListErrorFlag=false
            // try {
            //     const data=await $fetch<Product_Item[]>(apiBase + `product/productListData/${name}.json`)
            //     this.productListData=data
            // }catch (err) {
            //     console.log(err)
            // }finally {
            //     this.productListFetchFlag=true
            //
            // }
        },
        async fetchProductDetail(id:string){
            // const {public:{apiBase}}=useRuntimeConfig()
            // this.productDetailFetchFlag=false
            // this.productDetail=null
            // try {
            //     const data=await $fetch<Product_Item>(apiBase + `product/productDetailData/${id}.json`)
            //     this.productDetail=data
            // }catch (err) {
            //
            // }finally {
            //     this.productDetailFetchFlag=true
            // }
        }

    },
   async hydrate(state) {
        state.popularFetchFlag=false
        try {
            const data=await $fetch<Product_Item[]>('/api/popular')
            state.popularProduct=data
        }catch (err) {
            console.log(err)
        }finally {
            state.popularFetchFlag=true
        }
    }


})
