// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import {useCheckoutStore} from "../store/checkout.js";
// import {useCartStore} from "../store/Cart.js";
// import {computed, onMounted} from "vue";
// import { useRouter} from "vue-router";
// import {getCookie,removeCookie} from "./useHelper.js";


export const useCheckoutSummaryModal= ()=>{
    const backToHome = () => {

    }

    const  downloadPdf = () => {

    }

//     const router=useRouter()
//     const cartStore=useCartStore()
//     const checkoutStore=useCheckoutStore()
//
//     const backToHome = () => {
//         let cookieId=getCookie('checkout_token').id
//         let cookieHash=getCookie('checkout_token').hash
//         router.push({
//             name:'HOME'
//         })
//         cartStore.resetCart()
//         checkoutStore.resetCheckout()
//         removeCookie('secure_session_id',30,'/')
//         removeCookie('checkout_token',30,'/')
//         removeCookie('checkout',30,`/${cookieId}/checkout/${cookieHash}`)
//         removeCookie('tracked_start_session',30,`/${cookieId}`)
//     }
//     const downloadPdf = () => {
//         let cookieId=getCookie('checkout_token').id
//         let cookieHash=getCookie('checkout_token').hash
//         router.push({
//             name:'ORDER_SUMMARY',
//             params:{
//                 id:cookieId,
//                 token:cookieHash
//             }
//         })
//     }
//
//
//     return{
//         backToHome,
//         downloadPdf,
//
//     }
// }
// export const useCheckoutSummary=()=>{
//     let cookieId=getCookie('checkout_token').id
//     let cookieHash=getCookie('checkout_token').hash
//
//
//     const router=useRouter()
//     const checkoutStore=useCheckoutStore()
//     const allInformation=computed(()=>checkoutStore.getAllInformation)
//
//     const cartStore=useCartStore()
//     const cartList=computed(()=>cartStore.getCart)
//     const totalPrice=computed(()=>cartStore.getTotalPrice)
//
//     onMounted(()=>{
//
//         if(cookieHash || cookieId){
//             let w = document.getElementById("pdfTemplate").offsetWidth;
//             let h = document.getElementById("pdfTemplate").offsetHeight;
//             html2canvas(document.getElementById('pdfTemplate'),{
//                 dpi: 144,scale: 2
//             }).then(canvas=>{
//                 let img = canvas.toDataURL("image/jpeg", 10000);
//                 let doc = new jsPDF('l', 'px', [w, h]);
//                 doc.addImage(img, 'JPEG', 0, 0, w, h)
//                 doc.save('order-summary.pdf');
//                 removeCookie('secure_session_id',30,'/')
//                 removeCookie('checkout_token',30,'/')
//                 removeCookie('checkout',30,`/${cookieId}/checkout/${cookieHash}`)
//                 removeCookie('tracked_start_session',30,`/${cookieId}`)
//             })
//         }else{
//             router.push({name:'CART'})
//             cartStore.resetCart()
//             checkoutStore.resetCheckout()
//         }
//
//     })
//
//     const calculateShippingAddress=computed(()=>{
//         return `${allInformation?.value?.contact?.address?.value}, ${allInformation?.value?.contact?.city.value}, ${allInformation?.value?.contact?.state?.value?.code} ${allInformation?.value?.contact?.zip?.value}, ${allInformation?.value?.contact?.country?.value?.name}`
//     })




    return{
        backToHome,
        downloadPdf
    }
}