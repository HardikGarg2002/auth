import authController from "../controllers/auth_controller.js";

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userId = await authController.signup(email, password);
    res.status(201).json({ message: "user created successfully", id: userId });
  } catch (err) {
    next(err);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authController.signin(req.body);
    res.status(201).json({ message: "user logged in succesfully", token });
  } catch (err) {
    next(err);
  }
}
async function logout(req, res, next) {
  try {
    const { email, password } = req.body;
    await authController.logout(req.body);
    res.status(200).json("user logged out succesfully");
  } catch (err) {
    next(err);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;
    await authController.verifyOtp(req.body);
    res.send("otp validated");
  } catch (err) {
    next(err);
  }
}

async function generateOtp(req, res, next) {
  try {
    const { email } = req.body;
    const otp = await authController.generateOtp(email);
    res.send(otp);
  } catch (err) {
    next(err);
  }
}

export default { signup, signin, logout, verifyOtp, generateOtp };
