const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const io = require('socket.io')(http);
const fs = require('fs');
const port = 4201;

io.on('connection', function(socket){
    console.log("User connected");
});

http.listen(4201, function(){
    console.log("App on port "+ port);
});

eval(fs.readFileSync('api.js')+'');

eval(fs.readFileSync('socket.js')+'');