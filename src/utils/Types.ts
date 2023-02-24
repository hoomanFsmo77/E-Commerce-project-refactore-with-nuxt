
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
    navbarSearchResult:{collection:string},
    navbarSearchFlag:boolean,
    mainSearchResult:any[],
    mainSearchFlag:boolean
}