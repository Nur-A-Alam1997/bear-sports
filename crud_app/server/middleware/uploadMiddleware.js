const multer =require("multer")
const path = require("path")
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./assets/img/uploadImage")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})



const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024*8
    },
    ffileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            console.log("ole")
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})



module.exports=upload