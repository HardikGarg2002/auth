const express=require("express");
const router=express.Router();
const authController = require("../controllers/auth_controller");


router.post("/signup", (req,res)=>{
    // const { name, email,password ,re_password } = req.body;
    // console.log(name,email,password ,re_password);
    authController.signup(req.body);
    res.send('user registered succesfully')
});

router.post("/signin",async (req,res)=>{
    const { email, password } = req.body;
    // alert(req.body.name);
    console.log(email,password);
    const token = await authController.signin(req.body);
    console.log("fuck u ",token)
    res.status(201).send(token);
});
// 'user logged in succesfully',


router.post("/logout",async (req,res)=>{
    const { email, password } = req.body;
    
    console.log(email,password);
    await authController.logout(req.body);
    res.send('user logged out succesfully')
});

router.post("/requestOtp", (req,res)=> { 
    const { email} = req.body;
    authController.generateOtp(email);
    res.status(201).send('otp send successfully');

})

router.route('/verifyOtp').post(authController.verifyOtp);

module.exports = router;
