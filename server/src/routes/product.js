const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const ProductList=require('../models/ProductList')
const ProductDetail=require('../models/ProductDetail')
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))

router.get('/list',async (req,res)=>{
    const category=req.query.category;
    let productListData;
    if(category==='fine-art-prints'){
        productListData=await ProductList.find({}).lean();
    }else{
        productListData=await ProductList.find({category}).lean();
    }
    const result=productListData.length>0 ? addImageBase(productListData,['coverSrc','overlaySrc']) : [];
    res.status(200).send(responseHandler(false,null,result))
})

router.get('/detail',async (req,res)=>{
    const product=req.query.product;
    let productListData=await ProductDetail.find({product}).lean();
    const result=productListData.length>0 ? productListData[0] : null;
    res.status(200).send(responseHandler(false,null,result))
})



module.exports=router