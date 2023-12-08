import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {useCheckoutStore} from "~/composables/useStore";
import {useCartStore} from "~/composables/useStore";

export const useCheckoutSummaryModal= ()=> {
    const token = useState<string>('x_token_x')
    const {checkoutStore} = useCheckoutStore()
    const {cartStore} = useCartStore()

    const backToHome = async () => {
        try {
            const data = await $fetch('/api/checkout/finish', {
                headers: {'Authentication': token.value},
                method: 'POST'
            })
            checkoutStore.resetCheckout()
            cartStore.resetCart()
            return navigateTo('/')
        } catch (err) {
            console.log(err)
        }
    }

    const downloadPdf = async () => {
        try {
            const data = await $fetch('/api/checkout/summary', {
                headers: {'Authentication': token.value},
                method: 'POST'
            })
            return navigateTo(data)
        } catch (err) {
            console.log(err)
        }
    }

    return{
        backToHome,
        downloadPdf
    }
}
export const useCheckoutSummary=()=>{
    const token = useState<string>('x_token_x')
    onMounted(()=>{
        if(process.client){
            const w = document.getElementById("pdfTemplate")!.offsetWidth;
            const h = document.getElementById("pdfTemplate")!.offsetHeight;
            html2canvas(document.getElementById('pdfTemplate')!,{
                // @ts-ignore
                dpi: 144,scale: 2
            }).then(async canvas=>{
                const img = canvas.toDataURL("image/jpeg", 10000);
                const doc = new jsPDF('l', 'px', [w, h]);
                doc.addImage(img, 'JPEG', 0, 0, w, h)
                doc.save('order-summary.pdf');
                try {
                    const data = await $fetch('/api/checkout/finish', {
                        headers: {'Authentication': token.value},
                        method: 'POST'
                    })
                }catch (err) {
                    console.log(err)
                }
            })
        }

    })


}