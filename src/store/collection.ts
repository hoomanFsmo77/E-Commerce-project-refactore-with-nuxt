import {defineStore} from "pinia";
import {Collection_Store,Collection_Item} from "~/utils/Types";
import {Search} from "~/store/search";

export const Collection=defineStore('collection',{
    state:():Collection_Store=>{
        return {
            collections:[],
            fetchFlag:false
        }
    },
    getters:{
        getFetchFlag(state){
            return state.fetchFlag
        },
        getAllList(state){
            if(state.fetchFlag){
                return state.collections
            }else{
                return null
            }
        },
        getRandomCollection:(state)=>(len:number):Collection_Item[]|null=>{
            if(state.fetchFlag){
                let randomNumber=[0,1,2,3,4,5,6,7,8,9,10,11]
                let randomCollection=[]
                for(let i=0;i<len;i++){
                    let randomIndex=Math.floor(Math.random()*randomNumber.length)
                    randomCollection.push(state.collections[randomNumber[randomIndex]])
                    randomNumber.splice(randomIndex,1)
                }
                return randomCollection
            }else{
                return  null
            }

        }
    },
    actions:{
        async triggerFetchCollectionList(){
            const token=useState<string>('x_token_x')
            const searchStore=Search()
            this.fetchFlag=false
            try {
                const data=await $fetch<Collection_Item[]>('/api/collection/all',
                    {headers:{'Authentication':token.value}})
                searchStore.setCollectionList(data)
                this.collections=data
            }catch (err) {
                console.log(err)
            }finally {
                this.fetchFlag=true
            }
        }
    },
})