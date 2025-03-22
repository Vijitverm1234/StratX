import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { json, response } from 'express';
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ msg: "failed to register" })
  }

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: "user already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new userModel({
      name, email, password: hashedPassword
    })
    await user.save()
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
      ,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Imagify',
      text: 'Welcome to Imagify your account has been created I hope that you will have good exprience with us ',
      html: `
           <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #6a11cb, #2575fc);
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        text-align: center;
      }
      h1 {
        color:rgb(255, 255, 255);
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
      }
      .button {
        display: inline-block;
        padding: 14px 24px;
        background-color: #5c6bc0;
        color: white;
        text-decoration: none;
        font-size: 16px;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
        transition: background 0.3s ease;
      }
      .button:hover {
        background-color: #3f51b5;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #ddd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://via.placeholder.com/100" alt="Imagify Logo" style="width: 80px; margin-bottom: 15px;" />
      <h1>Welcome to Imagify!</h1>
      <p>Dear user,</p>
      <p>Congratulations! Your account has been successfully created with <b>Imagify</b>. We are thrilled to have you on board and hope you enjoy our services.</p>
      <p>If you have any questions, feel free to reach out to us.</p>
      <a href="https://text-to-image-convertor-frontend.onrender.com/" class="button">Get Started</a>
      <p>Thank you for choosing Imagify!</p>
      <p>Best regards,<br/><strong>The Imagify Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Imagify, All rights reserved.</p>
    </div>
  </body>
</html>`
,
    }
    await transporter.sendMail(mailOption)
    return res.json({ success: true })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ msg: "Email and password are required" })
  }
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, msg: "invalid email" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, msg: "invalid password" })
    }
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
      ,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.json({ success: true })
  } catch (error) {
    return res.json({ msg: error.message })
  }
}
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })
    return res.json({ success: true, message: "Logged out" })
  } catch (error) {
    return res.json({ msg: error.message })
  }
}
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, msg: "Already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email, 
      subject: 'Welcome to Imagify',
      text: `Your OTP is ${otp}. Verify your email using this OTP.`,
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, msg: "Verification OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    res.json({ success: false, msg: "missing details" })
  }
  try {
    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, msg: "user not found" })
    }
    if(user.verifyOtp==''||user.verifyOtp!==otp){
      return res.json({ success: false, msg: "invalid otp" })
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({ success: false, msg: "OTP Expired" })
    }
    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0; await user.save()
    return res.json({ success: true, msg: "email verified" })
  } catch (error) {
    res.json({ success: false, msg:error.message })
  }
} 

export const isAuthenticated=async(req,res)=>{
   try {
    return res.json({success:true})
     } catch (error) {
    res.json({ success: false, msg:error.message })
   }
}
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, msg: "Email is Required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. Use this OTP to reset your password.`,
    };

    await transporter.sendMail(mailOption);
    await user.save();

    return res.json({ success: true, msg: "OTP Sent" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { otp, email, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, msg: "Enter the OTP and new password" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.json({ success: false, msg: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, msg: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = null;

    await user.save();
    return res.json({ success: true, msg: "New password added" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
