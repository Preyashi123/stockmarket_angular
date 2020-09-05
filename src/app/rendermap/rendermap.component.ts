import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
import { FormBuilder } from "@angular/forms";
import {ExportService} from 'src/app/export.service'

@Component({
  selector: 'app-rendermap',
  templateUrl: './rendermap.component.html',
  styleUrls: ['./rendermap.component.css']
})
export class RendermapComponent implements OnInit {


  title = 'Stock Exchange';
  chart1=[];
  chart2=[];


  // responses1,responses2,label1,label2,isSame period contains dummy data which gets reset 
  // once setResponse() functions is called from compareCompany or compareSector module
  responses1 = [
    {
        "companyStockPriceId": 1,
        "companyCode": 1002,
        "stockExchange": "nsc",
        "currentPrice": 10.7,
        "date": "2020-01-28",
        "time": "12:15:00"
    },
    {
        "companyStockPriceId": 2,
        "companyCode": 1002,
        "stockExchange": "nsc",
        "currentPrice": 50.7,
        "date": "2020-02-28",
        "time": "12:15:00"
    },
    {
        "companyStockPriceId": 3,
        "companyCode": 1002,
        "stockExchange": "nsc",
        "currentPrice": 30.7,
        "date": "2020-03-03",
        "time": "12:15:00"
    },
    {
      "companyStockPriceId": 1,
      "companyCode": 1002,
      "stockExchange": "nsc",
      "currentPrice": 10.7,
      "date": "2020-04-28",
      "time": "12:15:00"
    },
    {
        "companyStockPriceId": 2,
        "companyCode": 1002,
        "stockExchange": "nsc",
        "currentPrice": 50.7,
        "date": "2020-05-28",
        "time": "12:15:00"
    },
    {
        "companyStockPriceId": 3,
        "companyCode": 1002,
        "stockExchange": "nsc",
        "currentPrice": 30.7,
        "date": "2020-06-03",
        "time": "12:15:00"
    },
    {
      "companyStockPriceId": 3,
      "companyCode": 1002,
      "stockExchange": "nsc",
      "currentPrice": 10.7,
      "date": "2020-06-04",
      "time": "12:15:00"
    },
    {
      "companyStockPriceId": 1,
      "companyCode": 1002,
      "stockExchange": "nsc",
      "currentPrice": 20.7,
      "date": "2020-07-28",
      "time": "12:15:00"
    },
    {
      "companyStockPriceId": 2,
      "companyCode": 1002,
      "stockExchange": "nsc",
      "currentPrice": 50.7,
      "date": "2020-08-28",
      "time": "12:15:00"
    },
    {
      "companyStockPriceId": 3,
      "companyCode": 1002,
      "stockExchange": "nsc",
      "currentPrice": 30.7,
      "date": "2020-09-03",
      "time": "12:15:00"
    },
  ]
  responses2 = [
      {
          "companyStockPriceId": 1,
          "companyCode": 1003,
          "stockExchange": "nsc",
          "currentPrice": 70.7,
          "date": "2020-01-28",
          "time": "12:15:00"
      },
      {
          "companyStockPriceId": 2,
          "companyCode": 1003,
          "stockExchange": "nsc",
          "currentPrice": 20.7,
          "date": "2020-02-28",
          "time": "12:15:00"
      },
      {
          "companyStockPriceId": 3,
          "companyCode": 1003,
          "stockExchange": "nsc",
          "currentPrice": 45.7,
          "date": "2020-03-03",
          "time": "12:15:00"
      },
      {
        "companyStockPriceId": 1,
        "companyCode": 1003,
        "stockExchange": "nsc",
        "currentPrice": 70.7,
        "date": "2020-04-28",
        "time": "12:15:00"
      },
      {
          "companyStockPriceId": 2,
          "companyCode": 1003,
          "stockExchange": "nsc",
          "currentPrice": 20.7,
          "date": "2020-05-28",
          "time": "12:15:00"
      },
      {
          "companyStockPriceId": 3,
          "companyCode": 1003,
          "stockExchange": "nsc",
          "currentPrice": 45.7,
          "date": "2020-06-01",
          "time": "12:15:00"
      },
      {
        "companyStockPriceId": 3,
        "companyCode": 1003,
        "stockExchange": "nsc",
        "currentPrice": 45.7,
        "date": "2020-06-04",
        "time": "12:15:00"
      },
      {
        "companyStockPriceId": 1,
        "companyCode": 1003,
        "stockExchange": "nsc",
        "currentPrice": 10.7,
        "date": "2020-07-28",
        "time": "12:15:00"
      },
      {
        "companyStockPriceId": 2,
        "companyCode": 1003,
        "stockExchange": "nsc",
        "currentPrice": 10.7,
        "date": "2020-08-28",
        "time": "12:15:00"
      },
      {
        "companyStockPriceId": 3,
        "companyCode": 1003,
        "stockExchange": "nsc",
        "currentPrice": 10.7,
        "date": "2020-09-03",
        "time": "12:15:00"
      },
  ]
  label1 ="Company ABC";
  label2 ="Company XYZ";
  isSamePeriod = true;

