import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import userSchema from "../schema/user.schema.js";
import { validate } from "../utils/validate.js";
import { getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { userLogout } from "../controllers/user.controller.js";

const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    validate(userSchema.userRegistrationSchema),
    registerUser
)

//login route

router.route("/login").post(validate(userSchema.userLoginSchema),loginUser)

//get data
router.route("/get").get(verifyToken,getUser)

// protected route
router.route("/logout").post(verifyToken,userLogout)

export default router