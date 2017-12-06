// Socket.io voor de win!

var connections = [];
var users = {};
var placeholder = [];
var rooms = {};

io.on('connection', function(socket){
    
    connections.push(socket);

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
        console.log(data);
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