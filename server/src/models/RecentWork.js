const mongoose=require('mongoose')

const recentWorkSchema=mongoose.Schema({
    link: {
        required:true,
        type:String,
        trim:true
    },
    title: {
        required:true,
        type:String,
        trim:true
    },
    subTitle: {
        required:true,
        type:String,
        trim:true
    },
    src: {
        required:true,
        type:String,
        trim:true
    }
})





const recentWorkModel=mongoose.model('RecentWork',recentWorkSchema)
module.exports=recentWorkModel