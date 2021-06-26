const {model,Schema} =require ("mongoose")


const otpSchema = new Schema({
    otp:{
        type:String,
    },
    email:{type:String},
    createdAt: { type: Date, expires: '10m', default: Date.now }
    
})

const OTP = model("OTP",otpSchema)
module.exports=OTP