const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express()
const fs = require('fs');

var url = "mongodb://localhost:27017/mydb"; 

mongoose.connect(url, {useNewUrlParser:true},).then(()=> console.log('DB connected')).catch(error=> console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//bootstrap static content
app.use(express.static(path.join(__dirname,'imgs')));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
  )
app.use( "/imgs",
express.static(path.join(__dirname, "imgs"))
)
app.use( "/javascript",
express.static(path.join(__dirname, "javascript"))
)

//opening html pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"))
})
app.get('/signin', function(req,res){
    res.sendFile(path.join(__dirname + '/views/signin.html'));
});
app.get('/registerpage', function(req,res){
    res.sendFile(path.join(__dirname + '/views/register.html'));
});
const {User} = require('./user')

//register Api
app.post('/register', function (req, res) {

    const user = new User({
        firstname: req.body.fname,
        lastname :req.body.lname,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    }).save((err,response)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(response)
    })

});


//Login Api
app.post('/login', function(req,res){

    User.findOne({'email':req.body.email,'password':req.body.password},(err,user)=>
    {
        console.log(user);
        if(err) throw err;
        if(!user) return res.status(400).json({message: 'wrong credentials'});
        res.status(200).send(user)
    })
});

// Add Products Api
app.post('/productsAdd', function(req,res){

    user = req.body.user;
    favourateList = req.body.jsonObj;

    console.log(favourateList);

    filename = "userdata/" +  user + ".json";
    fs.writeFile(filename, JSON.stringify(favourateList), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
      res.status(200).send();
  }); 


});


app.post('/getUsername', function(req,res){

  
  User.findOne({'email':req.body.mail},(err,user)=>
  {
      if(err) throw err;
      if(!user) return res.status(400).json({message: 'wrong credentials'});
      console.log(user);
      res.status(200).send(user)
  })
});



app.listen(5000, () => {
  console.log("Listening on port  http://localhost:" + 5000)
})