// const User = require("../model/user_model");
// const mongoose = require("mongoose");
const {signUp,signIn,logOut} = require("../service/authentication")

async function signup(user){

   signUp(user);

}

const signin = async (user)=>{

    const token = await signIn(user);
    console.log(token,654345654345);
    return token;
    
}

async function logout(user){

    logOut(user);
 
 }

module.exports = {signup,signin,logout} ;
