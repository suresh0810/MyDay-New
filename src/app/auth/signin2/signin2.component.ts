import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { User } from 'src/app/auth/user';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss'],
  providers: [NgbCarouselConfig]
})
export class Signin2Component implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}`);

  images2 = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}`);

  showNavigationArrows = false;
  showNavigationIndicators = false;


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  Email : string="";
  password:string="";
  hide = true;

  users: User[] = [];
  CurrentUser: User = <User>{};

  @ViewChild('f') signin2: NgForm;

  
  constructor(private router: Router,
              private route: ActivatedRoute, private auth:AuthService,config: NgbCarouselConfig) { 
                config.showNavigationArrows = true;
                config.showNavigationIndicators = true;
              }


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
    var Email = this.Email.replace(/\s/g, "");
    this.auth.login(Email, this.password);      
  }

}
