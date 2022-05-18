

import {ObjectId, Timestamp} from "mongodb";
import { timestamp } from "rxjs/operators";
import { Color } from "highcharts";

export enum Column_Types{number,string,formula,color,date,ktext, timeline, end_date,status,dropdown,kpeople, check, Item_Update, dummy}


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
    constructor(task_name_:string,Status_:boolean = false,isLoading_: boolean = false, Owner_FB_User_:FirebaseUser, task_createddate_:Date, start_date_:Date,end_date_:Date)
    {
this.Task_Name =task_name_;
this.Selected_People =[];
this.Status = Status_;
this.isLoading = isLoading_
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
    Status:boolean = false;
    isLoading:boolean = false;
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

    constructor(Spent_For_:string,Sector_:string, Owner_FB_User_:FirebaseUser,Spent_Amount_:number,Spent_by_:string,Spent_date_:Date,Status_:boolean = false,note_:string,isLoading_: boolean = false){

        this.Spent_by=Spent_by_;      
        this.Spent_For =  Spent_For_;   
        this.Owner_Of_The_Expense= Owner_FB_User_;
        this.Spent_Amount=Spent_Amount_;
        this.Sector = Sector_;
        this.Spent_date = Spent_date_;
        this.Status = Status_;
        this.Note = note_;
        this.isLoading = isLoading_;
        this.Expense_update = []=[];
        // this.Spent_For_User_List=  Spent_For_User_List_;
      //  this.Database_Group_id=Database_Group_id_;
    }

    Spent_by:string;
    Sector:string;   
    Spent_For:string;    
    Spent_Amount:number;     
    Spent_date: Date;
    Owner_Of_The_Expense:FirebaseUser;
    Status:boolean = false;
    Note:string; 
    isLoading:boolean = false;
    Expense_update:Expense_Update[]=[];   
    
     // Spent_For_User_List:FirebaseUser[];
   // Database_id:ObjectId;
   // Database_Group_id:ObjectId;
}
export class Expense_Update{
    constructor(Expense_Update_Content_: string,Expense_Update_Files_:File[],Date_:Date){
        this.Expense_Update_Content = Expense_Update_Content_;  
        this.Expense_Update_files  = Expense_Update_Files_; 
        this.Date = Date_;      
    }
    Expense_id:string;
    Expense_Update_Content:string;
    Expense_Update_files:File[];
    Image:string;
    Date:Date;
    id;
    index:number; 
    userId:string;
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

// export class Users{
//     constructor(user_name_ ,Owner_FB_User_:FirebaseUser,profile_:string ){        

//         this.User_Name = user_name_;
//         this.User_Profile =profile_;
//         this.Owner_Of_The_Task=Owner_FB_User_;
//         this.List_of_Daily_Tracker_Month.push(new Daily_Tracker(new Date(Date.now())));
//     }

//     User_Name:string;
//     User_Profile:string;
//     Owner_Of_The_Task:FirebaseUser;
//     Database_id:ObjectId;
    
//     List_of_Daily_Tracker_Month:Daily_Tracker[]=[];
//    // List_of_Device:Device[]=[]
    
// }

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







export class Workspace
{
    constructor(Workspace_name_:string,Owner_FB_User_:FirebaseUser,Workspace_id_:string)
    {
    this.Workspace_Name=Workspace_name_;
    this.List_Of_Boards.push(new Board("Main Board"));
    this.Owner_Of_The_Workspace=Owner_FB_User_;
    this.Workspace_id = Workspace_id_;
    }

    id:number;
    Selected_Workspace:string;
    Workspace_Name:string;
    List_Of_Folders:Folder[]=[];
    List_Of_Boards:Board[]=[];

    Owner_Of_The_Workspace:FirebaseUser;
    List_Of_Users_Has_Access:FirebaseUser[]=[];
    Workspace_id:string;

}



export class Folder{

    constructor(Folder_name_:string){
        this.Folder_Name = Folder_name_;

       
    }
    Folder_Name:String;
    List_Of_Boards:Board[]=[];    
}


export class Board{

    
    constructor(Board_Title_:string){
        this.Board_Title = Board_Title_;
        
        this.List_Of_Groups.push(new Group("Default class Group"));

        this.Board_Template=new Template(Board_Title_+"_Templeat");
    }    

    Board_Title : string;
    List_Of_Groups : Group[]=[];    
    Board_Template:Template;
}





export class Template{

    constructor(Template_Title_:string ){
        this.Template_Title = Template_Title_;

        this.List_Of_Columns=[];
        this.List_Of_Columns.push(new Column("Item Title",Column_Types.string,0));           
        this.List_Of_Columns.push(new Column("Test Date",Column_Types.date,0));
       
       
       
  
              
       
        
    }
    Template_Title : string;

    List_Of_Columns:Column[];
}

export class Column
{
constructor(Column_Title_:string,colum_type_:Column_Types,Column_Data_Array_Index_:number){
    this.Column_Title=Column_Title_;
    this.Column_Type=colum_type_;
    this.Column_Data_Array_Index=Column_Data_Array_Index_;
}
Column_Title:string;
Column_Type:Column_Types;
Column_Order_Index:number;
Column_Data_Array_Index:number;
}


export class Group
{
    constructor(Group_Title_:string)
    {
        this.Group_Title = Group_Title_;
        this.List_Of_Items_id_Index =[];
        this.List_Of_Items =[];
        
    }
    Group_Title: string;
    List_Of_Items_id_Index:Item_Data[]; 
    List_Of_Items:Item[];
}

export class Item_Data{

