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
    name:'klaas',//this.dataService.getUser().name
    gameData: {
      questions: [
        {question: 'Wat is kaas?', choices: ['Dat weet je zelf','Zeg ik niet','Zowiezo 53','Paars zoals mn kluts'], answer: 2},
        {question: 'Staat de eifeltoren in Nederland?', choices: ['JA','Ik ging er met de trein heen dus zal wel kennen','Wat is dat?','Natte tena krijg ik er van!'], answer: 1}
      ]
    }
  }
  

  constructor(private http: HttpClient,
              private dataService:DataService,
              private socket:SocketService) {
                
    let self = this;

    this.socket.socket.on('newGameMade', function (data) {
      self.dataService.navigateHere("/host/"+data.game);
    });
  }
  
  
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

