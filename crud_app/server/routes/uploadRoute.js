const router =require("express").Router()
const {isAuthenticated}=require("../middleware/authMiddleware")
const upload=require("../middleware/uploadMiddleware")

const {uploadProfilePicController}=require("../controller/uploadController")



// router.post("/profilePic",isAuthenticated,upload.single("profilePic"),uploadProfilePic)
router.get("/crop",(req,res)=>{
    res.render("cropped")
})
router.post("/crop",uploadProfilePicController)

module.exports = router