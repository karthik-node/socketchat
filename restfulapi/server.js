var express = require('express');
var app = express();
var fs = require('fs');
var sys = require('sys');
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/listUsers', function (req, res) { 
	//gets list of employees in json file
   fs.readFile( __dirname + "/" + "emp.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})
app.get('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "emp.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
var id =2;

app.get('/deleteUser', function (req, res) {
	

   // First read existing users.
   fs.readFile( __dirname + "/" + "emp.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
}) 


 
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})