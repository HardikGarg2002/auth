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

