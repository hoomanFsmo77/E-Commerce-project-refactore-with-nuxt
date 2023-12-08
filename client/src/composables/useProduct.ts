import {useProductStore} from "~/composables/useStore";
import {useCartStore} from "~/composables/useStore";
import {Cart_Item} from "~/utils/Types";
import { useToast } from 'vue-toastification'

export const useProduct= (carousel:any)=>{
    const toast = useToast()
    const {productStore,productData,popularProductFetchFlag}=useProductStore()
    const {cartStore,getProductConfig}=useCartStore()
    const route=useRoute()
    const helperData=reactive({
        quantity:cartStore.getProductQuantity(route.params.name as string) as number,
        sizeIndex:0 as number,
        familyIndex:0 as number,
        whichFrame:0 as number,
        reset(){
            this.quantity=1
            this.sizeIndex=productData.value?.option.sizes?.findIndex(item=>item.available) || 0
            this.familyIndex=productData.value?.option.family?.findIndex(item=>item.available) || 0
            this.whichFrame=0
        },
        get config(){
            return {
                size:this.sizeIndex,
                frame:this.familyIndex,
                family:this.whichFrame,
                price:this.whichFrame===0 ? totalPriceWithOutFrame.value : totalPriceWithFrame.value
            }
        }
    })

    const totalPriceWithFrame=computed<number|string>(()=>{
        if(productData.value && productData.value.option.sizes){
            const finalPrice=productData.value?.discount ? (productData.value.option.sizes[helperData.sizeIndex].frame ? (productData.value.option.sizes[helperData.sizeIndex].price + productData.value.option.sizes[helperData.sizeIndex].frame.price).toFixed(2) :  Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) ?? Number(productData.value?.discount).toFixed(2)) :productData.value.option.sizes[helperData.sizeIndex].frame ? (productData.value.option.sizes[helperData.sizeIndex].price + productData.value.option.sizes[helperData.sizeIndex].frame.price).toFixed(2) :  Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) ?? Number(productData.value.price).toFixed(2)
            return Number(finalPrice) * helperData.quantity
        }else{
            return 0
        }
    });
    /////////////////////////////////////////////
    const totalPriceWithOutFrame=computed<number|string>(()=>{
        if(productData.value){
            if(helperData.sizeIndex>-1){
                const finalPrice:any=productData.value?.discount ? (Number(productData.value?.discount).toFixed(2)) : (productData.value?.option?.sizes ? Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) : Number(productData.value.price).toFixed(2));
                return  Number(finalPrice)* helperData.quantity
            }else{
                return  productData.value?.discount ? Number(productData.value?.discount) * helperData.quantity : Number(productData.value.price) * helperData.quantity
            }
        }else{
            return 0
        }
    })

    const changeSize =async (target:{available:number,size:string},index:number) => {
        try {
            if(target.available && userProductDetail.value){
                userProductDetail.value.priceDetail.size=target.size
                helperData.sizeIndex=index
                helperData.whichFrame=0
                await cartStore.changeProductConfig(route.params.name as string,helperData.config)
            }
        }catch (e) {
            console.log(e)
        }

    }
    const increment =async () => {
        const increaseRequest=await cartStore.increaseProductQuantity(route.params.name as string);
        if(!increaseRequest){
            helperData.quantity++
            if(productData.value && helperData.quantity>productData.value.available){
                helperData.quantity=productData?.value.available
            }
        }
    }
    const decrement = async () => {
        const decreaseRequest=await cartStore.decreaseProductQuantity(route.params.name as string)
        if(!decreaseRequest){
            helperData.quantity--
            if(helperData.quantity<1){
                helperData.quantity=1
            }
        }
    }


    const userProductDetail=computed<Cart_Item|null>(()=>{
        if(productData.value){
            return{
                productLink:route.params.name as string,
                quantity:helperData.quantity,
                priceDetail:{
                    size:productData.value?.option?.sizes ? productData.value.option.sizes[helperData.sizeIndex].size : null,
                    frame:productData.value.hasFrame ? (helperData.whichFrame===0 ? 'No frame' : 'Recycled Timber Frame') : null,
                    price:helperData.whichFrame===0 ? totalPriceWithOutFrame.value : totalPriceWithFrame.value,
                    family:(productData.value.hasFamily && productData.value.option.family) ? (productData.value.option.family[helperData.familyIndex].item) : null
                }
            }
        }else{
            return  null
        }

    })
    const addToCart = () => {
        if(userProductDetail.value && productData.value){
            if(cartStore.isProductInCart(route.params.name)){
                cartStore.removeProductCart(route.params.name);
                helperData.reset()
            }else{
                if(productData.value?.available > helperData.quantity){
                    cartStore.addToUserCart({
                        productLink:route.params.name,
                        quantity:helperData.quantity,
                        priceDetail:helperData.config,
                    })
                }else{
                    toast.error(`Maximum available quantity is ${productData.value.available}!`)
                }
            }
        }
    }
    const setSelectedSize = computed(():void => {
        if(popularProductFetchFlag.value && productData.value && productData.value.option.sizes){
            helperData.sizeIndex=productData.value.option.sizes.findIndex(item=>item.available)
        }
    })


    onMounted(async ()=>{
       await productStore.triggerFetchProductDetail(route.params.name)
        helperData.sizeIndex=cartStore.getProductConfig(route.params.name as string).size
        helperData.familyIndex=cartStore.getProductConfig(route.params.name as string).family
        helperData.whichFrame=cartStore.getProductConfig(route.params.name as string).frame
    })


    const changeFrame = async (index:number) => {
        try {
            carousel.value.slideTo(index)
            helperData.whichFrame=index
            await cartStore.changeProductConfig(route.params.name as string,helperData.config)
        }catch (e) {
            console.log(e)
        }
    }
    const changeFamily=async (imageIndex:number,itemIndex:number)=>{
        try {
            carousel.value.slideTo(imageIndex)
            helperData.familyIndex=itemIndex
            await cartStore.changeProductConfig(route.params.name as string,helperData.config)
        }catch (e) {
            console.log(e)
        }

    }




    return {
        changeSize,increment,decrement,addToCart,
        changeFrame,totalPriceWithFrame,totalPriceWithOutFrame,changeFamily,setSelectedSize,helperData
    }
}