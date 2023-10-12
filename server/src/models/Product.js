const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
    category:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
    title:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
    link:{
        type:String,
        required:true,
        minLength:1,
        maxLength:100,
        trim:true
    },
    type:{
        type:String,
        required:false,
        default:'Art',
        trim:true
    },
    isSoldOut:{
        type:Boolean,
        required:true
    },
    isPeriod:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true,
        minLength:1,
        maxLength:100,
    },
    coverSrc:{
        type:String,
        required:true,
        minLength:1,
        maxLength:1000,
        trim:true
    },
    overlaySrc:{
        type:String,
        required:false,
        minLength:0,
        maxLength:1000,
        trim:true
    }
})





const productModel=mongoose.model('Product',productSchema)
module.exports=productModel