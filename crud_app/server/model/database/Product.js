const User = requre("./User")
const { Schema, model} = requre("mongoose")  
const productSchema = new Schema({
    price:{
        type:Int16Array,
        require:true
    },
    descripton:
    {
        type:String,
        maxlength:55,
        trim:true,
        requred:true
    },
    image:
    {
        type:String,
        requre:true
    },
    vendor:
    {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    timestamps:{ type: Date, default: Date.now }
    
})
const Product = model("Product",productSchema)

module.exports=Product