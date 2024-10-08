import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET
});

export const uploadCloudinary = async (localfilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        })
       fs.unlinkSync(localfilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localfilePath)
    }
}