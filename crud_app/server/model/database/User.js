const {Schema, model} =require("mongoose")

const userSchema= new Schema({
    name:
    {
        type:String,
        trim:true,
        maxlength:30,
        required:true
    },
    email:
    {
        type:String,
        trim:true,
        maxlength:30,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    profile:
    {
        type:Schema.Types.ObjectId,
        ref:"Profile"//"Profile"
    },
    profilePic:
    {
        type:String,
        default:"/img/user.png",
    },
    timestamps:{ type: Date, default: Date.now }
})


const User = model("User",userSchema)
module.exports=User