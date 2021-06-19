const { Schema, model} = require("mongoose")  
const Profile = require("./Profile")
const productSchema = new Schema({
    user:
    {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:
    {
        type:String,
        maxlength:255,
        trim:true,
        required:true
    },
    images:
    [
        {type:String,
        required:true}
    ],
    profile:
    {
        type: Schema.Types.ObjectId,
        ref:"Profile",
        // required:true
    },
    timestamps:{ type: Date, default: Date.now }
    
})
const Product = model("Product",productSchema)

module.exports=Product