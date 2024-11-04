import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const subscribeController = asyncHandler(async (req,res)=>{
    console.log(req.user)
})

const subscriptions = {subscribeController}
export default subscriptions;