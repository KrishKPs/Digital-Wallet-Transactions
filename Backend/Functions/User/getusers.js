const { user } = require("../../db");



async function getusers (req, res) {

    const username = req.username;   

    const UserExist = await user.findOne({ username : username });   





    const allusers = await user.find({}); 

    const filtered = allusers.filter ( (item) => item.username !== username);     


    res.json ({
        users : filtered     
    })


}

module.exports = getusers;   

