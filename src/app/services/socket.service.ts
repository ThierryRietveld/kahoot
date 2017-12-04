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

  constructor() {
    this.socket = io('http://localhost:4201', this.connectionOptions);
  }

}
