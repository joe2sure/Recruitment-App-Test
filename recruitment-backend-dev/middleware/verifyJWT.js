import jwt from "jsonwebtoken";


const verifyJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
   

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRETY,
        (err, decoded)=>{
            if(err) return res.sendStatus(403)
            req.email = decoded.email;
           
        next()
        }
    )
}

export default verifyJWT