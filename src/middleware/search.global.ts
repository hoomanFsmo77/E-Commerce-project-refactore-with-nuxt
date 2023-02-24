
export default defineNuxtRouteMiddleware((to,from)=>{
    const route=useRoute()
    const isOn=useState<boolean>('isOn')
    const searchText=useState<string>('searchText')
    const isOpen=useState<boolean>('isOpen')
    isOn.value=false
    searchText.value=''
    if(route.name!=='HOME'){
        isOpen.value=false
    }
})