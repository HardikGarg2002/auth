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

