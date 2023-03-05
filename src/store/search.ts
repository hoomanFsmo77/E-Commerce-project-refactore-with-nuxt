import {defineStore} from "pinia";
import {Search_Store,Product_Item,Collection_Item} from "~/utils/Types";
import {filterCollection,filterProducts} from "~/utils/Helper";
import {Collection} from "~/store/collection";

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
        },

    },
    actions:{
        async triggerNavbarSearch(value:string){
            const token=useState<string>('x_token_x')
            const collectionStore=Collection()
            this.navbarSearchFlag=false
            this.navbarSearchResult.product=null
            this.navbarSearchResult.collection=null
            try {
                const product=await $fetch<Product_Item[]>('/api/search',{
                    headers:
                        {'Authentication':token.value},
                    query:{
                        name:value
                    }
                })
                this.navbarSearchResult.collection=filterCollection(collectionStore.getAllList,value)
                this.navbarSearchResult.product=product
                this.navbarSearchFlag=true
            }catch (err) {
                console.log(err)
            }
        },
        setCollectionList(data:Collection_Item[]){
            this.navbarSearchResult.collection=data
        }
    }
})
