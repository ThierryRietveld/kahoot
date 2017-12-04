import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private data:DataService,private router:Router) {

  };

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    
    return this.data.IsLoggedIn()
    .map(e => {
      if (e[0]) {
          return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }).catch(() => {
        this.router.navigate(['/login']);
        return Observable.of(false);
    });
}   
}
