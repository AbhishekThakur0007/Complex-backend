# Prectice for complex backend

This is a prectice for complex backend with node


1--dotenv file
<!-- import dotenv in root index file and config  -->

<!-- import connectDB from "./db/index.js";

 dotenv.config({
    path: './env'
 }) -->

2--database connection in index.js file 

<!-- 
      import express from "express"
      const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // if express not able to connect with db ,in that case throw error
        app.on("error", (error) => {
            console.log("ERROR", error)
        })

        //listen app in port
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening in port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR :", error)
        throw error
    }
})() -->


3--Database connection in db/index.js file 

<!-- import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MongoDb connected !! DB HOST:${connectionInstance.connection.host} `)
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR:" , error)
        process.exit(1)
    }
}

export default connectDB; -->


important middlewares 
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