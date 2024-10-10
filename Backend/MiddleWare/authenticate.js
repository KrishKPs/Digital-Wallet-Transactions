const jwt = require ('jsonwebtoken' ) 
const jwtpass = process.env.JWT_SECRET     


function Authenticate (req, res ,next) {

    const token = req.headers.authorization; 

    if (!token ) {

        res.json ({ msg : 'Token not found!'})   
        return ; 
    }

    try {

        const decoded = jwt.verify(token , jwtpass);     
        req.username = decoded.username;     
        next();  
    } catch (error) {

        res.json ({ msg : 'Invalid Token!'})   
        return ; 
    }   

}

module.exports = Authenticate;   