// Socket.io voor de win!

/* 

    Problemen:

    * Hij connect altijd 2 keer.
      Dus er zitten altijd 2 de zelfde personen in het connection array.
      edit: soms doet hij dit wel en soms niet.

*/

var connections = [];
var users = {};
var placeholder = [];
var rooms = {};

io.on('connection', function (socket) {

    connections.push(socket);
    console.log('User connected');

    // Disconnect
    socket.on('disconnect', function (data) {


        let playerInRoom = isPlayerInRoom();

        if(playerInRoom) {
            console.log(socket.id);

            // Hier gaat nog vanalles fout
            console.log(rooms);
            delete rooms[playerInRoom].players[socket.id];
            connections[connections.findIndex(x => x.id == playerInRoom)].emit('userOutRoom', socket.id);
        };

        delete users[socket.username];
        connections.splice(connections.indexOf(socket), 1);
        console.log("User disconneted");
    });

    socket.on('makeNewGame', function (data) {
        makeNewRoom(data, function () {
            console.log("New room made");
            socket.emit('newGameMade', data);
        });
    });

    function makeNewRoom(data, callback) {
        rooms[data.id] = {};
        rooms[data.id]['players'] = {};
        rooms[data.id]['data'] = {};
        rooms[data.id]['data']['token'] = data.token;
        rooms[data.id]['data']['game'] = data.game;
        rooms[data.id]['data']['title'] = data.title;
        callback();
    }

    function isPlayerInRoom(){
        console.log(rooms);
        let inRoom = false;
        for(let room in rooms) {
            for(let player in rooms[room]['players']){
                if(socket.id == player){
                    inRoom = room;
                }
            }
        }
        return inRoom;
    }

    socket.on('connectToRoom', function (data, callback) {
        for (var key in rooms) {
            if (rooms[key]['data']['token'] == data.token) {
                socket.join(key);

                rooms[key]['players'][data.id] = {name: data.name,
                                                  score: 0};

                connections[connections.findIndex(x => x.id == key)].emit('newUserInRoom', rooms[key]);
                callback(rooms[key]);
            }
        }
    });

    socket.on('isHostValid', function(data, callback){
        if(data.id in rooms){
            callback(true);
        } else {
            callback(false);
        }

        socket.emit('sendRoomData', rooms[socket.id]);
    });

    socket.on('isPlayerValid', function(data, callback){
        let isPlayerValid = false;
        for(let room in rooms){
            for(let player in rooms[room].players){
                if(data.id == player){
                    isPlayerValid = true;
                }
            }
        }
        callback(isPlayerValid);
    });

    socket.on('gameStart', function(){
        console.log(rooms);
        socket.in(socket.id).emit('gameGestart');
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