import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../services/data.service';
import { SocketService } from '../../../../services/socket.service';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.css']
})
export class QuizPlayerComponent implements OnInit {

  constructor(private socket:SocketService, private data:DataService  ) {
    this.socket.isPlayerValid(function(data){
    });

    this.socket.socket.on('gameGestart', function(){
      console.log('De game is gestart');
    });

   }

  ngOnInit() {
  }

}
