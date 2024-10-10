const { user } = require("../../db");

async function singleuser (req,res) {

    const username = req.username; 

    console.log(username); 

    const UserExist = await user.findOne({ username : username });   

    if (!UserExist) {
        res.json({msg : 'User Not Found!'}); 
        return ; 
    }    

    res.json({user : UserExist});        


    
}

module.exports = singleuser;     

