const {Schema, model} =require("mongoose")

const profileSchema= new Schema({
    user:
    {
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    bio:
    {
        type:String,
        trim:true,
        maxlength:20,
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


const Profile = model("Product",profileSchema)

module.exports=Profile