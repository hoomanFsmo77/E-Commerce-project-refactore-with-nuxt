const mongoose=require('mongoose')

const priceDetailSchema=mongoose.Schema({
    size:{
      type:String,
        required:false
    },
    frame:{
      type:String,
        required:false
    },
    price:{
      type:Number,
        required:false,
        set:(v)=>Number(v)
    },
    family:{
      type:String,
        required:false
    },
})

const cartItemsSchema=mongoose.Schema({
    productLink:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    priceDetail:{
        type:priceDetailSchema,
        required:true
    },
    src:{
        type:String,
        required:true
    },
    overlaySrc:{
        type:String,
        required:true
    },
    available:{
        type:Number,
        required:true
    },
    discount:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true
    }
})

const cartSchema=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    items:{
        type:[cartItemsSchema]
    }
})


const cartModel=mongoose.model('Cart',cartSchema)

module.exports=cartModel

