import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User }  from './../classes/user';
import { UserServiceService }  from './../user-service.service';


@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css']
})
export class OtheruserComponent implements OnInit {
  islogged:string;
  
  user: User;
  result : string;
  updatepage: boolean = true;
  success: boolean;
  processend: boolean = false;
  
  pass_val:RegExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}");
  email_val:RegExp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

  constructor(private loginserviceService: LoginserviceService,
    private router: Router,
    private userService : UserServiceService){
      this.user= new User();
  }
  
  async onSubmit(){
    let res;
    if(!this.user.password.match(this.pass_val)){
      alert("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more ");
    }
    else if(!this.user.email.match(this.email_val)){
      alert(" Enter valid email");
    }
    else{
        res= await this.userService.updateUser (this.user.userName,this.user.password,
        this.user.email);
        if(res==null){
          this.updatepage=false;
          this.processend=true;
          this.success = false;
          console.log("failure");
        }
        else{
          this.updatepage=false;
          this.processend=true;
          this.success = true;

        }
    }
 }
 

  getLoginDetails(): string {
    this.islogged= this.loginserviceService.currentUserValue();
    return this.islogged;
  }

  ngOnInit() {
    this.islogged=this.getLoginDetails();
    if(this.islogged!="user" ){
      this.loginserviceService.resetvalue();
      this.router.navigate(['/login']);
      return;
    }
  }

  

}
