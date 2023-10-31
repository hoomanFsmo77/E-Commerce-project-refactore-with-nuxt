const mongoose=require('mongoose')

const policyItemSchema=mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    content:{
        type:String,
        required:true
    }
})

const policySchema=mongoose.Schema({
    'refund-policy':{
        type:[policyItemSchema],
        required:true
    },
    'shipping-policy':{
        type:[policyItemSchema],
        required:true
    },
    'privacy-policy':{
        type:[policyItemSchema],
        required:true
    },
    'terms-of-service':{
        type:[policyItemSchema],
        required:true
    }


})





const policyModel=mongoose.model('Policy',policySchema)
module.exports=policyModel