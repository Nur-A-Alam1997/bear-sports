const Profile =require("../model/database/Profile")

exports.bookmarksGetController=async(req,res,next)=>{

    let { prodId } = req.params;
  
    if (!req.user) {
      return res.status(403).json({ error: "not allowed" });
    }
    let  userId= req.user._id
    
    try {
        let bookmarks="null"
        let profile = await Profile.findOne({user:userId})
        if(profile.bookmarks.includes(prodId)){
            await Profile.findOneAndUpdate(
                {user:userId},
                {$pull:{"bookmarks":prodId}})
                bookmarks=false
        }
        else{
            await Profile.findOneAndUpdate(
                {user:userId},
                {$push:{"bookmarks":prodId}})
                bookmarks=true

        }
        res.status(202).json({ bookmarks });
    } catch (error) {
        console.log(error)
        res.status(503).send({error:"server error"})
    }
}