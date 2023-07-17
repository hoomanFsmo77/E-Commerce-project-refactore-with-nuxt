const express=require('express')
const fs = require("fs");
const path=require('path')
const router=express.Router()
const bodyParser=require('body-parser')
const multer  = require('multer')
router.use(bodyParser.urlencoded({extended: true,}))
//////// multer config
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/storage/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "svg") {
        cb(null, true);
    } else {
        cb("Not a jpeg|jpg|png|svg File!!", false);
    }
};
const upload = multer({storage: multerStorage, fileFilter: multerFilter})

////////////////////////////////////////////////
router.get('/',(req,res)=>{
    res.status(200)
})

router.get('/:image',(req,res)=>{
    const imageName=req.params.image;
    const rootPath=path.join(__dirname,'../')
    const imagePath=rootPath+'/storage/'+imageName;
    fs.readFile(imagePath,{},(error,image)=>{
        if(error){
            res.status(404).end()
        }else{
            res.status(200).send(image)
        }
    })
})


router.post('/upload',upload.single('image'),(req,res)=>{
    res.status(200).send(JSON.stringify('file uploaded'))
})


module.exports=router