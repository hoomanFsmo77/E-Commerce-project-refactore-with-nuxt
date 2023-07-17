

export const useNavbar=()=>{
    const navbarData=useState<any[]>('navbarData',()=>[])
    const flag=useState<boolean>('navbarFlag',()=>false)
    onMounted(async ()=>{
        flag.value=false
        const token=useState<string>('x_token_x')
        try {
            const data=await $fetch<any[]>('/api/navbar',{headers:{'Authentication':token.value}})
            navbarData.value=data
        }catch (err) {
            console.log(err)
        }finally {
            flag.value=true
        }
    })
}