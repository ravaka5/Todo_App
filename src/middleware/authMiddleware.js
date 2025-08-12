// Reading the token and checking if it's correct for this user
import jwt from "jsonwebtoken"

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(503).json({message:"no token provided"})
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err , decoded)=>{
        if(err){
            return res.status(401).json({message:"invalid token"})
        }
        req.userId = decoded.id
        next()
    })
}

export default authMiddleware
