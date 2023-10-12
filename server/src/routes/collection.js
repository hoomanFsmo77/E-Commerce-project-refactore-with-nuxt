const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const Collection=require('../models/Collection')
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))

router.get('/',async (req,res)=>{
    const collectionList=await Collection.find({}).lean();
    res.status(200).send(responseHandler(false,null,addImageBase(collectionList,['src','srcset'])))
})


module.exports=router