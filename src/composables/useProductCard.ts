

import {Product_Item} from "~/utils/Types";
import {useProductStore,useCartStore} from "~/composables/useStore";
interface Props {
    id:string
    title:string
    isSoldOut:boolean
    isPeriod:boolean
    price:number
    link:Link
    coverSrc:string
    coverSrcset:string
    overlaySrc:string
    overlaySrcset:string
    category?:string
    discount?:number
}
type Link={
    name:string,
    params:{
        name:string
    }
}

export default (props:Props)=>{
    const route=useRoute()
    const {productStore}=useProductStore()
    const {cartStore}=useCartStore()


    const addToCartFlag=useState<boolean>('addToCartFlag',()=>false)
    let isLoading=ref<boolean>(true)
    let isActive=ref<boolean>(false)

    const productIdState=useState<string>('productIdState')
    const productCategoryState=useState<string>('productCategoryState')

    let discountPercent=computed<number|undefined>(()=>props.discount && Math.ceil((1-(props.discount / props.price))*100))



    const productLink=computed<string>(()=>{
        if(props.link.name==='Product-Item-name'){
            return `/Product/Item/${props.link.params.name}`
        }else{
            return `/Product/Art/${props.link.params.name}`
        }
    })

    const saveProductState = () => {
        productIdState.value=props.id
        productCategoryState.value=props.category as string
    }



    const toggleModal = () => {
        isActive.value=!isActive.value
        document.body.style.overflow=isActive.value ? 'hidden' : 'auto'
        if(isActive.value){
            // productStore.fetchProductDetail(props.id)
        }
    }
    const closeModal = (e:boolean) => {
        isActive.value=e
        document.body.style.overflow=isActive.value ? 'hidden' : 'auto'
    }
    const imageLoad = () => {
        isLoading.value=false
    }

    const addToCart = async () => {
        const token=useState<string>('x_token_x')
        const {public:{apiBase}}=useRuntimeConfig()
        addToCartFlag.value=true
        try {
            const data=await $fetch<Product_Item>(apiBase + `product/productDetailData/${props.id}.json`,{headers:{'Authentication':token.value}})
            cartStore.addToUserCart({
                src:data.gallery[0].src,
                available:data.available,
                link:productLink.value,
                srcset:data.gallery[0].srcset,
                title:data.title,
                productId:props.id,
                quantity:1,
                priceDetail:{
                    size: null,
                    frame: null,
                    price:data.price,
                    family: null
                },
                discount:data.discount || null,
                category:undefined
            })
            addToCartFlag.value=false
        }catch (err) {
            console.log(err)
        }

    }

    return {discountPercent,toggleModal,closeModal,isActive,isLoading,imageLoad,addToCart,saveProductState,addToCartFlag,productLink}
}