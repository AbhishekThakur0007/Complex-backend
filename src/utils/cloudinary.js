import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET
});

const uploadCloudinary = async (localfilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        })
        //file is uploaded successfuly in cloudinary
        console.log('file uploaded successfuly in cloudinary :', response)
        return response;
    } catch (error) {

    }
}