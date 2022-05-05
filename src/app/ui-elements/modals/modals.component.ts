import { Component, OnInit , Input , ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalsComponent implements OnInit {

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  // Open default modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

   // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

    // Open Modal as content
  openContent() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
    // Open Modal with light blue backdrop
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
    // Open Modal as dark Modal
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
    // Open small Modal
  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
    // Open Large Modal
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
    // Open extra Large Modal
  openXl(content) { this.modalService.open(content, {size: 'xl'}); }
    // Open Vertically Centered Modal
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
    // Open Scrollable Content Modal
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  ngOnInit() {
  }

}
