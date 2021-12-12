import { Injectable } from '@angular/core';
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



@Injectable()
export class AuthService 
{
  user_: Observable<any>;
  user: User;
  userData: any;

 

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
    }


    login(Email: string, password: string) {
      this.afauth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          this.afauth.signInWithEmailAndPassword(Email, password)
            .then((data) => {
              if (!data.user.emailVerified) {
                // sessionStorage.setItem("uid",userCredential.user.uid);
                this.toast.error('Please verify your email address!');
                this.afauth.signOut();  
              } else {  
                this.router.navigate(['./dashboard/ecommerce-v1']);
                this.toast.success('Your Account Login Successfully');
              }  
            })
            .catch(error => {
              this.toast.error(error.message);
            })
        )
    }

    logout() {
      //this.afAuth.signOut();
      this.afauth.signOut().then(() => {
        this.router.navigate(['./auth/signin2']);
        this.toast.success('Your Account Logout Successfully')
      });
    }






    
    

}// end


