const express=require("express");
const router=express.Router();
const authController = require("../controllers/auth_controller");


router.post("/auth/signup", (req,res)=>{
    // const { name, email,password ,re_password } = req.body;
    // console.log(name,email,password ,re_password);
    authController.signup(req.body);
    res.send('user registered succesfully')
});

router.post("/auth/signin",async (req,res)=>{
    const { email, password } = req.body;
    // alert(req.body.name);
    console.log(email,password);
    const token = await authController.signin(req.body);
    console.log("fuck u ",token)
    res.status(201).send(token);
});
// 'user logged in succesfully',


router.post("/auth/logout",async (req,res)=>{
    const { email, password } = req.body;
   
    console.log(email,password);
    await authController.logout(req.body);
    res.send('user logged out succesfully')
});

module.exports = router;
