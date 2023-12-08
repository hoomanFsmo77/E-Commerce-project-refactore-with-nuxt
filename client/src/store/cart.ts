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
        getProductPrice:(state)=>(link:string)=>{
            let target:Cart_Item=state.cart.filter(item=>item.productLink===link)[0]
            return (Number(target.priceDetail.price) * target.quantity).toFixed(2)
        },
        getCart(state){
            return state.cart
        },
        isProductInCart:(state)=>(link:string)=>{
            return state.cart.some(item=>item.productLink===link)
        },
        getProductQuantity:(state)=>(link:string)=>{
            return state.cart.filter(item=>item.productLink===link)[0]?.quantity || 1
        },
        getProductConfig:state => (link:string):{size:number,frame:number,family:number}=>{
            return state.cart.filter(item=>item.productLink===link)[0]?.priceDetail
        }
    },
    actions:{
        async fetchCartData(){
            const token=useState<string>('x_token_x');
            const uid=localStorage.getItem('cart_uid');
            try{
                const req=await $fetch<{items:Cart_Item[],total:number}>('/api/product',{
                    method:'POST',
                    query:{uid,method:'GET'},
                    headers:{'Authentication':token.value},
                })
                this.cart=req?.items || []
                this.totalPrice=req?.total || 0
            }catch (err) {
                console.log(err)
            }
        },
        async addToUserCart(product:Cart_Item){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                const req=await $fetch<string|null>('/api/product',{
                    method:'POST',
                    query:{
                        method:'POST',
                        uid:uid || null
                    },
                    headers:{'Authentication':token.value},
                    body:product
                })
                req ? localStorage.setItem('cart_uid',req) : null;
                toast.success("Product added to your cart!")
                this.fetchCartData()
            }catch (err) {
                toast.success("Something went wrong! please try again.")
            }
        },
        async increaseProductQuantity(link:string){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                const req=await $fetch<{error:boolean,msg:string|null}>('/api/product',{
                    method:'POST',
                    query:{
                        method:'PUT',
                        uid:uid || null,
                        mode:'increment',
                        productLink:link
                    },
                    headers:{'Authentication':token.value},
                })
                req.error ? toast.error(req.msg) : toast.success(req.msg);
                this.fetchCartData()
                return req.error;
            }catch (err) {
                toast.success("Something went wrong! please try again.");
                return true;
            }
        },
        async decreaseProductQuantity(link:string){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                const req=await $fetch<{error:boolean,msg:null|string}>('/api/product',{
                    method:'POST',
                    query:{
                        method:'PUT',
                        uid:uid || null,
                        mode:'decrement',
                        productLink:link
                    },
                    headers:{'Authentication':token.value},
                })
                req.error ? toast.error(req.msg) : toast.success(req.msg);
                this.fetchCartData()
                return req.error;
            }catch (err) {
                toast.success("Something went wrong! please try again.")
                return true;
            }
        },
        async changeProductConfig(link:string,config:any){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                const req=await $fetch<{error:boolean,msg:null|string}>('/api/product',{
                    method:'POST',
                    query:{
                        method:'PUT',
                        uid:uid || null,
                        mode:'config',
                        productLink:link
                    },
                    body:config,
                    headers:{'Authentication':token.value},
                })
                req.error ? toast.error(req.msg) : toast.success(req.msg);
                this.fetchCartData()
            }catch (err) {
                toast.success("Something went wrong! please try again.")
                return true;
            }
        },
        async removeProductCart(link:string){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                await $fetch<{error:boolean,msg:null|string}>('/api/product',{
                    method:'POST',
                    query:{
                        method:'PUT',
                        uid:uid || null,
                        mode:'remove',
                        productLink:link
                    },
                    headers:{'Authentication':token.value},
                })
                toast.success('product removed!');
                this.fetchCartData();
            }catch (err) {
                toast.success("Something went wrong! please try again.")
                return true;
            }
        },
        async resetCart(){
            const token=useState<string>('x_token_x')
            const uid=localStorage.getItem('cart_uid')
            try{
                await $fetch<{error:boolean,msg:null|string}>('/api/product',{
                    method:'POST',
                    query:{
                        method:'PUT',
                        uid:uid || null,
                        mode:'reset',
                    },
                    headers:{'Authentication':token.value},
                })
                toast.success('cart reset!');
                localStorage.removeItem('cart_uid');
                this.fetchCartData();
            }catch (err) {
                toast.success("Something went wrong! please try again.")
                return true;
            }
        }
    }
})