import { Component, Injectable } from '@angular/core';
import { SocketService } from './services/socket.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private socket:SocketService){
    
  }
}
