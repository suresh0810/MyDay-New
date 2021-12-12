import { Component, OnInit, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';


@Component({
  selector: 'app-digital-marketing',
  templateUrl: './digital-marketing.component.html',
  styleUrls: ['./digital-marketing.component.scss']
})
export class DigitalMarketingComponent implements OnInit {

  
  constructor() { 

  }

  ngOnInit() {

    $.getScript("./assets/js/dashboard-digital-marketing.js")
  }

}
