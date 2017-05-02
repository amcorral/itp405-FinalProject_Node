require('dotenv').config();

var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var User = require('./models/user');
var Customer = require('./models/customer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/api/users', function(request, response){
  var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });
  connection.connect();
  connection.query('SELECT * FROM users', function(error, users){
    if (error){
      throw error;
    }
    else {
      response.json(users);
    }
  })
});

app.get('/api/user/:id', function(request, response){
  var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });
  connection.connect();
  var userID = request.params.id;
  connection.query('SELECT * FROM users WHERE id=?', [ userID ], function(error, user){
    if (error){
      throw error;
    }
    else {
      response.json(user);
    }
  })
});

app.post('/api/user', function(request, response){
    var user = new User({
        email: request.body.email,
        password: request.body.password
    });
      user.save().then(function(){
        response.json(user);
      });
});

app.post('/api/user/:id/customer', function(request, response){
    var customer = new Customer({
        user_id:          request.params.id,
        customer_name:    request.body.customer_name,
        street:           request.body.street,
        city:             request.body.city,
        state:            request.body.state,
        email:            request.body.email,
        poc_first_name:   request.body.poc_first_name,
        poc_last_name:    request.body.poc_last_name,
        poc_number:       request.body.poc_number,
    });
      customer.save().then(function(){
        response.json(customer);
      });
});

app.get('/api/user/:id/customers', function(request, response){
  var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });
  connection.connect();
  var userID = request.params.id;
  connection.query('SELECT * FROM customers  WHERE customers.user_id = ?', [ userID ], function(error, user){
    if (error){
      throw error;
    }
    else {
      response.json(user);
    }
  })
});


app.listen(3000);
