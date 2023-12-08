

import {Product_Item} from "~/utils/Types";
import {useProductStore,useCartStore} from "~/composables/useStore";
interface Props {
    id:string
    title:string
    isSoldOut:boolean
    isPeriod:boolean
    price:number
    link:string
    coverSrc:string
    overlaySrc:string
    category?:string
    discount?:number
}


export const useProductCard = (props:Props)=>{
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
            productStore.triggerFetchProductDetail(props.link)
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
        addToCartFlag.value=true
        try {
            await cartStore.addToUserCart({productLink:props.link})
            addToCartFlag.value=false
        }catch (e) {
            console.log(e)
        }

    }

    return {discountPercent,toggleModal,closeModal,isModalActive,isLoading,imageLoad,addToCart,addToCartFlag}
}