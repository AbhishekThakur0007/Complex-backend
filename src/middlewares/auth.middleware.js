import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export  const verifyToken = asyncHandler(async(req,res,next)=>{
   const accessToken = req.cookies?.accessToken || req.header("Authraizations")?.replace("Bearer " ,"")
  
   if(!accessToken){
    throw new ApiError(400,"user not authraized")
   }
   console.log("sdfxcdfc")

   const decodeToken = await jwt.verify(accessToken,process.env.ACCESS_TOKKEN_SECERET)
   const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
   if(!user){
    throw new ApiError(401,"Unauthraized user")
   }
   req.user= user;
   next();
})