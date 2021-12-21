import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User, Task, FirebaseUser, KStatus, KstatusOption,createddate,Deadline } from '../Classes';
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




@Component({
  selector: 'app-ecommerce-v1',
  templateUrl: './ecommerce-v1.component.html',
  styleUrls: ['./ecommerce-v1.component.scss']
})
export class EcommerceV1Component implements OnInit {

  userName: string;
  Selected_People: string;

  FB_User: any;
  taskdetails: string;
  User_: User;
  Tasks: Task[];
  List_of_Tasks = [];
 //Global_UserList: [];
  closeResult: string = '';
  FirebaseUser_: FirebaseUser;
  CreateDate_:createddate;
  Deadline_:Deadline;
  public UserList: any[];
  Status_: KStatus;
  List_of_option: KstatusOption;
date:string;
  Temp_Task: Task;
  created_at:Date;
  Global_UserList: FirebaseUser[];

  @ViewChild("chart-1") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  positionmodel: NgbDateStruct;
  placement = 'bottom';
  placement1 = 'bottom';
  searchText;
  complete;
  
  // line -Chart 1
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;

  
  // Doughnut -Chart 2
  public doughnutChartLabels = chartsData.doughnutChartLabels;
  public doughnutChartData = chartsData.doughnutChartData;
  public doughnutChartType = chartsData.doughnutChartType;
  public doughnutChartColors = chartsData.doughnutChartColors;
  public doughnutChartOptions = chartsData.doughnutChartOptions;

  
  // line -Chart 3
  public lineChart3Data = chartsData.lineChart3Data;
  public lineChart3Labels = chartsData.lineChart3Labels;
  public lineChart3Options = chartsData.lineChart3Options;
  public lineChart3Colors = chartsData.lineChart3Colors;
  public lineChart3Legend = chartsData.lineChart3Legend;
  public lineChart3Type = chartsData.lineChart3Type;

  // bar -Chart 4
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;

  // bar -Chart 6
  public barChart6Options = chartsData.barChart6Options;
  public barChart6Labels = chartsData.barChart6Labels;
  public barChart6Type = chartsData.barChart6Type;
  public barChart6Legend = chartsData.barChart6Legend;
  public barChart6Data = chartsData.barChart6Data;
  public barChart6Colors = chartsData.barChart6Colors;


  
  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  constructor( private router: Router, private DBService_: DBService, private afs: AngularFirestore, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) {

    //this.afs.collection('users').valueChanges().subscribe(List => {
    //  this.UserList = List;
     // console.log(this.UserList);
    //})
    
    // Chart 5 Options
    this.chartOptions = {

      chart: {
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          //startAngle: -135,
          //endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
        color: 'rgba(254, 197, 7, 0.55)',
              opacity: 0.55
            }
          },
  
          dataLabels: { 
            name: {
              offsetY: -5,
              show: true,
              color: '#fff',
              fontSize: '14px'
            },
            value: {
              formatter: function (val) {
            return val + "%";
          },
              color: '#fff',
              fontSize: '20px',
              show: true,
        offsetY: 10,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [65],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Total'],

   };

  }
  
  ngOnInit(): void {

    
    $.getScript('./assets/js/ecommerce1.js');    
    
    this.Temp_Task = new Task("", this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    
    this.LoadToDolist();
    this.getFirebaseUsers();
    this.auth.user_.subscribe(user =>
      {
            this.FB_User = user; 

            console.log("this.FB_User : "+this.FB_User.userId);   
  
           this.Global_UserList.forEach(element => 
            {       
             if(this.FB_User.userId==element.id)
              {
              this.FirebaseUser_=element;
             }
         });
  
            this.User_ = new User(this.FirebaseUser_); 
     //this.UpdateUserFristime(this.User_);  
      })
  }
 

  LoadUserDataFromServer(User_:User)
  {
    this.DBService_.LoadToDolistUserData(User_).subscribe((Data_:any)=>
    {      

      
      console.log("Loaded User Data");
    })
  }

  create_Task(_newTask: Task): void 
  {

    _newTask.Task_Createddate=new Date(Date.now());
    _newTask.start_date=new Date(Date.now());
    _newTask.end_date=new Date(Date.now());

    console.log(this.FB_User);

    _newTask.Owner_Of_The_Task={} as FirebaseUser;
    _newTask.Owner_Of_The_Task.id = this.FB_User.userId;
    _newTask.Owner_Of_The_Task.userName = this.FB_User.userName;

    this.DBService_.createToDolist(_newTask).subscribe((Data_) => {               
      console.log(Data_);     
      this.toast.success('Create Task Success!','Success!', {
        timeOut:1500
      });
    
    
     this.LoadToDolist();      
    // this.LoadUserDataFromServer(this.User_);
    });   
    
  }

  LoadToDolist() {
    this.DBService_.LoadToDolist().subscribe((list_: any) => {
      this.List_of_Tasks = list_;
      console.log(this.List_of_Tasks);
    })
  }

  updateTodo(_Task: Task) {
    //var temp = new Task(Index)
    this.DBService_.UpdateToDolist(_Task).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolist();
    })
  }


  DeleteToDo(_Task: Task) 
  {
    this.DBService_.DeleteToDolist(_Task).subscribe((list_) => {
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolist();
      this.toast.success('Task Delete Success!', 'Success!', {
        timeOut:1500
      });
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
      console.log(this.Global_UserList);     
    });
    return this.Global_UserList;
  }  

  reset() {
    this.Temp_Task.Task_Name = "";
    this.Temp_Task.Selected_People = [];
  }
  onSomeAction(event){
    if(event.keyCode===13){
      //submit form
    }
   }

   

}
