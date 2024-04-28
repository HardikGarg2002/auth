import express from "express";
const router = express.Router();
import * as moHandler from "../handler/m-auth_handler.js";

router.post("/signup", moHandler.signup);


