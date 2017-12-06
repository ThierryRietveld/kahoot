import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../../services/data.service';
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  data = {
    game:'quiz',
    title:'De eerste quiz',
    token: this.makeToken()+ '',
    name:'klaas'//this.dataService.getUser().name
  }

  constructor(private http: HttpClient,
              private dataService:DataService,
              private socket:SocketService
            ) { }
  
  
  ngOnInit() {
      this.dataService.saySomething('De service werkt gewoon!');
  }

  logOut(){
    this.dataService.logOut();
  }

  makeNewGame(){
    console.log(this.data);
    this.socket.makeNewGame(this.data);    
  }

  makeToken() {
    let text = "";
    let possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log('GameToken: ' + text);
    return text;
}

}
