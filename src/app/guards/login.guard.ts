import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';

@Injectable()
export class LoginGuard implements CanActivate {

// ER GAAT HIER NOG VAN ALLES MIS


  constructor(private data:DataService) {

    this.data.IsLoggedIn(function(loggedIn){
      console.log(loggedIn);
    });
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("OnlyLoggedInUsers");
    return this.data.IsLoggedIn(function(loggedIn){
      return loggedIn;
    });
  }
}
