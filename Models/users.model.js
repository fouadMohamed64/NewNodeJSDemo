const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const  usersSchema = mongoose.Schema({
    userName: {
        type: String,
        minLength: [3 , 'User Must Be At Least 3 Chars'],
        maxLength: [20 , 'User Must At Most 20 Chars'],
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true,
        trim: true   
    },
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    },
    refreshToken:{
        type: String
    }
})

usersSchema.pre('save' , async function(){
    let salt = await bcrypt.genSalt(10);
    console.log(this)
    let hashedPassword = await bcrypt.hash(this.password , salt);
    this.password = hashedPassword;
})

const userModel = mongoose.model('users' , usersSchema);

module.exports = userModel;