var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/signup', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});
app.post('/signup', function (req, res) {
  var users= JSON.parse(fs.readFileSync("users.json"));

  var objToWrite = {
    email: req.body.email,
    password: req.body.password
  };
  users.push(objToWrite);

  fs.writeFileSync('users.json', JSON.stringify(users));

  res.send("Thank you " + req.body.email + "! you have signed up. Click <a href='login'>here</a> to login")
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});
app.post('/login', function (req, res) {
  var users= JSON.parse(fs.readFileSync("users.json"));

  var matchedUser = users.filter( element => element.email === req.body.email);
  console.log(matchedUser[0]);
  if(!matchedUser.length){
    return res.send("User not found")

  }
  if(matchedUser[0].password === req.body.password){
    return res.send("Thank you " + matchedUser[0].email + "! you are logged in!!!")
    //logged in
  }
  else{
    //wrong pwd
    return res.send("Wrong password!")
  }
  /*
  1. check if we have a user with the same email
  2. if we do, check if the password on that entry matches the password from the form submission
   */

});
app.listen(3000);