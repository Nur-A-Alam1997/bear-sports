const {model,Schema} =require ("mongoose")


const otpSchema = new Schema({
    otp:{
        type:String,
    },
    email:
    {
        type:String
    },
    expire_at: {
        type: Date,
        default: Date.now(),
        expires: 600
    }
}, { timestamps: true })

otpSchema.index({ "expire_at": 1 }, { expireAfterSeconds: 5 });
const OTP = model("OTP",otpSchema)
module.exports=OTP