var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var port = 4201;

// Body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

// MySql Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kahoot"
});

app.post('/login', function(req, res){
    con.connect(function(err) {
        if (err) throw err;
        console.log(req.body);
        let username = req.body.name;
        let password = req.body.pass;
        con.query("SELECT * FROM Users WHERE `username` = '"+username+"' AND `password` = '"+sha1(password)+"'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
});

app.get('/get_users', function(req, res){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM Users", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.listen(4201, function(){
    console.log("App on port "+ port);
});