import {defineStore} from "pinia";
import {Checkout_Store, Shipping_Method, User_Information, UserCartInfo} from "~/utils/Types";
import {storeData,getData} from "~/utils/Helper";

export const Checkout=defineStore('checkout',{
    state:():Checkout_Store=>{
        return {
            userInfo:{
                contact:null,
                cart:null,
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
            return state.userInfo.cart
        },
        hasShippingMethod(state){
            if(state.userInfo.shipping){
                return 'price' in state.userInfo.shipping
            }
        }
    },
    actions:{
        setUserInformationCart(data:UserCartInfo){
            this.userInfo.cart=data
            storeData('_brentos_checkout_',this.userInfo)
        },
        setUserInformationRemember(data:string){
            this.userInfo.rememberMe=data
            storeData('_brentos_checkout_',this.userInfo)
        },
        setUserInformationContact(userInfo:User_Information){
            this.userInfo.contact=userInfo
            storeData('_brentos_checkout_',this.userInfo)
        },
        setUserStoredInformation(){
            const storedData=getData<Checkout_Store['userInfo']>('_brentos_checkout_')
            if(storedData){
                this.userInfo.contact=storedData.contact
                this.userInfo.cart=storedData.cart
                this.userInfo.shipping=storedData.shipping
                this.userInfo.rememberMe=storedData.rememberMe
            }else{
                this.userInfo.contact={} as any
                this.userInfo.cart={} as any
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
            this.userInfo.cart=null
            this.userInfo.rememberMe=null
            storeData('_brentos_checkout_',this.userInfo)
        },
        changeAddress(data:User_Information){
            if(this.userInfo.contact){
                this.userInfo.contact.address=data.address
                this.userInfo.contact.addressType=data.addressType
                this.userInfo.contact.city=data.city
                this.userInfo.contact.country=data.country
                this.userInfo.contact.firstname=data.firstname
                this.userInfo.contact.lastname=data.lastname
                this.userInfo.contact.state=data.state
                this.userInfo.contact.zip=data.zip
            }

        }
    },

})