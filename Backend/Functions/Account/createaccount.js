const {  account, user } = require("../../db");
const { AccountSchema } = require("../../type");


async function createaccount(req, res) {

    const data = req.body;   
    const safeData = AccountSchema.safeParse(data); 

    

    const username = req.username;   
    const initialbalance = 100; 
    const accountnumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000);

    console.log (data);  
   
    if(!safeData.success) {
        res.json({msg : 'Account could not be Created at the moment'}); 
        return ;    
    }


    const Exist = await account.findOne ({user : username, accounttype : data.accounttype});     
    if (Exist) {
        res.json({msg : ` You can Only have one ${data.accounttype} Account!`});      
        return ; 
    }    

    const createdaccount= await account.create({

        accountnumber : accountnumber, 
        accounttype : data.accounttype,  
        balance : initialbalance + data.deposite,      
        user : username,     
        Transactions : []   


    })

    await user.updateOne({username : username}, {$push : {Accounts : createdaccount._id}});    


    res.json({msg : 'Account Created!'});    
}

module.exports = createaccount;  