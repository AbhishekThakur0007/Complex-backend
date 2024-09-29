import express from "express";
import cors from cors;
import cookieParser from "cookie-parser";

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

export {app}