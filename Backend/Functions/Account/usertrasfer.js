const { user, transaction, account } = require("../../db");


async function transfer (req,res) {

    const data = req.body;   
    const to = req.params.id ; 


    const username = req.username;   
    console.log (username); 

     const userExist = await user.findOne({username  : username });    
     const useraccount = await account.findOne({user : username, accounttype : data.accounttype});        

    if (!userExist) {
        res.json({msg : 'User Not Found! 1 '}); 
        return ;     }


        const toUserExist = await user.findOne({_id : to});   
        const toUseraccount = await account.findOne({user : toUserExist.username, accounttype : 'Checking'});     

        if (!toUserExist) {
            res.json({msg : 'The user does not have a Checking Account!'});   
            return ;     }  

            if (data.amount > userExist.balance) {
                res.json({msg : 'Insufficient Balance!'}); 
                return ; 
            }    


            try {

                await account.updateOne ({ user : userExist.username , accounttype : data.accounttype }, { $inc : { balance : -data.amount }});         
                await account.updateOne ({ user : toUserExist.username ,  accounttype : 'Checking' }, { $inc : { balance : data.amount }});   
                
               const transfrom =  await transaction.create ({

                    accountnumber : useraccount.accountnumber,  
                    amount : data.amount,    
                    mode : 'Debit',  
                    type : 'Transfer',   
                    user : userExist.username,     
                    purpose : data.purpose,  
                    category : data.category,    
                }); 

               const transto =  await transaction.create({

                    accountnumber : toUseraccount.accountnumber,   
                    amount : data.amount,    
                    mode : 'Credit',     
                    type : 'Transfer',   
                    user : toUserExist.username,     
                    purpose : data.purpose,  
                    category : data.category,    


                })

                await account.updateOne ({ user : userExist.username , accounttype : data.accounttype }, { $push : { Transactions : transfrom._id }});         
                await account.updateOne ({ user : toUserExist.username ,  accounttype : 'Checking' }, { $push : { Transactions : transto._id }});   
                await user.updateOne ({ username : userExist.username }, { $push : { Transactions : transfrom._id }});   
                await user.updateOne ({ username : toUserExist.username }, { $push : { Transactions : transto._id }});   


                res.json({msg : 'Transfer Successful!'});   
            }
            
            
            
            catch (error) {
                res.json({msg : 'Transfer Failed!'}); 
                return ; 
            }    

}

module.exports = transfer;   

