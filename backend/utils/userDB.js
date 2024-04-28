import { User } from "../model/user_model.js";

async function createUser(user) {
  const newUser = new User(user);
  return await newUser.save();
}
async function getUser(filter) {
  const user = await User.findOne(filter).exec();
  return user;
}
async function loginOrLogout(email, loggedIn, token) {
  // console.log("set active called");
  await User.updateOne(
    { email: email },
    { $set: { is_logged_in: loggedIn, token: loggedIn ? token : "" } }
  );
}
async function getOtp(email) {
  const user = await User.findOne({ email: email });
  return user.otp;
}

export { createUser, loginOrLogout, getOtp, getUser };
