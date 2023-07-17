
export const usePreloader= ()=>{
    const isLoading=useState<boolean>('mainPreLoader',()=>false)
    const router=useRouter()

    router.beforeEach((to,from,next)=>{
        isLoading.value=true
        next()
    })

    router.beforeResolve((to,from,next)=>{
        isLoading.value=false
        next()
    })
    return {isLoading}
}