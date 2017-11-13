var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')

// Body-parser
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

// MySql Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kahoot"
});

app.get('/banaan', function(req, res){
    console.log("banaan");
    // console.log(req.body.id);
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

app.listen(4201);