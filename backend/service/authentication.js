const bcrypt = require("bcrypt");
const {createUser,findUserHash,setActive} = require("../utils/userDB");
const jwt = require("jsonwebtoken");



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
    

    if(comparePassword(user.password, hash)){
       
        const token = generateToken();
        setActive(user.email,true,token);
        
        console.log("password is correct");
        return token;
    }
    else console.log("password is in_correct");

}


async function logOut(user){
    await setActive(user.email,false,null);
}
async function comparePassword(a, b) {
    const result = await bcrypt.compare(a,b);
    return result;
}

function generateToken(){
    return jwt.sign({ foo: 'bar' }, 'shhhhh');
}

module.exports = {signUp,signIn,logOut};