import express from "express";
const router = express.Router();
import * as authGoogleHandler from "../handler/express/auth-google-handler";

//signin with google SSO.
router.route("/signin").get(authGoogleHandler.signin);
router.route("/url").get(authGoogleHandler.getGoogleOAuthUrl);

export default router;
