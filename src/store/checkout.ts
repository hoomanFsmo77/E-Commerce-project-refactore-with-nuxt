import {defineStore} from "pinia";
import {Checkout_Store, Shipping_Method, User_Information} from "~/utils/Types";
import {storeData,getData} from "~/utils/Helper";

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
        getUserInformationContact(state):User_Information|null{
            if(state.userInfo.contact){
                return state.userInfo.contact
            }else{
                return null
            }
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
    actions:{
        setUserInformationContact(userInfo:User_Information){
            this.userInfo.contact=userInfo
            storeData('_brentos_checkout_',this.userInfo)
        },
        setUserStoredInformation(){
            const storedData=getData<Checkout_Store['userInfo']>('_brentos_checkout_')
            this.userInfo.contact=storedData?.contact ?? null
            this.userInfo.card=storedData?.card ?? null
            this.userInfo.shipping=storedData?.shipping ?? null
            this.userInfo.rememberMe=storedData?.rememberMe ?? null
        },
        setUserInformationShipping(data:Shipping_Method){
            this.userInfo.shipping=data
            storeData('_brentos_checkout_',this.userInfo)
        },
    },

})