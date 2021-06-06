const router =require("express").Router()
const {isAuthenticated} = require("../middleware/authMiddleware")
const { dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController } = require("../controller/dashboardGetController")


router.get("/",isAuthenticated,dashboardGetController)

router.get("/createProfile",isAuthenticated,createProfileGetController)
router.post("/createProfile",isAuthenticated,createProfilePostController)

router.get("/editProfile",isAuthenticated,editProfileGetController)
router.post("/editProfile",isAuthenticated,editProfilePostController)
module.exports=router