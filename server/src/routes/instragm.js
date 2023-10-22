const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const InstagramModel=require('../models/Instagram')


router.get('/',async (req,res)=>{
    const instagramList=await InstagramModel.find({}).lean();
    res.status(200).send(responseHandler(false,null,addImageBase(instagramList,'src')))
})




module.exports=router