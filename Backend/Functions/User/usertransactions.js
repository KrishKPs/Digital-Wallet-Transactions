const { transaction, user } = require("../../db");


async function usertransactions (req, res) {

    const username = req.username; 

    const UserExist = await user.findOne ({ username : username });  
    if (!UserExist) {
        res.json({msg : 'User Not Found!'}); 
        return ;    

    }

    const usertransactions = await transaction.find ( { user : username });

    res.json({transactions : usertransactions});         



}

module.exports = usertransactions;   

