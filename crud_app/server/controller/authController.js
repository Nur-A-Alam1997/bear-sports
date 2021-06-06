const User = require("../model/database/User")
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
        res.render("login",{title:"sign-in",error:errors})
    } catch (error) {
        next(error)
    }

    // console.log(name,email,pass)
}
exports.loginGetController=(req,res,next)=>{
    // console.log(req.session)
    res.render("login",{title:"Log-in",error:{}})
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
        if (!user){
            return res.json({
                message:"password or email is invalid"
            })
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
            return res.redirect("/")
        })
}