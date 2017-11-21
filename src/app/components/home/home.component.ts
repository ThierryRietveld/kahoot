import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataService) {  }

  username = "";
  password = "";

  ngOnInit() {
    
  }

  LogIn(){
    if(this.username == "" || this.password == ""){
      return;
    }
    this.dataService.LogIn(this.username,this.password);
  }
  
  

  

}
