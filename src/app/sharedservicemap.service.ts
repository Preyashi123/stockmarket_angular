import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SharedservicemapService {


    invokeEvent: Subject<any> = new Subject(); 
    stockprices1=[];
    stockprices2=[];
    company1=''
    company2=''
    isSamePeriod: boolean = true;

  callMethodOfSecondComponent(value) { 
    this.invokeEvent.next(value)      
  }
}
