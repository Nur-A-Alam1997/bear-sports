const router = require ("express").Router()
// const User =require ("../server/database/User")

const signupValidator =require("../validator/auth/signupValidator")
const loginValidator =require("../validator/auth/loginValidator")
const {isUnauthenticated} = require("../middleware/authMiddleware")
const {emailVerification} = require("../middleware/emailMiddleware")

const {
    signupGetController,
    signupPostController,
    OTPpostController,
    OTPgetController,
    loginGetController,
    loginPostController,
    logoutController,

}=require("../controller/authController")







router.get("/signup",isUnauthenticated,signupGetController)
router.post("/signup",signupValidator,emailVerification,signupPostController)

router.get("/otp/:email",OTPgetController)
router.post("/otp/:email",OTPpostController)

router.get("/login",isUnauthenticated,loginGetController)
router.post("/login",loginValidator,emailVerification,loginPostController)
router.get("/logout",logoutController)


module.exports=router