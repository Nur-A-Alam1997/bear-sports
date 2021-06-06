const User = require("../model/database/User")
exports.bindUserwithRequest=  ()=>
{
    return async (req,res,next)=>
    {
        if (!req.session.isLoggedIn)
        {
           return next()
        }

        try 
        {
            let user = await User.findById(req.session.user._id)  
            req.user = user
            next()
        } catch (e)
         {
            console.log(e)
            next(e)
        }


    }
}




exports.isAuthenticated =(req,res,next) => {

    if (!req.session.isLoggedIn)
        {
        //    return res.render("login",{title:"Log-in"})
           return res.status(202).redirect("/auth/login")
        }
    next()
}

exports.isUnauthenticated = (req,res,next)=>{
    if (req.session.isLoggedIn)
    {
       return res.status(202).redirect("/dashboard")
    }
    next()
}