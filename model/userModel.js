import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : false
    },

    password : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    birthday : {
        type : String,
        required : true,
    },

    role : {
        type : String,
        required : true,
        default : 'customer'
    }
})

const User = mongoose.model('users',userSchema);

export default User;