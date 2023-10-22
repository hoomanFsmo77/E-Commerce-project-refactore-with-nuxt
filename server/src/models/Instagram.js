const mongoose=require('mongoose')

const instagramSchema=mongoose.Schema({
    src: {
        required:true,
        type:String,
        trim:true
    },
    content: {
        required:true,
        type:String,
        trim:true
    },
    date: {
        required:true,
        type:String,
        trim:true
    },
    link: {
        required:true,
        type:String,
        trim:true
    }
})





const instagramModel=mongoose.model('Instagram',instagramSchema)
module.exports=instagramModel