

import {ObjectId, Timestamp} from "mongodb";
import { timestamp } from "rxjs/operators";



export interface FirebaseUser {

 

    id:string;
    isEdit: boolean;
    //FirstName: string;
   // filepath: string;
    userName:string;
}


export class User{

    constructor(FirebaseUser_:FirebaseUser)
    {
        this.FirebaseUser=FirebaseUser_;      
    }
    
    _id:ObjectId;    
    FirebaseUser:FirebaseUser;
    List_of_Task:Task;
}

export class Task{
    constructor(task_name_:string, Owner_FB_User_:FirebaseUser, task_createddate_:Date, start_date_:Date,end_date_:Date)
    {
this.Task_Name =task_name_;
this.Selected_People =[];
this.Task_Status=new KStatus("Task Status");
this.Owner_Of_The_Task=Owner_FB_User_;
this.Task_Createddate =task_createddate_;
//this.Task_Deadline=null;
this.start_date=start_date_;
this.end_date=end_date_;

    }
    Task_Name:string;
    Selected_People:FirebaseUser[];
    _id:ObjectId;
    Task_Status:KStatus;
    Owner_Of_The_Task:FirebaseUser;
    Task_Createddate:Date;
    Task_Deadline:Date;
    start_date:Date;
    end_date:Date;
}

export class Expenses{

    constructor( Owner_FB_User_:FirebaseUser, date:Date, Expense_Group_Name_:string){ 
        
       // this.Spent_by = [];
       // this.Spent_For =  Spent_For_;     
       // this.Spent_Amount = amount_;             
       // this.split_equaly = [];
        this.Spent_date = date;

       // this.Finance_item_Createddate =Finance_item_createddate_;
       this.Owner_Of_The_Task=Owner_FB_User_;
           
       this.Expense_Group_Name =Expense_Group_Name_;
      // this.Expense_Total;
       this.List_Of_Expense = [];
       

      

    }
   // Spent_by:FirebaseUser[];   
   // Spent_For:string;    
   // Spent_Amount:string;     
    //split_equaly:FirebaseUser[];

    _id:ObjectId;
    Spent_date: Date;
    Owner_Of_The_Task:FirebaseUser;
    Expense_Group_Name:string;
   // Expense_Total:number;
    List_Of_Expense:Expenses_list[]=[];     
}

export class Expenses_list{

    constructor(Spent_For_:string, Owner_FB_User_:FirebaseUser){

       // this.Spent_by = [];
        this.Spent_For =  Spent_For_;     
       // this.Spent_Amount = amount_;             
       // this.split_equaly = [];
       // this.Spent_date = date;
        this.Owner_Of_The_Task= Owner_FB_User_;
     

    }
    userName:string;
    Spent_by:string;   
    Spent_For:string;    
    Spent_Amount:string;     
    split_equaly:FirebaseUser[];
    Spent_date: string;
    Owner_Of_The_Task:FirebaseUser; 
    _id:ObjectId;  
    
}

export class Expenses_list_item{

    constructor(Spent_For_:string){

        this.Spent_by = [];
        this.Spent_For =  Spent_For_;     
       // this.Spent_Amount = amount_;             
       // this.split_equaly = [];
       // this.Spent_date = date;
       // this.Owner_Of_The_Task=Owner_FB_User_;

    }

    Spent_by:FirebaseUser[];   
    Spent_For:string;    
    Spent_Amount:string;     
    split_equaly:FirebaseUser[];
    Spent_date: string;
    Owner_Of_The_Task:FirebaseUser;    
}






export class KStatus
{
    constructor(Status_name_: string){
        this.Status_Name = Status_name_;    
        
        this.List_Of_Status_Options=[]; 
        
        this.List_Of_Status_Options.push(new KstatusOption(1,"",''));
        this.List_Of_Status_Options.push(new KstatusOption(2,"Started",''));
        this.List_Of_Status_Options.push(new KstatusOption(3,"Done",''));
        this.List_Of_Status_Options.push(new KstatusOption(4,"WIP",''));
        this.List_Of_Status_Options.push(new KstatusOption(5,"Stuck",''));        

        this.Status_Selected_Option=this.List_Of_Status_Options[0];
        
    }
    Status_Name:string;  
    List_Of_Status_Options:KstatusOption[];
    Status_Selected_Option:KstatusOption;
}


export class KstatusOption{

    constructor(id_:number,Option_Title_:string,color_:string){
        this.Option_Title = Option_Title_;
        this.Option_Color=color_;
        this.id=id_;
    }
    id:number;
    Option_Title:string;
    Option_Color:string;
}

export class createddate{
    constructor(createddate_:Timestamp){
        this.Createddate =createddate_
        
    }
    Createddate :Timestamp;
}

export class Deadline{
    constructor(Deadline_:Timestamp){
        this.T_Deadline =Deadline_
        //new Date();
    }
    T_Deadline :Timestamp;
    
}

