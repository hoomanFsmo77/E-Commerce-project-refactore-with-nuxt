import {defineStore} from "pinia";
import {Search_Store,Collection_Item} from "~/utils/Types";

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
            this.navbarSearchFlag=false
            this.navbarSearchResult.product=null
            this.navbarSearchResult.collection=null
            try {
                const searchData=await $fetch<{ products:any[],collections:any[] }>('/api/search',{
                    headers:
                        {'Authentication':token.value},
                    query:{
                        name:value
                    }
                })
                this.navbarSearchResult.collection=searchData.collections
                this.navbarSearchResult.product=searchData.products
                this.navbarSearchFlag=true
            }catch (err) {
                console.log(err)
            }
        },
        setCollectionList(data:Collection_Item[]){
            this.navbarSearchResult.collection=data
        },
        async triggerMainSearch(value:string){
            const token=useState<string>('x_token_x')
            this.mainSearchResult=[]
            this.mainSearchFlag=false
            try {
                const searchData=await $fetch<{ products:any[],collections:any[]}>('/api/search',{
                    headers: {'Authentication':token.value},
                    query:{name:value}
                })
                this.mainSearchResult=searchData.products
            }catch (err) {
                console.log(err)
                createError({
                    statusCode:500,
                    statusMessage:'server error!',
                    message:'server error!'
                })
            }finally {
                this.mainSearchFlag=true
            }
        }
    }
})
