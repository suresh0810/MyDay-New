import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User, Task, Expenses, FirebaseUser, KStatus, KstatusOption,createddate,Deadline } from '../Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
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
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
   // dateInput: "YYYY-MM-DD HH:mm:ss",
    //monthYearLabel: "MMM YYYY",
    //dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    //monthYearA11yLabel: "MMMM YYYY"
    dateInput: "MMM DD YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class FinanceComponent implements OnInit {
  Temp_Task: Task;
  userName: string;
  Selected_People: string;
  //FB_User: any;
  taskdetails: string;
  User_: User;
  Tasks: Task[];
  List_of_Tasks = [];  
  Expenses_List = [];
  Temp_Expenses : Expenses;
  Finance_Item:Expenses[];
 //Global_UserList: [];
  closeResult: string = '';
  FirebaseUser_: FirebaseUser;
  CreateDate_:createddate;
  Deadline_:Deadline;
  public UserList: any[];
  Status_: KStatus;
  List_of_option: KstatusOption;
  date:string;
  created_at:Date;
  Global_UserList: FirebaseUser[];
  load:string;
  searchText;

 public num1:number;
 public num2:number;
 public num3:number;

 public add1:number;
 public add2:number;
 public add3:number;


  constructor(private router: Router, private DBService_: DBService, private afs: AngularFirestore, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) {
    
   }

  ngOnInit(): void {
    this.Temp_Task = new Task("", this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    this.Temp_Expenses = new Expenses("", "",  this.FirebaseUser_, "", "");
    this.getFirebaseUsers();
    this.auth.user_.subscribe(user =>
      {
           // this.FB_User = user;
            console.log("this.FB_User : ");   
            console.log(user); 
                
           this.Global_UserList.forEach(element => 
            {       
             if(user.userId==element.id)
              {
              this.FirebaseUser_=element;
              console.log("this.FirebaseUser_"); 
              console.log(this.FirebaseUser_); 
              this.LoadFinancelistOnlyOwned();
             }
         });  
            this.User_ = new User(this.FirebaseUser_); 
     //this.UpdateUserFristime(this.User_);  
      })
  }

  onKeypressEvent(event: any){

    console.log(event.target.value);

  }

  add(){
  this.add3 =  this.add1 + this.add2;
  }
  div(){
    this.num3 = this.add3 / this.num1  ;
  }

  createFinance(_newExpenses: Expenses): void 
  {
   /// _newExpenses.Spent_date=new Date(Date.now());
    console.log(this.FirebaseUser_);   
    _newExpenses.Owner_Of_The_Task={} as FirebaseUser;
    _newExpenses.Owner_Of_The_Task.id = this.FirebaseUser_.id;
    _newExpenses.Owner_Of_The_Task.userName = this.FirebaseUser_.userName;
  
// calculate per person amount.
// Push the amount in all user's Credit database.
// Credit-> Credit_Provider,Credit_Reciver,Credit_Amount,Credit_Expense_ID.
    
    this.DBService_.createFinanceitem(_newExpenses).subscribe((Data_) => {               
      console.log(Data_);
      
      this.toast.success('Create Task Success!','Success!', {
        timeOut:1500
      });  
      this.LoadFinancelistOnlyOwned();          
    // this.LoadUserDataFromServer(this.User_);
    });    
  }

  updateFinanceitem(_Task: Task) {
    //var temp = new Task(Index)
    this.DBService_.UpdateFinance(_Task).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));     
    })
    this.LoadFinancelistOnlyOwned();
  }

  DeleteFinance(_Task: Task) 
  {
    const index: number = this.List_of_Tasks.indexOf(_Task);
    if (index !== -1) {
        this.List_of_Tasks.splice(index, 1);
    }         
    this.DBService_.DeleteFinancelist(_Task).subscribe((list_) => {
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));
      
      this.toast.success('Task Delete Success!', 'Success!', {
        timeOut:1500
      });
      this.LoadFinancelistOnlyOwned();
    })
  }
  LoadFinancelistOnlyOwned() {
    this.DBService_.LoadFinancelistOnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
      this.Expenses_List = list_;      
        console.log("usertask");
        console.log(this.List_of_Tasks);
     })
    }

    getFirebaseUsers() {
      this.firebaseService.read_users().subscribe(data => {
        this.Global_UserList = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            userName: e.payload.doc.data()['userName'],
          //  filepath: e.payload.doc.data()['filepath'],
          
          };
        })
        console.log("this.Global_UserList");  
        console.log(this.Global_UserList);     
      });
      return this.Global_UserList;
    } 
    reset(){
      this.Temp_Expenses.Spent_by = [];
      this.Temp_Expenses.Spent_For="";
      this.Temp_Expenses.Spent_Amount="";
      this.Temp_Expenses.Spent_date="";
     
    }

//input enter key
  onSomeAction(event){
    if(event.keyCode===13){
      //submit form
    }
   }

}
