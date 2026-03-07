var express = require('express');
var router = express.Router(); 
const userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/contact', async function(req,res,next){
const contactuser = await userModel.contact({
    username: "string",
    email:"string",
    message:"string",
  });
  res.send(contactuser);
});


module.exports = router;
