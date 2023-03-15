

export const useCheckout=()=>{
    const isCollapse=useState<boolean>('isCollapse',()=>false)
    const token=useState<string>('x_token_x')

    //// modal
    const isOpenModal=useState('isOpenCheckoutModal',()=>false)
    const modalTarget=useState<string>('modalTarget',()=>'')
    const policyData=useState<any[]>('policyData',()=>[])
    const fetchFlag=useState<boolean>('checkoutFetchFlag',()=>false)


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



// export const useCheckoutCollection=()=>{
//     //// country
//     const country=ref({
//         code:'us',
//         name:'United State of America'
//     })
//     const countryData=ref([])
//     const countryFlag=ref(false)
//
//     //// state
//     const stateFlag=ref(false)
//     const state=ref({code:''})
//     const stateData=ref([])
//
//     ///// form
//     const contactInfo=ref('')
//     const news=ref(false)
//     const firstname=ref('')
//     const lastname=ref('')
//     const address=ref('')
//     const addressType=ref('')
//     const city=ref('')
//     const zip=ref('')
//
//     const userInfo=computed(()=>{
//         return{
//             contactInfo:{
//                 value:contactInfo.value,
//                 valid:false
//             },
//             news:news.value,
//             country:{
//                 value:country.value,
//                 valid:false
//             },
//             firstname:{
//                 value:firstname.value,
//                 valid:false
//             },
//             lastname:{
//                 value:lastname.value,
//                 valid:false
//             },
//             address:{
//                 value:address.value,
//                 valid:false
//             },
//             addressType:addressType.value,
//             state:{
//                 value:state.value,
//                 valid:false
//             },
//             zip:{
//                 value:zip.value,
//                 valid:false
//             },
//             city:{
//                 value:city.value,
//                 valid:false
//             }
//         }
//     })
//
//     watch(
//         ()=>country.value,
//         ()=>{
//             state.value.code=''
//             stateData.value=[]
//             axios.get(`https://battuta.medunes.net/api/region/${country.value.code}/all/?key=470af792c1181f18e0ec0ec9cf03e091`).then(response=>{
//                 stateData.value=response.data
//                 stateFlag.value=true
//             })
//         },{
//             immediate:true
//         }
//     )
//     onMounted(()=>{
//         axios.get('https://battuta.medunes.net/api/country/all/?key=470af792c1181f18e0ec0ec9cf03e091').then(response=>{
//             countryData.value=response.data
//             countryFlag.value=true
//         })
//     })
//     const validation = (condition,target) => {
//         if(condition){
//             userInfo.value[target].valid=true
//             return false;
//         }else{
//             userInfo.value[target].valid=false
//             return true;
//         }
//     }
//
//     const setUserInformation = info => {
//         country.value.code=info.country.value.code
//         country.value.name=info.country.value.name
//         state.value.code=info.state.value.code
//         contactInfo.value=info.contactInfo.value
//         news.value=info.news
//         firstname.value=info.firstname.value
//         lastname.value=info.lastname.value
//         address.value=info.address.value
//         addressType.value=info.addressType
//         city.value=info.city.value
//         zip.value=info.zip.value
//     }
//     return{
//         country,countryData,countryFlag,state,stateData,contactInfo,news,firstname,lastname,address,addressType,city,zip,stateFlag,userInfo,validation,setUserInformation
//     }
// }


export const useInformation=()=>{
    const isAlertActive=useState<boolean>('isAlertActive',()=>false)
    const contactInfo=useState<string>('contactInfo',()=>'')
    const route=useRoute()
    const formElement = ref<any>(null)

    onMounted(()=>{
        isAlertActive.value=true
    })

    const closeAlertModal = (e:boolean) => {
        isAlertActive.value=e
    }
    const submitHandler = () => {
        const node = formElement.value.node
        node.submit()
    }
    const goShipping = () => {
        console.log('submitted')
    }



    return{
        closeAlertModal,isAlertActive,goShipping,contactInfo,formElement,submitHandler
    }
}