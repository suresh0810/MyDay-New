import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceComponent } from './invoice/invoice.component';
import { BlankComponent } from './blank/blank.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InvoiceComponent,
    BlankComponent,
    UserProfileComponent
 ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class FullPagesModule { }
