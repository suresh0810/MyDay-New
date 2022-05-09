

import {ObjectId, Timestamp} from "mongodb";
import { timestamp } from "rxjs/operators";



export interface FirebaseUser {

 

    id:string;
    isEdit: boolean;
    //FirstName: string;
    filepath: string;
    userName:string;
    Selected_People:[];

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
    constructor(task_name_:string,Status_:string, Owner_FB_User_:FirebaseUser, task_createddate_:Date, start_date_:Date,end_date_:Date)
    {
this.Task_Name =task_name_;
this.Selected_People =[];
this.Status = Status_;
this.Owner_Of_The_Task=Owner_FB_User_;
this.Task_Createddate =task_createddate_;
//this.Task_Deadline=null;
this.start_date=start_date_;
this.end_date=end_date_;
this.Task_Updates = []=[];

    }
    Task_Name:string;
    Selected_People:FirebaseUser[];
    Assing_People:[];
    _id:ObjectId;
    Status:string;
    Owner_Of_The_Task:FirebaseUser;
    Task_Createddate:Date;
    Task_Deadline:Date;
    start_date:Date;
    end_date:Date;
    Task_Updates:Task_Update[]=[];
    Task_id:string;
    Task_Update_Content:string;
}

export class Task_Update{
    constructor(Task_Update_Content_: string,Task_Update_Files_:File[],Date_:Date){
        this.Task_Update_Content = Task_Update_Content_;  
        this.Task_Update_files  = Task_Update_Files_; 
        this.Date = Date_;      
    }
    Task_id:string;
    Task_Update_Content:string;
    Task_Update_files:File[];
    Image:string;
    Date:Date;
    id;
    index:number; 
    userId:string;
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
export class Notes{
    constructor(Owner_FB_User_:FirebaseUser,id_:number,content_:string){
        this.id = id_;
        this.content = content_;
        this.Owner_Of_The_Notes =Owner_FB_User_;

    }
    id:number;
    content:string;
    Owner_Of_The_Notes:FirebaseUser;
}

export class Expense{

    constructor(Spent_For_:string,Sector_:string, Owner_FB_User_:FirebaseUser,Spent_Amount_:number,Spent_by_:string,Spent_date_:Date,Status_:string,note_:string){

        this.Spent_by=Spent_by_;      
        this.Spent_For =  Spent_For_;   
        this.Owner_Of_The_Expense= Owner_FB_User_;
        this.Spent_Amount=Spent_Amount_;
        this.Sector = Sector_;
        this.Spent_date = Spent_date_;
        this.Status = Status_;
        this.Note = note_;
        // this.Spent_For_User_List=  Spent_For_User_List_;
      //  this.Database_Group_id=Database_Group_id_;
    }

    Spent_by:string;
    Sector:string;   
    Spent_For:string;    
    Spent_Amount:number;     
    Spent_date: Date;
    Owner_Of_The_Expense:FirebaseUser;
    Status:string;
    Note:string; 
     // Spent_For_User_List:FirebaseUser[];
   // Database_id:ObjectId;
   // Database_Group_id:ObjectId;
}

export class Sectors{
    constructor(Sector_Name_:string){
        this.Sector_Name = Sector_Name_;   
    }
    Sector_Name:string;
}

export class SpentFor{
    constructor(Spent_Name_:string){
        this.Spent_Name = Spent_Name_;        
    }
    Spent_Name:string;
}

export class Users{
    constructor(user_name_ ,Owner_FB_User_:FirebaseUser,profile_:string ){        

        this.User_Name = user_name_;
        this.User_Profile =profile_;
        this.Owner_Of_The_Task=Owner_FB_User_;
        this.List_of_Daily_Tracker_Month.push(new Daily_Tracker(new Date(Date.now())));
    }

    User_Name:string;
    User_Profile:string;
    Owner_Of_The_Task:FirebaseUser;
    Database_id:ObjectId;
    
    List_of_Daily_Tracker_Month:Daily_Tracker[]=[];
   // List_of_Device:Device[]=[]
    
}

export class Device{    
    constructor(ime_: string, Device: string){

    this.imeNumber = ime_;
    this.device_Name = Device;
    }

    imeNumber:string;
    device_Name:string;
}

export class Users{
    constructor(user_name_ ,Owner_FB_User_:FirebaseUser,profile_:string ){        

        this.User_Name = user_name_;
        this.User_Profile =profile_;
        this.Owner_Of_The_Task=Owner_FB_User_;
        this.List_of_Daily_Tracker_Month.push(new Daily_Tracker(new Date(Date.now())));
    }

    User_Name:string;
    User_Profile:string;
    Owner_Of_The_Task:FirebaseUser;
    Database_id:ObjectId;
    List_of_Daily_Tracker_Month:Daily_Tracker[]=[];
    
}


export class Daily_Tracker{

    constructor(month_:Date,){
    this.Month = month_;
    this.List_Of_Daily_Tracker_Update.push(new Daily_Tracker_Update(new Date(Date.now()),"", this.Database_id));
  
 
    }
    Month:Date;   
    Owner_Of_The_Task:FirebaseUser;    
    Database_id:ObjectId;
    List_Of_Daily_Tracker_Update:Daily_Tracker_Update[]=[];
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

