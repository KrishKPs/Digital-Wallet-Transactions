const GenerateJWT = require("../../MiddleWare/generateJWT");
const { user } = require("../../db");
const bcrypt = require('bcrypt');    



async function login (req, res) {

      const person = req.body;   
      
      const UserExist = await user.findOne ({ username : person.username});  

      if (!UserExist) {
            res.json ({msg : 'Invalid Username!'}); 
            return ;    
      }

      const passwordCheck = await bcrypt.compare(person.password , UserExist.password);     

      if (!passwordCheck) {
            res.json ({msg : 'Invalid Password!'}); 
            return ;    

      }

      const token = await GenerateJWT(person);     

        res.json({ msg : 'Login Successful!' , token : token});      

 }

 module.exports     = login;     