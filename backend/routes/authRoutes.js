import express from "express";
const router = express.Router();
import authHandler from "../handler/auth_handler.js";

router.post("/signup", authHandler.signup);

router.post("/signin", authHandler.signin);

router.post("/logout", authHandler.logout);

router.post("/requestOtp", authHandler.generateOtp);

router.route("/verifyOtp").post(authHandler.verifyOtp);

export default router;
