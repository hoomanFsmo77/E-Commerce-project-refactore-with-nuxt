const mongoose=require('mongoose')


const pagesSchema=mongoose.Schema({})
const pagesModel=mongoose.model('Pages',pagesSchema)
module.exports=pagesModel