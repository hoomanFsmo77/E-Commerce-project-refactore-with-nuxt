import vCollapsible from "~/directive/vCollapsible";
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.directive('collapsible',vCollapsible)
})