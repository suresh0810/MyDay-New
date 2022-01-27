import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User, Task,  FirebaseUser, KStatus, KstatusOption,createddate,Deadline, Expense_Group,Expense} from '../Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    DatePipe,    
  ]
})


export class FinanceComponent implements OnInit {
  Temp_Task: Task;
  userName: string;
  Selected_People: string;
  Spent_For:string;
  //FB_User: any;
  taskdetails: string;
  User_: User;
  Tasks: Task[];
  List_of_Tasks = [];  
  Expenses_List = [];
  List_of_Expenses_Group: any= [];
  List_Of_Expense: any= [];

  Temp_Expense_Group : Expense_Group;
  Temp_Expense:Expense
 // Finance_Item:Expenses[];
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
Idsend=[]

  List_of_Expense=[];
  //lists_:Expenses_list[];

  totalamount:number;

 public num1:number;
 public num2:number;
 public num3:number;

 public add1:number;
 public add2:number;
 public add3:number;
 val: number;
 Selected_group_Index: number;
 Selected_group_list_Index: number;


 total;
  constructor(private router: Router, private DBService_: DBService, private afs: AngularFirestore,private modalService: NgbModal, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) {

  }

  ngOnInit(): void {
  //  this.Temp_Task = new Task("", this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    this.Temp_Expense_Group= new Expense_Group(  this.FirebaseUser_, new Date(Date.now()), "");
    this.Temp_Expense =new Expense( "", this.FirebaseUser_,0,this.Temp_Expense_Group.Database_id, this.Global_UserList,"" );

    this.getFirebaseUsers();

    this.Selected_group_Index = 0;
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

//Expenses Total Amount

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.length; i++) {
        if (this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense[i].Spent_Amount) {
            total += this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense[i].Spent_Amount;
            this.totalamount = total;
        }
    }    
    return total;
  }
  

  //Create Expenses_Group

  create_Expenses_Group(_newExpens_group :Expense_Group){
    console.log(this.FirebaseUser_);  
    _newExpens_group.Spent_date=new Date(Date.now()); 
    _newExpens_group.Owner_Of_The_Task={} as FirebaseUser;
    _newExpens_group.Owner_Of_The_Task.id = this.FirebaseUser_.id;
    _newExpens_group.Owner_Of_The_Task.userName = this.FirebaseUser_.userName;   
    this.DBService_.create_Expenses_Group(_newExpens_group).subscribe((list_: ObjectId) => {      
      _newExpens_group.Database_id = new ObjectId(list_.id);  
    // this.List_of_Expenses.push(new ObjectId(list_.id))     
      console.log(list_);     
      this.toast.success('Create Expenses Group Success!','Success!', {
        timeOut:1500
      });  
      this.LoadFinancelistOnlyOwned();            
    // this.LoadUserDataFromServer(this.User_);
    });    
  }

  

//Expenses_Item

 // createFinance(_newExpenses: Expenses): void 
 // {
   /// _newExpenses.Spent_date=new Date(Date.now());
   // console.log(this.FirebaseUser_);   
   // _newExpenses.Owner_Of_The_Task={} as FirebaseUser;
   // _newExpenses.Owner_Of_The_Task.id = this.FirebaseUser_.id;
  //  _newExpenses.Owner_Of_The_Task.userName = this.FirebaseUser_.userName;
  
// calculate per person amount.
// Push the amount in all user's Credit database.
// Credit-> Credit_Provider,Credit_Reciver,Credit_Amount,Credit_Expense_ID.
    
  //  this.DBService_.createFinanceitem(_newExpenses).subscribe((Data_) => {               
    //  console.log(Data_);
      
    //  this.toast.success('Create Task Success!','Success!', {
     //   timeOut:1500
     // });  
     // this.LoadFinancelistOnlyOwned();          
    // this.LoadUserDataFromServer(this.User_);
   // });    
  //}

  //tab index

  tabClick(event) {
    console.log(event);
    this.Selected_group_Index = event.index;
    // this.Selected_board.Board_Title = event.tab.textLabel;
    // this.Selected_Group.Group_Title =this.Selected_board.Board_Title
  }


  updateFinanceitem(_newExpenses: Expense) {    
   // var temp = new Expenses_list(index)
   this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.length-1;
    this.DBService_.UpdateFinance(this.List_of_Expenses_Group[this.Selected_group_Index]).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));     
    })
    this.LoadFinancelistOnlyOwned();
  }
  

  

  Delete_Expense_group(_newExpenses:Expense_Group)
  {     
    const index: number = this.List_of_Expenses_Group.indexOf(_newExpenses);
    if (index !== -1) {
      this.List_of_Expenses_Group.splice(index, 1);
    }        
    this.DBService_.DeleteFinancelist(_newExpenses).subscribe((list_:ObjectId) => {
    //  _newExpenses._id = list_
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));
      this.LoadFinancelistOnlyOwned();
      
      this.toast.success('Task Delete Success!', 'Success!', {
        timeOut:1500
      });
      
    })
  }


  Delete_Expense(_newExpenses:Expense)
  {
   // this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.length-1;
    const data_: number = this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.indexOf(_newExpenses);
    if (data_ !== -1) {
      this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.splice(data_, 1);
    }           
    this.DBService_.DeleteExpenses_list(data_).subscribe((list_:ObjectId) => {
     // _newExpenses._id = list_     
      console.log("Delete Expense list : " + JSON.stringify(list_));      
      this.toast.success('Task Delete Success!', 'Success!', {
        timeOut:1500
      });
      this.LoadFinancelistOnlyOwned();
    }),(error) => {
  console.log(error);
}
    
  }
 

  create_Expenses(_newExpense: Expense){
    
    _newExpense.Spent_by = this.FirebaseUser_.userName; 
    _newExpense.Database_id = this.Temp_Expense_Group.Database_id; 

    this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense.push(_newExpense);
    this.DBService_.UpdateFinance(this.List_of_Expenses_Group[this.Selected_group_Index]).subscribe((list_: ObjectId) => {
        
      console.log("Update ToDolist_item : " + JSON.stringify(list_));
      console.log('test')
      console.log(this.List_of_Expenses_Group[this.Selected_group_Index]); 
      this.LoadFinancelistOnlyOwned();   
      this.toast.success('Expenses Create Success!', 'Success!', {
        timeOut:1500
      });
    })
 
  }


  LoadFinancelistOnlyOwned() {    
    this.DBService_.LoadFinancelistOnlyOwned(this.FirebaseUser_).subscribe((list_: Expense[]) => {
     // this.Expenses_List = list_;     
      this.List_of_Expenses_Group = list_  ;  
    // this.List_of_Expenses_Group[this.Selected_group_Index].List_Of_Expense = list_
     
        console.log("usertask");

        console.log(this.List_of_Expenses_Group);

        if(list_.length==0){
          this.create_Expenses_Group(this.Temp_Expense_Group);                
         }            
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
      this.Temp_Expense.Spent_For="";
      this.Temp_Expense.Spent_Amount=0;
     
     
    }
    reset_group(){
      this.Temp_Expense_Group.Expense_Group_Name="";
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

}
