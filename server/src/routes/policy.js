const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Policy=require('../models/Policy')

router.get('/:section',async (req,res)=>{
    const section=req.params.section
    const policyList=await Policy.find({}).lean();
    if(policyList[0][section]){
        res.status(200).send(responseHandler(false,null,policyList[0][section]))
    }else{
        res.status(200).send(responseHandler(false,null,[]))
    }
})

module.exports=router