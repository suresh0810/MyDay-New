import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { Timestamp } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiurl=environment.algodExpApiUrl + "/post";

  constructor(private http:HttpClient) { }



  createTask(Data_){  
    console.log("calling url : "+this.apiurl + "/postget");
    return this.http.get(this.apiurl + "/postget", Data_);
  }
}
