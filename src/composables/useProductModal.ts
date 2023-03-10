
import {useCartStore,useProductStore} from "~/composables/useStore";
import {Cart_Item} from "~/utils/Types";

interface Props {
    id:string
    category:string
    link:{
        name:string,
        params:{
            name:string
        }
    }
}

export default (carousel:any,props:Props)=>{
    const {productDetailFlag,productData}=useProductStore()
    const {cartStore}=useCartStore()
    const route=useRoute()

    // const productId=ref(props.id)
    // const quantity=ref(1)
    // const sizeIndex=ref(0)
    // const familyIndex=ref(0)
    // const whichFrame=ref(0)
    const helperData=reactive({
        productId:props.id as string,
        quantity:1 as number,
        sizeIndex:0 as number,
        familyIndex:0 as number,
        whichFrame:0 as number
    })
    
    const totalPriceWithFrame=computed<number|string>(()=>{
        if(productData.value && productData.value.option.sizes){
            return productData.value.option.sizes[helperData.sizeIndex].frame ? (productData.value.option.sizes[helperData.sizeIndex].price + productData.value.option.sizes[helperData.sizeIndex].frame.price).toFixed(2) :  Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) ?? Number(productData.value.price).toFixed(2)
        }else{
            return 0
        }
    });

    

    const totalPriceWithOutFrame=computed<number|string>(()=>{
        if(productData.value){
            return productData.value?.option?.sizes ? Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) : Number(productData.value.price).toFixed(2)
        }else{
            return  0
        }
    })


    const changeSize = (target:{available:number,size:string},index:number) => {
        if(target.available && userProductDetail.value){
            userProductDetail.value.priceDetail.size=target.size
            helperData.sizeIndex=index
            helperData.whichFrame=0
        }
    }
    const increment = () => {
        helperData.quantity++
        if(productData.value && helperData.quantity>productData.value.available){
            helperData.quantity=productData?.value.available
        }
        
    }
    const decrement = () => {
        helperData.quantity--
        if(helperData.quantity<1){
            helperData.quantity=1
        }
    }
    const userProductDetail=computed<Cart_Item|null>(()=>{
        if(productData.value){
            return{
                src:productData.value.gallery[0].src,
                srcset:productData.value.gallery[0].srcset,
                available:productData.value.available,
                title:productData.value.title,
                productId:helperData.productId,
                link:props.link,
                category:props.category ?? route.params.name as string,
                quantity:helperData.quantity,
                priceDetail:{
                    size:productData.value?.option?.sizes ? productData.value.option.sizes[helperData.sizeIndex].size : null,
                    frame:productData.value.hasFrame ? (helperData.whichFrame===0 ? 'No frame' : 'Recycled Timber Frame') : null,
                    price:helperData.whichFrame===0 ? totalPriceWithOutFrame.value : totalPriceWithFrame.value,
                    family:(productData.value.hasFamily && productData.value.option.family) ? (productData.value.option.family[helperData.familyIndex].item) : null
                },
                discount:productData.value.discount || null
            }
        }else{
            return null
        }

    })

    const addToCart = () => {
        if(userProductDetail.value){
            cartStore.addToUserCart(userProductDetail.value)
        }
    }

    const changeFrame = (index:number) => {
        carousel.value.slideTo(index)
        helperData.whichFrame=index
    }
    const changeFamily=(imageIndex:number,itemIndex:number)=>{
        carousel.value.slideTo(imageIndex)
        helperData.familyIndex=itemIndex
    }
    const setSelectedSize = computed(() => {
        if(productDetailFlag.value && productData.value && productData.value.option.sizes){
            helperData.sizeIndex=productData.value.option.sizes.findIndex(item=>item.available)
        }
    })


    return {
        totalPriceWithOutFrame,totalPriceWithFrame,increment,decrement,addToCart,changeFrame,changeFamily,changeSize,setSelectedSize,helperData
    }
}