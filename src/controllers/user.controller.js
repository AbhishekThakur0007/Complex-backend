import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body

    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (existedUser) {
        throw new ApiError(400, "User with email or username is already exist")
    }
    if (!req.files?.avatar) {
        throw new ApiError(400, "Avatar is required")
    }
    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverImageLocalpath = req.files?.coverImage[0]?.path

    const avatar = await uploadCloudinary(avatarLocalpath)
    const coverImage = await uploadCloudinary(coverImageLocalpath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }
    const user = await User.create({
        username:username.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImage.url,
        fullname,
        password

    })
    
const createdUser = await User.findById(user._id).select("-password -refreshTokken")
if(createdUser){
    res.status(200).json(
        new ApiResponse(200,createdUser,"User registerd successfully")
    )
}

 
})

export { registerUser }