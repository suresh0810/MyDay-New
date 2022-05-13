import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User, Task, FirebaseUser, KStatus, KstatusOption,createddate,Deadline,Task_Update } from '../Classes';
import { ObjectId } from 'bson';
import { FormGroup, FormControl } from "@angular/forms";
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
import { AnyRecord } from 'dns';
import { SearchdataService } from '../api/searchdata.service';
export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
   // dateInput: "YYYY-MM-DD HH:mm:ss",
    //monthYearLabel: "MMM YYYY",
    //dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    //monthYearA11yLabel: "MMMM YYYY"
    dateInput: "MMM DD",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
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
export class TaskComponent implements OnInit {


  
  // enable = true;
  // count = 0;
  // change = false;
  // valueChange = false;
  // changeEvent: MouseEvent;
  isLoading = false;
  fakeAsync: Observable<boolean> = new Observable((observer) => {
    this.isLoading = true;
    const timeout = setTimeout(() => {
      this.isLoading = false;
      observer.next(true);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  //
  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  @ViewChild('f') myNgForm;
  userName: string;
  Selected_People: string;

  FB_User: any;
  taskdetails: string;
  User_: User;
  Tasks: Task[];
  List_of_Tasks = [];
  List_of_Complete_task = [];
  Task_Id:string;
img;
image = [];
 
  Temp_Task_Update:Task_Update;
  images;
  imagess = [];
  Temp_Task_Content: string;
  Temp_Task_Files: File[];
  List_of_Tasks_filter = [];
  List_of_Tasks_cmplt_filter = [];
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
  Selected_Task: Task;
  Selected_Task_update:Task_Update;

  created_at:Date;
  Global_UserList: FirebaseUser[];
  load:string;
  name;

  Selected_index:number;

  sidenave: HTMLElement;

  @ViewChild("chart-1") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  positionmodel: NgbDateStruct;
  placement = 'bottom';
  placement1 = 'bottom';
  searchText;

  searchTexts;
  searchTextsowner;

  complete;

  load_image =[];
  form: FormGroup;

  Select_update_index:number;
  
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
  
  constructor(private searchdata:SearchdataService,private modalService: NgbModal,private router: Router, private DBService_: DBService, private afs: AngularFirestore, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) {
   
   // this.searchText = this.searchdata.Select_Search_Data;
   // console.log(this.searchText);

   
    
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
    this.searchdata.Select_Search_Data.subscribe(data =>{
      this.searchText = data
  })

    
    this.cal()
      
    $.getScript('./assets/js/ecommerce1.js'); 

    this.Selected_index = 0;
    this.Select_update_index = 0;

    this.Temp_Task_Content = "";
    this.Temp_Task_Files = [];

    this.Temp_Task_Update = new Task_Update(this.Temp_Task_Content,this.Temp_Task_Files,new Date(Date.now()));  
    
    this.Temp_Task = new Task("", false,false, this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    this.Selected_Task = new Task("",false,false, this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    this.Selected_Task_update = new Task_Update("",[],new Date(Date.now()))

    this.sidenave = document.getElementById('mySidenav');
  
    this.getFirebaseUsers();
    this.auth.user_.subscribe(user =>
      {
           // this.FB_User = user;
            console.log("this.FB_User : "); 
              this.name = user.userName;
              this.searchTextsowner = user.userName;
            console.log(user.userName);     
           this.Global_UserList.forEach(element => 
            {       
             if(user.userId==element.id)
              {
              this.FirebaseUser_=element;
              console.log("this.FirebaseUser_"); 
              console.log(this.FirebaseUser_); 
              this.LoadToDolistOnlyOwned();
              this.LoadToDolist_Done_OnlyOwned();
              this.LoadToDolist_filter_OnlyOwned();
              this.LoadToDolist_filter_cmplt_OnlyOwned();
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
  

  create_Task(_newTask: Task){
    
  this.List_of_Tasks.push(new Task(this.Temp_Task.Task_Name,this.Temp_Task.Status,true,this.FirebaseUser_,new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()))); 
 
    
    _newTask.Task_Createddate=new Date(Date.now());
    _newTask.start_date=new Date(Date.now());
    _newTask.end_date=new Date(Date.now());
    console.log(this.FirebaseUser_);
    
    _newTask.Owner_Of_The_Task={} as FirebaseUser;
    _newTask.Owner_Of_The_Task.id = this.FirebaseUser_.id;
    _newTask.Owner_Of_The_Task.userName = this.FirebaseUser_.userName;
   _newTask.Assing_People = this.FirebaseUser_.Selected_People;
    this.DBService_.createToDolist(_newTask).subscribe((Data_) => {               
      console.log(Data_);     
      
      // this.DBService_.LoadToDolistOnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
      //   this.List_of_Tasks = list_;      
      //     console.log("usertask");                
      //     console.log(this.List_of_Tasks);
          
      //     this.toast.success('Create Task Success!','Success!', {
      //       timeOut:1500
      //     }); 
      //  })    
       
      //  this.DBService_.LoadToDolist_filter_OnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
      //   this.List_of_Tasks_filter = list_;      
      //     console.log("usertask filter");      
      //     console.log(this.List_of_Tasks_filter);
      //  })
         this.LoadToDolistOnlyOwned();
         this.LoadToDolist_filter_OnlyOwned();
         this.LoadToDolist_Done_OnlyOwned(); 
         this.LoadToDolist_filter_cmplt_OnlyOwned(); 
   
         this.toast.success('Create Task Success!','Success!', {
         
          timeOut:1500
          });         
            
    // this.LoadUserDataFromServer(this.User_);
    });
    _newTask.isLoading = this.Temp_Task.isLoading;
    const timeout = setTimeout(() => {
     _newTask.isLoading = false;   
      
      
    }, 1500);
    return () => clearTimeout(timeout); 
    
    }

  LoadToDolistOnlyOwned() {
  this.DBService_.LoadToDolistOnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
    this.List_of_Tasks = list_;          
      console.log("usertask");      
      console.log(this.List_of_Tasks);

  
     
     
   })
  }
  LoadToDolist_Done_OnlyOwned(){
    this.DBService_.LoadToDolist_Done_OnlyOwned(this.FirebaseUser_).subscribe((Data_: any) => {
      this.List_of_Complete_task = Data_;      
        console.log("List_of_Complete_task");      
        console.log(this.List_of_Complete_task);       
     })

  }
  LoadToDolist_filter_OnlyOwned() {
    this.DBService_.LoadToDolist_filter_OnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
      this.List_of_Tasks_filter = list_;      
        console.log("usertask filter");      
        console.log(this.List_of_Tasks_filter);
     })
    }

    LoadToDolist_filter_cmplt_OnlyOwned() {
      this.DBService_.LoadToDolist_filter_cmplt_OnlyOwned(this.FirebaseUser_).subscribe((list_: any) => {
        this.List_of_Tasks_cmplt_filter = list_;      
          console.log("usertask filter");      
          console.log(this.List_of_Tasks_cmplt_filter);
       })
      }
    


  updateTodo(_Task: Task) {
    //var temp = new Task(Index)

    this.isLoading = true;
    const timeout = setTimeout(() => {
      this.isLoading = false;  

      this.DBService_.UpdateToDolist(_Task).subscribe((list_) => {
        console.log("Update ToDolist_item : " + JSON.stringify(list_));
        this.LoadToDolistOnlyOwned();
        this.LoadToDolist_Done_OnlyOwned();
        this. LoadToDolist_filter_OnlyOwned();   
        this.LoadToDolist_filter_cmplt_OnlyOwned();          
      })

    }, 400);
    return () => clearTimeout(timeout);


 
  }


  DeleteToDo(_Task: Task) 
  {
    const index: number = this.List_of_Tasks.indexOf(_Task);
    if (index !== -1) {
        this.List_of_Tasks.splice(index, 1);
    }         
    this.DBService_.DeleteToDolist(_Task).subscribe((list_) => {
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolistOnlyOwned();
      this.LoadToDolist_Done_OnlyOwned();
      this. LoadToDolist_filter_OnlyOwned();
      this.LoadToDolist_filter_cmplt_OnlyOwned(); 
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
         filepath: e.payload.doc.data()['filepath'],
         Selected_People: e.payload.doc.data()['Selected_People'],
        };
      })
      console.log("this.Global_UserList");  
      console.log(this.Global_UserList);     
    });
    return this.Global_UserList;
  }  


  onChange(value) {
    //alert(value);
    if(value == 'Clear'){
      this.searchTexts = '';
    }
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

   Status = [
     {id:0, Status_Name:''},
    {id:1, Status_Name:'Pending'},
    {id:2, Status_Name:'Started'},
    {id:3, Status_Name:'Done'},
    {id:4, Status_Name:'WIP'},
    {id:5, Status_Name:'Stuck'},
  ]

  openNav(Task_) {
    console.log(Task_._id);
    this.Task_Id = Task_._id;   
     this.Selected_Task = Task_;
    this.sidenave.classList.add('sidenav_Open');
     this.sidenave.classList.remove('sidenav_Close');
     this.index_leng();
  }
  openNavm(Task_) {
    console.log(Task_._id);
    this.Task_Id = Task_._id;   
     this.Selected_Task = Task_;
    this.sidenave.classList.add('sidenav_Opens');
     this.sidenave.classList.remove('sidenav_Close');
     this.index_leng();
  }
  closeNav() {
     this.sidenave.classList.add('sidenav_Close');
     this.sidenave.classList.remove('sidenav_Open');
  }

  deleteImage(url: any) {
    const index = this.images.indexOf(url);
    this.images.splice(index, 1);
    this.Temp_Task_Update.Task_Update_files.splice(index, 1);
  }
  del(url: any) {
    const index = this.images.indexOf(url);
    this.images.splice(index[0]);
  }

  onPaste(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob: File = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        //   console.log(evt.target.result); // data url!
        //this.imgRenderer.nativeElement.src = evt.target.result;
        this.imagess.push(evt.target.result);
        console.log("File Name: " + evt.target.result);
        this.imagess = evt.target.result;
        //save local storage
        //get location src
        //store src string
  

        this.Temp_Task_Files.push(blob);
      };
      reader.readAsDataURL(blob);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.imagess = event.target.files;  
                 
    }   


    // onFileChange(event) {
    //   if (event.target.files.length > 0) {
    //     const file = event.target.files[0];
    //     this.images = file;               
    //   }  

    // if (event.target.files && event.target.files[0]) {
    //   var files = event.target.files.length;
    //   for (let i = 0; i < files; i++) {
    //     var reader = new FileReader();
    //     reader.onload = (event: any) => {
    //       console.log(event.target.result);
    //       this.images.push(event.target.result);
    //       this.imagess = event.target.result;
    //       this.Temp_Task_Update.Task_Update_files.push(event.target.result)
    //     }
    //     reader.readAsDataURL(event.target.files[i]);
    //   }
    // }
    // event.srcElement.value = null;
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = event.target.files; 
     

        
    }
  }

  onSubmit(){
   const formData = new FormData();                
    formData.append('file', this.images);     
    console.log(formData)

    this.DBService_.uplode_Item(formData).subscribe((Data_: any) => {          
      console.log(Data_);     
      
      this.toast.warning('Plaese click Update!', 'Warning!', {
        timeOut:1500
      
      });
     
    })
   
  }





  Task_Select(event){
    console.log(this.Task_Id);
    this.Task_Id = event;
    this.Selected_index = event;
  }



  Task_Update(Taskupdate_:Task_Update) {
    const formData = new FormData();
    console.log(this.image)    
    for(let img of this.imagess){
      formData.append('files', img)       
    }
    Taskupdate_.index = this.Selected_Task.Task_Updates.length + 1
    Taskupdate_.Task_id = this.Task_Id;
    Taskupdate_.Date = new Date(Date.now()) 
    formData.append('files', JSON.stringify(Taskupdate_))         
   // console.log(formData)   
   // let fulldata = {data:Taskupdate_,file:formData} 
   // Taskupdate_.Task_Update_files = this.images;
  
   
    this.Selected_Task.Task_Updates.push(new Task_Update(this.Temp_Task_Update.Task_Update_Content, this.Temp_Task_Update.Task_Update_files,new Date(Date.now())));
    Taskupdate_.Task_id = this.Task_Id; 
    Taskupdate_.Task_Update_Content = this.Temp_Task_Update.Task_Update_Content;
    Taskupdate_.Task_Update_files = this.Temp_Task_Update.Task_Update_files;
    this.DBService_.uplode_multi_image(formData).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolistOnlyOwned();
      this.LoadToDolist_Done_OnlyOwned();
      this. LoadToDolist_filter_OnlyOwned();
      this.LoadToDolist_filter_cmplt_OnlyOwned(); 
      this.toast.success('Task Update Success!', 'Success!', {
        timeOut:1500
      });
  
    })   
  }

