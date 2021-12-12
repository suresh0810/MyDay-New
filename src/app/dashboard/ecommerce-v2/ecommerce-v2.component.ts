import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce2';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';


@Component({
  selector: 'app-ecommerce-v2',
  templateUrl: './ecommerce-v2.component.html',
  styleUrls: ['./ecommerce-v2.component.scss']
})
export class EcommerceV2Component implements OnInit {

  
  // Chart 5
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;



  // Chart 8
  
  public doughnutChartData = chartsData.doughnutChartData;
  public doughnutChartLabels = chartsData.doughnutChartLabels;
  public doughnutChartOptions = chartsData.doughnutChartOptions;
  public doughnutChartColors = chartsData.doughnutChartColors;
  public doughnutChartType = chartsData.doughnutChartType;


  
  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  

  
  
  constructor() {}
  
  
  ngOnInit(): void {

    $.getScript('./assets/js/Chart.extension.js');
    $.getScript('./assets/js/ecommerce2.js');

  }
  

}
