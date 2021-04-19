const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength:6
    }
})

const User = mongoose.model('user',userSchema);

module.exports={User}