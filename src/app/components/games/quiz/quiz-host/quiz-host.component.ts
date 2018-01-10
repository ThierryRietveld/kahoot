import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../services/data.service';
import { SocketService } from '../../../../services/socket.service';

@Component({
  selector: 'app-quiz-host',
  templateUrl: './quiz-host.component.html',
  styleUrls: ['./quiz-host.component.css']
})
export class QuizHostComponent implements OnInit {
  question ="banaan";
  awnsers:any = [];

  quiz_host_lobby = true;
  quiz_host_questions = false;

  constructor(private data:DataService,
              private socket:SocketService) {
    
    let self = this;
                
    this.socket.isHostValid(function(bool){
      if (!bool) {
        self.data.navigateHere("");
      }

    });

    this.socket.socket.on('sendRoomData', function(data){
      self.room = data;
      console.log(self.room);
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

  players = [];
  questionNumber = 0;
  room = {data: {token :'',gameData: {questions:[{question:'', choices: []}]}}};

  ngOnInit() {
  }

  startGame(){
    this.socket.startGame();
    this.quiz_host_lobby = false;
    this.quiz_host_questions = true;
    this.displayNextQuestion();
  };

  displayNextQuestion() {
    
    this.question = this.room.data.gameData.questions[this.questionNumber].question;
    this.awnsers = this.room.data.gameData.questions[this.questionNumber].choices;
    this.questionNumber++;

  }

}
