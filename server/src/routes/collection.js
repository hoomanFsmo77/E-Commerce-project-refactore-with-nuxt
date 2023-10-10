const express=require('express')
const router=express.Router()
const {responseHandler}=require('../utils')
const Collection=require('../models/Collection')
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))

router.get('/',async (req,res)=>{
    const imageBase=process.env.IMAGE_PATH;
    const collectionList=await Collection.find({});
    const result=await collectionList.map(item=>{
        return {
            link:item.link,
            text:item.text,
            src:imageBase+item.src,
            srcset:imageBase+item.srcset,
        }
    })
    res.status(200).send(responseHandler(false,null,result))
})


module.exports=router