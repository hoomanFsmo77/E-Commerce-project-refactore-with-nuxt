import {Cart_Item} from "~/utils/Types";


export default defineEventHandler(async ev=>{
    const {apiUrl}=useRuntimeConfig()
    const query=await getQuery(ev);
    const body=await readBody(ev);

    if(query.method==='GET'){
        const cartListData=  await $fetch<{data:{items:Cart_Item[],total:number},error:boolean}>(apiUrl + '/cart',{
            query:{uid:query.uid}
        })
        return cartListData.data
    }else if(query.method==='POST'){
        const addCartItem=  await $fetch<{data:{uid?:string},error:boolean}>(apiUrl + '/cart',{
            query:{...query},
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body
        })
        if(!addCartItem.error && addCartItem.data &&  addCartItem.data.uid){
            return addCartItem.data.uid
        }else{
            return  null
        }
    }else if(query.method==='PUT'){
        const updateCartItem=  await $fetch<{data:null,error:boolean}>(apiUrl + '/cart',{
            query:{...query},
            method:'PUT',
            body
        })
        return updateCartItem
    }

})