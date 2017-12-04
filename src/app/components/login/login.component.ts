import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private dataService:DataService,
              private router:Router) { 

  }

  submitForm(formPost){
    if(this.username == "" || this.password == ""){
      return;
    }
    this.dataService.LogIn(this.username,this.password);
  }

  ngOnInit() {
  }

}
