const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const ProductList=require('../models/ProductList')
const collectionList=require('../models/Collection')
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

router.get('/popular',async (req,res)=>{
    const count=await ProductList.count().exec();
    let result=[]
    for (let i=1;i<9;i++){
        let random = Math.floor(Math.random() * count);
        const randomItem=await ProductList.findOne().skip(random).lean()
        result.push(randomItem)
    }
    res.status(200).send(responseHandler(false,null,addImageBase(result,['coverSrc','overlaySrc'])))
})
router.get('/search',async (req,res)=>{
    const name=req.query.name;
    const productItems=await ProductList.find({"title": {$regex: '^' + name, $options: 'i'}}).lean().exec();
    const collectionItems=await collectionList.find({"text": {$regex: '^' + name, $options: 'i'}}).lean().exec();
    const addImageToProduct=addImageBase(productItems,['coverSrc','overlaySrc']);
    res.status(200).send(responseHandler(false,null,{
        products:addImageToProduct,
        collections:collectionItems
    }))
})

module.exports=router