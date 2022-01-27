

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

export class Expense_Group{

    constructor(Owner_FB_User_:FirebaseUser, date:Date, Expense_Group_Name_:string){
        this.Spent_date = date;

        this.Owner_Of_The_Task=Owner_FB_User_;           
        this.Expense_Group_Name =Expense_Group_Name_;
        this.List_Of_Expense = [];
    }

    Database_id:ObjectId;
    Spent_date: Date;
    Owner_Of_The_Task:FirebaseUser;
    Expense_Group_Name:string;
    Expense_Total:number;
    List_Of_Expense:Expense[]=[];  

}

export class Expense{

    constructor(Spent_For_:string, Owner_FB_User_:FirebaseUser,Spent_Amount_:number,Database_Group_id_:ObjectId,  Spent_For_User_List_:FirebaseUser[],Spent_by_:string ){

        this.Spent_by=Spent_by_;
        this.Spent_For_User_List=  Spent_For_User_List_;
        this.Spent_For =  Spent_For_;   
        this.Owner_Of_The_Expense= Owner_FB_User_;
        this.Spent_Amount=Spent_Amount_;
        this.Database_Group_id=Database_Group_id_;
    }

    Spent_by:string;   
    Spent_For:string;    
    Spent_Amount:number;     
    Spent_For_User_List:FirebaseUser[];
    Spent_date: Date;


    Owner_Of_The_Expense:FirebaseUser; 
    Database_id:ObjectId;
    Database_Group_id:ObjectId;

}


export class Daily_Tracker{

    constructor(month_:Date, Owner_FB_User_:FirebaseUser){
    this.Month = month_;
    this.Owner_Of_The_Task=Owner_FB_User_; 
    }
    Month:Date;
    Owner_Of_The_Task:FirebaseUser;
    List_Of_Daily_Tracker_Update:Daily_Tracker_Update[]=[];
    Database_id:ObjectId;
}

export class Daily_Tracker_Update{

    constructor(Daily_Tracker_Update_Date_:Date, Daily_Tracker_Update_Task:string, Database_Daily_Tracker_id_:ObjectId ){
        this.Daily_Tracker_Update_Date = Daily_Tracker_Update_Date_;
        this.Daily_Tracker_Update_Task = Daily_Tracker_Update_Task; 
         this.Database_Daily_Tracker_id = Database_Daily_Tracker_id_;
    }
    Daily_Tracker_Update_Date:Date;
    Daily_Tracker_Update_Task:string;
    Database_id:ObjectId;
    Database_Daily_Tracker_id:ObjectId;

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

