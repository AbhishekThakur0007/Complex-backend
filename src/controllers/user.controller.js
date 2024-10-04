import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessRefreshToken } from "../utils/tokens.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body
    console.log("in db")
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
    let coverImageUrl = null;
    if (req.files.coverImage) {
        const coverImageLocalpath = req.files.coverImage[0].path
        const coverImage = await uploadCloudinary(coverImageLocalpath)
        coverImageUrl = coverImage.url
    }
    const avatarLocalpath = req.files?.avatar[0]?.path
    const avatar = await uploadCloudinary(avatarLocalpath)


    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImageUrl,
        fullname,
        password

    })

    const createdUser = await User.findById(user._id).select("-password -refreshTokken")
    if (createdUser) {
        res.status(200).json(
            new ApiResponse(200, createdUser, "User registerd successfully")
        )
    }


})


const loginUser = asyncHandler(async (req, res) => {
    //get data = req.body
    //check fields are not empity 
    //find user
    //check password
    //access token and refresh token
    const { username, email, password } = req.body;



    const user = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!user) {
        throw new ApiError(401, "user not exist please signup")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Please insert correct password")
    }
    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id)

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedinUser, accessToken, refreshToken
                },
                "User login successfully"
            )
        )
})

const userLogout = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: ""
            }
        },
        {
            new: true
        }
    )

    console.log("logout ------", user)
    const options = {
        httpOnly: true,
        secure: true
    }


    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

// const 


const getUser = asyncHandler(async (req, res, next) => {
    console.log("--------", req.user)
})

export { registerUser, loginUser, getUser, userLogout }