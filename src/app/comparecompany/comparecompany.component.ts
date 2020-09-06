import { Component, OnInit } from '@angular/core';
import { $, element } from 'protractor';
import { Sector } from '../sector';
import { CompanyserviceService } from '../companyservice.service';
import { Company } from '../company';
import { CompanyStockPrice } from '../company-stock-price';
import {RendermapComponent} from '../rendermap/rendermap.component'
import {SharedservicemapService} from '../sharedservicemap.service'

@Component({
  selector: 'app-comparecompany',
  templateUrl: './comparecompany.component.html',
  styleUrls: ['./comparecompany.component.css'],
  providers: [RendermapComponent]
})
export class ComparecompanyComponent implements OnInit {

  companies: Company[];
  stockPrices: CompanyStockPrice[];

  public companyvalue: string;
  public stockexchangevalue: string;
  public fromperiod: string;
  public toperiod: string;
  public periodicity: number;

  public companyList: number[] = [];
  public obj : any;
  public formdata: JSON;

  public companyId: number;
  public companyCode: number;
  public showMap: boolean = false;

  public lolCompanyStockPrice: CompanyStockPrice[][] = [];
  fromPeriodList = [];
  toPeriodList = [];
  periodicityList=[];
  companyNameList=[];

  
  constructor(private companyService : CompanyserviceService,
    private sharedservicemap: SharedservicemapService,
    ) { }

  ngOnInit(): void {
    this.companyService.findAllCompanies().subscribe(data => { 
      this.companies = data
      //console.log(data);
    });
 
    
  }
  
  saveFormData(): void{
    //console.log(this.companyvalue);
    //console.log(this.stockexchangevalue);
    //console.log(this.fromperiod);
    //console.log(this.toperiod);
    //console.log(this.periodicity);
    
    this.companies.forEach(element => {
      //console.log(element.companyName);
      //console.log(this.companyvalue);
      if(element.companyName == this.companyvalue)
      {
        this.companyCode = element.companyCode;
        //console.log(element.companyCode);
      }
    });
    //console.log(this.companyCode);
    this.companyList.push(this.companyCode);
  
    this.obj = {
      "companyList": this.companyList,
      "from": this.fromperiod,
      "to": this.toperiod,
      "periodicity": Number(this.periodicity)
    };

    this.formdata = <JSON>this.obj;
    // console.log(this.formdata);

    this.companyService.findStockPrices(this.obj).subscribe(data => {
      this.stockPrices=data;
      // console.log(data);
      this.lolCompanyStockPrice.push(this.stockPrices);
    });
    
    
    this.fromPeriodList.push(this.obj.from);
    this.toPeriodList.push(this.obj.to);
    if(this.obj.periodicity){
      this.periodicityList.push(this.obj.periodicity)
    }

    this.companyList = [];
  
  
  }

  sendData(): void{


      this.sharedservicemap.stockprices1 = this.lolCompanyStockPrice[0];
      this.sharedservicemap.stockprices2 = this.lolCompanyStockPrice[1]
      this.sharedservicemap.company1 = ''
      this.sharedservicemap.company2 = ''
      this.sharedservicemap.isSamePeriod = true

      if(this.periodicityList.length ==0){
        if(this.fromPeriodList[0]!=this.fromPeriodList[1] || this.toPeriodList[0]!=this.toPeriodList[1]){
          this.sharedservicemap.isSamePeriod = false;
        }
      }

      
      this.showMap=true;     
      this.sharedservicemap.callMethodOfSecondComponent("random");
 

  
  }

  }
