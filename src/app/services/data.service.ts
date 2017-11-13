import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }

  private isLoggedIn = false;
  private postData;

  LogIn(username, password){
    this.postData = {
      name: username,
      pass: password
    }

    this.http.post('http://localhost:4201/login', this.postData)
    .subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data[0])
    });
  }

  saySomething(text){
    console.log(text);
  }
}

interface logInResponse {
  results: string[];
}