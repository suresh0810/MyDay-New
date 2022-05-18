import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { Timestamp } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class DBService {


  apiurl=environment.algodExpApiUrl + "/DataBase";

  constructor(private http:HttpClient) { }


  private del_subject = new Subject<any>();
sendClickEvent_DeleteToDolist(data:any){
  this.del_subject.next(data);
}

getClickEvent_DeleteTodo():Observable<any>{
  return this.del_subject.asObservable();
}

private subject = new Subject<any>();
sendClickEvent_CreateNewToDo(data:any){
  this.subject.next(data);
}


//Task Service
createTask(Data_){  
  console.log("calling url : "+this.apiurl + "/createTask");
  return this.http.post(this.apiurl + "/createTask", Data_);
}

UpdateTask(Data_){  
  console.log("calling url : "+this.apiurl + "/updateTask");
  return this.http.post(this.apiurl + "/updateTask", Data_);
}

LoadTasks(){  
  console.log("calling url : "+this.apiurl + "/loadTask");
  return this.http.get(this.apiurl + "/loadTask");
}
DeleteTask(Data_){
  console.log("url : "+this.apiurl + "/deleteTaskItem");
  return this.http.post(this.apiurl + "/deleteTaskItem", Data_);
}
DeleteTaskGroup(Data_){
  console.log("url : "+this.apiurl + "/deleteTaskGroup");
  return this.http.post(this.apiurl + "/deleteTaskGroup", Data_);
}
DeleteTaskWrokspace(Data_){
  console.log("url : "+this.apiurl + "/deleteTaskworkspace");
  return this.http.post(this.apiurl + "/deleteTaskworkspace", Data_);
}





//Wrokspace service
createWorkspace(Data_){
  console.log("calling url : "+this.apiurl + "/createWorkspace");
  return this.http.post(this.apiurl + "/createWorkspace", Data_);
}

LoadWorkspace(Data_){  
  console.log("calling url : "+this.apiurl + "/loadTask");
  return this.http.get(this.apiurl + "/loadWorkspace",Data_);
}

UpdateWorkspace(Data_){
  return this.http.post(this.apiurl + "/UpdateWorkspace", Data_);
}

Delete_Workspace(Data_){
  console.log("url : "+this.apiurl + "/Delete_Workspace");
  return this.http.post(this.apiurl + "/Delete_Workspace", Data_);
}

//board  

Create_bord(Data_){
  console.log("url : "+this.apiurl + "/Create_bord");
  return this.http.post(this.apiurl + "/Create_bord", Data_);
}

Create_Task(Data_){
  console.log("url : "+this.apiurl + "/Create_Task");
  return this.http.post(this.apiurl + "/Create_Task", Data_);
}

//User Service
createUser(Data_){
  console.log("calling url : "+this.apiurl + "/createUser");
  return this.http.post(this.apiurl + "/createUser", Data_);
}
updateUser(Data_){
  console.log("url : "+this.apiurl + "/updateUser");
  return this.http.post(this.apiurl + "/updateUser", Data_);
}

updateUserFirsttime(Data_){
  console.log("url : "+this.apiurl + "/updateUserFirsttime");
  return this.http.post(this.apiurl + "/updateUserFirsttime", Data_);
}
  
LoadUserData(Data_){  
  console.log("calling url : "+this.apiurl + "/loadUserData");
  return this.http.get(this.apiurl + "/loadUserData",Data_);
}


  //ToDolist Service
  createToDolist(Data_){  
    console.log("calling url : "+this.apiurl + "/createToDolist_item");
    return this.http.post(this.apiurl + "/createToDolist_item", Data_);
  }

  UpdateToDolist(Data_){  
    console.log("calling url : "+this.apiurl + "/updateToDolist_item");
    return this.http.post(this.apiurl + "/updateToDolist_item", Data_);
  }

  LoadToDolistAll(){  
    console.log("calling url : "+this.apiurl + "/loadToDolist");
    return this.http.get(this.apiurl + "/loadToDolist");
  }

  LoadToDolistOnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadToDolistOnlyOwned");
    return this.http.post (this.apiurl + "/LoadToDolistOnlyOwned",FilterData_);
  }
  LoadToDolist_Done_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadToDolist_Done_OnlyOwned");
    return this.http.post (this.apiurl + "/LoadToDolist_Done_OnlyOwned",FilterData_);
  }

  LoadToDolist_filter_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadToDolist_filter_OnlyOwned");
    return this.http.post (this.apiurl + "/LoadToDolist_filter_OnlyOwned",FilterData_);
  }
  LoadToDolist_filter_cmplt_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadToDolist_filter_cmplt_OnlyOwned");
    return this.http.post (this.apiurl + "/LoadToDolist_filter_cmplt_OnlyOwned",FilterData_);
  }

  DeleteToDolist(Data_){
    console.log("url : "+this.apiurl + "/deleteToDolist_item");
    return this.http.post(this.apiurl + "/deleteToDolist_item", Data_);
  }

  LoadToDolistUserData(Data_){  
    console.log("calling url : "+this.apiurl + "/loadTodolistUserData");
    return this.http.get(this.apiurl + "/loadTodolistUserData",Data_);
  }

  findToDolist(Data_){
    console.log("calling url : "+this.apiurl + "/Todolistfind");
    return this.http.get(this.apiurl + "/Todolistfind",Data_);
  }

  ToDolist_Task_Update(Data_){  
    console.log("calling url : "+this.apiurl + "/ToDolist_Task_Update");
    return this.http.post(this.apiurl + "/ToDolist_Task_Update", Data_);
  }
  uplode_Item(Data_){
    console.log("calling url : "+this.apiurl + "/file");
    return this.http.post(this.apiurl + "/file", Data_);
  }
  uplode_multi_image(Data_){
    console.log("calling url : "+this.apiurl + "/ToDolist_Task_Update_multiple");
    return this.http.post(this.apiurl + "/ToDolist_Task_Update_multiple", Data_);
  }

  Task_Update_Change(Data_){  
    console.log("calling url : "+this.apiurl + "/Task_Update_Change");
    return this.http.post(this.apiurl + "/Task_Update_Change", Data_);
  }

  Task_update_delete(Data_){
    console.log("url : "+this.apiurl + "/Task_update_delete");
    return this.http.post(this.apiurl + "/Task_update_delete", Data_);
  }

  //

  Create_Note(Data_){  
    console.log("calling url : "+this.apiurl + "/Create_Note");
    return this.http.post(this.apiurl + "/Create_Note", Data_);
  }
  Load_Notes_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Notes_OnlyOwned");
    return this.http.post (this.apiurl + "/Load_Notes_OnlyOwned",FilterData_);
  }

  Update_Notes(Data_){  
    console.log("calling url : "+this.apiurl + "/Update_Notes");
    return this.http.post(this.apiurl + "/Update_Notes", Data_);
  }

  Delete_Notes(Data_){
    console.log("url : "+this.apiurl + "/Delete_Notes");
    return this.http.post(this.apiurl + "/Delete_Notes", Data_);
  }

  //Expenses

  createFinanceitem(Data_){  
    console.log("calling url : "+this.apiurl + "/createFinance_item");
    return this.http.post(this.apiurl + "/createFinance_item", Data_);
  }

  create_Expenses_Group(Data_){  
    console.log("calling url : "+this.apiurl + "/create_Expenses_Group");
    return this.http.post(this.apiurl + "/create_Expenses_Group", Data_);
  }  

  UpdateFinance(Data_){  
    console.log("calling url : "+this.apiurl + "/updateFinance_item");
    return this.http.post(this.apiurl + "/updateFinance_item", Data_);
  }

  LoadFinancelistAll(){  
    console.log("calling url : "+this.apiurl + "/loadFinancelist");
    return this.http.get(this.apiurl + "/loadFinancelist");
  }

  LoadFinancelistOnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadFinancelistOnlyOwned");
    return this.http.post (this.apiurl + "/LoadFinancelistOnlyOwned",FilterData_);
  }

  DeleteFinancelist(Data_){
    console.log("url : "+this.apiurl + "/deleteFinance_item");
    return this.http.post(this.apiurl + "/deleteFinance_item", Data_);
  }
  DeleteExpenses_list(Data_){
    console.log("url : "+this.apiurl + "/deleteExpenses_item");
    return this.http.post(this.apiurl + "/deleteExpenses_item", Data_);
  }

  LoadFinancelistUserData(Data_){  
    console.log("calling url : "+this.apiurl + "/loadFinancelistUserData");
    return this.http.get(this.apiurl + "/loadTodolistUserData",Data_);
  }
  //new

  Create_Expenses(Data_){  
    console.log("calling url : "+this.apiurl + "/Create_Expenses");
    return this.http.post(this.apiurl + "/Create_Expenses", Data_);
  }

  Load_Expenses_Due_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_due_OnlyOwned");
    return this.http.post(this.apiurl + "/Load_Expenses_due_OnlyOwned",FilterData_);
  }
  
  Load_Expenses_paid_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_paid_OnlyOwned");
    return this.http.post(this.apiurl + "/Load_Expenses_paid_OnlyOwned",FilterData_);
  }
  Load_Expenses_Selected_People_Due(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_Selected_People_Due");
    return this.http.post(this.apiurl + "/Load_Expenses_Selected_People_Due",FilterData_);
  }
  Load_Expenses_Selected_People_Paid(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_Selected_People_Paid");
    return this.http.post(this.apiurl + "/Load_Expenses_Selected_People_Paid",FilterData_);
  }
  Load_Expenses_All(){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_All");
    return this.http.get(this.apiurl + "/Load_Expenses_All");
  }


  Load_Expenses_OnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/Load_Expenses_OnlyOwned");
    return this.http.post(this.apiurl + "/Load_Expenses_OnlyOwned",FilterData_);
  }

  Update_Expenses(Data_){  
    console.log("calling url : "+this.apiurl + "/Update_Expenses");
    return this.http.post(this.apiurl + "/Update_Expenses", Data_);
  }

  Delete_Expenses(Data_){
    console.log("url : "+this.apiurl + "/Delete_Expenses");
    return this.http.post(this.apiurl + "/Delete_Expenses", Data_);
  }
  //

  Update_Expense_Add(Data_){
    console.log("calling url : "+this.apiurl + "/Update_Expense_Add");
    return this.http.post(this.apiurl + "/Update_Expense_Add", Data_);
  }  
  Expense_Update_Delete(Data_){
    console.log("url : "+this.apiurl + "/Expense_Update_Delete");
    return this.http.post(this.apiurl + "/Expense_Update_Delete", Data_);
  }  

  Expense_Update_Change(Data_){  
    console.log("calling url : "+this.apiurl + "/Expense_Update_Change");
    return this.http.post(this.apiurl + "/Expense_Update_Change", Data_);
  }

  //SpentFor
  Create_SpentFor(Data_){  
    console.log("calling url : "+this.apiurl + "/Create_SpentFor");
    return this.http.post(this.apiurl + "/Create_SpentFor", Data_);
  }

  Load_SpentFor(){  
    console.log("calling url : "+this.apiurl + "/Load_SpentFor");
    return this.http.get(this.apiurl + "/Load_SpentFor");
  }
  Update_SpentFor(Data_){  
    console.log("calling url : "+this.apiurl + "/Update_SpentFor");
    return this.http.post(this.apiurl + "/Update_SpentFor", Data_);
  }
  Delete_SpentFor(Data_){
    console.log("url : "+this.apiurl + "/Delete_SpentFor");
    return this.http.post(this.apiurl + "/Delete_SpentFor", Data_);
  }

 
  // Sector

  Create_Sector(Data_){  
    console.log("calling url : "+this.apiurl + "/Create_Sector");
    return this.http.post(this.apiurl + "/Create_Sector", Data_);
  }

  Load_Sector(){  
    console.log("calling url : "+this.apiurl + "/Load_Sector");
    return this.http.get(this.apiurl + "/Load_Sector");
  }

  Update_Sector(Data_){  
    console.log("calling url : "+this.apiurl + "/Update_Sector");
    return this.http.post(this.apiurl + "/Update_Sector", Data_);
  }

  Delete_Sector(Data_){
    console.log("url : "+this.apiurl + "/Delete_Sector");
    return this.http.post(this.apiurl + "/Delete_Sector", Data_);
  }


  //Daily_Tracker

 

  Create_Daily_Tracker(Data_){  
    console.log("calling url : "+this.apiurl + "/CreateDaily_Tracker");
    return this.http.post(this.apiurl + "/CreateDaily_Tracker", Data_);
  }  

  LoadDaily_Tracker_Update_listOnlyOwned(FilterData_){  
    console.log("calling url : "+this.apiurl + "/LoadDaily_Tracker_Update_listOnlyOwned");
    return this.http.post (this.apiurl + "/LoadDaily_Tracker_Update_listOnlyOwned",FilterData_);
  }

  Daily_Tracker_Update_Task(Data_){  
    console.log("calling url : "+this.apiurl + "/Daily_Tracker_Update_Task");
    return this.http.post(this.apiurl + "/Daily_Tracker_Update_Task", Data_);
  }

  Daily_Tracker_Update_(Data_){  
    console.log("calling url : "+this.apiurl + "/Daily_Tracker_Update_Task");
    return this.http.post(this.apiurl + "/Daily_Tracker_Update_Task", Data_);
  }

  Daily_Tracker_Month_Delete(Data_){
    console.log("url : "+this.apiurl + "/Daily_Tracker_Month_Delete");
    return this.http.post(this.apiurl + "/Daily_Tracker_Month_Delete", Data_);
  }

  Load_Daily_Tracker_All(){  
    console.log("calling url : "+this.apiurl + "/Daily_Tracker_Update_list");
    return this.http.get(this.apiurl + "/Daily_Tracker_Update_list");
  }
  //

  Daily_Tracker_Update_Deletes(Data_){  
    console.log("calling url : "+this.apiurl + "/Daily_Tracker_Update_Deletes");
    return this.http.post(this.apiurl + "/Daily_Tracker_Update_Deletes", Data_);
  }

  

 




  


}
