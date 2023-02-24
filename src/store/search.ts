import {defineStore} from "pinia";
import {Search_Store} from "~/utils/Types";

export const Search=defineStore('search',{
    state:():Search_Store=>{
        return{
            navbarSearchResult:{collection:''},
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
        triggerNavbarSearch(value:string){

        }
    }
})
