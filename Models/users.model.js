const mongoose = require('mongoose');

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
    }
})

const userModel = mongoose.model('users' , usersSchema);

module.exports = userModel;