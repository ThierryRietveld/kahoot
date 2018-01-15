import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../services/data.service';
import { SocketService } from '../../../../services/socket.service';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.css']
})
export class QuizPlayerComponent implements OnInit {

  waiting = true;
  game = false;

  send;

  constructor(private socket:SocketService, private data:DataService  ) {

    let self = this;

    this.socket.isPlayerValid(function(data){
      console.log(data);
    });

    this.socket.socket.on('gameGestart', function(){
      console.log('De game is gestart');
      self.waiting = false;
      self.game = true;
    });

    this.socket.socket.on('hostDisconnected', function(){
      alert('the host disconnected');
      self.socket.navigateHere('/');
    });

  }

  clickChoice(choice){
    console.log(choice);
    this.send = {
      choice: choice
    }

    this.socket.socket.emit('choiceMade', this.send);
  }

  ngOnInit() {
  }

}
