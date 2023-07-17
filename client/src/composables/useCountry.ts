


export const useCountry=()=>{
    const countryData=useState<any[]>('countryData',()=>[])
    const countryFlag=useState<boolean>('countryFlag',()=>false)
    const stateData=useState<any[]>('stateData',()=>[])
    const token=useState<string>('x_token_x')

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

    const selectState = async (e?:Event|null,country?:string) => {
        let targetCountry;
        if(country){
            targetCountry=(countryData.value as any[]).filter((item)=>{if(item.name===country){return item.code}})[0].code;
        }else if(e){
            const value=(e.target as HTMLSelectElement).value
            targetCountry=(countryData.value as any[]).filter(item=>{if(item.name===value){return item.code}})[0].code;
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

    return{
        triggerCountryFetchList,countryData,countryFlag,selectState,stateData,triggerStateChange
    }
}