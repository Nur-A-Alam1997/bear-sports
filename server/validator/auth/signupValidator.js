const {body} = require("express-validator")
const User = require("../../model/database/User")
module.exports = signupValidator = 
[
    body("name")
        .isLength({min:2,max:15})
        .withMessage("Must be between 2 to 15 chars")
        .custom (async name =>
        {
            let user = await User.findOne({name})
            if (user)
            {
                return Promise.reject ("User already used")
            }
        
        })
        .trim()
    ,
    body("email")
        .isEmail().withMessage("Not a valid Email")
        .custom (async email =>
            {
                let user = await User.findOne({email})
                if (user)
                {
                    return Promise.reject ("email already exists")
                }
            
            })
            .normalizeEmail()
            ,
        body("password")
            .isLength({min:5}).withMessage("pass must be minimum of 5 lettters")
            
            ,
        body("confirmPassword")
        .isLength({min:5}).withMessage("password does not match")
        .custom((confirmPassword,{req})=>
        {
            if (confirmPassword !== req.body.password)
            {
                throw new Error("password does not match")
            }
         return true   
        })

]