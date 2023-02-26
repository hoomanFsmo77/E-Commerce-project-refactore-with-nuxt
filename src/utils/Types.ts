
////////////////////////////////// cart store
export interface Cart_Item {
    src:string
    available:number
    link:string
    srcset:string
    title:string
    productId:string
    quantity:number,
    priceDetail:{
        size:string|null,
        frame:string|null,
        price:string|number,
        family:string|null
    },
    discount:string|number|null
}


export interface Cart_Store {
    cart:Cart_Item[] | [],
    totalPrice:number
}





////////////////////////////////// search store
export interface Search_Store {
    navbarSearchResult:{collection:null|Collection_Item[],product:null|Product_Item[]},
    navbarSearchFlag:boolean,
    mainSearchResult:any[],
    mainSearchFlag:boolean
}




///////////////////////// collection list types
export interface Collection_Item {
    'link/name':string
    'link/params/name':string
    src:string
    srcset:string
    text:string
}


///////////////////////// product item
export interface Product_Item {
    id:string
    title:string
    isSoldOut:boolean
    isPeriod:boolean
    price:number
    link:{
        name:string,
        params:{
            name:string
        }
    }
    coverSrc:string
    coverSrcset:string
    overlaySrc:string
    overlaySrcset:string
    category?:string
}