const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Policy=require('../models/Policy')

router.get('/',async (req,res)=>{
    const policyList=await Policy.find({}).lean();
    res.status(200).send(responseHandler(false,null,policyList[0]))
})

module.exports=router