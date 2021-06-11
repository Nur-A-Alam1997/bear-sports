const {Schema, model} =require("mongoose")
const User = require("./User")
const profileSchema= new Schema({
    user:
    {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bio:
    {
        type:String,
        trim:true,
        maxlength:255,
        required:true
    },
    
    profilePic:
    {
        type:String,
    },


    products:
    [
        {
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    timestamps:{ type: Date, default: Date.now }
})


const Profile = model("Profile",profileSchema)

module.exports=Profile