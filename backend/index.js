const express= require("express");
const app =express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const {initDB,disconnectDB} = require("./utils/dbutils");
console.log("is the server running")
initDB();


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require('./routes/authRoutes')


app.use("/",authRouter);

app.get("/",(req,res)=>{
    res.send("in home page")
})


app.use("/",authRouter);
// app.use("/signup",authRouter);





app.listen(PORT,()=>{
        console.log("listening at port " + PORT)
        
})