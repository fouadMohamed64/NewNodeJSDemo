
const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [3 , 'Todo Must Be At Least 3 Chars'],
        maxLength: [20 , 'Todo Must At Most 20 Chars'],
        required: true
    },
    status:{
        type: String,
        enum: ['Todo' , 'In-Progress' , 'Done'],
        default: 'Todo'
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    }
})

const todoModel = mongoose.model('todos' , todosSchema);
module.exports = todoModel;

// Todo - In-Progress - Done
// Default Todo