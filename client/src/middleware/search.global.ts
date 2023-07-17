
export default defineNuxtRouteMiddleware((to,from)=>{
    const route=useRoute()
    const searchBoxFlag=useState<boolean>('searchBoxFlag')
    const searchText=useState<string>('searchText')
    const navbarOpenFlag=useState<boolean>('navbarOpenFlag')
    searchBoxFlag.value=false
    searchText.value=''
    if(route.name!=='HOME'){
        navbarOpenFlag.value=false
    }
})