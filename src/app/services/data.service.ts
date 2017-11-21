import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  private isLoggedIn = false;
  private postData;

  LogIn(username, password) {

    this.postData = {
      name: username,
      pass: password
    }

    this.http.post('http://localhost:4201/login', this.postData)
    .subscribe(data => {
      if (data[0]) {
        console.log("logged in");
      } else {
        console.log("Opbokke");
      }
    });
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