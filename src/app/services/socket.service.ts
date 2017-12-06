import { Injectable } from '@angular/core';

import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000, //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
  };

  private socket;
  private data;

  constructor() {
    this.socket = io('http://localhost:4201', this.connectionOptions);
    
  }

  makeNewGame(data){
    this.data = data;
    this.data.id = this.socket.id;
    this.socket.emit('makeNewGame',this.data);
  }

  connectToRoom(thetoken){
    this.data = {id: this.socket.id,
                 token: thetoken};
    this.socket.emit('connectToRoom', this.data, function(room){
      console.log(room);
    });
  }

}
