const nodemailer = require("nodemailer");
const OTP = require("../model/database/OTP")
const User = require("../model/database/User")
const log = console.log;
exports.emailVerification = async(req,res,next) => {

  let email=req.body.email
  try {
    let user = await User.findOne({email})
    await OTP.findOneAndDelete({email})
    
    if (user.verified=="false"){

    

    let otp=`${Math.floor(100000 + Math.random() * 900000)}`
    let otpModel=new OTP({
        otp,
        email,
        
    })
    // otpModel.expire_at=new Date()
    otpModel.save()
    console.log(otp)
    // Step 1
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL || "walid.mahin1996@gmail.com", // TODO: your gmail account
        pass: process.env.PASSWORD || "", // TODO: your gmail password
      },
    });

    // Step 2
    let mailOptions = {
      from: "walid.mahin1996@gmail.com", // TODO: email sender
      to: email, // TODO: email receiver
      subject: "Email Verification",
      text: otp,
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return log(err);
      }
      return log("Email sent!!!");
    });
  }
  next()
  } catch (error) {
      console.log(error)
  }
};
