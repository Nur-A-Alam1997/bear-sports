const Profile = require("../model/database/Profile")
const User = require("../model/database/User")
const { validationResult } = require("express-validator")
const errorFormatter =require("../utils/validationErrorFormatter")
const Product = require("../model/database/Product")




exports.profileUpdateController = async (req,res,next)=>{

    const {bio,livingArea,occupation}=req.body
    console.log(bio,livingArea,occupation)
    let errors =validationResult(req).formatWith(errorFormatter)
    // console.log(errors.mapped().msg)
    if (!errors.isEmpty()){
        // console.log(errors.mapped())
        return res.send(
        {
            title:"Profile Update",
            error:errors.mapped(),
            value:
            {
                bio,livingArea,occupation
            }
        })
    }

        try {
            const {bio,livingArea,occupation}=req.body
            console.log("it's a try")
            let profile = await Profile.findOne({user:req.user._id})
            // console.log(profile)
            if (!profile){
                console.log("it's a profile try")
                let profile=new Profile({
                    user:req.user._id,
                    bio,livingArea,occupation,
                    profilePic:req.user.profilePic,
                    product:[],
                    bookmarks:[]
                })
                let createdProfile = await profile.save()
                await User.findOneAndUpdate(
                    {_id:req.user._id},
                    {$set:{profile:createdProfile._id}}
                )
            }
            else{
                try {
                    let profile = await Profile.findOneAndUpdate(
                        {user:req.user._id},
                        {$set:{bio,livingArea,occupation}},
                        // {returnNewDocument: true}
                        )
                    }
                 catch (error) {
                     console.log(error)
                    next(error)
                }
                
            }
            console.log({bio})
            res.status(202).redirect("/profilePic/edit")

        }catch (error) {
            console.log(error)
            res.status(500)
        }
    }

exports.profileEditGetController = async (req,res,next)=>{
    try {
        let profile=await Profile.findOne({user:req.user._id})
        res.status(202).render("newProfile",{profile,title:"Profile Update"})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

    
exports.profileGetController=async(req,res,next)=>{
    try {
        let {userId} = req.params
        let profile = await Profile.findOne({user:userId})
        let product =await Product.find({user:userId})
        console.log(product)
        res.status(202).render("profile",{profile,product})
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}