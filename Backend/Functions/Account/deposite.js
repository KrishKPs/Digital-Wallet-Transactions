const { user, account, transaction } = require("../../db");



async function deposite (req, res) {

    const data = req.body ; 

    const username = req.username; 
    
    const userExist = await user.findOne({username : username});     
    if (!userExist) {
        res.json({msg : 'User Not Found!'}); 
        return ; 
    }    

    const AccountExist = await account.findOne({ user :  username , accounttype : data.accounttype});  

    if (!AccountExist) {
        res.json({msg : 'Account Not Found!'}); 
        return ; 
    }   

    console.log (AccountExist);  

    
 


    await transaction.create ({

        accountnumber : AccountExist.accountnumber,  
        amount : data.amount,   
        mode : 'Credit',    
        type : 'Deposite',
        user : username,    
        purpose : data.purpose, 
        category : data.category,      

    })

     await account.updateOne ({ _id : AccountExist._id } , { $inc : { balance : data.amount }});
    const accountupdate =  await account.updateOne({_id : AccountExist._id}, { $push : { Transactions : transaction._id }});   
     await user.updateOne ({ username : username } , { $push : { Transactions : transaction._id }});        


    res.json({msg : 'Deposite Successful!' , update : accountupdate});   




}

module.exports = deposite;   
