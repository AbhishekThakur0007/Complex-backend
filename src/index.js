import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("ERROR", error)
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App is working in  :  http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection faild !!!`, error)
    })