import { User } from "../models/user.model.js";
import { ApiResponse } from "./ApiResponse.js";

export const generateAccessRefreshToken = async (userId) => {
    const user = await User.findById({ _id: userId })
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false});
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
    
}