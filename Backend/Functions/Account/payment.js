const { transaction, user, account } = require("../../db");


async function payment (req, res) { 

    const data = req.body; 
    
    
    const username = req.username;  

    const UserExist = await user.findOne({username : username}); 
    
    if (!UserExist) {
        res.json({msg : 'User Not Found!'}); 
        return ; 
    }        


    const accountExist = await account.findOne({_id : { $in : UserExist.Accounts } , accounttype : data.accounttype });     

    if (!accountExist) {
        res.json({msg : 'Account Not Found!'}); 
        return ; 
    }    


    

    if (accountExist.balance < data.amount) {
        res.json({msg : 'Insufficient Balance!'}); 
        return ; 
    }       

   const tarns = await transaction.create ({

        accountnumber : accountExist.accountnumber,   
        amount : data.amount,
        mode : 'Debit' ,    
        type : 'Payment', 
        user : username,    
        purpose : data.purpose,    
        category : data.category,   
        createAt : Date.now()       

    })

    await account.updateOne({ _id : accountExist._id}, { $push : { Transactions : tarns._id }});    
    await user.updateOne({ username : username}, { $push : { Transactions : tarns._id }});        

     await account.updateOne({ _id : accountExist._id}, { $inc : { balance : -data.amount }});    

    res.json ({msg : 'Payment Successful!'});    


 }



 module.exports = payment;   