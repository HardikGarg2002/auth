import bcrypt from "bcrypt";
import { createUser, loginOrLogout, getOtp, getUser } from "../utils/userDB.js";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { User } from "../model/user_model.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "hardikgarg3085@gmail.com",
    pass: process.env.AUTH_PASS,
  },
});

async function signUp(userInput) {
  userInput.password = await hashPassword(userInput.password);

  const isExistingUser = await getUser({ email: userInput.email });
  if (isExistingUser) return isExistingUser._id;
  const newUser = await createUser({
    email: userInput.email,
    password: userInput.password,
  });
  console.log("new user created");
  return newUser._id;
}

async function signInWithPassword(email, password) {
  const existingUser = await getUser({ email });
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

async function signUpAndLogin(user) {
  const isExistingUser = await User.findOne({ email: user.email });
  if (!isExistingUser) {
    return signUp(user);
  }
  const token = await signIn(user);
  return token;
}

async function logOut(email) {
  await loginOrLogout(email, false, null);
}
async function comparePassword(a, b) {
  const result = await bcrypt.compare(a, b);
  console.log("password comparison result:", result);
  return result;
}

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
}

async function sendOtpViaMail(email, otp) {
  var mailOptions = {
    from: '"Example Team" <hardikgarg3085@gmail.com>',
    to: email,
    subject: "OTP verification",
    text: `Hey there, it’s our 5th message sent with Nodemailer ${otp}😉 `,
    html: `<b>Hey there! </b><br> This is our first message sent with Nodemailer  ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
async function saveOTP(email, otp) {
  try {
    console.log(email, otp);
    await User.updateOne({ email }, { $set: { otp } });

    console.log("OTP saved successfully.");
  } catch (error) {
    console.error("Error while saving OTP:", error);
  }
}

async function verifyOTP(email, otp) {
  try {
    console.log(email, otp);
    const dbotp = await getOtp(email);
    if (dbotp === otp) {
      console.log("OTP saved successfully.");
      return true;
    } else throw new error("otp validation failed");
  } catch (error) {
    console.error("Error while validating OTP:", error);
  }
}

export default {
  signUp,
  signInWithPassword,
  logOut,
  sendOtpViaMail,
  saveOTP,
  verifyOTP,
};
