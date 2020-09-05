import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { IpoService } from './../ipo.service';
import { Ipo } from './../ipo';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-updateipo',
  templateUrl: './updateipo.component.html',
  styleUrls: ['./updateipo.component.css']
})
export class UpdateipoComponent implements OnInit {

  islogged:string;
  ipoList :Ipo[];
  id: number;
  ipo : Ipo;

  constructor(private loginserviceService: LoginserviceService,
    private router: Router,
    private _router : Router ,
     private ipoService: IpoService){
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
      this.reloadData();
    }
  }
  deleteIpo(id: number) {
    this.ipoService.deleteIpo(id)
      .subscribe(
        response => {
          
          this.reloadData();
          
        })

      }
      gotoIpoList() {
        this._router.navigate(['/ipoList']);
      
      }
      reloadData() {
        this.ipoService.findAll().subscribe(data => {
          this.ipoList = data;
        });
      }

}
