import {Cart_Item} from "~/utils/Types";

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