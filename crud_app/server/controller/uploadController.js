const Profile =require("../model/database/Profile")
const User = require("../model/database/User")
const fs =require("fs")

exports.uploadProfilePicController=async(req,res,next)=>{
    
    if (req.body.img)
    {
        try {
            let base64String = req.body.img; // Not a real image
            // Remove header
            let base64Image = base64String.split(';base64,').pop();
            // console.log(buffer)
            //writefile use relative path
            let filename=`${Date.now()}-${req.body.name}`
            fs.writeFile("./assets/img/uploadImage/"+filename, base64Image, {encoding: 'base64'}, function(err) {
                console.log('File created',`/img/uploadImage/${filename}`);
                console.log(req.user._id)
            })
            let profile = await Profile.findOne({user:req.user._id})
            let profilePic =`/img/uploadImage/${filename}`

            if (profile){
                await Profile.findOneAndUpdate(
                    {user:req.user._id},
                    {$set:{profilePic}},
                    {returnNewDocument: true}
                )
            }

            await User.findOneAndUpdate(
                {_id:req.user._id},
                {$set:{profilePic}},
                {returnNewDocument: true}
            )

            res.status(202).json({profilePic,"bas":"bad1"})


        } catch (error) {
            res.status(500).json({profilePic:req.user.profilePic,"bas":"bad2"})
            
        }
    }else{
        res.status(500).json({profilePic:req.user.profilePic,"bas":"bad3"})
    }
}



exports.removeProfilePicController = (req,res,next)=>{

    try {
        let defaultProfilePic =`/img/user.png`
        let currentProfilePic=req.user.profilePic

        fs.unlink(`./assets${currentProfilePic}`, async function(err) {
            let profile = await Profile.findOne({user:req.user._id})

            if (profile){
                await Profile.findOneAndUpdate(
                    {user:req.user._id},
                    {$set:{profilePic:defaultProfilePic}},
                    // {returnNewDocument: true}
                )
            }
            
            await User.findOneAndUpdate(
                {_id:req.user._id},
                {$set:{profilePic:defaultProfilePic}},
                // {returnNewDocument: true}
                )

            });
            return res.status(202).json({profilePic:defaultProfilePic,"delete":"bad1"})
        
        
    } catch (error) {
        return res.status(500).json({profilePic:req.user.profilePic,"delete":"bad2"})
    }
}