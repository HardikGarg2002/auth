import { User } from "../model/user_model.js";

async function createUser(user) {
  const newUser = new User({
    email: user.email,
    password: user.password,
  });

  return await newUser.save();
}
async function getUser(email) {
  const user = await User.findOne({ email: email }).exec();
  return user;
}
async function findUserHash(email) {
  const user = await User.findOne({ email: email }).exec();
  // console.log(user.token,3085665656);
  console.log(user, "dfsdfsdf");
  return user.password;
}

async function loginOrLogout(email, loggedIn, token) {
  // console.log("set active called");
  await User.updateOne(
    { email: email },
    { $set: { is_logged_in: loggedIn, token: loggedIn ? token : null } }
  );
  // await User.updateOne({})
}
async function getOtp(email) {
  const user = await User.findOne({ email: email });
  return user.otp;
}

export { createUser, findUserHash, loginOrLogout, getOtp, getUser };
