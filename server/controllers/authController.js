import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
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
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    color: #333;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                    color: #5c6bc0;
                  }
                  p {
                    font-size: 16px;
                    line-height: 1.5;
                  }
                  .button {
                    display: inline-block;
                    padding: 12px 20px;
                    background-color: #5c6bc0;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-top: 20px;
                  }
                  .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 12px;
                    color: #999;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Welcome to Imagify!</h1>
                  <p>Dear user,</p>
                  <p>Your account has been successfully created with Imagify. We are excited to have you on board and we hope you enjoy using our services.</p>
                  <p>If you have any questions, feel free to <a href="https://text-to-image-convertor-frontend.onrender.com/" class="button">contact us</a>.</p>
                  <p>Thank you for joining Imagify!</p>
                  <p>Best regards,<br/>The Imagify Team</p>
                </div>
                <div class="footer">
                  <p>Imagify, All rights reserved</p>
                </div>
              </body>
            </html>
          `,
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