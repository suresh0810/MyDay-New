import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User,  FirebaseUser, Daily_Tracker, Daily_Tracker_Update, Users} from '../Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import { SumPipe } from '../pipe/sum.pipe';
import { Observable } from 'rxjs/Observable';
import {tap, map, delay} from 'rxjs/operators';


import {
  ChartComponent,
  ApexChart,
  ApexAnnotations,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStates,
  ApexTitleSubtitle,
  ApexTheme,
  ApexMarkers
} from "ng-apexcharts";
import { Router } from '@angular/router';
import{ AuthService} from '../../auth/auth.service';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { time, timeStamp } from 'console';
import { timeout, timestamp } from 'rxjs/operators';
import { start } from 'repl';
export type ChartOptions = {
  chart: ApexChart;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  states: ApexStates;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
  markers: ApexMarkers
};

import {
DateAdapter,
MAT_DATE_LOCALE,
MAT_DATE_FORMATS
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
   // dateInput: "YYYY-MM-DD HH:mm:ss",
    //monthYearLabel: "MMM YYYY",
    //dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    //monthYearA11yLabel: "MMMM YYYY"
    dateInput: "LL",
    monthYearLabel: "MMM YYYY",
   // dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
@Component({
  selector: 'app-dailytrackerall',
  templateUrl: './dailytrackerall.component.html',
  styleUrls: ['./dailytrackerall.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,    
  ]
})
export class DailytrackerallComponent implements OnInit {

  User_: User;
  Users_:Users;
  User_List:Users[]=[];
  User_Lists:any[]; 
  List_Of_Daily_Tracker: any[]= [];
  List_Of_Daily_Tracker_Update:any[]=[];
  Temp_User:Users;
  Temp_Daily_Tracker:Daily_Tracker;
  Temp_Daily_Tracker_Update:Daily_Tracker_Update;

  List_Of_Daily_Tracker_All:any=[];

  Selected_Month_Index: number;
  Selected_Month_Update_Index: number;

  Selected_Month_All_Index: number;
  Selected_Month_Update_All_Index:number;
  

  FirebaseUser_: FirebaseUser;
  Global_UserList: FirebaseUser[];
  searchText:string;

  constructor(private router: Router, private DBService_: DBService, private afs: AngularFirestore,private modalService: NgbModal, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) {
    
   }

  ngOnInit(): void {

    

  
    this.Selected_Month_All_Index=0;
    this.Selected_Month_Update_All_Index=0;

    
    this.Load_Daily_Tracker_All();


    
    //this.Selected_group_list_Index =0;

    
  }


  
  


  


 
   
   
    


    Load_Daily_Tracker_All(){
      this.DBService_.Load_Daily_Tracker_All().subscribe((Data_:Users[])=>{
        this.User_List = Data_;
        console.log('List_Of_Daily_Tracker_All');
        console.log(this.User_List);
        
      })          
    }




  tabClick2(event){
    console.log(event);
    this.Selected_Month_All_Index = event.index;
  }

  tabClick3(event){
    console.log(event);
    this.Selected_Month_Update_All_Index = event.index;
  }


//input enter key
onSomeAction(event){
  if(event.keyCode===13){
    //submit form
  }
 }
 // Pop Model
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  reset(){
    this.Temp_Daily_Tracker_Update.Daily_Tracker_Update_Task = "";
  }
  reset1(){
    this.Temp_Daily_Tracker.Month = new Date(Date.now());
  }

}
