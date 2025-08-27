
const jwt = require('jsonwebtoken');
const { promisify } = require('util')

exports.auth = async (req ,res ,next)=>{
    let { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({message: 'You must login first'})
    }
    try{
        // jwt.verify(authorization , 'myJsonWebTokenSecret' , function(){})
        let decoded = await promisify(jwt.verify)(authorization , process.env.SECRET)  // {id:user._id , email: user.email , role: user.role} 
        // console.log(decoded);
        req.role = decoded.role;
        // req.id = decoded.id;
        next();
    }catch(error){
        res.status(403).json({message: 'invalid token'})
    }

}


exports.restrictTo = (...roles)=>{  // ['user', 'admin']   , ['admin']

    return (req , res , next)=>{
        
        if(!roles.includes(req.role)){
            return res.status(403).json({message: 'you are not authorized'})
        }else{
            next();
        }
    }
}