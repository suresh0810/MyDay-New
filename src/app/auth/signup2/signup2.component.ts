import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore , } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component implements OnInit {
  userName:string;
  Email:string;
  password:string;
  
  @ViewChild('f') signup2: NgForm;
  
  constructor(private router: Router,
              private route: ActivatedRoute, private afs: AngularFirestore,
              private afauth: AngularFireAuth,
              private toast:ToastrService) { }


  //  On submit click, reset field value
  onSubmit() {
      this.signup2.reset();
  }

  // On Signin link click
  onSignin2() {
    this.router.navigate(['signin2'], { relativeTo: this.route.parent });
  }
  ngOnInit() {
  }
  register(){
    if(this.userName && this.Email && this.password)      
    {            
    this.afauth.createUserWithEmailAndPassword(this.Email, this.password)
      .then((data) => {  
        data.user.sendEmailVerification();      
        this.afs.collection('users').doc(data.user?.uid).set({
          'userId': data.user?.uid,
          'userName': this.userName,       
          'Email': this.Email,                                                                               
          'createdAt': Date.now()
        })
        .then(() => {          
          this.toast.success(' Registration Success! Please Check Your Email!');
          this.router.navigate(['./auth/signin2']);
        })
        .catch(error => {
        
          this.toast.error(error.message);
        })
       
      })
    }else{
      this.toast.warning(' Please fill the form!');
    }
  }

}
