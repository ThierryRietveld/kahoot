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

  saySomething(text) {
    console.log(text);
  }
}

interface logInResponse {
  results: string[];
}