import jwt from "jsonwebtoken";
const userAuth=async(req,resizeBy,next)=>{
    const {token}=req.cookies;
    if(!token){
        resizeBy.json({success:false,message:'not authorised login again'})
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id
        }
        else{
            return resizeBy.json({success:false,msg:"not authorized"})
        }
        next()
    } catch (error) {
        return resizeBy.json({success:false,msg:error.message})
    }
}
export default userAuth;