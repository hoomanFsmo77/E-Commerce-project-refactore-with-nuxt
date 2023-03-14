import {defineStore} from "pinia";
import {Checkout_Store} from "~/utils/Types";

export const Checkout=defineStore('checkout',{
    state:():Checkout_Store=>{
        return {
            userInfo:{
                contact:null,
                card:null,
                rememberMe:null,
                shipping:null
            }
        }
    },getters:{
        getAllInformation(state){
            return state.userInfo
        },
        getUserInformationContact(state){
            return state.userInfo.contact
        },
        getUserInformationShipping(state){
            return state.userInfo.shipping
        },
        getUserInformationCart(state){
            return state.userInfo.card
        },
        hasShippingMethod(state){
            return !!state.userInfo.shipping
        }
    },


})