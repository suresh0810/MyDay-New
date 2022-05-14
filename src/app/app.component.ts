import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { ToastrService } from 'ngx-toastr';
import{ User } from '../app/auth/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  CurrentUser: User = <User>{};
  loggedInUser :User;

  constructor(private afs: AngularFirestore,private afauth: AngularFireAuth,
    private router: Router,
    private toast:ToastrService,       
  ){
    this.attologin();
  }

  attologin(){
    //const userData = JSON.parse(localStorage.getItem('user'));
   // console.log(JSON.parse(userData));
   const userData = JSON.parse(localStorage.getItem('user'));   
    if(!userData){
      return;
    } 
    this.CurrentUser.Email = userData    
    JSON.parse(localStorage.getItem('user'));
    console.log(JSON.stringify(this.CurrentUser));    
    if(this.CurrentUser.Email){
      this.router.navigate(['./dashboard/expenses']);
    }   
  }
}