  xlabels1 = [];
  xlabels2 = [];
  data1 = []; 
  data2 = [];
  avg1=0;
  avg2=0;
  min1=Number.MAX_SAFE_INTEGER; 
  min2=Number.MAX_SAFE_INTEGER;
  max1=Number.MIN_SAFE_INTEGER; 
  max2=Number.MIN_SAFE_INTEGER;

  //these are default chart parameter which are present on load of page
  charttype= 'line';
  chartnumber= 1;




//  <button (click)="getData()">Fetch Data</button>

  setResponse( res1, res2, company1,company2, isSamePeriod)
  {
    this.responses1 = res1;
    this.responses2 = res2;
    this.label1 = company1;
    this.label2 = company2;
    this.isSamePeriod = isSamePeriod;

    if(this.isSamePeriod){
      this.fillMissingData();
      this.createSingleChart();
    }
    else{
      this.fillVar();
      this.createTwoChart();
    }
    
 
    this.calculateAvg();
  }

  graphtype: any = ['line', 'bar'];

  constructor(public fb: FormBuilder, private exportService: ExportService) { }

  graphtypeForm = this.fb.group({
    name: "",
    number: []
  })

  onSubmit() {
    this.charttype = this.graphtypeForm.value.name;
    this.chartnumber = this.graphtypeForm.value.number;
    this.chart1=null;
    this.chart2= null;

    if(this.chartnumber==1 && this.isSamePeriod==true){
   
      this.createSingleChart();
    }
    else if(this.chartnumber==2){
      this.createTwoChart();
    }
    
  }


  ngOnInit()

  {
    if(this.isSamePeriod){
      this.fillMissingData();
      this.createSingleChart();
    }
    else{
      this.fillVar();
      this.createTwoChart();
    }
    this.calculateAvg();
    
  }


  createSingleChart() {
    this.chart1=null;
    this.chart2= [];
    this.chart1 = new Chart('chart1', {
      type: this.charttype,
      data: {
        labels: this.xlabels1,
        datasets: [
          {
            // cubicInterpolationMode: "monotone",
            label: this.label1,
            fill: false,
            //fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "red",
            pointColor: "red",
            pointStrokeColor: "#fff",
            //pointHighlightFill: "#fff",
            //pointHighlightStroke: "rgba(220,220,220,1)",
            data: this.data1,
            borderColor:"red",
            borderWidth: 1
          },
          {
            cubicInterpolationMode: 'monotone',
            label: this.label2,
            fill: false,
            //fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "green",
            pointColor: "green",
            pointStrokeColor: "#fff",
            //pointHighlightFill: "#fff",
            //pointHighlightStroke: "rgba(151,187,205,1)",
            data: this.data2,

            borderColor:"green",
            borderWidth: 1
          }
        ]   
      }, 
      options: {
        responsive: true,
				tooltips: {
					mode: 'index'
				},
        title:{
          text:"Comparison Charts",
          display:true
        },
        scales: {
          yAxes: [{
            display: true,
						scaleLabel: {
							display: true,
							labelString: 'Price'
						},
            ticks: {
                beginAtZero:true
          }
          }]
        }
      }
    });
  }

