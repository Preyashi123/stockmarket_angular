import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User }  from './../classes/user';
import { UserServiceService }  from './../user-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  signuppage:boolean=true;
  user: User;
  result : string;
  success: boolean;
  processend: boolean = false;

  pass_val:RegExp = new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
  email_val:RegExp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  

  constructor(private loginserviceService: LoginserviceService,
    private router: Router,
    private  userService: UserServiceService){

      this.user= new User();
  }

  async onSubmit(){
    let res;
    if(!this.user.password.match(this.pass_val)){
      alert("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more");
     }
    else if(!this.user.email.match(this.email_val)){
      alert(" Enter valid email");
     }
    else{
        res= await this.userService.addUser (this.user.userName,this.user.password,this.user.email);
        if(res == null){
         this.signuppage=false;
         this.processend=true;
         this.success = false;
        }
        else{
         this.signuppage=false;
         this.processend=true;
         this.success = true;
        }
    }
 
  }
  onsuccess(){
    this.loginserviceService.loggedin("user");
    this.router.navigate(['/userlanding']);
  }

}
