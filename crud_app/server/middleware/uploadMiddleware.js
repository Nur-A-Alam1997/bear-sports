const multer =require("multer")
const path = require("path")
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/img/uploadImage")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})



const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024*8
    },
    fileFilter:(req,file,cb)=>{
        const types = /jpg|jpeg|png|gif/
        const extName = types.test(path.extname(file.originalname).tolowercase())
        const mimeType =types.test(file.mimetype)

        if (extName && mimeType)
        {
            cb(null,true)
        }
        cb(new Error("Only jpg|jpeg|png|gif images"))


    }
})



module.exports=upload