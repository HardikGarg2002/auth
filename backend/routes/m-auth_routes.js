import express from "express";
const router = express.Router();
import * as moHandler from "../handler/m-auth_handler.js";

router.post("/signup", moHandler.signup);

router.post("/psignin", moHandler.passSignin);

router.post("/osignin", moHandler.otpSignin);

router.get("/otp/:mobile", moHandler.generateOtp);

router.post("/verifyOtp", moHandler.verifyOtp);

export default router;
