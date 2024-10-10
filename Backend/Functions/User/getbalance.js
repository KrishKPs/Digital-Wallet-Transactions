const { account } = require("../../db");


async function getbalance (req, res) {

    const username = req.username;       

    const Savingsaccount = await account.findOne ({ user : username , accounttype : 'Savings' });   
    
    const Currentaccount = await account.findOne ({ user : username , accounttype : 'Checking' });   


    if(!Savingsaccount && !Currentaccount) {
        res.json({msg : 'Account Not Found!'}); 
        return ; 
    }        

    res.json({Savings : Savingsaccount , Current : Currentaccount});    




}

module.exports = getbalance;     