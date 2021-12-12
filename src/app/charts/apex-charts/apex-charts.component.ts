import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-apex-charts',
  templateUrl: './apex-charts.component.html',
  styleUrls: ['./apex-charts.component.scss']
})
export class ApexChartsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $.getScript("./assets/js/apex-custom-script.js")
  }

}
