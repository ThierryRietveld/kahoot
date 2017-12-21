import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../services/data.service';
import { SocketService } from '../../../../services/socket.service';

@Component({
  selector: 'app-quiz-host',
  templateUrl: './quiz-host.component.html',
  styleUrls: ['./quiz-host.component.css']
})
export class QuizHostComponent implements OnInit {

  constructor(private data:DataService,
              private socket:SocketService) {
    
    let self = this;
                
    this.socket.isHostValid(function(bool){
      if (!bool) {
        self.data.navigateHere("");
      }

    });

    this.socket.socket.on('sendRoomData', function(data){
      self.token = data.data.token;
    });
    
    // New User in room
    this.socket.socket.on('newUserInRoom', function(data){
      console.log(data);
      
      self.players = []; 

      for(let player in data.players){
        let dummyObject = {
          id: player,
          name: data.players[player].name,
          score: data.players[player].score
        }
        self.players.push(dummyObject);
      }

      console.log(self.players);
    }); 

    // User out room
    this.socket.socket.on('userOutRoom', function(id){
      self.players.splice(self.players.findIndex(x => x.id == id), 1);
      console.log(self.players);
    });
  }

  token = '';
  players = [];

  ngOnInit() {
  }

}
