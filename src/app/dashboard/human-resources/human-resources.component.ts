import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent implements OnInit {

  

  constructor() { 

  }

  ngOnInit() {
    $.getScript("./assets/js/dashboard-human-resources.js")
  }

}
