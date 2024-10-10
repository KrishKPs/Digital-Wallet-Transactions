const express = require ('express');     
const signup = require('../Functions/User/signup');
const login = require('../Functions/User/login');
const Authenticate = require('../MiddleWare/authenticate');
const createaccount = require('../Functions/Account/createaccount');
const payment = require('../Functions/Account/payment');
const deposite = require('../Functions/Account/deposite');
const getusers = require('../Functions/User/getusers');
const transfer = require('../Functions/Account/usertrasfer');
const singleuser = require('../Functions/User/singleuser');
const getbalance = require('../Functions/User/getbalance');
const usertransactions = require('../Functions/User/usertransactions');
const router = express.Router(); 


router.get('/' , function (req, res) {  res.json({ message: 'Hello from Express Router!'});  }); 


//User Router
router.post('/signup' , signup);
router.post('/login' , login); 
router.post('/createaccount' , Authenticate , createaccount)
router.post('/payment' , Authenticate , payment );    
router.post ('/deposite' , Authenticate , deposite);    
router.get('/users' , Authenticate , getusers);  
router.post ('/transfer/:id' , Authenticate , transfer);  
router.get ('/singleuser'  , Authenticate , singleuser);  
router.get('/getaccount' , Authenticate , getbalance)   
router.get('/usertransactions' , Authenticate , usertransactions)





module.exports = router;     