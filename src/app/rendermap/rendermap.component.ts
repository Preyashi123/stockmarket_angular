import { Component, OnInit, ElementRef, } from '@angular/core';
import {Chart} from 'chart.js'
import { FormBuilder } from "@angular/forms";
import {ExportService} from '../export.service'
import {SharedservicemapService} from '../sharedservicemap.service'

@Component({
  selector: 'app-rendermap',
  templateUrl: './rendermap.component.html',
  styleUrls: ['./rendermap.component.css']
})
export class RendermapComponent implements OnInit {



  title = 'Stock Exchange';
  chart1;
  chart2;


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
  responses1: any;
  responses2: any[];
  label1: string;
  label2: string;
  isSamePeriod: boolean;
  showSecondChart: boolean =true;



  setResponse( )
  {
    console.log("setresponse called");
    this.responses1 = this.sharedservicemap.stockprices1;
    this.responses2 = this.sharedservicemap.stockprices2;
    this.label1 = this.sharedservicemap.company1;
    this.label2 = this.sharedservicemap.company2;
    this.isSamePeriod = this.sharedservicemap.isSamePeriod;

    if(this.isSamePeriod){
      this.fillMissingData();
    }
    else{
      this.fillVar();
      
    }
    
    this.createTwoChart();
    this.calculateAvg();
  }

  graphtype: any = ['line', 'bar'];

  constructor(  public fb: FormBuilder,
    private exportService: ExportService,
    private sharedservicemap: SharedservicemapService,
    ) { 

      this.sharedservicemap.invokeEvent.subscribe(value => {
         this.setResponse();
      }); 
    }

  graphtypeForm = this.fb.group({
    name: "",
    number: []
  })

  onSubmit() {
    this.charttype = this.graphtypeForm.value.name;
    this.chartnumber = this.graphtypeForm.value.number;
    this.showSecondChart =true;

    if(this.chartnumber==1 && this.isSamePeriod==true){
      this.showSecondChart =false;
      this.createSingleChart();
    }
    else if(this.chartnumber==2){
      // this.showSecondChart =true;
      console.log(this.showSecondChart)
      this.createTwoChart();
 
    }
   
    
  }


  ngOnInit()

  {
    // if(this.isSamePeriod){
    //   this.fillMissingData();
    //   this.createSingleChart();
    // }
    // else{
    //   this.fillVar();
    //   this.createTwoChart();
    // }
    // // this.calculateAvg();
    
  }


  createSingleChart() {
    this.chart1=null;
    this.chart2= [];
    var canvas1 = document.getElementById('chart1') as HTMLCanvasElement
    var ctx1 = canvas1.getContext('2d');

    this.chart1 = new Chart(ctx1, {
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

    // this.chart1=null;
    // this.chart2= null;
    var canvas1 = document.getElementById('chart1') as HTMLCanvasElement
    var ctx1 = canvas1.getContext('2d');
    var canvas2 = document.getElementById('chart2') as HTMLCanvasElement
    var ctx2 = canvas2.getContext('2d');
    this.chart1 = new Chart(ctx1, {
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
    this.chart2 = new Chart(ctx2, {
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
    if(this.responses1.length || this.responses2.length){
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
    if(this.responses1.length || this.responses2.length){   
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

}
