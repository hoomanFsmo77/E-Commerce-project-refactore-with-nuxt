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
            if(state.userInfo.shipping){
                return 'price' in state.userInfo.shipping
            }
        }
    },
    actions:{
        setUserInformationContact(userInfo:User_Information){
            this.userInfo.contact=userInfo
            storeData('_brentos_checkout_',this.userInfo)
        },
        setUserStoredInformation(){
            const storedData=getData<Checkout_Store['userInfo']>('_brentos_checkout_')
            if(storedData){
                this.userInfo.contact=storedData.contact
                this.userInfo.card=storedData.card
                this.userInfo.shipping=storedData.shipping
                this.userInfo.rememberMe=storedData.rememberMe
            }else{
                this.userInfo.contact={} as any
                this.userInfo.card={} as any
                this.userInfo.shipping={} as any
                this.userInfo.rememberMe={} as any
            }

        },
        setUserInformationShipping(data:Shipping_Method){
            this.userInfo.shipping=data
            storeData('_brentos_checkout_',this.userInfo)
        },
        resetCheckout(){
            this.userInfo.contact=null
            this.userInfo.shipping=null
            this.userInfo.card=null
            this.userInfo.rememberMe=null
            storeData('_brentos_checkout_',this.userInfo)
        }
    },

})