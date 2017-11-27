import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  rForm:FormGroup;

  username:string;
  firstname:string;
  infix:string;
  lastname:string;
  email:string;
  password:string;
  passwordConfirm:string;

  constructor(private dataService:DataService, private fb: FormBuilder) {
    this.rForm = fb.group({
      'username': [null,Validators.required],
      'firstname' : [null, Validators.required],
      'infix' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'passwordConfirm' : [null, Validators.required]
    });
   }

  ngOnInit() {

  }

  

  submitForm(formPost){
    console.log(formPost);
    // if(this.password != this.passwordConfirm){
    //   return;
    // }
    // if(this.username == "" || this.firstname == "" || this.lastname == "" || this.email == "" || this.password == ""){
    //   return;
    // }
    this.dataService.Register(formPost.username,formPost.firstname,formPost.infix,formPost.lastname,formPost.email,formPost.password,formPost.passwordConfirm);
  }

}
