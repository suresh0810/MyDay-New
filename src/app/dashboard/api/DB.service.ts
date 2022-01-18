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

LoadWorkspace(){  
  console.log("calling url : "+this.apiurl + "/loadTask");
  return this.http.get(this.apiurl + "/loadWorkspace");
}

UpdateWorkspace(Data_){
  return this.http.post(this.apiurl + "/UpdateWorkspace", Data_);
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

  //Expenses Service

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

  LoadFinancelistUserData(Data_){  
    console.log("calling url : "+this.apiurl + "/loadFinancelistUserData");
    return this.http.get(this.apiurl + "/loadTodolistUserData",Data_);
  }

 




  


}
