import {useProductStore} from "~/composables/useStore";
import {useCartStore} from "~/composables/useStore";
import {Cart_Item} from "~/utils/Types";

export const useProduct= (carousel:any)=>{
    const {productStore,productData,popularProductFetchFlag}=useProductStore()
    const {cartStore}=useCartStore()
    const route=useRoute()
    const helperData=reactive({
        productId:route.query.id as string,
        category:route.hash.slice(1),
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
    /////////////////////////////////////////////
    const totalPriceWithOutFrame=computed<number|string>(()=>{
        if(productData.value){
            if(helperData.sizeIndex>-1){
                return productData.value?.option?.sizes ? Number(productData.value.option.sizes[helperData.sizeIndex].price).toFixed(2) : Number(productData.value.price).toFixed(2)
            }else{
                return  productData.value.price
            }
        }else{
            return 0
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
                category:helperData.category,
                src:productData.value.gallery[0].src,
                available:productData.value.available,
                link:route.fullPath,
                srcset:productData.value.gallery[0].srcset,
                title:productData.value.title,
                productId:helperData.productId,
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
            return  null
        }

    })
    const addToCart = () => {
        if(userProductDetail.value){
            cartStore.addToUserCart(userProductDetail.value)
        }
    }
    const setSelectedSize = computed(():void => {
        if(popularProductFetchFlag.value && productData.value && productData.value.option.sizes){
            helperData.sizeIndex=productData.value.option.sizes.findIndex(item=>item.available)
        }
    })


    onMounted(()=>{
        productStore.triggerFetchProductDetail(helperData.productId)
    })


    const changeFrame = (index:number) => {
      carousel.value.slideTo(index)
      helperData.whichFrame=index
    }
    const changeFamily=(imageIndex:number,itemIndex:number)=>{
        carousel.value.slideTo(imageIndex)
        helperData.familyIndex=itemIndex
    }




    return {
        changeSize,increment,decrement,addToCart,
        changeFrame,totalPriceWithFrame,totalPriceWithOutFrame,changeFamily,setSelectedSize,helperData
    }
}