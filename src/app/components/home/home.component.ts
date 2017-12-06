import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  
  
  constructor(private dataService:DataService) { 
  }
  

  ngOnInit() {

  }

  

}
