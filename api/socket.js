// Socket.io voor de win!

var connections = [];
var users = {};
var placeholder = [];
var rooms = {};

io.on('connection', function(socket){
    
    connections.push(socket);
    console.log('User connected');
    // Disconnect
    socket.on('disconnect', function(data){
        for(var i = 0;i < connections.length; i++){
            if(connections[i].name == socket.username){
                connections.splice(i,1);
            }
        }
        delete users[socket.username];
        connections.splice(connections.indexOf(socket),1);
    });

    socket.on('makeNewGame',function(data){
        makeNewRoom(data, function(){
            console.log("New room made");
        });
    });

    function makeNewRoom(data, callback){
        rooms[data.id] = {};
        rooms[data.id]['players'] = {};
        rooms[data.id]['data'] = {};
        rooms[data.id]['data']['token'] = data.token;
        rooms[data.id]['data']['game'] = data.game;
        rooms[data.id]['data']['title'] = data.title;
        console.log(rooms);
        callback();
    }

    socket.on('connectToRoom', function(data, callback){
        for(var key in rooms){
            if(rooms[key]['data']['token'] == data.token){
                socket.join(key);
                rooms[key]['players'][data.id] = {};
                callback(rooms[key]);
            }
        }
    });

    // New User
    // socket.on('new user', function(data, callback){
    //     callback(true,data);
    //     socket.username = data;
        
    //     users[socket.username] = socket;
    //     placeholder.push({name: socket.username, id: users[socket.username].id});
    //     updateUsernames();
    // });
});