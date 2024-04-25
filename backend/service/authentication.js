import bcrypt from "bcrypt";
import {
  createUser,
  findUserHash,
  loginOrLogout,
  getOtp,
} from "../utils/userDB.js";
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
  const hashedPassword = await bcrypt.hash(userInput.password, 10);
  userInput.password = hashedPassword;
  const user = await createUser(userInput);
  return user._id;
}

async function signIn(email, password) {
  const hash = await findUserHash(email);
  console.log(email, password, hash);
  if (comparePassword(password, hash)) {
    const token = generateToken({ email, password });
    await loginOrLogout(email, true, token);

    console.log("password is correct");
    return token;
  }
  //  else throw new BussinessError("password is incorrect");
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
  return result;
}

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
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
    await User.updateOne({ email: email }, { $set: { otp: otp } });

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

export default { signUp, signIn, logOut, sendOtpViaMail, saveOTP, verifyOTP };
