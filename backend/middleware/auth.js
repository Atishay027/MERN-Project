import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next)=>{
    
    //1. First we will take the token from user using headers 
    //2. Destructure the token from req.headers

    const {token} = req.headers;

    if(!token){
        return res.json({success:false,messsage:"Not Authorized, Login Again"})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET); //our token will be decoded
        //After decoded we will get the id; then set the id in req.body.userID
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,messsage:"Error"})
    }
}

export default authMiddleware