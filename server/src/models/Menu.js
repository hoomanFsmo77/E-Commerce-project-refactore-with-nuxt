const mongoose=require('mongoose')

const paramsSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    }
})

const linkSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    params:{
        type:paramsSchema,
        required:false
    }
})

const childrenSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    link:{
        type:linkSchema,
        required:true
    },
    subMenu:{
        type:Number,
        required:true
    },
})

const menuSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    link:{
        type:linkSchema,
        required:true
    },
    subMenu:{
        type:Number,
        required:true
    },
    children:{
        type:[childrenSchema],
        required:false
    }

})





const menuModel=mongoose.model('Menu',menuSchema)
module.exports=menuModel