const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const recentWorkModel=require('../models/RecentWork')
const upload=require('../database/upload')

router.get('/',async (req,res)=>{
    const recentWorkList=await recentWorkModel.find({}).lean();
    res.status(200).send(responseHandler(false,null,addImageBase(recentWorkList,'src')))
})


module.exports=router