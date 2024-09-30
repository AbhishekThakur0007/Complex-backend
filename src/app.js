import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();


// use cors for use the backend with fronend
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))

//middleware for accept the json 
app.use(express.json({limit:"6kb"}))
//middleware for url encoding
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//middleware for images
app.use(express.static("public"))
//use cookiparser for read and delete cookies from browser
app.use(cookieParser())


//routes import 
import userRoutes from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRoutes)


app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        })
    }
})
export {app}