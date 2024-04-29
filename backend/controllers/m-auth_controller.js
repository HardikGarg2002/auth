import * as m_authService from "../service/m-auth_service.js";

export async function signup(mobile, password) {
  // password is optinal but depends on system configuration to allow signup without password
  return await m_authService.signup(mobile, password);
}
// The above function will take care of otp signup
// async function otpSignup(mobile) {
//   const user = { mobile };
//   return await m_authService.signup(user);
// }

export const passSignin = async (mobile, password) => {
  const token = await m_authService.passSignin(mobile, password);
  return token;
};

export const otpSignin = async (mobile, otp) => {
  const token = await m_authService.signInWithOTP(mobile, otp);
  return token;
};

export async function otpSignupSignin(user) {
  const token = await m_authService.otpSignupSignin(user);
  return token;
}

export async function generateOtp(mobile) {
  const otp = Math.floor(Math.random() * 1000000);
  // send otp through sms via twilio
  
  sendOtpToPhone(phoneNumber,otp);

  await m_authService.saveOTP(mobile, otp);
  //   return otp;
  return 123456;
}

export async function verifyOtp(req, res) {
  const { mobile, otp } = req.body;
  //   const result = await m_authService.verifyOTP(mobile, otp);
  if (otp !== "123456") throw new Error("incorrect otp");
  res.status("201").send("otp validated");
}
