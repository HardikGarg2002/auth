import bcrypt from "bcrypt";
import {
  createUser,
  findUserHash,
  setActive,
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

function signUp(user) {
  // if(user.password!== user.re_password)  res.send("passwords do not match. Re-enter ur password");
  bcrypt.hash(user.password, 10, function (err, hash) {
    user.password = hash;
    createUser(user);
  });
}

async function signIn(user) {
  // if(user.password!== user.re_password)  res.send("passwords do not match. Re-enter ur password");

  const hash = await findUserHash(user.email);

  if (comparePassword(user.password, hash)) {
    const token = generateToken(user);
    setActive(user.email, true, token);

    console.log("password is correct");
    return token;
  } else console.log("password is in_correct");
}

async function logOut(user) {
  await setActive(user.email, false, null);
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
