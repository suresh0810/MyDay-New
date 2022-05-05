import { Injectable, PlatformRef } from '@angular/core';
import { User } from '../auth/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat'
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';





@Injectable()
export class AuthService 
{
  user_: Observable<any>;
  user: User;
  userData: any;

  users: User[] = [];
  CurrentUser: User = <User>{};
  loggedInUser :User;
  constructor
  (
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private toast:ToastrService,
   
    
  
  )
   {
     this.user_ = this.afauth.authState
     .pipe(
       switchMap( user =>{
         if(user)
         {
           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
         }else{
           return of(null);
         }
       } )
     )


    // this.afauth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })  
    
    // this.attologin();

    }


    login(Email: string, password: string) {
      if(Email && password){
      
     this.afauth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
     
        .then(() =>
          this.afauth.signInWithEmailAndPassword(Email, password)
            .then((data) => {
              if (!data.user.emailVerified) {              
                
                // sessionStorage.setItem("uid",userCredential.user.uid);
                this.toast.error('Please verify your email address!', 'Error!', {
                  timeOut:1500
                });
                this.afauth.signOut();  
              } else {  
                this.router.navigate(['./dashboard/task']);
                localStorage.setItem('user', JSON.stringify(data));               
                this.toast.success('Your Account Login Successfully', 'Success!', {

                  
                  timeOut:1500
                });
              }  
            })
            .catch(error => {
              this.toast.error(error.message);
            })
        )
      }else{
        this.toast.warning('Please Fill The Form!')
      }
    }

    logout() {
      //this.afAuth.signOut();
      this.afauth.signOut().then(() => {
        this.router.navigate(['./auth/signin2']);
        this.toast.success('Your Account Logout Successfully' ,'Success!', {
          timeOut:1500
        })
      });         
    }


  
  // attologin(){
  //   //const userData = JSON.parse(localStorage.getItem('user'));
  //  // console.log(JSON.parse(userData));
  //  const userData = JSON.parse(localStorage.getItem('user'));
   
  //   if(!userData){
  //     return;
  //   }
 
  //   this.CurrentUser.Email = userData    
  //   JSON.parse(localStorage.getItem('user'));
  //   console.log(JSON.stringify(this.CurrentUser));    
  //   if(this.CurrentUser.Email){
  //     this.router.navigate(['./dashboard/task']);
  //   }   
  // }


    
    

}// end


