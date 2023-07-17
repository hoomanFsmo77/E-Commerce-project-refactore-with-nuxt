import {Link} from "~/utils/Types";

export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.provide('link',(link:Link,id:string,category:string)=>{
        if(link.name==='Product-Item-name'){
            return `/Product/Item/${link.params.name}?id=${id}#${category}`
        }else{
            return `/Product/Art/${link.params.name}?id=${id}#${category}`
        }
    })
})