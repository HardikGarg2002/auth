import { genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

export const IUserRole = {
  USER: "user",
  ADMIN: "admin",
};

const authUserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  is_logged_in: {
    type: Boolean,
    default: false,
  },
  verified: {
    email: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  required_verification: [
    {
      type: String,
      enum: ["email", "mobile", "google"],
    },
  ],
  otps: {
    email: {
      otp: {
        type: Number,
        default: null,
      },
      expiry: {
        type: Date,
        default: null,
      },
    },
    otp: {
      type: Number,
      default: null,
    },
    expiry: {
      type: Date,
      default: null,
    },
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: [IUserRole.USER, IUserRole.ADMIN],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  token: {
    type: String,
    default: null,
  },
});

authUserSchema.pre("save", async function (next) {
  try {
    if (!this.password || !this.isModified("password")) {
      next();
      return;
    }
    const encryptedPassword = await hashPassword(this.password);
    this.password = encryptedPassword;
    next();
  } catch (error) {
    console.error("Error while saving user", error);
    next(error);
  }
});

const hashPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const User = model("User", authUserSchema);
