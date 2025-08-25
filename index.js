const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRoutes = require('./Routes/todos.routes');
const usersRoutes = require('./Routes/users.routes');

const app = express();

// app.use(function(req ,res, next){
//     console.log('from custom middleware');
//     next();
// })

// middleware
app.use(cors({
    origin: '*',
    methods: '*'
}))

app.use(express.json())

app.use('/todos' , todosRoutes );
app.use('/users' , usersRoutes );
app.use(express.static('./Static'))
// not found middleware
app.use('/' , function(req ,res ){
    res.status(404).json({message: `this ${req.url} in not found`})
})


// var validator = require('validator');

// console.log(validator.isEmail('foobar.com'))

// url/hello => hello World

// app.get('/hello' , (req , res)=>{
//     // console.log(req)
//     // console.dir(req, {depth: true})
//     res.status(200).send('Hello World');
// })

// console.log('argv0' , process.argv0)

// 

// endpoint Users


mongoose.connect('mongodb://127.0.0.1:27017/schoolTwo')
    .then(()=>{console.log('Connected To DB Successfully')})
    .catch((error)=>{console.log(error)})


const port = 3333;
app.listen(port , ()=>{
    console.log(`Connected Successfully On Port ${port}`)
})