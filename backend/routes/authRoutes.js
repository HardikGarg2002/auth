const express=require("express");
const router=express.Router();
const authController = require("../controllers/auth_controller");


router.post("/signup", (req,res)=>{
    // const { name, email,password ,re_password } = req.body;
    // console.log(name,email,password ,re_password);
    authController.signup(req.body);
    res.send('user registered succesfully')
});

router.post("/signin",(req,res)=>{
    const { email, password } = req.body;
    // alert(req.body.name);
    console.log(email,password);
    authController.signin(req.body);
    res.send('user logged in succesfully')
});

module.exports = router;
