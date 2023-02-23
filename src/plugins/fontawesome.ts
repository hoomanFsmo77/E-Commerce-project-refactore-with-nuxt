import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping ,faMagnifyingGlass,faChevronDown,faTruckFast,faChevronRight,faBars,faX,faAngleRight,faAngleLeft,faChevronLeft,faEarthEurope,faTree,faMapLocationDot,faHandHoldingDollar,faMagnifyingGlassPlus,faMagnifyingGlassMinus,faPlus,faMinus,faCaretDown,faQuestion,faChevronUp,faLock,faCircleQuestion,faMobileScreen,faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import {faFacebookF,faTwitter,faPinterest,faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faThumbsUp,faCircleCheck} from '@fortawesome/free-regular-svg-icons'

export default defineNuxtPlugin(nuxtApp=>{
    library.add(faCartShopping,faMagnifyingGlass,faChevronDown,faTruckFast,faChevronRight,faBars,faX,faAngleRight,faAngleLeft,faChevronLeft,faEarthEurope,faTree,faMapLocationDot,faHandHoldingDollar,faMagnifyingGlassMinus,faMagnifyingGlassPlus,faPlus,faMinus,faFacebookF,faTwitter,faPinterest,faThumbsUp,faInstagram,faCaretDown,faQuestion,faChevronUp,faLock,faCircleQuestion,faMobileScreen,faCircleExclamation,faCircleCheck)
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})