import { Injectable } from '@angular/core';
import { Storage } from 'angular-storage';
import { User } from '../auth/user';




const USER_KEY ='my-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User): Promise<any> {    
    return localStorage.get(USER_KEY).then((users: User[]) => {
    //  if (users){
    //    users.push(user);
    //    return this.storage.set(USER_KEY, [users]);
   //   } else {
        return localStorage.set(USER_KEY, [user]);
  //    }

    });

  }

  getUsers(): Promise<User[]> {
    return localStorage.get(USER_KEY);
  }
  
}
