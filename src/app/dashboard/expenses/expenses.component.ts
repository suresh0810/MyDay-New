import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/ecommerce1';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { DBService } from '../api/DB.service';
import { User, Task,  FirebaseUser, KStatus, KstatusOption,createddate,Deadline, Expense_Group,Expense,Sectors, SpentFor,Expense_Update} from '../Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import { SumPipe } from '../pipe/sum.pipe';
import { Observable } from 'rxjs/Observable';
import {tap, map, delay} from 'rxjs/operators';
import { Lightbox } from 'ngx-lightbox';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
  } from "@angular/material/core";
  import { MomentDateAdapter } from "@angular/material-moment-adapter";
  import { DatePipe } from "@angular/common";
  import { Router } from '@angular/router';
import{ AuthService} from '../../auth/auth.service';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { time, timeStamp } from 'console';
import { timeout, timestamp } from 'rxjs/operators';
import { start } from 'repl';
import { event } from 'jquery';
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
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
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
export class ExpensesComponent implements OnInit {


  currentIndex: any = -1;
  showFlag: any = false;
  
  public openMenu: boolean = false;
  isOver = false;
  //
  Temp_Expense_Update:Expense_Update;
  Temp_Expense_Content: string;
  Temp_Expense_Files: File[];
  Selected_Expense_update:Expense_Update;
  Expense_Id:string;
  Temp_Task: Task;
  userName: string;
  Selected_People: string;
  Spent_For:string;
  FB_User: any;
  taskdetails: string;
  User_: User;
  Tasks: Task[];
  List_of_Tasks = [];  
  Expenses_List = [];
  List_of_Expenses_Group: any= [];
  List_Of_Expense: any= [];

  Temp_Expense_Group : Expense_Group;
  Temp_Expense:Expense;

  List_of_Sector=[];
  List_of_SpentFor=[];
  Expense_Due=[];
  Expense_Paid=[];
  Selected_Expense_Due=[];
  Selected_Expense_Paid=[];

  List_All_Expense=[];

  Selected_due_user:string;


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
  searchTexts;
  
Idsend=[]

  List_of_Expense=[];
  image = [];
  imagess = [];
  Select_update_index:number;

  Selected_Expense:Expense;
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
 sidenave: HTMLElement;

 total;
  constructor(private _lightbox: Lightbox,private router: Router, private DBService_: DBService, private afs: AngularFirestore,private modalService: NgbModal, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService,) { }

