const express=require('express')
const router=express.Router()
const {responseHandler, addImageBase}=require('../utils')
const ProductList=require('../models/ProductList')
const collectionList=require('../models/Collection')
const nanoid=require('nanoid')
const cartModel=require('../models/Cart')
const productDetailModel=require('../models/ProductDetail')
const productListModel=require('../models/ProductList')
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const calculateTotalPrice = (cart) => {
  let total=0;
  cart.forEach(item=>{
      total+=item.quantity*item.priceDetail.price;
  });
  return total
}

router.post('/',async (req,res)=>{
    const uid=req.query.uid;
    const body=req.body;
    const productDetail=await productDetailModel.findOne({product:body.productLink}).lean();
    const productList=await productListModel.findOne({link:body.productLink}).lean();
    const targetCart=await cartModel.findOne({uid}).lean();
    const newItem={
        ...body,
        src:productList.coverSrc,
        overlaySrc:productList.overlaySrc,
        available:productDetail.available,
        title:productDetail.title,
        discount:productDetail.discount
    }
    if(targetCart){
        const isProductExist=targetCart.items.some(item=>item.productLink===body.productLink);
        if(isProductExist){
            const productIdx=targetCart.items.findIndex(item=>item.productLink===body.productLink);
            targetCart.items[productIdx].quantity++
            await cartModel.findOneAndUpdate({uid},{
                items:[...targetCart.items]
            });
        }else{
            await cartModel.findOneAndUpdate({uid},{
                items:[...targetCart.items,newItem]
            });
        }
        res.status(200).send(responseHandler(false,null,null))
    }else{
        const randomUid=nanoid.nanoid(34);
        await new cartModel({
            uid:randomUid,
            items:[newItem]
        }).save();
        res.status(200).send(responseHandler(false,null,{uid:randomUid}))
    }
})


router.get('/',async (req,res)=>{
    const uid=req.query.uid;
    const cartItems=await cartModel.findOne({uid}).lean();
    if(cartItems){
        const finalCartItems=addImageBase(cartItems.items,['src','overlaySrc'])
        res.status(200).send(responseHandler(false,null,{
            items:finalCartItems,
            total:calculateTotalPrice(finalCartItems)
        }))
    }else{
        res.status(200).send(responseHandler(true,'Cart not found!',null))
    }
})

router.put('/',async (req,res)=>{
    const query=req.query;
    const targetCart=await cartModel.findOne({uid:query.uid}).lean();
    const productIdx=targetCart?.items.findIndex(item=>item.productLink===query.productLink);
    if(!targetCart || !targetCart.items[productIdx]){
        res.status(200).send(responseHandler(true,'You should first add Product to your Cart!',null))
    }else{
        if(query.mode==='increment' ){
            if( targetCart.items[productIdx].quantity===targetCart.items[productIdx].available){
                res.status(200).send(responseHandler(true,'There is no more available items in this product!',null))
            }else{
                targetCart.items[productIdx].quantity++
                await cartModel.findOneAndUpdate({uid:query.uid},{
                    items:[...targetCart.items]
                });
                res.status(200).send(responseHandler(false,'product updated!',null))
            }
        }else if(query.mode==='decrement'){

            if(targetCart.items[productIdx] && targetCart.items[productIdx].quantity===1){
                targetCart.items.splice(productIdx,1)
                await cartModel.findOneAndUpdate({uid:query.uid},{
                    items:[...targetCart.items]
                });
                res.status(200).send(responseHandler(false,'Product removed!',null))
            }else{
                targetCart.items[productIdx].quantity--
                await cartModel.findOneAndUpdate({uid:query.uid},{
                    items:[...targetCart.items]
                });
                res.status(200).send(responseHandler(false,'product updated!',null))
            }
        }else if(query.mode==='remove'){
            targetCart.items.splice(productIdx,1)
            await cartModel.findOneAndUpdate({uid:query.uid},{
                items:[...targetCart.items]
            });
            res.status(200).send(responseHandler(false,'product removed!',null))

        }else if(query.mode==='reset'){
            await cartModel.findOneAndDelete({uid:query.uid});
            res.status(200).send(responseHandler(false,'cart reset!',null))
        }else if(query.mode==='config'){
            targetCart.items[productIdx].priceDetail.size=req.body.size
            targetCart.items[productIdx].priceDetail.frame=req.body.frame
            targetCart.items[productIdx].priceDetail.family=req.body.family
            targetCart.items[productIdx].priceDetail.price=req.body.price
            await cartModel.findOneAndUpdate({uid:query.uid},{
                items:[...targetCart.items]
            });
            res.status(200).send(responseHandler(false,'product updated!',null))
        }
    }


})
module.exports=router