const mongoose=require('mongoose')

const collectionSchema=mongoose.Schema({
    link:{
            type:String,
        required:true
    },
    src:{
        type:String,
        required:true
    },
    srcset:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
})





const collectionModel=mongoose.model('Collection',collectionSchema)
module.exports=collectionModel