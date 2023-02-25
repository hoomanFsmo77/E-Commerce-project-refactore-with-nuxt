import {createClient} from "@supabase/supabase-js";


export default defineEventHandler(async e=>{
    const {apiBase,apiKey}=useRuntimeConfig()
    const supabase = createClient(apiBase, apiKey)
    try {
        let collections = await supabase.from('search').select('*')
        let products = await supabase.from('productList').select('*')
        return {
            collections:collections.data,
            products:products.data
        };
    }catch (err) {
        return err
    }

})