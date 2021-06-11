const Profile = require("../model/database/Profile")
const User = require("../model/database/User")
const { validationResult } = require("express-validator")
const errorFormatter =require("../utils/validationErrorFormatter")




exports.profileUpdateController = async (req,res,next)=>{

    const {bio}=req.body
    console.log(bio)
    let errors =validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped().msg)
    if (!errors.isEmpty()){
        // console.log(errors.mapped())
        return res.send(
        {
            title:"Profile Update",
            error:errors.mapped(),
            value:
            {
                bio,
            }
        })
    }

        try {
            const {bio}=req.body
            console.log("it's a try")
            let profile = await Profile.findOne({user:req.user._id})
            console.log(profile)
            if (!profile){
                console.log("it's a profile try")
                let profile=new Profile({
                    user:req.user._id,
                    bio,
                    profilePic:req.user.profilePic,
                    post:[],
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
                    await Profile.findOneAndUpdate(
                        {user:req.user._id},
                        {$set:{bio}},
                        // {returnNewDocument: true}
                        )
                    }
                 catch (error) {
                     console.log(error)
                    next(error)
                }
                
            }
            console.log({bio})
            res.status(202).json({bio,title:"Profile Update"})

        }catch (error) {
            console.log(error)
            res.status(500)
        }
    }
