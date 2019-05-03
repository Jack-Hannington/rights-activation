var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    ejs = require('ejs');
    // Client = require("./models/clients"),
    // Right  = require ("./models/rights");

// set the relevant view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

//Environment variables
mongoose.connect('mongodb://localhost:27017/rights_activation', {useNewUrlParser: true});

//Client schema
var clientSchema= new mongoose.Schema({
  name: String,
  designation: String,
  value: Number
});

//Client model
var Client = mongoose.model('Client', clientSchema);

//Routes

app.get("/", function(req, res){
  res.redirect("/clients");
})

//Index
app.get("/clients", function(req, res){
  Client.find({}, function(err, clients){
    if(err){
      console.log("Error");
    } else {
      res.render("clients", {clients:clients});
    }
  });
});

//New route
app.get('/clients/new', function (req, res){
  res.render("./clients/new")
})

// Create route
app.post("/clients", function(req, res){
  //create client
  Client.create(req.body.client, function(err, newClient){
    if(err){
      res.render("/clients/new");
    } else {
      res.redirect("/clients");
    }
    });
  });

 //Show route
 app.get("/clients/:id", function(req, res){
   Client.findById(req.params.id, function(err, foundClient){
     if(err){
       res.redirect("/clients");
     } else {
      res.render("./clients/show", {client:foundClient});
     }
   });
  });

app.listen(3000)
console.log("app has started");