const multer  = require('multer')
/////////////////////////////////////////
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/storage/");
    },
    filename: (req, file, cb) => {
	if(file.mimetype.split("/")[1]==='octet-stream'){
		cb(null, `${Date.now()}.jpeg`);
         }else{
            const ext = file.mimetype.split("/")[1];
		cb(null, `${Date.now()}.${ext}`);
         }
        

    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1]==='octet-stream' || file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "avif" || file.mimetype.split("/")[1] === "svg" || file.mimetype.split("/")[1] === "webp") {
        cb(null, true);
    } else {
        cb("Not a jpeg|jpg|png|svg File!!", false);
    }
};
const upload = multer({storage: multerStorage, fileFilter: multerFilter})


module.exports=upload