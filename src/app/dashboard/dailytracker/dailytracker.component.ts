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
import { ProductionComponent } from '../production/production.component';

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
  selector: 'app-dailytracker',
  templateUrl: './dailytracker.component.html',
  styleUrls: ['./dailytracker.component.scss'],
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
export class DailytrackerComponent implements OnInit {

 

  User_: User;
  Users_:Users;
  User_List: Users[]=[];
  User_Lists: Users[]=[]; 
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
   // this.LoadDaily_Tracker_Update_listOnlyOwned();
    

   }

  ngOnInit(): void {
    this.Temp_User = new Users("", this.FirebaseUser_, "");
    this.Temp_Daily_Tracker = new Daily_Tracker( new Date(Date.now()));
    this.Temp_Daily_Tracker_Update = new Daily_Tracker_Update(new Date(Date.now()),"", this.Temp_Daily_Tracker.Database_id);

    this.Selected_Month_Index = 0;
    this.Selected_Month_Update_Index = 0;
    this.Selected_Month_All_Index = 0;
    this.Selected_Month_Update_All_Index = 0;

    this.Load_Daily_Tracker_All();

    this.getFirebaseUsers();

    
    //this.Selected_group_list_Index =0;

    this.auth.user_.subscribe(user =>
      {
           // this.FB_User = user;
            console.log("this.FB_User : ");   
            console.log(user.userName); 
                
           this.Global_UserList.forEach(element => 
            {       
             if(user.userId==element.id)
              {
              this.FirebaseUser_=element;
              console.log("this.FirebaseUser_"); 
              console.log(this.FirebaseUser_); 
              this.LoadDaily_Tracker_Update_listOnlyOwned();             
            
             }
         });  
            this.User_ = new User(this.FirebaseUser_); 
     //this.UpdateUserFristime(this.User_);  
      })


  }

// User Create
  Create_Daily_Tracker_user(_newDaily_Tracker :Users){ 
   
    _newDaily_Tracker.User_Name = this.FirebaseUser_.userName; 
    _newDaily_Tracker.User_Profile = this.FirebaseUser_.filepath;
    _newDaily_Tracker.Owner_Of_The_Task={} as FirebaseUser;
    _newDaily_Tracker.Owner_Of_The_Task.id = this.FirebaseUser_.id;
    _newDaily_Tracker.Owner_Of_The_Task.userName = this.FirebaseUser_.userName;   
    this.DBService_.Create_Daily_Tracker(_newDaily_Tracker).subscribe((Data_: ObjectId) => {      
      _newDaily_Tracker.Database_id = new ObjectId(Data_.id);       
      console.log(Data_); 
      this.LoadDaily_Tracker_Update_listOnlyOwned(); 
      this.Load_Daily_Tracker_All();   
      this.toast.success('Create Expenses Group Success!','Success!', {
        timeOut:1500
      });       
    });    
  }

// Month Create
  Create_Daily_Tracker(_newDaily_Tracker :Daily_Tracker){
    //_newDaily_Tracker.Month = new Date(Date.now());
        
    this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month.push(_newDaily_Tracker)
       
    this.DBService_.Daily_Tracker_Update_Task(this.User_Lists[this.Selected_Month_Index]).subscribe((Data_: ObjectId) => {      
      _newDaily_Tracker.Database_id = new ObjectId(Data_.id);       
      console.log(Data_); 
      this.LoadDaily_Tracker_Update_listOnlyOwned();   
      this.Load_Daily_Tracker_All(); 
      this.toast.success('Create Expenses Group Success!','Success!', {
        timeOut:1500
      });       
    });    
  }

