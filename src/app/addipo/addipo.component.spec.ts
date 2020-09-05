import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { Ipo } from '../ipo';
import { IpoService } from '../ipo.service';


import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addipo',
  templateUrl: './addipo.component.html',
  styleUrls: ['./addipo.component.css']
})
export class AddipoComponent implements OnInit {
  islogged:string;
  ipo : Ipo;


  constructor(private loginserviceService: LoginserviceService,
    private route: ActivatedRoute, 
    private router: Router, 
    private ipoService: IpoService){
      this.ipo = new Ipo();
  }

  getLoginDetails(): string {
    this.islogged= this.loginserviceService.currentUserValue();
    return this.islogged;
  }

  ngOnInit() {
    this.islogged=this.getLoginDetails();
    if(this.islogged!="admin" ){
      this.loginserviceService.resetvalue();
      this.router.navigate(['/login']);
      return;
    }

  }
  onSubmit() {
    this.ipoService.save(this.ipo).subscribe(result => this.gotoIpoList());
  }
  gotoIpoList() {
    console.log("hello");
    this.router.navigate(['/ipoList']);
  }

}
