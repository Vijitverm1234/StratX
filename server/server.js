import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
const app=express()
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))

app.get('/',(req,res)=>{
    res.send("server is created succefully")
})
app.listen(4000,()=>{
    console.log("server running on port 4000")
})