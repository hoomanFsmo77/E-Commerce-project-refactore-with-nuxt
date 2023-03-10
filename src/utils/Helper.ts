import {Cart_Item,Collection_Item,Product_Item} from "~/utils/Types";


export const storeData = <T>(name:string,data:T):void => {
    if(process.client){
        localStorage.setItem(name,JSON.stringify(data))
    }

}

export const getData = (name:string):{cart:Cart_Item[],totalPrice:number}|null => {
    if(process.client){
        const data=localStorage.getItem(name)
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



export const setCookie = (name:string,hash:string|number,day:number) => {
    let date=new Date()
    date.setTime(date.getTime() + (day*24*60*60*1000))
    document.cookie=`${name}=${hash};path=/;expires=${date}`
}


export const getCookie = (name:string) => {
    return document.cookie.includes(name);
}
export const removeCookie = (name:string,day:number) => {
    let date=new Date()
    date.setTime(date.getTime() - (day*24*60*60*1000))
    document.cookie=`${name}=;path=/;expires=${date}`
}


export function hashCode(val:string) {
    let hash = 0,
        i, chr;
    if (val.length === 0) return hash;
    for (i = 0; i < val.length; i++) {
        chr = val.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

export function makeRandomHash(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}