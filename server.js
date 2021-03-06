var express = require('express')
var app = express();
var mongojs = require('mongojs');
//database and collection to be used
var db = mongojs('mongodb://adster93:mongotest@ds013898.mongolab.com:13898/heroku_db9m5c5w', ['contactlist']);
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req,res){
	console.log("I recieved a get request")

	db.contactlist.find(function (err, docs){
		console.log(docs);
		//sends data back to server
		res.json(docs);
	})

})

app.post('/contactlist', function(req,res){
	console.log(req.body)
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc)
	})
})

app.delete('/contactlist/:id', function(req,res){
	var id = req.params.id
	console.log(id)
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
})

app.get('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log(id)
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc)
	})
})

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name)
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

// app.listen(mongodb:adster93:mongotest@ds013898.mongolab.com:13898/heroku_db9m5c5w || 'mongodb://localhost/contactlist');
app.listen(process.env.PORT || 5000)
