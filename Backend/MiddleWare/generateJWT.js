const jwt = require ('jsonwebtoken'); 
const jwtpass = process.env.JWT_SECRET; 


async function GenerateJWT(person){


    return  jwt.sign( {username : person.username } , jwtpass);   



}

module.exports = GenerateJWT;    