  createTwoChart() {
    this.chart1=null;
    this.chart2= null;
    this.chart1 = new Chart('chart1', {
      type: this.charttype,
      data: {
        labels: this.xlabels1,
        datasets: [
          {
            cubicInterpolationMode: 'monotone',
            label: this.label1,
            fill: false,
            //fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "red",
            pointColor: "red",
            pointStrokeColor: "#fff",
            //pointHighlightFill: "#fff",
            //pointHighlightStroke: "rgba(220,220,220,1)",
            data: this.data1,
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
          },
        ]   
      }, 
      options: {
        responsive: true,
        title:{
          text:"Company comparison",
          display:true
        },
        scales: {
          yAxes: [{
          ticks: {
              beginAtZero:true
          }
          }]
        }
      }
    });
    this.chart2 = new Chart('chart2', {
      type: this.charttype,
      data: {
        labels: this.xlabels2,
        datasets: [
          {
            cubicInterpolationMode: 'monotone',
            label: this.label2,
            fill: false,
            //fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "green",
            pointColor: "green",
            pointStrokeColor: "#fff",
            //pointHighlightFill: "#fff",
            //pointHighlightStroke: "rgba(151,187,205,1)",
            data: this.data2,
            lineTension:0.2,
            borderColor:"green",
            borderWidth: 1
          }
        ]   
      }, 
      options: {
        responsive: true,
        title:{
          text:"Company comparison",
          display:true
        },
        scales: {
          yAxes: [{
          ticks: {
              beginAtZero:true
          }
          }]
        }
      }
    });
  }


  private fillVar() 
  {
 
    for (var i=0;i<this.responses1.length || i<this.responses2.length;i++) {
      if(i<this.responses1.length) {
        this.data1.push(this.responses1[i].currentPrice);
        this.xlabels1.push(this.responses1[i].date);

      } 
      if(i<this.responses2.length) {
        this.data2.push(this.responses2[i].currentPrice);
        this.xlabels2.push(this.responses2[i].date);
      
      }
      
  }


    // for(let s of this.s1){
    //   this.xlabels1.push(s);
    // }
    
  }

  calculateAvg(){
    for (let e of this.data1){
      this.avg1 +=e;
      if(e>this.max1) this.max1=e
      if(e<this.min1) this.min1=e
    }
    for (let e of this.data2){
      this.avg2 +=e;
      if(e>this.max2) this.max2=e
      if(e<this.min2) this.min2=e
    }
    this.avg1= this.avg1/this.data1.length;
    this.avg2= this.avg2/this.data2.length;
  }

  export() {
    this.exportService.exportExcel(this.responses1, 'Datasheet');
    this.exportService.exportExcel(this.responses2, 'Datasheet');

  }


  fillMissingData(){
    var l1= this.responses1.length;
    var l2 = this.responses2.length;
    var maxl = l1<l2?l2:l1;
    var tempData1 =[];
    var tempData2 =[];
    var tempXlabel =[];
    var c1ptr=0;
    var c2ptr=0;
    var flag = true;

    while(flag){

      if(c1ptr==l1 || c2ptr==l2) {

        flag =false; break;}
      else if(this.responses1[c1ptr].date==this.responses2[c2ptr].date){
      
        tempData1.push(this.responses1[c1ptr].currentPrice)
        tempData2.push(this.responses2[c2ptr].currentPrice)
        tempXlabel.push(this.responses1[c1ptr].date)
        c1ptr++
        c2ptr++
      }
      else if(this.responses1[c1ptr].date<this.responses2[c2ptr].date){

        tempData1.push(this.responses1[c1ptr].currentPrice)
        tempData2.push(NaN)
        tempXlabel.push(this.responses1[c1ptr].date)
        c1ptr++
      }
      else if(this.responses1[c1ptr].date>this.responses2[c2ptr].date){

        tempData1.push(NaN)
        tempData2.push(this.responses2[c2ptr].currentPrice)
        tempXlabel.push(this.responses2[c2ptr].date)
        c2ptr++
      }
    }
    if(c1ptr<l1){
      while(c1ptr<l1){

        tempData1.push(this.responses1[c1ptr].currentPrice)
        tempData2.push(NaN)
        tempXlabel.push(this.responses1[c1ptr].date)
        c1ptr++
      }
    }
    else if(c2ptr<l2){

      tempData1.push(NaN)
      tempData2.push(this.responses2[c2ptr].currentPrice)
      tempXlabel.push(this.responses2[c2ptr].date)
      c2ptr++
    }
    this.data1 = tempData1;
    this.data2 = tempData2;
    this.xlabels1 = tempXlabel;
    this.xlabels2 = tempXlabel;

  }


}
