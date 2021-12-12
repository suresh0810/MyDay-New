

import {ObjectId} from "mongodb";

export interface FirebaseUser {

    id:string;
    isEdit: boolean;
    FirstName: string;
    filepath: string;
    userName:string;
}


export class User{

    constructor(FirebaseUser_:FirebaseUser)
    {
        this.FirebaseUser=FirebaseUser_;      
    }
    
    _id:ObjectId;
    List_Of_Workspace_Access_index:ObjectId[]=[];
    FirebaseUser:FirebaseUser;
    List_of_Task:Task;
}

export class Task{
    constructor(task_name_:string)
    {
this.Task_Name =task_name_;
this.Selected_People =[];
this.Task_Status=new KStatus("Task Status");

    }
    Task_Name:string;
    Selected_People:FirebaseUser[];
    _id:ObjectId;
    Task_Status:KStatus;
 
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

