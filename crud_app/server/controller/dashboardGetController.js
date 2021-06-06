const Profile =require("../model/database/Profile")

exports.dashboardGetController= async(req,res,next)=>{
    
    try 
    {
        let profile =await Profile.findOne(
        {
            user:req.user._id
        })
        if (profile){
            return res.render("index",{title:"my dashboard"})
        }
        return res.redirect("/createProfile")
    }
    catch(e)
    {
        next(e)
    }
    
}

exports.createProfileGetController=async (req,res,next)=>
{
    try {
        let profile=await Profile.findOne(
            {
                user: req.user._id
            })
        if (profile)
        {
            return res.redirect("/editProfile")
        }
        return res.render("createProfile",{title:"Profile"})
    } catch (error) {
        
    }
}

exports.createProfilePostController=async (req,res,next)=>{next()}
exports.editProfileGetController=async (req,res,next)=>{next()}
exports.editProfilePostController=async (req,res,next)=>{next()}