  task_update_form_reset(){
    this.Temp_Task_Update.Task_Update_Content = "";
    this.Temp_Task_Update.Task_Update_files = [];
  }



  // Task_Update(Taskupdate_:Task_Update) {
  //   const formData = new FormData();
  //   console.log(this.images)    
  //   formData.append('file', this.images)  
  //   formData.append('file', JSON.stringify(Taskupdate_))    
  //  // console.log(formData)   
  //  // let fulldata = {data:Taskupdate_,file:formData}  

  //  // Taskupdate_.Task_Update_files = this.images;
  //   this.Selected_Task.Task_Updates.push(new Task_Update(this.Temp_Task_Update.Task_Update_Content, this.Temp_Task_Update.Task_Update_files));
  //   Taskupdate_.Task_id = this.Task_Id; 
  //   Taskupdate_.Task_Update_Content = this.Temp_Task_Update.Task_Update_Content;
  //   Taskupdate_.Task_Update_files = this.Temp_Task_Update.Task_Update_files;
  //   this.DBService_.ToDolist_Task_Update(formData).subscribe((list_) => {
  //     console.log("Update ToDolist_item : " + JSON.stringify(list_));
  //     this.LoadToDolistOnlyOwned();
  //     this.LoadToDolist_Done_OnlyOwned();
  //     this. LoadToDolist_filter_OnlyOwned();
  
