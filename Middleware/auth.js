
const jwt = require('jsonwebtoken');
const { promisify } = require('util')

exports.auth = async (req ,res ,next)=>{
    let { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({message: 'You must login first'})
    }
    try{
        // jwt.verify(authorization , 'myJsonWebTokenSecret' , function(){})
        let decoded = await promisify(jwt.verify)(authorization , 'myJsonWebTokenSecret')  // {id:user._id , email: user.email , role: user.role} 
        console.log(decoded);
        next();
    }catch(error){
        res.status(403).json({message: 'invalid token'})
    }

}