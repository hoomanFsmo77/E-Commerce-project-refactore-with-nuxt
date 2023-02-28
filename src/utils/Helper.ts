import {Cart_Item,Collection_Item,Product_Item} from "~/utils/Types";
import axios from "axios";

export const storeData = <T>(data:T):void => {
    if(process.client){
        localStorage.setItem(process.env.STORAGE_NAME as string,JSON.stringify(data))
    }

}

export const getData = ():{cart:Cart_Item[],totalPrice:number}|null => {
    if(process.client){
        const data=localStorage.getItem(process.env.STORAGE_NAME as string)
        if(data){
            return JSON.parse(data)
        }else{
         return null
        }
    }else{
        return null
    }

}


export const filterCollection = (data:Collection_Item[]|undefined,searchText:string) => {
    if(data){
        return data.filter(item=>item.text.toLowerCase().startsWith(searchText.toLowerCase()))
    }else{
        return null
    }
}
export const filterProducts = (data:any,searchText:string):Product_Item[] => {
    let result:Product_Item[]=[]
    Object.entries(data).forEach(item=>{
        (item[1] as Product_Item[]).forEach(product=>{
            if(product.title.toLowerCase().startsWith(searchText.toLowerCase())){
                result.push({...product,category:item[0]})
            }
        })
    })
    return result.filter((v,i,a)=>a.findIndex(v2=>(v2.title===v.title))===i)
}