  ngOnInit(): void {
    //  this.Temp_Task = new Task("", this.FirebaseUser_, new Date(Date.now()), new Date(Date.now()),  new Date(Date.now()));
    this.Temp_Expense_Group= new Expense_Group(  this.FirebaseUser_, new Date(Date.now()), "");
    this.Temp_Expense =new Expense( "","", this.FirebaseUser_,0, "",new Date(Date.now()),false,"");
    this.Selected_Expense = new Expense( "","", this.FirebaseUser_,0, "",new Date(Date.now()),false,"");

    this.Temp_Expense_Content = "";
    this.Temp_Expense_Files = [];
    this.Temp_Expense_Update = new Expense_Update(this.Temp_Expense_Content,this.Temp_Expense_Files,new Date(Date.now()))
    this.Selected_Expense_update = new Expense_Update("",[],new Date(Date.now()))
    this.Select_update_index = 0;

    this.sidenave = document.getElementById('mySidenave');

    this.getFirebaseUsers();

    this.Load_Sector();
    this.Load_SpentFor();
    this.Load_Expenses_Selected_People_Due();
    this.Load_Expenses_Selected_People_Paid();
    this.Load_Expenses_All();
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
              this.Load_Expenses_OnlyOwned()
              this.Load_Expenses_Due_OnlyOwned();
              this.Load_Expenses_paid_OnlyOwned();
             
             
             }
         });  
            this.User_ = new User(this.FirebaseUser_); 
     //this.UpdateUserFristime(this.User_);  
      })
  }

  clickMenu(){
    this.openMenu = !this.openMenu;
  }
  hello(mex: string){
    alert('Hello '+mex+'!' );
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
  //




  openNav(Expense_) {
    console.log(Expense_._id);
    this.Selected_Expense = Expense_;
    this.Expense_Id = Expense_._id;
    this.sidenave.classList.add('sidenav_Open');
     this.sidenave.classList.remove('sidenav_Close');    
  }
  openNavm(Expense_) {
    console.log(Expense_._id);
    this.Selected_Expense = Expense_;  
    console.log(Expense_._id);
    this.Expense_Id = Expense_._id;
    
    this.sidenave.classList.add('sidenav_Opens');
     this.sidenave.classList.remove('sidenav_Close');
    
  }
  closeNav() {
     this.sidenave.classList.add('sidenav_Close');
     this.sidenave.classList.remove('sidenav_Open');
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

  Create_Expenses(Expense_:Expense){
    Expense_.Spent_by = this.FirebaseUser_.userName;      
    Expense_.Owner_Of_The_Expense={} as FirebaseUser;
    Expense_.Owner_Of_The_Expense.id = this.FirebaseUser_.id;
    Expense_.Owner_Of_The_Expense.userName = this.FirebaseUser_.userName;   
    this.DBService_.Create_Expenses(Expense_).subscribe((Data_: ObjectId) => {             
      console.log(Data_);     
      this.toast.success('Create Expenses Group Success!','Success!', {
        timeOut:1500
      });  
      this.Load_Expenses_OnlyOwned(); 
      this.Load_Expenses_Due_OnlyOwned();
      this.Load_Expenses_paid_OnlyOwned();
      this.Load_Expenses_Selected_People_Paid();
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_All();           
    });    
  }

  Load_Expenses_OnlyOwned() {    
    this.DBService_.Load_Expenses_OnlyOwned(this.FirebaseUser_).subscribe((Data_: Expense[]) => {
      this.List_Of_Expense = Data_;          
        console.log("Expenses_List");
        console.log(this.List_Of_Expense);                   
     })     

    }
    Load_Expenses_Due_OnlyOwned(){
      this.DBService_.Load_Expenses_Due_OnlyOwned(this.FirebaseUser_).subscribe((Data_: Expense[]) => {       
         this.Expense_Due = Data_  ;      
           console.log("Expense Due");
           console.log(this.Expense_Due);
                      
        })   
    }
    Load_Expenses_paid_OnlyOwned(){
      this.DBService_.Load_Expenses_paid_OnlyOwned(this.FirebaseUser_).subscribe((Data_: Expense[]) => {       
         this.Expense_Paid = Data_ ;  
    
           console.log("Expense Paid");
           console.log(this.Expense_Paid);
                      
        })   
    }

    Change(event){
      this.Selected_due_user = event;
      this.searchTexts = event.userName;
      console.log(this.Selected_due_user)
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_Selected_People_Paid();

    }

    Load_Expenses_Selected_People_Due(){
      this.DBService_.Load_Expenses_Selected_People_Due(this.Selected_due_user).subscribe((Data_: Expense[]) => {       
         this.Selected_Expense_Due = Data_  ;  
    
           console.log("Selected_Expense_Due");
           console.log(this.Selected_Expense_Due);
                   
        })   
    }

    Load_Expenses_Selected_People_Paid(){
      this.DBService_.Load_Expenses_Selected_People_Paid(this.Selected_due_user).subscribe((Data_: Expense[]) => {       
         this.Selected_Expense_Paid = Data_  ;  
    
           console.log("Selected_Expense_Paid");
           console.log(this.Selected_Expense_Paid);
                   
        })   
    }

    Load_Expenses_All(){
      this.DBService_.Load_Expenses_All().subscribe((Data_: Expense[]) => {       
         this.List_All_Expense = Data_  ;  
    
           console.log("List_All_Expense");
           console.log(this.List_All_Expense);
             
        })   
    }

    //Selected Due
    SelectedDue() {
      let total = 0;
      for (var i = 0; i < this.Selected_Expense_Due.length; i++) {
          if (this.Selected_Expense_Due[i].Spent_Amount) {
              total += this.Selected_Expense_Due[i].Spent_Amount;
              this.totalamount = total;
          }
      }    
      return total;
    }
       //Selected Paid
       SelectedPaid() {
        let total = 0;
        for (var i = 0; i < this.Selected_Expense_Paid.length; i++) {
            if (this.Selected_Expense_Paid[i].Spent_Amount) {
                total += this.Selected_Expense_Paid[i].Spent_Amount;
                this.totalamount = total;
            }
        }    
        return total;
      }

    //Due Total

    DueTotal() {
      let total = 0;
      for (var i = 0; i < this.Expense_Due.length; i++) {
          if (this.Expense_Due[i].Spent_Amount) {
              total += this.Expense_Due[i].Spent_Amount;
              this.totalamount = total;
          }
      }    
      return total;
    }

     //Paid Total

     PaidTotal() {
      let total = 0;
      for (var i = 0; i < this.Expense_Paid.length; i++) {
          if (this.Expense_Paid[i].Spent_Amount) {
              total += this.Expense_Paid[i].Spent_Amount;
              this.totalamount = total;
          }
      }    
      return total;
    }
    
   

    Update_Expenses(Expense_:Expense) {        
     
       this.DBService_.Update_Expenses(Expense_).subscribe((Data_) => {
         console.log("Update ToDolist_item : " + JSON.stringify(Data_));
         
         this.Load_Expenses_OnlyOwned();
         this.Load_Expenses_Due_OnlyOwned();
          this.Load_Expenses_paid_OnlyOwned();
          this.Load_Expenses_Selected_People_Paid();
          this.Load_Expenses_Selected_People_Due();
          this.Load_Expenses_All();

             
       })
      
     }


     Delete_Expenses(Expense_:Expense) {     
         
    this.DBService_.Delete_Expenses(Expense_).subscribe((Data_:ObjectId) => {

      console.log("Delete ToDolist_item : " + JSON.stringify(Data_));
     
      this.Load_Expenses_OnlyOwned();
      this.Load_Expenses_Due_OnlyOwned();
      this.Load_Expenses_paid_OnlyOwned();
      this.Load_Expenses_Selected_People_Paid();
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_All();
      this.toast.success('Expense Delete Success!', 'Success!', {
        timeOut:1500
      });
      
    })
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
                   
     })     

    }

 

    Load_Sector() {    
      this.DBService_.Load_Sector().subscribe((Data_: any[]) => {
       this.List_of_Sector = Data_;      
          console.log("Load_Sector");  
          console.log(this.List_of_Sector);  
       })
      }

      Load_SpentFor() {    
        this.DBService_.Load_SpentFor().subscribe((Data_: any[]) => {
         this.List_of_SpentFor = Data_;      
            console.log("Load_Sector");  
            console.log(this.List_of_SpentFor);  
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
  openVerticallyCenteredtop(content) {
    this.modalService.open(content, { centered: false });
  }


  Status = [
    {id:1, Status_Name:'Due'},
    {id:2, Status_Name:'Pending'},
    {id:3, Status_Name:'Process'},
    {id:4, Status_Name:'Paid'},
  ]


  reset_expense(){
    this.Temp_Expense.Sector = "";
    this.Temp_Expense.Spent_For = "";
    this.Temp_Expense.Spent_Amount = 0;
    this.Temp_Expense.Note = "";
  }

  onChange(value) {
    //alert(value);
    if(value == 'Clear'){
      this.Selected_due_user = '';
      this.searchTexts = '';
    }
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.imagess = event.target.files; 
                 
    }      
  }


  Expense_Update(expenseupdate_:Expense_Update) {
    const formData = new FormData();
    console.log(this.image)    
    for(let img of this.imagess){
      formData.append('files', img)       
    }
    expenseupdate_.index = this.Selected_Expense.Expense_update.length + 1
    expenseupdate_.Expense_id = this.Expense_Id;
    expenseupdate_.Date = new Date(Date.now()) 
    formData.append('files', JSON.stringify(expenseupdate_))         
   // console.log(formData)   
   // let fulldata = {data:Taskupdate_,file:formData} 
   // Taskupdate_.Task_Update_files = this.images;
     
    this.Selected_Expense.Expense_update.push(new Expense_Update(this.Temp_Expense_Update.Expense_Update_Content, this.Temp_Expense_Update.Expense_Update_files,new Date(Date.now())));
    expenseupdate_.Expense_id = this.Expense_Id; 
    expenseupdate_.Expense_Update_Content = this.Temp_Expense_Update.Expense_Update_Content;
    expenseupdate_.Expense_Update_files = this.Temp_Expense_Update.Expense_Update_files;
    this.DBService_.Update_Expense_Add(formData).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));

      this.Load_Expenses_Due_OnlyOwned();
      this.Load_Expenses_paid_OnlyOwned();
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_Selected_People_Paid();
     
      this.toast.success('Expense Update Success!', 'Success!', {
        timeOut:1500
      });
  
    })   
  }

  Expense_update_form_reset(){
    this.Temp_Expense_Update.Expense_Update_Content = "";
    this.Temp_Expense_Update.Expense_Update_files = [];
    this.imagess = [];    
  }
  update_index(event){    
    this.Select_update_index = event;
    console.log(this.Select_update_index)

  }

  Expense_Update_Delete(expenseupdate_:Expense_Update) {
    const index: number = this.Selected_Expense.Expense_update.indexOf(expenseupdate_);
    if (index !== -1) {
      this.Selected_Expense.Expense_update.splice(index, 1);
    }  
    expenseupdate_.Expense_id = this.Expense_Id;
    //expenseupdate_.index = this.Select_update_index;        
    this.DBService_.Expense_Update_Delete(expenseupdate_).subscribe((list_) => {
      console.log("Delete ToDolist_item : " + JSON.stringify(list_));

      this.Load_Expenses_Due_OnlyOwned();
      this.Load_Expenses_paid_OnlyOwned();
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_Selected_People_Paid();
     
      this.toast.success('Expense Update Delete Success!', 'Success!', {
        timeOut:1500
      });
    })
  }

  Expense_Update_Change(expenseupdate_:Expense_Update) {
    expenseupdate_.index = this.Select_update_index;   
    expenseupdate_.Expense_id = this.Expense_Id;
    expenseupdate_.Date = new Date(Date.now()) 
    this.DBService_.Expense_Update_Change(expenseupdate_).subscribe((list_) => {
      console.log("Update ToDolist_item : " + JSON.stringify(list_));

      this.Load_Expenses_Due_OnlyOwned();
      this.Load_Expenses_paid_OnlyOwned();
      this.Load_Expenses_Selected_People_Due();
      this.Load_Expenses_Selected_People_Paid();
     
    
      this.toast.success('Expense Update Change Success!', 'Success!', {
        timeOut:1500
      });
    })
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.List_Of_Expense,index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

}
