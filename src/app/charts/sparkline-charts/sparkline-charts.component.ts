import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-sparkline-charts',
  templateUrl: './sparkline-charts.component.html',
  styleUrls: ['./sparkline-charts.component.scss']
})
export class SparklineChartsComponent implements OnInit {


  constructor() {
    
   }

  ngOnInit() {
    $.getScript('./assets/js/apex-sparkline-charts-script.js');
    $.getScript('./assets/js/sparkline-chart-script.js');
  }

}
