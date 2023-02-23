import VFade from "~/directive/vFade";
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.directive('fade',VFade)
})