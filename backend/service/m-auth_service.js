import { createUser, loginOrLogout, getUser } from "../utils/userDB.js";
import { hashPassword } from "./base_service.js";

export async function signup(mobile, password) {
  if (password) {
    password = await hashPassword(password);
  }
  const isExistingUser = await getUser({ mobile });
  if (isExistingUser) return isExistingUser._id;
  const newUser = await createUser({ mobile: mobile, password });
  console.log("new user created");
  return newUser._id;
}

export async function passSignin(mobile, password) {
  const existingUser = await getUser({ mobile });
  if (existingUser.is_deleted) throw new Error("user is deleted");
  if (!existingUser.is_verified) throw new Error("user is not verified");
  if (existingUser.password === null || !existingUser.password)
    throw new Error("user is not registered with password, try login with otp");
  console.log(email, password, existingUser.password);
  if (!(await comparePassword(password, existingUser.password))) {
    throw new Error("password is incorrect");
  }

  const token = generateToken(existingUser._id);
  await loginOrLogout(email, true, token);

  console.log("password is correct");
  return token;
}

export async function signInWithOTP(mobile, otp) {
  const existingUser = await getUser({ mobile });
  if (existingUser.is_deleted) throw new Error("user is deleted");
  if (!existingUser.is_verified) throw new Error("user is not verified");
  if (!existingUser.otp)
    throw new Error("user is not registered with otp, try login with password");
  if (existingUser.otp !== otp) throw new Error("otp is incorrect");

  const token = generateToken(existingUser._id);
  await loginOrLogout(email, true, token);

  console.log("otp is correct");
  return token;
}

export async function otpSignupSignin(user) {
  const isExistingUser = await getUser({ mobile: user.mobile });
  if (!isExistingUser) {
    return signup(user);
  }
  const token = await signIn(user);
  return token;
}
