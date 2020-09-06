import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SharedservicemapService {


    invokeEvent: Subject<any> = new Subject(); 
    stockprices1=[];
    stockprices2=[];
    company1='abc'
    company2='cdf'
    isSamePeriod: boolean = true;

  callMethodOfSecondComponent(value) { 
    this.invokeEvent.next(value)      
  }
}
