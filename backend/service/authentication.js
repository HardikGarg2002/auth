const bcrypt = require("bcrypt");
const {createUser,findUserHash,setActive} = require("../utils/userDB");


function signUp(user){
    // if(user.password!== user.re_password)  res.send("passwords do not match. Re-enter ur password");
    bcrypt.hash(user.password, 10, function(err, hash) {
            user.password = hash;
            createUser(user);
        });
    
}

async function signIn(user){
    // if(user.password!== user.re_password)  res.send("passwords do not match. Re-enter ur password");
    
    const hash = await findUserHash(user.email);
    

    if(await comparePassword(user.password, hash)){
       
        setActive(user.email);
        console.log("password is correct");
    }
    else console.log("password is in_correct");


}

async function comparePassword(a, b) {
    const result = await bcrypt.compare(a,b);
    return result;
}

module.exports = {signUp,signIn};