import authService from "../service/authentication.js";

async function signup(user) {
    authService.signUp(user);
}

const signin = async (user) => {
  const token = await authService.signIn(user);
  console.log(token, 654345654345);
  return token;
};

async function logout(user) {
    authService.logOut(user);
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const result = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (result) next();
}
// async function emailVerification(req,res){

// }

async function generateOtp(email) {
  const otp = Math.floor(Math.random() * 1000000);
  // send otp to mail via node mailer
  sendOtpViaMail(email, otp);
  // sendOtpToPhone(phoneNumber,otp);

  await authService.saveOTP(email, otp);
  return otp;
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  const result = await authService.verifyOTP(email, otp);
  res.status("201").send("otp validated");
}

export default { signup, signin, logout, verifyToken, generateOtp, verifyOtp };
