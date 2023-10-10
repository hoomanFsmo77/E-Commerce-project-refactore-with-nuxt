const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Category=require('../models/Category')

router.get('/',async (req,res)=>{
    const categoryList=await Category.find({});
    res.status(200).send(responseHandler(false,null,categoryList))
})

module.exports=router