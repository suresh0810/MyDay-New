import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit {

  Email : string="";
  password:string="";
  hide = true;

  @ViewChild('f') signin2: NgForm;

  
  constructor(private router: Router,
              private route: ActivatedRoute, private auth:AuthService) { }


  //  On submit click, reset field value
  onSubmit() {
      this.signin2.reset();
  }
    
  // On ResetPassword link click
  onResetpassword2() {
    this.router.navigate(['reset-password2'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup2() {
    this.router.navigate(['signup2'], { relativeTo: this.route.parent });
  }


  ngOnInit() {
  }

  login(){
    this.auth.login(this.Email, this.password);    
  }

}
