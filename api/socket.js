// Socket.io voor de win!

var connections = [];
var users = {};
var placeholder = [];
var rooms = {};

io.on('connection', function(socket){
    
    connections.push(socket);
    console.log(connections);

    // Disconnect
    socket.on('disconnect', function(data){
        for(var i = 0;i < placeholder.length; i++){
            if(placeholder[i].name == socket.username){
                placeholder.splice(i,1);
            }
        }
        delete users[socket.username];
        connections.splice(connections.indexOf(socket),1);
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