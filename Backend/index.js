require('dotenv').config()
const express = require ('express');     
const app = express();   
const PORT = process.env.PORT; 
const mainRouter = require('./Router/index.js');        
const cors = require('cors');    
const db = require('./db.js');        


app.use(cors());     
app.use(express.json());     

app.get('/'  , function (req, res) {  res.send('Hello from Express!');  });  

app.use('/banking' , mainRouter); 




app.listen(PORT , ()=> { console.log(`Server is running on port ${PORT}`)})  



