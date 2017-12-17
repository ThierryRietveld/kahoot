import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout": 10000, //before connect_error and connect_timeout are emitted.
    "transports": ["websocket"]
  };

  public socket;
  private data;
  private dit;

  constructor(public router: Router) {

    this.socket = io('http://localhost:4201', this.connectionOptions);

    this.socket.on('newGameMade', function (data) {

      console.log(this);
      boi();
      // Hier is 'this' niet defined
      // navigateHere();
    });
  }

  makeNewGame(data) {
    this.data = data;
    this.data.id = this.socket.id;
    this.socket.emit('makeNewGame', this.data);
  }

  saySomething(text) {
    console.log(text);
  }

  navigateHere(route) {
    this.router.navigate([route]);
  }

  connectToRoom(thetoken) {

    this.data = {
      id: this.socket.id,
      token: thetoken
    };

    this.socket.emit('connectToRoom', this.data, function (room) {
      console.log(room);
    });
  }


}


let socketService = new SocketService();

function boi() {
  socketService.saySomething('duihdfuihi');
}