import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private dataService:DataService) { }

  LogIn(){
    if(this.username == "" || this.password == ""){
      return;
    }
    this.dataService.LogIn(this.username,this.password);
  }

  ngOnInit() {
  }

}
