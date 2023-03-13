

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
    const {productStore}=useProductStore()
    const {cartStore}=useCartStore()
    const {$link}=useNuxtApp()
    const addToCartFlag=ref<boolean>(false)
    const isLoading=ref<boolean>(true)
    const isModalActive=ref<boolean>(false)
    const discountPercent=computed<number|undefined>(()=>props.discount && Math.ceil((1-(props.discount / props.price))*100))

    const toggleModal = () => {
        isModalActive.value=!isModalActive.value
        if(process.client){
            document.body.style.overflow=isModalActive.value ? 'hidden' : 'auto'
        }
        if(isModalActive.value){
            productStore.triggerFetchProductDetail(props.id)
        }
    }
    const closeModal = (e:boolean) => {
        isModalActive.value=e
        productStore.$patch({productDetailFetchFlag:false, productDetail:null})
        if(process.client){
            document.body.style.overflow=isModalActive.value ? 'hidden' : 'auto'
        }
    }
    const imageLoad = () => {
        isLoading.value=false
    }

    const addToCart = async () => {
        const token=useState<string>('x_token_x')
        addToCartFlag.value=true
        try {
            const data=await $fetch<Product_Item>(`/api/product/${props.id}`,{headers:{'Authentication':token.value}})
            cartStore.addToUserCart({
                        src:data.gallery[0].src,
                        available:data.available,
                        link:$link(props.link,props.id,props.category),
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
        }catch (err) {
            console.log(err)
        }finally {
            addToCartFlag.value=false
        }
    }

    return {discountPercent,toggleModal,closeModal,isModalActive,isLoading,imageLoad,addToCart,addToCartFlag}
}