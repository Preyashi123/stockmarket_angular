import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ImportdataService } from 'src/app/importdata.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-importdata',
  templateUrl: './importdata.component.html',
  styleUrls: ['./importdata.component.css']
})
export class ImportdataComponent implements OnInit {
  islogged:string;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message;
  title = 'Select Excel File To Be Uploaded';
  
  fileInfos: Observable<any>;

  constructor(private loginserviceService: LoginserviceService,
    private router: Router,private importService: ImportdataService){
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
    this.fileInfos = this.importService.getFiles();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.importService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          
          this.fileInfos = this.importService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = ['Could not upload the file!','Please crosscheck the format of excel data from the below table','Check if the Company code and the corresponding Echange exists','',''];
        this.currentFile = undefined;
      });
      
    this.selectedFiles = undefined;
  }


}
