const jwt = require('jsonwebtoken');
require('dotenv').config()

const AuthMiddleware=(req,res,next)=>{
        let token=req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).send({message:'Unauthenticated'})
        }
        else {

          const payload=   jwt.verify(token, process.env.JWT_SECRET)
                req.user = payload;
                next();

        }

}
module.exports={AuthMiddleware}