const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
        // validate: {
        //     validator: function(v) {
        //         return /^[a-zA-Z0-9 ]*$/.test(v);
        //     },
        //     message: (props) =>
        //         `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
        // },
    },
    email: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
        lowercase: true,
        immutable: true,
        // validate: {
        //     validator: function(email) {
        //         var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //         return re.test(email);
        //     },
        //     message: (props) => `${props.value} is not a valid email! `,
        // },
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function(password) {
        //         var re =
        //             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //         return re.test(password);
        //     },
        //     message: (props) =>
        //         `${props.value} need to be atleast 8 characters long contains at least a uppercase char, a lowercase char, a number and a special character(@$!%*?&)`,
        // },
    },
    joinedOn: {
        type: Date,
        default: Date.now(),
        immutable: true,
      },
      
    isActive : {
        type : Boolean,
        default : false
    },
    token : {
        type : String,
        default : null
    },
    otp: { 
        type : Number,
        default: null
    }

});

module.exports = mongoose.model("User", UserSchema);