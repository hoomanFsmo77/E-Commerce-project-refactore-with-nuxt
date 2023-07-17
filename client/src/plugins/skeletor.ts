import VueSkeletor from 'vue-skeletor';
import { Skeletor } from 'vue-skeletor';

export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.component(Skeletor.name, Skeletor);
    // @ts-ignore
    nuxtApp.vueApp.use(VueSkeletor, {shimmer: false,})
})