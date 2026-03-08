var express = require('express');
var router = express.Router();

const Contact = require("../models/contact");


/* Home page + show messages */
router.get('/', async function(req, res, next) {

  try {

    const messages = await Contact.find().sort({createdAt:-1});

    res.render('index', { 
      title: 'Restaurant Website',
      messages: messages
    });

  } catch (error) {

    console.log(error);
    res.send("Error loading messages");

  }

});


/* Contact Form Submit */
router.post('/contact', async function(req,res){

  try {

    const { username, email, message } = req.body;

    const newContact = new Contact({
      username,
      email,
      message
    });

    await newContact.save();

    console.log("Message Saved");

    res.redirect('/#contact');

  } catch (error) {

    console.log(error);
    res.send("Error saving message");

  }

});


/* Delete Message */
router.get('/delete/:id', async function(req,res){

  try{

    await Contact.findByIdAndDelete(req.params.id);

    res.redirect('/');

  }catch(err){

    console.log(err);
    res.send("Delete error");

  }

});


/* Edit Message Page */
router.get('/edit/:id', async function(req,res){

  try{

    const message = await Contact.findById(req.params.id);

    res.render('edit',{message});

  }catch(err){

    console.log(err);
    res.send("Edit error");

  }

});


/* Update Message */
router.post('/update/:id', async function(req,res){

  try{

    const {username,email,message} = req.body;

    await Contact.findByIdAndUpdate(req.params.id,{
      username,
      email,
      message
    });

    res.redirect('/');

  }catch(err){

    console.log(err);
    res.send("Update error");

  }

});


module.exports = router;