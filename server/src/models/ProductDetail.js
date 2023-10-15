const mongoose=require('mongoose')

const galleySchema=mongoose.Schema({
    src:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
    zoom:{
        required:false,
        type:String,
        trim:true
    }
})
const descriptionSchema=mongoose.Schema({
    content:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
})
const frameSchema=mongoose.Schema({
    price:{
        required:true,
        type:Number,
    },
    available:{
        required:true,
        type:Boolean,
    },
})
const sizesSchema=mongoose.Schema({
    size:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
    price:{
        required:true,
        type:Number,
    },
    available:{
        required:true,
        type:Boolean,
    },
    frame:{
        type:frameSchema,
        required:false
    }
})
const optionSchema=mongoose.Schema({
    sizes:{
        required:true,
        type:[sizesSchema],
    },
})
const linkSchema=mongoose.Schema({
    facebook:{
        required:false,
        type:String,
        trim:true,
        default:'#'
    },
    twitter:{
        required:false,
        type:String,
        trim:true,
        default:'#'
    },
    pinterest:{
        required:false,
        type:String,
        trim:true,
        default:'#'
    },
})

const productDetailSchema=mongoose.Schema({
    title:{
        required:true,
        type:String,
        minLength:1,
        maxLength:100,
        trim:true
    },
    gallery:{
        required:true,
        type:[galleySchema],
    },
    available:{
        required:true,
        type:Number,
    },
    description:{
        required:true,
        type:[descriptionSchema],
    },
    link:{
        required:false,
        type:[linkSchema],
    },
    hasFrame:{
        required:true,
        type:Boolean,
    },
    price:{
        required:true,
        type:Number,
    },
    isSoldOut:{
        required:true,
        type:Boolean,
    },
    discount:{
        required:true,
        type:Number,
        default:0
    },
    option:{
        type:optionSchema,
        required:false
    }
})





const productDetailModel=mongoose.model('ProductDetail',productDetailSchema)
module.exports=productDetailModel