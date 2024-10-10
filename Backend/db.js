const mongoose = require ('mongoose');   

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log(`Connected to DataBase`)})
.catch((err)=>{console.log(`Error connecting to DataBase ${err}`)})  



const userSchema = mongoose.Schema({

    username : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true
    }, 
    adress : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }, 
    age : {
        type : Number,
        required : true  },
    
    Accounts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    }], 

    Transactions : [{

        type : mongoose.Schema.Types.ObjectId,
        ref : 'Transaction' 


    }]

    
})

const AccountSchema = mongoose.Schema({

    accountnumber : {
        type : String,
        required : true
    }, 
    balance : {
        type : Number,
        required : true
    },
    user : {
        type : String,
        ref : 'User'
    },
    createAt : {
        type : Date,
        default : Date.now
    },
    Transactions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Transaction'
    }], 
    accounttype : {
        type : String,
        required : true
    }    

})

const TransactionSchema = mongoose.Schema({

    accountnumber : {
        type : String,
        ref : 'Account'
    },  
    amount : {
        type : Number,
        required : true
    },  
    type : {
        type : String,
        required : true
    },  
    mode : {

        type : String,     
    }, 
    createAt : {
        type : Date,
        default : Date.now
    }   , 
    user : {
        type : String,
        ref : 'User'
    }   ,

    purpose : { 
        type : String,
    },

    category : {
        type : String,
    }    
})

const user = mongoose.model('User' , userSchema);   
const account = mongoose.model('Account' , AccountSchema);  
const transaction = mongoose.model('Transaction' , TransactionSchema);   



module.exports = {
    user : user, 
    account : account , 
    transaction : transaction        
}




