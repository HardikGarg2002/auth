const router = express.Router();
const authHandler = require("../handler/auth_handler");

router.post("/signup", authHandler.signup);

router.post("/signin", authHandler.signin);

router.post("/logout", authHandler.logout);

router.post("/requestOtp", authHandler.generateOtp);

router.route("/verifyOtp").post(authHandler.verifyOtp);

module.exports = router;
