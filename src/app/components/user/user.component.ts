import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient,
              private data:DataService
            ) { }
  
  
  ngOnInit() {
      this.data.saySomething('De service werkt gewoon!');
  }

  logOut(){
    this.data.logOut();
  }

  makeNewGame(){
    
  }

}
