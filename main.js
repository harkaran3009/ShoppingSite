const express = require('express')  // Adding a express 
var router = express.Router()
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var bodyParser = require('body-parser');
const app = express() ; // Creating a exprss 
const port = 5501;     // Assining the port numnber
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/mydb"; 
const cors = require("cors")  // npm i cors
app.use(cors())

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/signin', function(req,res){
    res.sendFile(path.join(__dirname + '/signin.html'));
});
app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname + '/register.html'));
});
//Creating a post register API method with register
app.post('/register', function (req, response) {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var ageValue = req.body.age;
    var emailValue = req.body.email;
    var phnoValue = req.body.phno;
    var passValue = req.body.psw;

    MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology: true}, function(err, db) { 
        if (err){
            response.statusCode = 404;
           
        }else {
            var dbo = db.db("mydb");   
                dbo.collection("Users").findOne({email : emailValue}, function(err, res) 
                {    
                    if (err){
                        db.close(); 
                        response.statusCode = 404;
                        console.log("record not found");    
                        response.redirect(404,'/signin');
                    }
                    else if(res == null)
                    {
                        var dbo = db.db("mydb"); 
                        var myobj = { firstName:fname,lastName:lname,age:ageValue,email:emailValue,phoneNumber:phnoValue, password: passValue  };  
                        dbo.collection("Users").insertOne(myobj, function(err, res) 
                        {    
                            if (err){
                                response.statusCode = 404;
                                console.log("Insert failed");    
                                response.send('Insert failed');
                                
                            }else {  
                                console.log("1 document inserted");    
                                db.close(); 
                                response.statusCode = 200;
                                response.redirect(200,'/register');
                            }  
                        });
                    }
                    else {  
                        console.log("User Already Exist");  
                        console.log(res);  
                        db.close(); 
                        response.statusCode = 409;
                        response.redirect(409,'/');
                    }
            
            });                    

        }
    }); 


       
  
  });

  app.post('/signin', function(req,response){
    var emailIdValue = req.body.email;
    var passwordValue = req.body.psw;

    console.log(emailIdValue);
    console.log(passwordValue);

    if(emailIdValue == ""|| passwordValue == ""){
        response.statusCode = 432;
        response.send('empty values failed'); 
    }else {
        MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology: true}, function(err, db) { 
            if (err){
                response.statusCode = 404;
                console.log("Connection failed");  
                response.send('Connection failed');
            }else {
                var dbo = db.db("mydb");   
                dbo.collection("Users").findOne({email : emailIdValue}, function(err, res) 
                {    
                    if (err){
                           db.close();
                        console.log(err);
                        
                    }
                    else if(res == null)
                    {
                        db.close(); 
                        response.statusCode = 404;
                        console.log("record not found"); 
                        response.redirect(404,'/signin');
                    }
                    
                    else { 
                        dbo.collection("Users").findOne({email : emailIdValue, password:passwordValue}, function(err, res) 
                        { 
                            if (err){
                                   db.close();
                                console.log(err);
                                
                            }
                            else if(res == null)
                            {
                                console.log("Invalid password");
                                response.redirect(401,'/');
                            }
                            else
                            {
                                console.log(res.email);
                                console.log(res.password);
                                console.log(passwordValue);
                                console.log("logged in");  
                                console.log(res);  
                                db.close(); 
                                response.statusCode = 200;
                                response.send('200');
                            }
                                

                            
                        }); 
                        
                    }
                });                    

            }
        }); 

    }
});


  app.listen(port, () => {    
      console.log(`Example app listening at http://localhost:${port}`)  
    })