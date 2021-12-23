import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password2',
  templateUrl: './reset-password2.component.html',
  styleUrls: ['./reset-password2.component.scss']
})
export class ResetPassword2Component implements OnInit {

  Email:string;
  @ViewChild('f') resetpassword2: NgForm;

  constructor(private router: Router,
      private route: ActivatedRoute,
      private afauth: AngularFireAuth,
      private toast: ToastrService) { }

  // On submit click, reset form fields
  onSubmit() {
      this.resetpassword2.reset();
  }

  // On Signin2 link click
  onSignin2() {
      this.router.navigate(['signin2'], { relativeTo: this.route.parent });
  }


  ngOnInit() {
  }

  reset(){
    if(this.Email)    
        {       
        this.afauth.sendPasswordResetEmail(this.Email)
        .then(()=>{
              console.log("success");
              this.router.navigate(['./auth/signin2']);
              this.toast.success('Please Check Your Email','', {
                timeOut:1500
              });
        })
        .catch((error)=>{
         // console.log(error.message);
          this.toast.error(error.message);
        })
      }else{
        this.toast.warning('Please Enter Your Email Address')
        console.log('please enter your email address');
      }
    }

}
