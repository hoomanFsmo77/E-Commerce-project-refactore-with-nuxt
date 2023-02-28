import {useCollectionStore} from "~/composables/useStore";

export default ()=>{
    const {randomCollection,fetchFlag}=useCollectionStore()
    const settings=reactive({
        itemsToShow: 1 as number,
        snapAlign: 'center' as string
    })

    const carousel=ref<any>(null)
    const next = () => {
        carousel.value.next()
        carousel.value.updateSlideWidth()
    }
    const prev = () => {
        carousel.value.prev()
        carousel.value.updateSlideWidth()
    }
    const breakpoints={
        768: {
            itemsToShow: 3,
            snapAlign: 'center',
        },
        500: {
            itemsToShow: 2,
            snapAlign: 'center',
        },
    }
    return {
        randomCollection,settings,carousel,next,prev,breakpoints,fetchFlag
    }
}