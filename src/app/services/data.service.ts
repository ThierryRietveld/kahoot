import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(private http: HttpClient,
              private router:Router) { }

  private isLoggedIn = false;
  private postData;

  LogIn(username, password) {

    this.postData = {
      name: username,
      pass: password
    }

    this.http.post('http://localhost:4201/login', this.postData)
    .subscribe(data => {
      console.log(data);
      if (data) {
        console.log("logged in");
        localStorage.setItem('userId', data['id']);
        localStorage.setItem('userToken', data['token']);
        this.router.navigate(["/home"]);
      } else {
        console.log("Opbokke");
      }
    });
  }

  logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(["/login"]);
  }

  exstractData(res:Response){
    return res.json();
  }



  IsLoggedIn() {
    
      // if(localStorage.getItem("userId") !== null && localStorage.getItem("userToken") !== null) {


      this.postData = {
        id: localStorage.getItem("userId"),
        token: localStorage.getItem("userToken")
      }

      console.log('boi');

      return this.http.post('http://localhost:4201/isloggedin', this.postData)
      .map(res => res);

      

    // } 
    // else {
    //   return
    // }

  }

  Register(user, first, infix, last, email, pass, passCon) {

    this.postData = {
      username: user,
      firstname: first,
      infix: infix,
      lastname: last,
      email: email,
      password: pass,
      passwordConfirm: passCon
    }

    this.http.post('http://localhost:4201/register', this.postData)
    .subscribe(data => {
      if (data[0]) {
        console.log(data);
      } else {
        console.log("Registration went wrong");
      }
    });

  }

  saySomething(text) {
    console.log(text);
  }
}

interface logInResponse {
  results: string[];
}