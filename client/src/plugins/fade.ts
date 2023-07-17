import vFade from '~/directive/vFade'
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.directive('fade',vFade)
})