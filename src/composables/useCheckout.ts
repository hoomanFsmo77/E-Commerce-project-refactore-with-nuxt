import {Regex} from "~/utils/Helper";
import {User_Information, Shipping_Method, UserCartInfo} from "~/utils/Types";

export const useCheckout=()=>{
    const isCollapse=useState<boolean>('isCollapse',()=>false)
    const token=useState<string>('x_token_x')
    //// modal
    const isOpenModal=ref<boolean>(false)
    const modalTarget=useState<string>('modalTarget',()=>'')
    const policyData=useState<any[]>('policyData',()=>[])
    const fetchFlag=ref<boolean>(false)

    ////
    const openModal = async (target:string) => {
        isOpenModal.value=!isOpenModal.value
        modalTarget.value=target
        policyData.value=[]
        fetchFlag.value=true
        try {
            const data=await $fetch(`/api/policy/${target}`,{headers:{'Authentication':token.value}})
            fetchFlag.value=false
            policyData.value=data
        }catch (err) {
            console.log(err)
        }

    }
    const closeModal =(e:boolean) => {
        isOpenModal.value=e
    }

    return{
        isCollapse,isOpenModal,modalTarget,policyData,fetchFlag,openModal,closeModal
    }
}
export const useInformation=()=>{
    const {stateData,selectState,countryFlag,countryData}=useCountry()
    const {checkoutStore,userInformationContact}=useCheckoutStore()
    const token=useState<string>('x_token_x')
    const isAlertActive=useState<boolean>('isAlertActive',()=>false)
    const formElement = ref<any>(null)
    const isContactNumber=useState<boolean>('isContactNumber',()=>false)

    function contactRule  (node:any)  {
        const value=node.value
        isContactNumber.value = !isNaN(value[0]);
        if(Regex.phone.test(value)){return  true}else return Regex.email.test(value);
    }

    onMounted(async ()=>{
        isAlertActive.value=true
    })
    watch(
        ()=>countryFlag.value,
        async ()=>{
            await selectState(null,userInformationContact?.value?.country ?? 'Afghanistan')
        }
    )

    const closeAlertModal = (e:boolean) => {
        isAlertActive.value=e
    }
    const submitHandler = () => {
        const node = formElement.value.node
        node.submit()
    }
    const goShipping =async (field:User_Information) => {
        try {
            const data=await $fetch('/api/checkout/shipping',{
                method:'POST',
                headers:{'Authentication':token.value}
            })
            checkoutStore.setUserInformationContact(field)
            navigateTo(data)
        }catch (err) {
            showError({
                statusCode:404,
                statusMessage:'You are not allowed to this page! try again.'
            })
        }

    }

    return{
        closeAlertModal,isAlertActive,goShipping,formElement,submitHandler,contactRule,isContactNumber,selectState,stateData
    }
}
export const useShipping=()=>{
    const token=useState<string>('x_token_x')
    const {checkoutStore,userInformationShippingStore}=useCheckoutStore()
    const methodIndex=useState<number>('methodIndex',()=> 0)
    const selectedMethod=(index:number)=>{
        methodIndex.value=index
        checkoutStore.setUserInformationShipping(shippingMethods[index])
    }

    onMounted( ()=>{
        if(userInformationShippingStore.value){
            console.log('1')
            selectedMethod(userInformationShippingStore.value.id-1)
        }else{
            selectedMethod(0)
        }
    })
    const shippingMethods:Shipping_Method[]=[
        {
            id:1,
            name:'Standard International',
            time:'6 to 27 business days',
            price:30
        }
    ]

    const goPayment = async () => {
        try {
            const data=await $fetch('/api/checkout/payment',{
                method:'POST',
                headers:{'Authentication':token.value}
            })
            return navigateTo(data)
        }catch (err) {
            showError({
                statusCode:404,
                statusMessage:'You are not allowed to this page! try again.'
            })
        }
    }




    return {
        shippingMethods,selectedMethod,methodIndex,goPayment
    }
}
export const useCheckoutLinks=()=>{
    const {userInformationContact}=useCheckoutStore()
    const token=useState<string>('x_token_x')
    const informationPageLink=useState<string>('informationPageLink',()=>'')

    const calculateShippingAddress=computed<string>(()=>{
        if(userInformationContact.value){
            return `${userInformationContact.value.address}, ${userInformationContact.value.city}, ${userInformationContact.value.state} ${userInformationContact.value.zip}, ${userInformationContact.value.country}`
        }else{
            return  ''
        }
    })

    onMounted(async ()=>{
        try {
            const data=await $fetch<string>('/api/checkout/info',{method:'POST',headers:{'Authentication':token.value}})
            informationPageLink.value=data
        }catch (err) {
            showError({
                statusCode:404,
                statusMessage:'You are not allowed to this page!'
            })
        }
    })



    return{
        calculateShippingAddress,informationPageLink
    }
}

export const usePayment=()=>{
    const {triggerStateChange}=useCountry()
    const {checkoutStore}=useCheckoutStore()
    const token=useState<string>('x_token_x')
    const shippingPageLink=useState('shippingPageLink',()=>'')
    const phoneNumber=useState<string>('phoneNumber',()=>'')
    const formElement = ref<any>(null)
    const isOpenModal=ref<boolean>(false)
    const helperInfo=reactive({
        wantRemember:false as boolean,
        wantChangeMethod:false as boolean
    })

    const userCartInfo=reactive<UserCartInfo>({
        cardNumber:{
            value:'',
            valid:false
        },
        cardName:{
            value:'',
            valid:false
        },
        expireDay:{
            value:'',
            valid:false
        },
        securityCode:{
            value:'',
            valid:false
        }
    })
    const setValue = (e:string,prop:keyof UserCartInfo) => {
        userCartInfo[prop].value=e
        userCartInfo[prop].valid=true
    }

    onMounted(async ()=>{
        try {
            const data=await $fetch('/api/checkout/shipping',{
                method:'POST',
                headers:{'Authentication':token.value}
            })
            shippingPageLink.value=data
        }catch (err) {
            showError({
                statusCode:404,
                statusMessage:'You are not allowed to this page! try again.'
            })
        }
        await triggerStateChange('af')
    })


    const finishPaymentWithoutChangeAddress = () => {
        let result:any[]=[]
        Object.entries(userCartInfo).forEach(item=>{typeof item[1]?.valid === 'boolean' && result.push(item[1]?.valid)})
        if(result.every(item=>item===true)){
            checkoutStore.setUserInformationCart(userCartInfo)
            if(helperInfo.wantRemember){
                checkoutStore.setUserInformationRemember(phoneNumber.value)
            }
            isOpenModal.value=!isOpenModal.value
        }

    }
    const changeShippingAddress = () => {
        const node = formElement.value.node
        node.submit()
    }
    const finishPaymentWithChangingAddress = (field:User_Information) => {
        let result:any[]=[]
        Object.entries(userCartInfo).forEach(item=>{typeof item[1]?.valid === 'boolean' && result.push(item[1]?.valid)})
        if(result.every(item=>item===true)){
            checkoutStore.changeAddress(field)
            checkoutStore.setUserInformationCart(userCartInfo)
            if(helperInfo.wantRemember){
                checkoutStore.setUserInformationRemember(phoneNumber.value)
            }
            isOpenModal.value=!isOpenModal.value
        }
    }



    return{
        shippingPageLink,setValue,userCartInfo,helperInfo,changeShippingAddress,finishPaymentWithoutChangeAddress,finishPaymentWithChangingAddress,formElement,phoneNumber,isOpenModal
    }
}