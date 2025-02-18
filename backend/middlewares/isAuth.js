const jwt = require('jsonwebtoken')

const isAuthenticated = async(req,res,next)=>{
    
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1]
    // !Verify the token
    const verifyToken = jwt.verify(token,'pavandas',(err,decoded)=>{
      // console.log(decoded)  
      if(err){
        return false;
      }else{
        return decoded;
      }
    })
    if(verifyToken){
        // ! Save the user request object
        req.user = verifyToken.id;
        next();
    }else{
      const err = new Error("Token expired,login again")
      next(err);
    }
    // console.log(verifyToken);
    
    
}



module.exports = isAuthenticated;