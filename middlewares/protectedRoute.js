const jwt=require('jsonwebtoken')
const User = require('../models/user.model');
exports.protectedRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:'Unauthorized - No token provided'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:'Unauthorized - Invalid token '})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({ error: "User not exists!!" });
        }
        req.user=user;
        next()

    }catch (err) {
    console.log("Error in Protected Router",err.message);
     res.status(500).json({ error: "Internal Server error" });
  }
}