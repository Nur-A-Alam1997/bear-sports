const User = require("../model/database/User")
const OTP = require("../model/database/OTP")
const bcrypt = require ("bcrypt")

const { validationResult } = require("express-validator")
const errorFormatter =require("../utils/validationErrorFormatter")



exports.signupGetController=(req,res,next)=>{
    res.render("signup",{title:"sign-in",error:{},value:{}})
}
exports.signupPostController= async (req,res,next)=>{
    console.log(req.body)
    const {name,email,password}=req.body
    
    let errors =validationResult(req).formatWith(errorFormatter)


    if (!errors.isEmpty()){
        // console.log(errors.mapped())
        return res.render("signup",
        {
            title:"sign-in",
            error:errors.mapped(),
            value:
            {
                name,email,password
            }
        })
    }
    
    try {

        hashPassword= await bcrypt.hashSync(password,11)
        // confirmHashPassword= await bcrypt.hash(confirmPassword,11)
        let user=new User({
            name,
            email,
            password:hashPassword,
            // confirmPassword:confirmHashPassword
        })

        let createdUser = await user.save()
        console.log("user created succefully",createdUser)
        res.render("./play/OTP",{title:"Authentication",error:errors})
    } catch (error) {
        next(error)
    }

    // console.log(name,email,pass)
}


exports.OTPgetController=(req,res,next)=>{
    let email= req.params.email
    console.log(email)
    res.render("./play/OTP",{title:"Authentication",email})
}
exports.OTPpostController=async(req,res,next)=>{
    try {
        let email= req.params.email
        console.log(email)
        let otpConfirm=await OTP.findOne({"email":email})
        console.log(otpConfirm)
        let otpProvided = req.body.OTP
        
        console.log(otpProvided==null,otpConfirm.otp)
        if (otpConfirm.otp & otpConfirm.otp==otpProvided){
            let user =await User.findOneAndUpdate(
                {email},
                {$set:{verified:"true"}}
                )
            req.session.isLoggedIn=true
            req.session.user=user
            req.session.save(err=>
            {
                if (err)
                {
                    console.log(err)
                    next(err)
                }
                
               else res.redirect("/dashboard")
            })
        }
        else res.json({
            message:"couldn't verify"
        })
        
    } catch (error) {
        console.log(error)
    }

}


exports.loginGetController=(req,res,next)=>{
    // console.log(req.session)
    return res.render("login",{title:"Log-in",error:{}})
    // res.render()
}
exports.loginPostController= async (req,res,next)=>{
    let {email,password} = req.body
    // console.log(req.body)
    let errors =validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()){
        // console.log(errors.mapped())
        return res.render("login",
        {
            title:"sign-in",
            error:errors.mapped()
        })
    }
 
    try {
        
        
        let user = await User.findOne({email})
        
        console.log(user.verified)
        if (!user){
            return res.json({
                message:"password or email is invalid"
            })
        }

        if (user.verified=="false"){
            
            console.log("hey",user.verified)
            // res.render("./play/OTP",{title:"Log-in",email})
            // res.send({name : "StackOverFlow", reason : "Need help!", redirect_path: "/auth/otp"});
           return res.status(200).redirect("/auth/otp/"+email)
        // next()
        }

        

        let match = await bcrypt.compare(password,user.password)
        // let match = password === user.password
        
        if (!match){
            console.log(match,password,user.password)
            return res.json({
                message:"password or email is invalid"
            })
        }
        // console.log("successfully logged in",user)
        req.session.isLoggedIn=true
        req.session.user=user
        req.session.save(err=>
        {
            if (err)
            {
                console.log(err)
                return next(err)
            }
            return res.redirect("/dashboard")
        })
        // console.log(req.session.user)
        // return res.render("index",{title:"Log-in",error:{}})

    } catch (e) {
        return next(e)
    }

}
exports.logoutController=(req,res,next)=>{
    req.session.destroy(err=>
        {
            if (err)
            {
                console.log(err)
                return next(err)
            }
            return res.redirect("/explorer")
        })
}