  //   })   
  // }

  update_index(event){    
    this.Select_update_index = event;
    console.log(this.Select_update_index)

  }
  slecect(event){
    this.Selected_Task_update = event;
    console.log(this.Selected_Task_update.id)
    
  }

  Task_Update_Change(_Task_update: Task_Update) {
    _Task_update.index = this.Select_update_index;   
    _Task_update.Task_id = this.Task_Id;
    _Task_update.Date = new Date(Date.now()) 
    this.DBService_.Task_Update_Change(_Task_update).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolistOnlyOwned();
      this.LoadToDolist_Done_OnlyOwned();
      this. LoadToDolist_filter_OnlyOwned();
      this.LoadToDolist_filter_cmplt_OnlyOwned(); 
      this.toast.success('Task Update Change Success!', 'Success!', {
        timeOut:1500
      });
    })
  }

  index_leng(){   
     this.Selected_Task.Task_Updates.length+1;
     console.log(this.Selected_Task.Task_Updates.length + 1)
  }

  Task_update_delete(_Task_update: Task_Update) {
    const index: number = this.Selected_Task.Task_Updates.indexOf(_Task_update);
    if (index !== -1) {
      this.Selected_Task.Task_Updates.splice(index, 1);
    }  
    _Task_update.Task_id = this.Task_Id;
    _Task_update.index = this.Select_update_index;        
    this.DBService_.Task_update_delete(_Task_update).subscribe((list_) => {
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));
      this.LoadToDolistOnlyOwned();
      this.LoadToDolist_Done_OnlyOwned();
      this. LoadToDolist_filter_OnlyOwned();
      this.LoadToDolist_filter_cmplt_OnlyOwned(); 
      this.toast.success('Task Update Delete Success!', 'Success!', {
        timeOut:1500
      });
    })
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

//   inputJSON = {
//     "created_date": "2017-04-13 10:12:12",
//     "current_time": "2017-04-13 11:10:46"
// };

// getDataDiff(startDate, endDate) {
//     var diff = endDate.getTime() - startDate.getTime();
//     var days = Math.floor(diff / (60 * 60 * 24 * 1000));
//     var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
//     var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
//     var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
//     return { day: days, hour: hours, minute: minutes, second: seconds };
// }
// this.diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
// console.log(diff);

cal(){  
var date1 = new Date( ); 
	var date2 = new Date( );   
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24); //Diference in Days
    console.log(Days, "days")
  }

}
