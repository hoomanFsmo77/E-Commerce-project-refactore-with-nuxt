import {Regex} from "~/utils/Helper";
import {User_Information,Shipping_Method} from "~/utils/Types";

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
    const {checkoutStore,userInformationContact}=useCheckoutStore()
    const token=useState<string>('x_token_x')
    const countryData=useState<any[]>('countryData',()=>[])
    const stateData=useState<any[]>('stateData',()=>[])
    const countryFlag=useState<boolean>('countryFlag',()=>false)
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
        checkoutStore.setUserStoredInformation()
        await triggerCountryFetchList()
        await selectState(null,userInformationContact?.value?.country ?? 'Afghanistan')
    })

    const closeAlertModal = (e:boolean) => {
        isAlertActive.value=e
    }
    const submitHandler = () => {
        const node = formElement.value.node
        node.submit()
    }
    const goShipping =async (field:User_Information) => {
        try {
            const data=await $fetch('/api/checkout/info',{
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

    const selectState = async (e?:Event|null,country?:string) => {
        let targetCountry;
        if(country){
            targetCountry=countryData.value.filter(item=>{if(item.name===country){return item.code}})[0].code;
        }else if(e){
            const value=(e.target as HTMLSelectElement).value
            targetCountry=countryData.value.filter(item=>{if(item.name===value){return item.code}})[0].code;
        }
      await triggerStateChange(targetCountry)
    }

    const triggerStateChange = async (targetCountry:string) => {
        try {
            const data=await $fetch<any[]>(`/api/location/${targetCountry}`,{headers:{'Authentication':token.value}})
            stateData.value=data
        }catch (err) {
            console.log(err)
        }
    }
    const triggerCountryFetchList = async () => {
        countryFlag.value=false
        try {
            const data=await $fetch<any[]>('/api/location/country',{headers:{'Authentication':token.value}})
            countryData.value=data
            countryFlag.value=true
        }catch (err) {
            console.log(err)
        }
    }

    return{
        closeAlertModal,isAlertActive,goShipping,formElement,submitHandler,contactRule,isContactNumber,countryData,countryFlag,selectState,stateData
    }
}


export const useShipping=()=>{
    const informationPageLink=useState<string>('informationPageLink',()=>'')
    const token=useState<string>('x_token_x')
    const {checkoutStore,userInformationShippingStore}=useCheckoutStore()
    const methodIndex=useState<number>('methodIndex',()=> 0)
    const selectedMethod=(index:number)=>{
        methodIndex.value=index
        console.log(index,methodIndex.value)
        checkoutStore.setUserInformationShipping(shippingMethods[index])
    }

    onMounted(async ()=>{
        if(userInformationShippingStore.value){
            selectedMethod(userInformationShippingStore.value.id-1)
        }else{
            selectedMethod(0)
        }
        try {
            const data=await $fetch<string>('/api/cart',{method:'POST',headers:{'Authentication':token.value}})
            informationPageLink.value=data
        }catch (err) {
            showError({
                statusCode:404,
                statusMessage:'You are not allowed to this page!'
            })
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





    return {
        informationPageLink,shippingMethods,selectedMethod,methodIndex
    }
}


export const useCheckoutLinks=()=>{
    const {userInformationContact}=useCheckoutStore()

    const calculateShippingAddress=computed<string>(()=>{
        if(userInformationContact.value){
            return `${userInformationContact.value.address}, ${userInformationContact.value.city}, ${userInformationContact.value.state} ${userInformationContact.value.zip}, ${userInformationContact.value.country}`
        }else{
            return  ''
        }
    })



    return{
        calculateShippingAddress
    }
}