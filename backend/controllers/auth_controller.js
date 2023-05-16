// const User = require("../model/user_model");
// const mongoose = require("mongoose");
const {signUp,signIn} = require("../service/authentication")

async function signup(user){

   signUp(user);

}

const signin=(user)=>{

    signIn(user)
}


module.exports = {signup,signin} ;
