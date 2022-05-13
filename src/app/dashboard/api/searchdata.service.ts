import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchdataService {

  public Select_Search_Data = new Subject<string>();

 // Select_Search_Data;

  constructor() { }

  getsearchdata(data) {
   this.Select_Search_Data.next(data);
  }
}
