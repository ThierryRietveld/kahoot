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

con.connect(function(err) {
    if (err) throw err;
});

app.post('/login', function(req, res){
    let username = req.body.name;
    let password = req.body.pass;
    con.query("SELECT * FROM Users WHERE `username` = '"+username+"' AND `password` = '"+sha1(password)+"'", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.send(result[0]);
    });
});

app.post('/register', function(req, res){
    // console.log(req.body);

    let username = req.body.username;
    let firstname = req.body.firstname;
    let infix = req.body.infix;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = sha1(req.body.password);
    let activated = 0;

    makeid(function(id){
        makeToken(function(token){
            con.query("INSERT INTO `users` VALUES ("+id+",'"+token+"','"+username+"','"+firstname+"','"+infix+"','"+lastname+"','"+email+"','"+password+"',"+activated+")", function(err, result, fields){
                if (err) throw err;
                res.send([{completed: true}]);
                console.log("Worked");
            });
        });
    });
});

app.post('/isloggedin',function(req,res){
    let id = req.body.id;
    let token = req.body.token;
    // console.log(req.body);
    con.query("SELECT * FROM Users WHERE id = "+id+" AND token = '"+token+"' ", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/get_users', function(req, res){
    con.query("SELECT * FROM Users", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

function makeid(callback) {
    var text = "";
    var possible = "0123456789";
    var duplicate = false;

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    con.query("SELECT id FROM Users WHERE id = '"+text+"' ", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        if(result[i]){
            console.log(text);
            makeid();
            duplicate = true;
            return;
        } 
        if(!duplicate) {
            callback(text);
        } 
    });
}

function makeToken(callback) {
    var text = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // console.log(text);
    callback(text);
}