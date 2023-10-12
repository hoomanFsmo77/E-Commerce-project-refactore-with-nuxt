const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const Product=require('../models/Product')
const upload=require('../database/upload')
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))

router.get('/list',async (req,res)=>{
    const category=req.query.category;
    const productList=await Product.find({category}).lean();
    const result=productList.length>0 ? addImageBase(productList,['coverSrc','overlaySrc']) : [];
    res.status(200).send(responseHandler(false,null,result))
})


router.post('/list',upload.fields([{name:'coverSrc'},{name:'overlaySrc'}]),async (req,res)=>{
    await new Product({
        ...req.body,
        coverSrc:req.files.coverSrc[0].filename,
        overlaySrc:req.files.overlaySrc[0].filename
    }).save();
    res.end()

})

module.exports=router