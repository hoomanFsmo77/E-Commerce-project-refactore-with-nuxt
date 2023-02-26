import {defineStore} from "pinia";
import {Search_Store,Product_Item,Collection_Item} from "~/utils/Types";
import {filterCollection,filterProducts} from "~/utils/Helper";

export const Search=defineStore('search',{
    state:():Search_Store=>{
        return{
            navbarSearchResult:{collection:null,product:null},
            navbarSearchFlag:false,
            mainSearchResult:[],
            mainSearchFlag:false
        }
    },
    getters:{
        getNavbarSearchFlag(state){
            return state.navbarSearchFlag
        },
        getNavbarSearchResult(state){
            return state.navbarSearchResult
        },
        getMainSearchFlag(state){
            return state.mainSearchFlag
        },
        getMainSearchResult(state){
            return state.mainSearchResult
        },
        searchLength(state){
            return state.mainSearchResult.length
        }
    },
    actions:{
        async triggerNavbarSearch(value:string){
            const {public:{apiBase}}=useRuntimeConfig()
            this.navbarSearchFlag=false
            this.navbarSearchResult.product=null
            this.navbarSearchResult.collection=null
            try {
                const collection=await $fetch<Collection_Item[]>(apiBase +'collection/AllCollectionLists.json')
                const product=await $fetch<Product_Item[]>(apiBase +'product/productListData.json')
                this.navbarSearchResult.collection=filterCollection(collection,value)
                this.navbarSearchResult.product=filterProducts(product,value).slice(0,4)
                this.navbarSearchFlag=true
            }catch (err) {
                console.log(err)
            }
        }
    }
})
