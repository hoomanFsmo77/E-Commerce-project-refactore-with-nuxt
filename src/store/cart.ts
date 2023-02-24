import {defineStore} from "pinia";
import {Cart_Store} from "~/utils/Types";
import {getData} from "~/utils/Helper";

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
    }


})