import { User } from "../model/user_model.js";

async function createUser(user) {
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  await newUser.save();
}
async function getUser(email) {
  const user = await User.findOne({ email: email }).exec();
  return user;
}
async function findUserHash(email) {
  const user = await User.findOne({ email: email }).exec();
  // console.log(user.token,3085665656);
  return user.password;
}

async function setActive(email, a, token) {
  // console.log("set active called");
  await User.updateMany(
    { email: email },
    { $set: { isActive: a, token: token } }
  );
  // await User.updateOne({})
}
async function getOtp(email) {
  const user = await User.findOne({ email: email });
  return user.otp;
}

export { createUser, findUserHash, setActive, getOtp, getUser };
