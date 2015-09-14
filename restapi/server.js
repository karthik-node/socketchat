var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'system',
		password : 'system',
		database : 'textbooks',
	});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to Book Store DEMO...";
	res.json(data);
});

app.get('/textbooks',function(req,res){
	var data = {
		"error":1,
		"textbooks":""
	};
	
	connection.query("SELECT * from textbooks",function(err, rows, fields){
		if(rows.length!= 0){
			data["error"] = 0;
			data["textbooks"] = rows;
			res.json(data);
		}else{
			data["textbooks"] = 'No books Found..';
			res.json(data);
		}
	});
});

app.post('/textbooks',function(req,res){
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"textbooks":""
	};
	if(!!Bookname && !!Authorname && !!Price){
		connection.query("INSERT INTO textbooks VALUES('',?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				data["textbooks"] = "Error Adding data";
			}else{
				data["error"] = 0;
				data["textbooks"] = "Book Added Successfully";
			}
			res.json(data);
		});
	}else{
		data["textbooks"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		res.json(data);
	}
});

app.put('/textbooks',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"textbooks":""
	};
	if(Id && Bookname && Authorname && Price){
		connection.query("UPDATE textbooks SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["textbooks"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["textbooks"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["textbooks"] = "Please provide all required data (i.e : id, Bookname, Authorname, Price)";
		res.json(data);
	}
});

app.delete('/textbooks',function(req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"textbooks":""
	};
	if(!!Id){
		connection.query("DELETE FROM textbooks WHERE id=?",[Id],function(err, rows, fields){
			if(!!err){
				data["textbooks"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["textbooks"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["textbooks"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});