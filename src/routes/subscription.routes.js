import express from "express"
import subscriptions from "../controllers/subscription.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

 const router = express.Router();

router.route("/subscribe").post(verifyToken,subscriptions.subscribeController)

export default router;

