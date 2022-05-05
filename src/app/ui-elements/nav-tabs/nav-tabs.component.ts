import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss'],
  styles: [`
    .close {
      font-size: 1.4rem;
      opacity: 0.1;
      transition: opacity 0.3s;
      color: fff;
    }
    .nav-link:hover > .close {
      opacity: 0.8;
    }
  `]
})
export class NavTabsComponent implements OnInit {

  active = 1;
  active1 = 'top';
  

  active2;
  disabled = true;

  active3 = 1;


  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }


  
  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  active4;

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