    constructor(_id:ObjectId){
        this.Target_Item_id=_id;
    }

    Target_Item_id:ObjectId;

}



export class Item
{
constructor(Item_Title_:string,Group_Index_:number){
this.Item_Title=Item_Title_;
this.Group_Index=Group_Index_;
this.Item_Updates = [];
this.List_Of_dummy_name_columns =[];

this.List_Of_Status_columns =[];
this.List_Of_People_columns =[];
this.List_Of_Dropdown_columns =[];
this.List_Of_Timeline_columns =[];
this.List_Of_Formula=[];
this.List_Of_Text_columns=[];
this.List_Of_Date_columns=[];
this.List_Of_Number_columns=[];
this.List_Of_Check_Box_columns=[];

}

_id:ObjectId;
Group_Index:number;


Item_Title:string;


List_Of_Status_columns : KStatus[];
List_Of_People_columns : KPeople[];
List_Of_Dropdown_columns : KDropdown[];
List_Of_Timeline_columns : KTimeline[];
List_Of_Formula: KFormula[];
List_Of_Text_columns: KText[];
List_Of_Date_columns: KDate[];
List_Of_Number_columns: KNumber[];
List_Of_Check_Box_columns: KCheck_Box[];
List_Of_dummy_name_columns:dummy[];
Item_Updates:Item_Update[];


Item_User_id:string;


}

export class Item_Update{



    constructor(Item_Update_Content_: string,Item_Item_Files_:File[]){

        this.Item_Update_Content = Item_Update_Content_;  
        this.Item_Update_files=Item_Item_Files_;
           

    }
    Item_Update_Content:string;
    Item_Update_files:File[]; 
}


export class Profile
{
constructor(username_:string){
this.User_Name=username_;
}

User_Name:string;
User_Mailid:string;
}

export class KStatus
{
    constructor(Status_name_: string){
        this.Status_Name = Status_name_;    
        this.List_Of_Status_Opionts=[]; 
        
        this.List_Of_Status_Opionts.push(new KstatusOption(1,"",new Color("#868687")));
        this.List_Of_Status_Opionts.push(new KstatusOption(2,"Started",new Color("#ff0")));
        this.List_Of_Status_Opionts.push(new KstatusOption(3,"Done",new Color("#0f0")));
        this.List_Of_Status_Opionts.push(new KstatusOption(4,"WIP",new Color("#0ff")));
        this.List_Of_Status_Opionts.push(new KstatusOption(5,"Stuck",new Color("#f00")));
        

        this.Status_Selected_Option=this.List_Of_Status_Opionts[0];
        
    }
    Status_Name:string;  
    List_Of_Status_Opionts:KstatusOption[];
    Status_Selected_Option:KstatusOption;
}

export class KstatusOption{

    constructor(id_:number,Option_Title_:string,color_:Color){

        this.Option_Title = Option_Title_;
        this.Option_Color=color_;
        this.id=id_;
    }
    id:number;
    Option_Title:string;
    Option_Color:Color;
}

export class KPeople{
    constructor(People_Title_: string){
        this.People_Title = People_Title_;        
        this.Selected_People = [];
    }
    People_Title : string;
    
    Selected_People:FirebaseUser[];

}


export class KDropdown{

    constructor(Dropdown_Title_ :string){
        this.Dropdown_Title = Dropdown_Title_;
        this.List_Of_Dropdown_Options = [];
        this.List_Of_Dropdown_Options.push(new KDropdownOption(""));
        this.List_Of_Dropdown_Options.push(new KDropdownOption( "Sample Dropdown"));
           
      
      
        this.Dropdown_Selected_Option = this.List_Of_Dropdown_Options[0];


    }
    Dropdown_Title: string;  
    List_Of_Dropdown_Options : KDropdownOption[
        
    ];
    Dropdown_Selected_Option: KDropdownOption;
   
}

export class KDropdownOption{

    constructor(dropdown_option_:string){
        this.Dropdown_Name = dropdown_option_;       
    }
    Dropdown_Name:string;    
    Dropdown_id:number;       
}




export class KTimeline{
    constructor(Timeline_Title_: string){
        this.Timeline_Title = Timeline_Title_;
    }
    Timeline_Title:string;  
        start_date:  Date;
        end_date:  Date;
        Duration:number;
       
     
}

export class KFormula{
    constructor(Formula_Title_ : string){
    this.Formula_Title = Formula_Title_;       
    }
    Formula_Title : string;
  
    Full_Formula : string;
    Formula_Result:number;

}
//

export class KText{

    constructor(Text_Title_:string)
    {
        this.Text_Title = Text_Title_;  
      }

    Text_Title:string;
    Text: string;
}



export class KDate{

    constructor(Date_Title:string){

        this.Date_Title = Date_Title;
           }
    Date_Title:string;
    Date:Date;

}

export class KNumber{
    constructor(number_title_: string)
    {
        this.Number_Title = number_title_;
    }
    Number_Title :string;
    Number: number;

}

export class KCheck_Box{

    constructor(check_box_title_:string){
        this.Check_box_Title = check_box_title_;

    }    
    Check_box_Title : string;
    Check_Box:boolean;
}

export class dummy{

    constructor(dummy_name_:string){
        this.dummy_name = dummy_name_;
    }
    dummy_name:string;
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

