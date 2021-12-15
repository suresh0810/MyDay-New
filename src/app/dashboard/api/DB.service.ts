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

  //ToDolist
  createToDolist(Data_){  
    console.log("calling url : "+this.apiurl + "/createToDolist_item");
    return this.http.post(this.apiurl + "/createToDolist_item", Data_);
  }

  UpdateToDolist(Data_){  
    console.log("calling url : "+this.apiurl + "/updateToDolist_item");
    return this.http.post(this.apiurl + "/updateToDolist_item", Data_);
  }

  LoadToDolist(){  
    console.log("calling url : "+this.apiurl + "/loadToDolist");
    return this.http.get(this.apiurl + "/loadToDolist");
  }

  DeleteToDolist(Data_){
    console.log("url : "+this.apiurl + "/deleteToDolist_item");
    return this.http.post(this.apiurl + "/deleteToDolist_item", Data_);
  }

  LoadToDolistUserData(Data_){  
    console.log("calling url : "+this.apiurl + "/loadTodolistUserData");
    return this.http.get(this.apiurl + "/loadTodolistUserData",Data_);
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
  

}
