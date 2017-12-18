import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { SocketService } from '../../services/socket.service';

import * as io from "socket.io-client";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  token:string = '';
  name:string = '';
  
  constructor(private dataService:DataService, private socket:SocketService) { 
  }
  

  ngOnInit() {

  }

  connectToRoom(){

    if(this.token != '' || this.name != ''){
      this.socket.connectToRoom(this.token, this.name);
    } 
  }
  

}
