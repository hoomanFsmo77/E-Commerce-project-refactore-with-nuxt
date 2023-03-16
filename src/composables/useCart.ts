import {Link,Cart_Item} from "~/utils/Types";
import {useCartStore} from "~/composables/useStore";
import {useToast} from "vue-toastification";
import {RouteLocationRaw} from "vue-router";
interface Props {
    src:string
    srcset:string
    title:string
    param:string
    productId:string
    category:string
    quantity:number
    priceDetail:Cart_Item['priceDetail']
    discount:number
    link:Link|string
    available:number
}


export const useCartItem=(props:Props)=>{
    const {cartStore}=useCartStore()
    const productQuantity=ref<number>(props.quantity)
    const productPrice=computed(()=>cartStore.getProductPrice(props.productId))
    let productLink=computed<string>(()=>{
        if(typeof props.link==='string'){
            return props.link
        }else{
            return `/Products/Art/${props.link.params.name}?id=${props.productId}#${props.category}`
        }
    })

    const decrement = () => {
        productQuantity.value--
        if(productQuantity.value<1){
            productQuantity.value=1
        }
        cartStore.decreaseProductQuantity(props.productId,productQuantity.value)
    }

    const increment = () => {
        productQuantity.value++
        if(productQuantity.value>props.available){
            productQuantity.value=props.available
        }
        cartStore.increaseProductQuantity(props.productId,productQuantity.value)
    }

    const removeProduct = () => {
        cartStore.removeProductCart(props.productId)
    }



    return{
        productLink,decrement,increment,productQuantity,removeProduct,productPrice
    }
}


export const useCart=()=>{
    const {cartLength}=useCartStore()

    const toast = useToast()

    const goToCheckout = async () => {
        const token=useState<string>('x_token_x')
        if(cartLength.value>0){
            try {
                const informationLink=await $fetch<RouteLocationRaw>('/api/cart',
                    {method:'POST',headers:{'Authentication':token.value}})
                navigateTo(informationLink)
            }catch (err) {
                console.log(err)
            }
        }else{
            toast.error(`There is no item in your cart!`)
        }
    }

    return{
            goToCheckout
    }
}