const zod = require('zod');  

const UserSchema = zod.object({

    username : zod.string().min(5).max(20),
    email : zod.string().email(), 
    password : zod.string().min(5).max(100), 
    adress : zod.string().min(5).max(100),   
    phone : zod.string().min(5).max(20),     
    age : zod.number().min(18).max(100),     


})

const AccountSchema = zod.object({


    deposite : zod.number(),     
    accounttype : zod.string().min(3).max(20), 
})



module.exports = {
    
    UserSchema : UserSchema, 
    AccountSchema : AccountSchema

};     