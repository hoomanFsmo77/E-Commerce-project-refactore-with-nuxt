const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Pages=require('../models/Pages')

router.get('/',async (req,res)=>{
    const page=req.query.page;
    const pageList=await Pages.find({}).lean();
    res.status(200).send(responseHandler(false,null,pageList[0][page]))
})

module.exports=router