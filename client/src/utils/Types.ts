

////////////////////////////////// cart store
export interface Cart_Item {
    productLink:string
    quantity:number,
    priceDetail:{
        size:string|null,
        frame:string|null,
        price:number|string,
        family:string|null
    }
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
///////////////////////////////////// collection store
export interface Collection_Store {
    collections:Collection_Item[],
    fetchFlag:boolean,
}
////////////////////////////////////// product store
export interface Product_Store {
    productListData:Product_Item[],
    productListFetchFlag:boolean,
    productListErrorFlag:boolean,

    popularProduct:Product_Item[],
    popularFetchFlag:boolean,

    productDetail:Product_Item | null,
    productDetailFetchFlag:boolean
}


///////////////////////// collection list types
export interface Collection_Item {
    link:Link
    src:string
    srcset:string
    text:string
}


///////////////////////// product item
export interface Product_Item {
    gallery:{
        src:string
        srcset:string
        zoom:string
    }[]
    id:string
    title:string
    available:number
    description:{content:string}[]
    hasFrame:boolean
    option:{
        sizes?:{
            size:string
            price:number
            available:boolean
            frame:{
                price:number
                available:number
            }
        }[]
        family?:{
            item:string
            index:number
            available:boolean
        }[]
    }
    price:number|string
    link:{
        facebook:string
        twitter:string
        pinterest:string
    }
    isSoldOut:boolean
    discount:number|null
    isPeriod:boolean|null
    category?:string
    coverSrc?:string
    coverSrcset?:string
    overlaySrc?:string
    overlaySrcset?:string,
    hasFamily?:boolean
}


export type Link={
    name:string,
    params:{
        name:string
    }
}
export interface Ex_Link {
    name:string,
    params:{
        name:string
    }
    query:{id:string},
    hash:string
}

////////////// recent work type
export interface Recent_Work {
    link:Link & {
        query:{id:string},
        hash:string
    }
    title:string
    subTitle:string
    src:string
    srcset:string
}

//////////////// insta feed types
export interface Instagram_Feed {
    src:string
    content:string
    date:string
    link:string
}

/////// checkout store
export interface Checkout_Store {
    userInfo:{
        contact:User_Information|null,
        shipping:Shipping_Method|null,
        cart:UserCartInfo|null,
        rememberMe:string|null
    }
}

export interface Shipping_Method {
    id:number,
    name:string,
    time:string,
    price:number
}
///// user info
export interface User_Information {
    address:string
    addressType:string|undefined
    city:string
    contactInfo:string
    country:string
    firstname:string
    lastname:string
    news:boolean
    state:string
    zip:string
}

export interface UserCartInfo {
    cardNumber:{
        value:string,
        valid:boolean
    }
    cardName:{
        value:string,
        valid:boolean
    }
    expireDay:{
        value:string,
        valid:boolean
    }
    securityCode:{
        value:string,
        valid:boolean
    }
}