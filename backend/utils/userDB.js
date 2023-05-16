const User = require("../model/user_model");


async function createUser(user){
    const newUser = new User({
        name : user.name,
        email: user.email,
        password : user.password
    })

    await newUser.save();
}

 async function findUserHash(mail){
    const user = await User.findOne({email : mail}).exec();
    
    return user.password;
    
}
async function setActive(email){
    console.log("set active called");
    await User.updateOne({email : email} , { $set: { isActive : true } });
    
}




module.exports={createUser,findUserHash,setActive};