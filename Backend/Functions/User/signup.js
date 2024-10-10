const GenerateJWT = require("../../MiddleWare/generateJWT");
const { user } = require("../../db");
const { UserSchema } = require("../../type");
const bcrypt = require('bcrypt');    



async function  signup ( req, res) {

    const person= req.body ;
    const safePerson = UserSchema.safeParse(person); 


    console.log (person); 

    if(!safePerson.success) {
        res.json({msg : 'Invalid Input!'}); 
        return ; 
    }

    const Exist = await user.findOne ({ username : person.username});   

    if (Exist) {  
        res.json({msg : 'Username Already Exist!'}); 
        return ;     
      }

    const hashedPassword = await bcrypt.hash(safePerson.data.password, 10);  

    await user.create ({

        username : safePerson.data.username, 
        email : safePerson.data.email,
        password : hashedPassword,  
        phone : safePerson.data.phone,  
        adress : safePerson.data.adress,    
        age : safePerson.data.age  ,  
        Transaction : [] ,   
        Accounts : []    
    })

    const token =  await GenerateJWT(person); 

    res.json ({msg : 'User Created!' , token : token});  
}

module.exports = signup;     