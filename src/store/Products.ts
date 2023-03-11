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
            productDetailFetchFlag:false,
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
            }else{
                return  null
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
        async triggerFetchPopularProductData(){
            const token=useState<string>('x_token_x')
            this.popularFetchFlag=false
            try {
                const data=await $fetch<Product_Item[]>('/api/popular',{headers:{'Authentication':token.value}})
                this.popularProduct=data
            }catch (err) {
                console.log(err)
            }finally {
                this.popularFetchFlag=true
            }

        },
        async triggerFetchProductList(name:string){
            const token=useState<string>('x_token_x')
            this.productListData=[]
            this.productListFetchFlag=false
            this.productListErrorFlag=false
            try {
                const data=await $fetch<Product_Item[]>(`/api/collection/${name}`,{headers:{'Authentication':token.value}})
                this.productListData=data
                this.productListFetchFlag=true
            }catch (err) {
                this.productListErrorFlag=true
            }
        },
        async triggerFetchProductDetail(id:string){
            const token=useState<string>('x_token_x')
            this.productDetailFetchFlag=false
            this.productDetail=null
            try{
                const data=await $fetch<Product_Item>(`/api/product/${id}`,{headers:{'Authentication':token.value}})
                this.productDetail=data
            }catch (err) {
                console.log(err)
                navigateTo('/')
            }finally {
                this.productDetailFetchFlag=true
            }
        }

    }


})
