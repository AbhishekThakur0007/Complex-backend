import { asyncHandler } from "./asyncHandler.js"

export const validate = (schema) => {
    let errorMessage = "";
    let allError = [];
    return asyncHandler((req, res, next) => {
        if (schema.body) {
            const result = schema.body.validate(req.body, { abortEarly: false })
            errorMessage = result?.error?.details[0].message 
            allError = result?.error?.details.map((error)=> error.message)      
        }
        if(errorMessage){
           return res.status(400).json({
                success:false,
                message:errorMessage,
                allError
            })
        }
        next();
    })
}