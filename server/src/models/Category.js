const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    category:{
        required:true,
        type:String,
        trim:true
    }
})





const categoryModel=mongoose.model('Category',categorySchema)
module.exports=categoryModel