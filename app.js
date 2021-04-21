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
app.get('/favourites', function(req,res){
  res.sendFile(path.join(__dirname + '/views/favourites.html'));
});
app.get('/edit', function(req,res){
  res.sendFile(path.join(__dirname + '/views/editUser.html'));
});
const {User} = require('./user')

//register Api
app.post('/register', function (req, res) {

    const user = new User({
        firstname: req.body.fname,
        lastname :req.body.lname,
        age: req.body.age,
        email: req.body.email,
        phoneCode: req.body.phoneCode,
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
        if(err) throw err;
        if(!user) return res.status(400).json({message: 'wrong credentials'});
        res.status(200).send(user)
    })
});

// Add Products Api
app.post('/productsAdd', function(req,res){

    user = req.body.user;
    favourateList = req.body.jsonObj;
    filename = "userdata/" +  user + ".json";
    fs.writeFile(filename, JSON.stringify(favourateList), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
      //res.status(200).send();
  }); 

    //console.log(favourateList);
    User.findOneAndUpdate({email: user},{favList:favourateList},{returnOriginal: false},function(err,result){
      if (err) {
        console.log("error is update favList"+err);
        res.send(err);
      } else {
        console.log("fav list updated"+result);
        res.send(result);
      }

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

app.post('/update', function (req, res) {

    var fname = req.body.fname;
     var lname =req.body.lname;
    var  Age= req.body.age;
    var Email= req.body.email;
    var phnCode= req.body.phoneCode;
    var phnNumber= req.body.phoneNumber;
    var pass= req.body.password;

  User.findOneAndUpdate({email: Email},{ "$set": { firstname: fname, lastname: lname, age: Age, phoneCode: phnCode,phoneNumber:phnNumber,password:pass}},{returnOriginal: false},function(err,result){
    if (err) {
      console.log("error is update"+err);
      res.send(err);
    } else {
      console.log("updated"+result);
      res.send(result);
    }

  });

});



app.listen(5000, () => {
  console.log("Listening on port  http://localhost:" + 5000)
})