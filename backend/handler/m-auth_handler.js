import * as m_authController from "../controllers/m-auth_controller.js";

export async function signup(req, res, next) {
  try {
    const { mobile, password } = req.body;
    console.log(mobile, password);
    const userId = await m_authController.signup(mobile, password);
    res.status(201).json({ message: "user created successfully", id: userId });
  } catch (err) {
    next(err);
  }
}

export async function passSignin(req, res, next) {
  try {
    const { mobile, password } = req.body;
    const token = await m_authController.passSignin(mobile, password);
    res.status(201).json({ message: "user logged in succesfully", token });
  } catch (err) {
    next(err);
  }
}
export async function otpSignin(req, res, next) {
  try {
    const { mobile, otp } = req.body;
    const token = await m_authController.otpSignin(mobile, otp);
    res.status(201).json({ message: "user logged in succesfully", token });
  } catch (err) {
    next(err);
  }
}

export async function otpSignupSignin(req, res, next) {
  try {
    const { mobile, otp } = req.body;
    const token = await m_authController.otpSignupSignin(mobile, otp);
    res
      .status(201)
      .json({ message: "user created and logged in succesfully", token });
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { mobile, otp } = req.body;
    await m_authController.verifyOtp(req.body);
    res.send("otp validated");
  } catch (err) {
    next(err);
  }
}

export async function generateOtp(req, res, next) {
  try {
    const { mobile } = req.params;
    const otp = await m_authController.generateOtp(mobile);
    res.send(otp);
  } catch (err) {
    next(err);
  }
}