// Daily Tracker Create
  Create_Daily_Tracker_Update(_newDaily_Tracker_Update: Daily_Tracker_Update){    
   
    _newDaily_Tracker_Update.Database_id = this.Temp_Daily_Tracker.Database_id;
    this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month[this.Selected_Month_Update_Index].List_Of_Daily_Tracker_Update.push(_newDaily_Tracker_Update);

    
    this.DBService_.Daily_Tracker_Update_Task(this.User_Lists[this.Selected_Month_Index]).subscribe((list_: ObjectId) => {
        
      console.log("Update ToDolist_item : " + JSON.stringify(list_));
      console.log('test')
      console.log(this.List_Of_Daily_Tracker[this.Selected_Month_Index]); 
      this.LoadDaily_Tracker_Update_listOnlyOwned();
      this.Load_Daily_Tracker_All();
      this.toast.success('Expenses Create Success!', 'Success!', {
        timeOut:1500
      });
    }) 
  }

  // Update Month
  
  Daily_Tracker_Month_Update(_newDaily_Tracker: Daily_Tracker) {    
    // var temp = new Expenses_list(index)
    this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month.length-1;
   // this.List_Of_Daily_Tracker[this.Selected_Month_Index].length-1;
     this.DBService_.Daily_Tracker_Update_(this.User_Lists[this.Selected_Month_Index]).subscribe((Data_) => {
       console.log("Update Daily_Tracker : " + JSON.stringify(Data_));     
     })
     this.LoadDaily_Tracker_Update_listOnlyOwned();
     this.Load_Daily_Tracker_All();
   }

   // Update Daily Tracker Task

  Daily_Tracker_Update(_newDaily_Tracker_Update: Daily_Tracker_Update) {    
    // var temp = new Expenses_list(index)
    this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month[this.Selected_Month_Update_Index].List_Of_Daily_Tracker_Update.length-1;
   // this.List_Of_Daily_Tracker[this.Selected_Month_Index].List_Of_Daily_Tracker_Update.length-1;
     this.DBService_.Daily_Tracker_Update_(this.User_Lists[this.Selected_Month_Index]).subscribe((Data_) => {
       console.log("Update Daily_Tracker : " + JSON.stringify(Data_));     
     })
     this.LoadDaily_Tracker_Update_listOnlyOwned();
     this.Load_Daily_Tracker_All();
   }

   //Delete Month

   Daily_Tracker_Month_Delete(_newDaily_Tracker) {    
    // var temp = new Daily_Tracker_Update(index)
   // this.List_Of_Daily_Tracker[this.Selected_Month_Index].List_Of_Daily_Tracker_Update.length-1;
   this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month.length-1;
     this.DBService_.Daily_Tracker_Update_Delete(_newDaily_Tracker).subscribe((Data_) => {
       console.log("Update Daily_Tracker Delete: " + JSON.stringify(Data_));  
       this.LoadDaily_Tracker_Update_listOnlyOwned();
     this.Load_Daily_Tracker_All();     
       this.toast.success('Daily Tracker Delete Success!', 'Success!', {
        timeOut:1500
      });
     })
     
    
   }

   Daily_Tracker_Update_Delete(_newDaily_Tracker) {  
     
  // const index: number = this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month[this.Selected_Month_Update_Index].List_Of_Daily_Tracker_Update.indexOf(Daily_Tracker_Update_);
   // if (index !== -1) {
   //   this.User_Lists[this.Selected_Month_Index].List_of_Daily_Tracker_Month[this.Selected_Month_Update_Index].List_Of_Daily_Tracker_Update.splice(index, 1);
   // }        
    
     this.DBService_.Daily_Tracker_Update_Delete(_newDaily_Tracker.id).subscribe((Data_) => {
     
      console.log("Update Daily_Tracker Delete: " + JSON.stringify(_newDaily_Tracker));       
       this.toast.success('Daily Delete Success!', 'Success!', {
        timeOut:1500
      });
     })
     this.LoadDaily_Tracker_Update_listOnlyOwned();
     this.Load_Daily_Tracker_All();
   }



  LoadDaily_Tracker_Update_listOnlyOwned() {    
    this.DBService_.LoadDaily_Tracker_Update_listOnlyOwned(this.FirebaseUser_).subscribe((Data_: Users[]) => {
     // this.Expenses_List = list_;     
      this.User_Lists = Data_  ;  
    
    // this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense = list_     
        console.log("User_Lists");

        console.log(this.User_Lists);

        if(Data_.length==0){
          this.Create_Daily_Tracker_user(this.Temp_User);                        
       }  
              
     })    
    }
   
   
    


    Load_Daily_Tracker_All(){
      this.DBService_.Load_Daily_Tracker_All().subscribe((Data_:Users[])=>{
        this.User_List = Data_;
        console.log('List_Of_Daily_Tracker_All');
        console.log(this.User_List);
        
      })          
    }



  tabClick(event) {
    console.log('tab');
    console.log(event);
    this.Selected_Month_Index = event.index;
    // this.Selected_board.Board_Title = event.tab.textLabel;
    // this.Selected_Group.Group_Title =this.Selected_board.Board_Title
  }
  tabClick1(event){
    console.log(event);
    this.Selected_Month_Update_Index = event.index;
  }

  tabClick2(event){
    console.log(event);
    this.Selected_Month_All_Index = event.index;
  }

  tabClick3(event){
    console.log(event);
    this.Selected_Month_Update_All_Index = event.index;
  }

  getFirebaseUsers() {
    this.firebaseService.read_users().subscribe(data => {
      this.Global_UserList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userName: e.payload.doc.data()['userName'],
         filepath: e.payload.doc.data()['filepath'],
        
        };
      })
      console.log("this.Global_UserList");  
      console.log(this.Global_UserList);     
    });
    return this.Global_UserList;
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
