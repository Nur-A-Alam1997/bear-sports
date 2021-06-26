const nodemailer = require("nodemailer");
const OTP = require("../model/database/OTP")
const log = console.log;
exports.emailVerification = async(req,res,next) => {
  try {

    let otp=`${Math.floor(100000 + Math.random() * 900000)}`
    let otpModel=new OTP({
        otp
    })
    otpModel.save()
    console.log(otp)
    // Step 1
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL || "walid.mahin1996@gmail.com", // TODO: your gmail account
        pass: process.env.PASSWORD || "walid8043", // TODO: your gmail password
      },
    });

    // Step 2
    let mailOptions = {
      from: "walid.mahin1996@gmail.com", // TODO: email sender
      to: "nuraalamp@gmail.com", // TODO: email receiver
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
    next()
  } catch (error) {
      console.log(error)
  }
};
