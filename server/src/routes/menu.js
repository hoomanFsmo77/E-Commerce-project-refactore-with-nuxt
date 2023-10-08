const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Menu=require('../models/Menu')

router.get('/',async (req,res)=>{
    const menuList=await Menu.find({});
    res.status(200).send(responseHandler(false,null,menuList))
})

module.exports=router