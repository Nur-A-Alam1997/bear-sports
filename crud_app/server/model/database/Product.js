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
    category:{
        type:String,
        required:true,
    },
    condition:{
        type:String,
        required:true,
    },
    location:{
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
    like:
    [{        
    type:Schema.Types.ObjectId,
    ref:"User"
    }],
    dislike:
    [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:[
        {type: Schema.Types.ObjectId,
        ref:"Comment"}],
    timestamps:{ type: Date, default: Date.now }
    
})

// productSchema.index({
//     title:"text",
//     category:"text",
//     condition:"text",
//     location:"text"
// },{
//     weights:{
//         title:5,
//         category:5,
//         location:5
//     }
// })


const Product = model("Product",productSchema)

module.exports=Product