import express from "express";
import { initDB, disconnectDB } from "./utils/dbutils.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

initDB();
app.use(express.json());
// app.use(urlencoded({ extended: true }));

app.use("/auth", authRouter);

// app.get("/finduser",async(req,res)=>{
//     const email = req.body.email;
//     const user = await findOne({ email: email });
//       console.log(user.otp);
//       res.send(user);
// })
app.get("/", (req, res) => {
  console.log(req.email);
  res.send("in home page");
});

// app.use("/signup",authRouter);

app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});
