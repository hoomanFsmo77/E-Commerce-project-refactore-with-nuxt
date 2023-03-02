import {defineStore} from "pinia";
import {Cart_Store,Cart_Item} from "~/utils/Types";
import {getData} from "~/utils/Helper";
import { useToast } from 'vue-toastification'
const toast = useToast()


export const Cart=defineStore('cart',{
    state:():Cart_Store=>{
        return {
            cart:getData()?.cart ?? [],
            totalPrice:getData()?.totalPrice ?? 0
        }
    },
    getters:{
        cartLength(state){
            return state.cart.length
        },
        getTotalPrice(state){
            return state.totalPrice.toFixed(2)
        },
    },
    actions:{
        addToUserCart(product:Cart_Item){
            let productIsExist=this.cart.some(item=>item.title===product.title)
            let target=this.cart[this.cart.findIndex(item=>item.title===product.title)]
            if(productIsExist){
                if( target.available > target.quantity){
                    target.quantity++
                    toast.success("Product added to your cart!")
                }else{
                    toast.error(`Maximum available quantity is ${target.quantity}!`)
                }

            }else {
                // @ts-ignore
                this.cart.push(product)
                toast.success("Product added to your cart!")
            }
            this.calculateTotalPrice()
        },
        calculateTotalPrice(){
            let total=0
            this.cart.forEach(item=>{
                total+=Number(item.priceDetail.price)* item.quantity
            })
            this.totalPrice=total
            storeData({
                cart:this.cart,
                totalPrice:this.totalPrice
            })
        },
    }


})