import {defineStore} from "pinia";
import {Cart_Store,Cart_Item} from "~/utils/Types";
import {getData,storeData} from "~/utils/Helper";
import { useToast } from 'vue-toastification'
const toast = useToast()


export const Cart=defineStore('cart',{
    state:():Cart_Store=>{
        return {
            cart:[],
            totalPrice: 0
        }
    },
    getters:{
        cartLength(state){
            return state.cart.length
        },
        getTotalPrice(state){
            return state.totalPrice.toFixed(2)
        },
        getProductPrice:(state)=>(id:string)=>{
            let target:Cart_Item=state.cart.filter(item=>item.productId===id)[0]
            return (Number(target.priceDetail.price) * target.quantity).toFixed(2)
        },
        getCart(state){
            return state.cart
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
            storeData('_x_brentos_cart_',{
                cart:this.cart,
                totalPrice:this.totalPrice
            })
        },
        increaseProductQuantity(id:string,value:number){
            this.cart[this.cart.findIndex(item=>item.productId===id)].quantity=value
            this.calculateTotalPrice()
        },
        decreaseProductQuantity(id:string,value:number){
            this.cart[this.cart.findIndex(item=>item.productId===id)].quantity=value
            this.calculateTotalPrice()

        },
        removeProductCart(id:string){
            this.cart.splice(this.cart.findIndex(item=>item.productId===id),1)
            this.calculateTotalPrice()
        },
        resetCart(){
            this.cart=[]
            this.totalPrice=0
            storeData('_x_brentos_cart_',{
                cart:[],
                totalPrice:0
            })
        }
    },

    hydrate(state) {
        state.cart=getData('_x_brentos_cart_')?.cart ?? []
        state.totalPrice=getData('_x_brentos_cart_')?.totalPrice ?? 0
    }


})