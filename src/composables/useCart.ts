import {Link,Cart_Item} from "~/utils/Types";
import {useCartStore} from "~/composables/useStore";
import {useToast} from "vue-toastification";
import {makeRandomHash,generateRandomNumber} from '~/utils/Helper'
interface Props {
    src:string
    srcset:string
    title:string
    param:string
    productId:string
    category:string
    quantity:number
    priceDetail:Cart_Item['priceDetail']
    discount:string
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

    const goToCheckout = () => {
        const cookie=process.client ? document.cookie.includes('secure_session_id') : null
        if(cartLength.value>0){
            if(cookie){
                // let id=getCookie('checkout_token').id
                // let hash=getCookie('checkout_token').hash
                // navigateTo(`/${id}/checkout/information/${hash}`)

            }else{
                let hash=makeRandomHash(20)
                let id=generateRandomNumber()
                let randomHashUrl=makeRandomHash(15)
                // setCookie('secure_session_id',makeRandomHash(10),`/`,30)
                // setCookie('checkout_token', JSON.stringify({id:id,hash:randomHashUrl}),`/`,30)
                // setCookie('checkout',hash,`/${id}/checkout/${randomHashUrl}`,30)
                // setCookie('tracked_start_session',randomHashUrl,`/${id}`,30)
                navigateTo(`/${id}/checkout/information/${randomHashUrl}`)

            }
        }else{
            toast.error(`There is no item in your cart!`)
        }
    }



    return{
            goToCheckout
    }
}