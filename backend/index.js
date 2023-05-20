const express= require("express");
const app =express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const {initDB,disconnectDB} = require("./utils/dbutils");

initDB();


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require('./routes/authRoutes')


app.use("/auth",authRouter);

const User = require("./model/user_model");
app.get("/finduser",async(req,res)=>{
    const email = req.body.email;
    const user = await User.findOne({ email: email });
      console.log(user.otp);
      res.send(user);
})
app.get("/",(req,res)=>{
    console.log(req.email);
    res.send("in home page")

})


// app.use("/signup",authRouter);



app.listen(PORT,()=>{
        console.log("listening at port " + PORT)
        
})